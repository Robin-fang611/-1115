'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, HelpCircle, FolderKanban, MessageSquare, RefreshCw, Download, Plus, Filter, Info } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useContentStore } from '@/store/useContentStore';

export default function AdminDashboard() {
  const router = useRouter();
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const { blog, projects, contact, fetchData } = useContentStore();
  const [messagesCount, setMessagesCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    // 检查是否有访问权限
    const hasAccess = localStorage.getItem('admin_access');
    if (hasAccess !== 'true') {
      router.push('/admin/login');
      return;
    }
    
    // 有权限，继续加载数据
    fetchData();
    setIsLoading(false);
    
    // Fetch messages count separately
    const fetchMessages = async () => {
      try {
        const res = await fetch('/api/messages');
        if (res.ok) {
          const data = await res.json();
          setMessagesCount(data.length);
        }
      } catch {
        console.error('Failed to fetch messages count');
      }
    };
    fetchMessages();
  }, [fetchData, router]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchData();
      // 重新获取消息数
      const res = await fetch('/api/messages');
      if (res.ok) {
        const data = await res.json();
        setMessagesCount(data.length);
      }
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      // 获取所有数据
      const [siteDataRes, messagesRes] = await Promise.all([
        fetch('/api/site-data'),
        fetch('/api/messages')
      ]);

      if (siteDataRes.ok && messagesRes.ok) {
        const siteData = await siteDataRes.json();
        const messages = await messagesRes.json();

        // 准备CSV数据
        let csvContent = '数据类型,标题,内容\n';

        // 添加站点数据
        if (siteData.data) {
          csvContent += `站点设置,网站标题,${siteData.data.global?.siteTitle || ''}\n`;
          csvContent += `站点设置,描述,${siteData.data.global?.description || ''}\n`;
          csvContent += `个人信息,姓名,${siteData.data.profile?.basicInfo?.name || ''}\n`;
          csvContent += `个人信息,角色,${siteData.data.profile?.role || ''}\n`;
        }

        // 添加项目数据
        if (siteData.data?.projects) {
          siteData.data.projects.forEach((project: any) => {
            csvContent += `项目,${project.name},${project.description}\n`;
          });
        }

        // 添加文章数据
        if (siteData.data?.blog?.articles) {
          siteData.data.blog.articles.forEach((article: any) => {
            csvContent += `文章,${article.title},${article.summary}\n`;
          });
        }

        // 添加消息数据
        if (messages.length > 0) {
          messages.forEach((message: any) => {
            csvContent += `消息,${message.subject},${message.message.substring(0, 100)}...\n`;
          });
        }

        // 创建下载链接
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `site-data-${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Export failed:', error);
      alert('导出失败，请重试');
    } finally {
      setExporting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  // Calculate stats
  const totalArticles = blog?.articles?.length || 0;
  const totalProjects = projects?.length || 0;

  const stats = [
    {
      title: '文章数量',
      value: totalArticles,
      icon: BookOpen,
      color: 'bg-blue-50 text-blue-600',
      iconColor: 'bg-blue-100 text-blue-600'
    },
    {
      title: '项目数量',
      value: totalProjects,
      icon: FolderKanban,
      color: 'bg-green-50 text-green-600',
      iconColor: 'bg-green-100 text-green-600'
    },
    {
      title: '消息数量',
      value: messagesCount,
      icon: MessageSquare,
      color: 'bg-purple-50 text-purple-600',
      iconColor: 'bg-purple-100 text-purple-600'
    },
    {
      title: '联系邮箱',
      value: contact?.email || '未设置',
      icon: MessageSquare,
      color: 'bg-orange-50 text-orange-600',
      iconColor: 'bg-orange-100 text-orange-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-blue-600">仪表盘</h1>
          <p className="text-blue-500 text-sm mt-1">欢迎回来，管理员</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group">
            <button 
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? '刷新中...' : '刷新'}
            </button>
            <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-md p-2 text-xs text-gray-600 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              刷新页面数据
            </div>
          </div>
          <div className="relative group">
            <button 
              onClick={handleExport}
              disabled={exporting}
              className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              {exporting ? '导出中...' : '导出'}
            </button>
            <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-md p-2 text-xs text-gray-600 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              导出数据为CSV文件
            </div>
          </div>
          <Dialog open={isGuideOpen} onOpenChange={setIsGuideOpen}>
            <DialogTrigger asChild>
              <button className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
                <HelpCircle className="w-4 h-4" />
                使用指南
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">后台管理使用指南</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 text-gray-700">
                <p>欢迎来到后台管理系统！</p>
                <p><strong>功能说明：</strong></p>
                <ul className="list-disc list-inside space-y-2">
                  <li>📝 Blog 管理 - 编辑文章、管理分类</li>
                  <li>💼 项目管理 - 更新项目进度</li>
                  <li>📧 联系管理 - 查看联系表单</li>
                  <li>⚙️ 个人设置 - 修改个人信息</li>
                </ul>
                <p className="text-sm text-gray-500">所有修改会自动保存到 siteData.json</p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-medium text-gray-500">{stat.title}</div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${stat.iconColor}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-semibold text-blue-600">
                {typeof stat.value === 'number' ? stat.value : stat.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-blue-600">快速操作</h3>
            <button className="flex items-center gap-1 text-sm text-blue-600 hover:underline">
              查看全部
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => router.push('/admin/blog')}
              className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm text-gray-700">管理 Blog</span>
            </button>
            <button
              onClick={() => router.push('/admin/projects')}
              className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                <FolderKanban className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm text-gray-700">管理项目</span>
            </button>
            <button
              onClick={() => router.push('/admin/contact')}
              className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                <MessageSquare className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm text-gray-700">联系管理</span>
            </button>
            <button
              onClick={() => router.push('/admin/settings')}
              className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-2">
                <HelpCircle className="w-5 h-5 text-orange-600" />
              </div>
              <span className="text-sm text-gray-700">系统设置</span>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-blue-600">最近活动</h3>
            <button className="flex items-center gap-1 text-sm text-blue-600 hover:underline">
              查看全部
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">系统启动</div>
                <div className="text-xs text-gray-500 mt-1">今天 10:00</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">数据同步完成</div>
                <div className="text-xs text-gray-500 mt-1">今天 09:30</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-gray-400 mt-2"></div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">上次登录</div>
                <div className="text-xs text-gray-500 mt-1">昨天 18:00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

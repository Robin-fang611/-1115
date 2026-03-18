'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, HelpCircle, FolderKanban, MessageSquare } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useContentStore } from '@/store/useContentStore';

export default function AdminDashboard() {
  const router = useRouter();
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const { blog, projects, contact, fetchData } = useContentStore();
  const [messagesCount, setMessagesCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-pink-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-bold" style={{ fontFamily: 'Comic Sans MS, cursive' }}>Loading...</p>
        </div>
      </div>
    );
  }

  // Calculate stats
  const totalArticles = blog?.articles?.length || 0;
  const totalProjects = projects?.length || 0;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
          📊 仪表盘 (Dashboard)
        </h1>
        
        <Dialog open={isGuideOpen} onOpenChange={setIsGuideOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition-colors shadow-sm font-bold" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              <HelpCircle className="w-4 h-4" />
              使用指南
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold pb-4 border-b" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                🎯 后台管理使用指南
              </DialogTitle>
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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-white rounded-2xl border-2 border-dashed border-pink-300 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">文章数量</p>
              <p className="text-3xl font-bold text-gray-800">{totalArticles}</p>
            </div>
            <BookOpen className="w-12 h-12 text-pink-500 opacity-50" />
          </div>
        </div>

        <div className="p-6 bg-white rounded-2xl border-2 border-dashed border-purple-300 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">项目数量</p>
              <p className="text-3xl font-bold text-gray-800">{totalProjects}</p>
            </div>
            <FolderKanban className="w-12 h-12 text-purple-500 opacity-50" />
          </div>
        </div>

        <div className="p-6 bg-white rounded-2xl border-2 border-dashed border-blue-300 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">消息数量</p>
              <p className="text-3xl font-bold text-gray-800">{messagesCount}</p>
            </div>
            <MessageSquare className="w-12 h-12 text-blue-500 opacity-50" />
          </div>
        </div>

        <div className="p-6 bg-white rounded-2xl border-2 border-dashed border-green-300 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">联系邮箱</p>
              <p className="text-lg font-bold text-gray-800 truncate">{contact?.email || '未设置'}</p>
            </div>
            <MessageSquare className="w-12 h-12 text-green-500 opacity-50" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => router.push('/admin/blog')}
          className="p-6 bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-left"
        >
          <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            📝 管理 Blog
          </h3>
          <p className="text-pink-100">编辑文章、管理分类</p>
        </button>

        <button
          onClick={() => router.push('/admin/projects')}
          className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-left"
        >
          <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            💼 管理项目
          </h3>
          <p className="text-purple-100">更新项目进度和信息</p>
        </button>
      </div>
    </div>
  );
}

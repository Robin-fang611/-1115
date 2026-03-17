'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, HelpCircle, FolderKanban, MessageSquare } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useContentStore } from '@/store/useContentStore';

export default function AdminDashboard() {
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const { blog, projects, contact, fetchData } = useContentStore();
  const [messagesCount, setMessagesCount] = useState(0);

  useEffect(() => {
    fetchData();
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
  }, [fetchData]);

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
                📢 后台管理操作指南
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 pt-4 text-gray-700">
              <section className="space-y-2">
                <h3 className="font-bold flex items-center gap-2 text-pink-600">
                  <BookOpen className="w-5 h-5" /> 如何发布 Blog 文章？
                </h3>
                <ol className="list-decimal pl-5 space-y-1 text-sm">
                  <li>点击左侧菜单的 <strong>"Blog 管理"</strong>。</li>
                  <li>点击右上角的 <strong>"+ 添加文章"</strong> 按钮。</li>
                  <li>填写标题、摘要、选择分类。</li>
                  <li>使用富文本编辑器编写文章内容 (支持加粗、斜体、标题、列表、图片等)。</li>
                  <li>如需置顶，勾选底部的 <strong>"📌 置顶文章"</strong> 选项。</li>
                  <li>点击页面右上角的 <strong>"保存更改"</strong> 按钮生效。</li>
                </ol>
              </section>

              <section className="space-y-2">
                <h3 className="font-bold flex items-center gap-2 text-pink-600">
                  <FolderKanban className="w-5 h-5" /> 如何管理项目？
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>点击左侧菜单的 <strong>"项目管理"</strong>。</li>
                  <li>可以添加新项目，编辑项目名称、描述、进度等信息。</li>
                  <li>添加项目亮点和时间轴事件来丰富项目内容。</li>
                  <li>上传项目图片展示项目成果。</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="font-bold flex items-center gap-2 text-pink-600">
                  <MessageSquare className="w-5 h-5" /> 如何查看留言？
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>留言功能开发中，敬请期待。</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="font-bold flex items-center gap-2 text-pink-600">
                  ⚙️ 常用设置
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li><strong>修改个人信息</strong>: 前往"Profile 管理"。</li>
                  <li><strong>更新联系方式</strong>: 前往"联系信息"。</li>
                  <li><strong>网站基本信息</strong>: 前往"全局设置"。</li>
                </ul>
              </section>
              
              <div className="bg-pink-50 p-4 rounded-xl border-2 border-pink-200 text-xs text-gray-600 mt-4">
                💡 小贴士：所有修改点击"保存"后，前台页面会立即更新，无需刷新浏览器即可看到效果。
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-3xl border-2 border-gray-300 bg-white p-6 shadow-lg">
          <div className="flex flex-col space-y-2">
            <h3 className="font-bold text-gray-700">Blog 文章数</h3>
          </div>
          <div className="pt-4">
            <div className="text-3xl font-bold text-pink-600">{totalArticles}</div>
            <p className="text-xs text-gray-500">Published posts</p>
          </div>
        </div>
        <div className="rounded-3xl border-2 border-gray-300 bg-white p-6 shadow-lg">
          <div className="flex flex-col space-y-2">
            <h3 className="font-bold text-gray-700">项目数</h3>
          </div>
          <div className="pt-4">
            <div className="text-3xl font-bold text-purple-600">{totalProjects}</div>
            <p className="text-xs text-gray-500">Active projects</p>
          </div>
        </div>
        <div className="rounded-3xl border-2 border-gray-300 bg-white p-6 shadow-lg">
          <div className="flex flex-col space-y-2">
            <h3 className="font-bold text-gray-700">留言数</h3>
          </div>
          <div className="pt-4">
            <div className="text-3xl font-bold text-blue-600">{messagesCount}</div>
            <p className="text-xs text-gray-500">Unread messages</p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border-2 border-gray-300 bg-white p-6 shadow-lg">
        <h3 className="font-bold mb-4 text-gray-800" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
          🎯 系统状态
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
            <span className="text-gray-600">Next.js Version</span>
            <span className="font-bold text-gray-800">16.1.4</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
            <span className="text-gray-600">Tailwind Version</span>
            <span className="font-bold text-gray-800">4.x</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
            <span className="text-gray-600">富文本编辑器</span>
            <span className="font-bold text-green-600">✓ TipTap</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
            <span className="text-gray-600">认证系统</span>
            <span className="font-bold text-green-600">✓ NextAuth</span>
          </div>
        </div>
      </div>
    </div>
  );
}

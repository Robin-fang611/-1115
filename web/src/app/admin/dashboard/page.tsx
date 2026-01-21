'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, HelpCircle, FileText, MessageSquare } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useContentStore } from '@/store/useContentStore';

export default function AdminDashboard() {
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const { entrepreneurship, growthNotes, fetchData } = useContentStore();
  const [messagesCount, setMessagesCount] = useState(0);

  useEffect(() => {
    fetchData();
    // Fetch messages count separately as it's not in the main store yet
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
  const totalArticles = (entrepreneurship?.articles?.length || 0) + (growthNotes?.articles?.length || 0);
  
  const totalViews = [
    ...(entrepreneurship?.articles || []),
    ...(growthNotes?.articles || [])
  ].reduce((sum, article) => sum + (article.views || 0), 0);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">仪表盘 (Dashboard)</h1>
        
        <Dialog open={isGuideOpen} onOpenChange={setIsGuideOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
              <HelpCircle className="w-4 h-4" />
              发布指南 (Guide)
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold pb-4 border-b">📢 网站管理操作指南</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 pt-4 text-gray-700">
              <section className="space-y-2">
                <h3 className="font-bold flex items-center gap-2 text-indigo-600">
                  <FileText className="w-5 h-5" /> 如何发布新文章？
                </h3>
                <ol className="list-decimal pl-5 space-y-1 text-sm">
                  <li>点击左侧菜单的 <strong>“分享与手记”</strong>。</li>
                  <li>选择顶部的 <strong>“创业分享”</strong> 或 <strong>“成长手记”</strong> 标签。</li>
                  <li>点击右上角的 <strong>“+ 添加文章”</strong> 按钮。</li>
                  <li>填写标题、摘要、分类，并输入封面图片的 URL。</li>
                  <li>如需置顶，勾选底部的 <strong>“置顶 (Sticky)”</strong> 选项。</li>
                  <li>点击页面右上角的 <strong>“保存更改”</strong> 按钮生效。</li>
                </ol>
              </section>

              <section className="space-y-2">
                <h3 className="font-bold flex items-center gap-2 text-indigo-600">
                  <MessageSquare className="w-5 h-5" /> 如何查看留言？
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>点击左侧菜单的 <strong>“留言管理”</strong>。</li>
                  <li>列表会自动按时间倒序显示所有访客提交的表单。</li>
                  <li>点击右上角的 <strong>“刷新”</strong> 按钮获取最新数据。</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="font-bold flex items-center gap-2 text-indigo-600">
                  <BookOpen className="w-5 h-5" /> 常用设置
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li><strong>修改 Slogan</strong>: 前往“首页管理”。</li>
                  <li><strong>更新履历</strong>: 前往“关于我”，支持添加新的职场或创业经历。</li>
                  <li><strong>邮件测试</strong>: 已禁用 (仅本地存证)。</li>
                </ul>
              </section>
              
              <div className="bg-gray-50 p-4 rounded-lg text-xs text-gray-500 mt-4">
                💡 小贴士：所有修改点击“保存”后，前台页面会立即更新，无需刷新浏览器即可看到效果。
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex flex-col space-y-1.5">
            <h3 className="font-semibold leading-none tracking-tight">总阅读量</h3>
          </div>
          <div className="p-0 pt-4">
            <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all articles</p>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex flex-col space-y-1.5">
            <h3 className="font-semibold leading-none tracking-tight">文章总数</h3>
          </div>
          <div className="p-0 pt-4">
            <div className="text-2xl font-bold">{totalArticles}</div>
            <p className="text-xs text-muted-foreground">Published posts</p>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex flex-col space-y-1.5">
            <h3 className="font-semibold leading-none tracking-tight">留言数</h3>
          </div>
          <div className="p-0 pt-4">
            <div className="text-2xl font-bold">{messagesCount}</div>
            <p className="text-xs text-muted-foreground">Unread messages</p>
          </div>
        </div>
      </div>
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h3 className="font-semibold mb-4">系统状态</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Next.js Version</span>
            <span>15.1.4</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tailwind Version</span>
            <span>4.0.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}

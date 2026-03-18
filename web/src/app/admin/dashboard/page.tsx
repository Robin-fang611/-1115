'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, HelpCircle, FolderKanbi, MessageSquare } from 'lucide-react';
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

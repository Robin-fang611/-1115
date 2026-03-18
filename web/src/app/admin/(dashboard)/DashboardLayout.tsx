"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { Sidebar } from '@/components/admin/Sidebar';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const checkSession = async () => {
      try {
        // 简化逻辑，直接使用 useSession 的结果
        if (status === 'authenticated' && session) {
          setIsLoading(false);
        } else if (status === 'unauthenticated' || !session) {
          // 无 session，重定向到登录页
          const loginUrl = `/admin/login?callbackUrl=${encodeURIComponent(pathname)}`;
          router.push(loginUrl);
        } else {
          // 还在加载中，等待一下
          if (retryCount < 5) {
            const timer = setTimeout(() => {
              setRetryCount(prev => prev + 1);
            }, 1000);
            return () => clearTimeout(timer);
          } else {
            // 重试多次后仍然加载中，认为是会话问题
            setError('会话加载超时');
            setIsLoading(false);
          }
        }
      } catch (err) {
        setError('会话检查失败');
        console.error('Session check error:', err);
        setIsLoading(false);
      }
    };

    checkSession();
  }, [session, status, router, pathname, retryCount]);

  const handleRetry = () => {
    setIsLoading(true);
    setError(null);
    setRetryCount(0);
    // 强制刷新页面
    router.refresh();
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50 items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-pink-500 mx-auto mb-4" />
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-50 items-center justify-center">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">发生错误</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="flex gap-3">
            <button
              onClick={handleRetry}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              重试
            </button>
            <button
              onClick={() => router.push('/admin/login')}
              className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
            >
              重新登录
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  );
}

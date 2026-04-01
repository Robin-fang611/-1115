"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Sidebar } from '@/components/admin/Sidebar';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // 检查是否有认证 cookie
        const response = await fetch('/api/auth/check', {
          method: 'GET',
          credentials: 'include',
        });

        const result = await response.json();

        if (result.success) {
          setIsLoading(false);
        } else {
          // 未认证，重定向到登录页
          const loginUrl = `/admin/login?callbackUrl=${encodeURIComponent(pathname)}`;
          router.push(loginUrl);
        }
      } catch (err) {
        setError('认证检查失败');
        console.error('Auth check error:', err);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router, pathname]);

  const handleRetry = () => {
    setIsLoading(true);
    setError(null);
    // 重新检查认证状态
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check', {
          method: 'GET',
          credentials: 'include',
        });

        const result = await response.json();

        if (result.success) {
          setIsLoading(false);
        } else {
          const loginUrl = `/admin/login?callbackUrl=${encodeURIComponent(pathname)}`;
          router.push(loginUrl);
        }
      } catch (err) {
        setError('认证检查失败');
        console.error('Auth check error:', err);
        setIsLoading(false);
      }
    };

    checkAuth();
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

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  );
}

"use client";

import { useEffect, useState } from 'react';
import { useSession, getSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { Sidebar } from '@/components/admin/Sidebar';
import { Loader2, AlertCircle } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        // 直接从 API 获取 session，确保获取最新状态
        const currentSession = await getSession();
        
        if (currentSession) {
          // 如果有 session，更新 useSession 状态
          update();
          setIsLoading(false);
        } else {
          // 无 session，重定向到登录页
          const loginUrl = `/admin/login?callbackUrl=${encodeURIComponent(pathname)}`;
          router.push(loginUrl);
        }
      } catch (err) {
        setError('会话检查失败');
        console.error('Session check error:', err);
        setIsLoading(false);
      }
    };

    if (status === 'loading') {
      // 如果 useSession 还在加载，主动检查 session
      checkSession();
    } else {
      // useSession 已经有结果
      const timer = setTimeout(() => {
        if (!session) {
          const loginUrl = `/admin/login?callbackUrl=${encodeURIComponent(pathname)}`;
          router.push(loginUrl);
        } else {
          setIsLoading(false);
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [session, status, router, pathname, update]);

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
          <button
            onClick={() => router.push('/admin/login')}
            className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
          >
            重新登录
          </button>
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

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 简单密码验证（客户端验证，防君子不防小人）
    if (password === '61157252bB@') {
      // 密码正确，存储到 localStorage
      localStorage.setItem('admin_access', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('密码错误');
    }
  };

  // 检查是否已经登录
  useEffect(() => {
    const hasAccess = localStorage.getItem('admin_access');
    if (hasAccess === 'true') {
      router.push('/admin/dashboard');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100">
      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl border-2 border-dashed border-gray-400">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-4">
            <Lock className="w-8 h-8 text-pink-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            🔐 后台管理登录
          </h1>
          <p className="text-gray-600">Robin's Island Admin Panel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              管理员密码
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all text-gray-800"
              placeholder="请输入管理员密码"
              autoFocus
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border-2 border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            style={{ fontFamily: 'Comic Sans MS, cursive' }}
          >
            登录后台
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <a
            href="/"
            className="flex items-center justify-center text-gray-600 hover:text-pink-600 transition-colors text-sm font-medium"
          >
            ← 返回前台首页
          </a>
        </div>
      </div>
    </div>
  );
}

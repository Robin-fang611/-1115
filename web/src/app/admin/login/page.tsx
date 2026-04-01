'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Lock, Shield, CheckCircle2 } from 'lucide-react';

export default function AdminLoginPage() {
  const searchParams = useSearchParams();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const callbackUrl = searchParams.get('callbackUrl') || '/admin/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const result = await response.json();

      if (result.success) {
        // Set localStorage to match what dashboard expects
        localStorage.setItem('admin_access', 'true');
        window.location.href = callbackUrl;
      } else {
        setError(result.error || '密码错误');
      }
    } catch (err) {
      setError('网络错误，请重试');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">后台管理登录</h1>
          <p className="text-gray-600 text-sm">请输入管理员密码</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              管理员密码
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="请输入密码"
                autoFocus
                disabled={loading}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Lock className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              <CheckCircle2 className="w-4 h-4" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-all disabled:opacity-50"
          >
            {loading ? '登录中...' : '登录'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <a
            href="/"
            className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
          >
            ← 返回首页
          </a>
        </div>

        <div className="mt-6 text-center text-xs text-gray-400">
          <p>© 2026 Robin's Admin. 版权所有</p>
        </div>
      </div>
    </div>
  );
}

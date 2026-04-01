'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Lock } from 'lucide-react';

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100">
      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl border-2 border-dashed border-gray-400">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-4">
            <Lock className="w-8 h-8 text-pink-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            后台管理登录
          </h1>
          <p className="text-gray-600">请输入管理员密码</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              管理员密码
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-pink-500 transition-all"
              placeholder="请输入密码"
              autoFocus
              disabled={loading}
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-xl transition-all disabled:opacity-50"
          >
            {loading ? '登录中...' : '登录'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <a
            href="/"
            className="text-gray-600 hover:text-pink-600 transition-colors text-sm"
          >
            ← 返回首页
          </a>
        </div>
      </div>
    </div>
  );
}

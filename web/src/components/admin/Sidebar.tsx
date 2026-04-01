'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Home, User, FolderKanban, BookOpen, Settings, LogOut, MessageSquare, ChevronRight, Bell } from 'lucide-react';
import clsx from 'clsx';

const menuItems = [
  { name: '仪表盘', icon: LayoutDashboard, href: '/admin/dashboard' },
  { name: '首页管理', icon: Home, href: '/admin/home' },
  { name: '关于我', icon: User, href: '/admin/about' },
  { name: '项目管理', icon: FolderKanban, href: '/admin/projects' },
  { name: 'Blog 管理', icon: BookOpen, href: '/admin/blog' },
  { name: '联系信息', icon: MessageSquare, href: '/admin/contact' },
  { name: '全局设置', icon: Settings, href: '/admin/settings' },
];

export function Sidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      localStorage.removeItem('admin_access');
      window.location.href = '/admin/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="flex h-screen w-64 flex-col bg-white border-r border-gray-200 shadow-sm">
      {/* Logo and User Info */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold">R</span>
            </div>
            <span className="text-lg font-semibold text-gray-800">Robin's Admin</span>
          </div>
          <Bell className="w-5 h-5 text-gray-400 cursor-pointer hover:text-blue-500 transition-colors" />
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-800">管理员</div>
            <div className="text-xs text-gray-500">admin</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={clsx(
                    'flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          退出登录
        </button>
      </div>
    </div>
  );
}

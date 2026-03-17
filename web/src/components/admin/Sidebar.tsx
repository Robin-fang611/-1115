'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { LayoutDashboard, Home, User, FolderKanban, BookOpen, Settings, LogOut, MessageSquare, PenTool } from 'lucide-react';
import clsx from 'clsx';

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
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
    await signOut({ callbackUrl: '/admin/login' });
  };

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-white text-gray-800">
      <div className="flex h-16 items-center justify-center border-b px-6">
        <div className="text-center">
          <PenTool className="w-8 h-8 text-pink-600 mx-auto mb-1" />
          <span className="text-lg font-bold text-pink-600 block" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            Robin's Admin
          </span>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={clsx(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all border-2',
                    isActive
                      ? 'bg-pink-500 text-white border-pink-500 shadow-md'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-pink-400 hover:bg-pink-50'
                  )}
                  style={{ fontFamily: 'Comic Sans MS, cursive' }}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="border-t p-4 space-y-2">
        <Link
          href="/"
          className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-pink-400 hover:bg-pink-50 transition-all"
          style={{ fontFamily: 'Comic Sans MS, cursive' }}
        >
          <LogOut className="h-4 w-4" />
          返回前台
        </Link>
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100 transition-all"
          style={{ fontFamily: 'Comic Sans MS, cursive' }}
        >
          <LogOut className="h-4 w-4" />
          退出登录
        </button>
      </div>
    </div>
  );
}

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Home, User, FolderKanban, BookOpen, Settings, LogOut, MessageSquare } from 'lucide-react';
import clsx from 'clsx';

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
  { name: '首页管理', icon: Home, href: '/admin/home' },
  { name: '关于我', icon: User, href: '/admin/about' },
  { name: '项目进展', icon: FolderKanban, href: '/admin/projects' },
  { name: '分享与手记', icon: BookOpen, href: '/admin/notes' },
  { name: '留言管理', icon: MessageSquare, href: '/admin/messages' },
  { name: '全局设置', icon: Settings, href: '/admin/settings' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-white text-gray-800">
      <div className="flex h-16 items-center justify-center border-b px-6">
        <span className="text-xl font-bold text-indigo-600">Admin Panel</span>
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
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="border-t p-4">
        <Link
          href="/"
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <LogOut className="h-4 w-4" />
          返回前台
        </Link>
      </div>
    </div>
  );
}

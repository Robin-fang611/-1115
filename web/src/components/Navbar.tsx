'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { Menu, X, MessageSquare } from 'lucide-react';
import { ContactModal } from './ContactModal';

const navItems = [
  { name: '关于我', path: '/about' },
  { name: '项目进展', path: '/projects' },
  { name: '创业分享', path: '/share?tab=startup' },
  { name: '成长手记', path: '/share?tab=notes' },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-black/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight text-white">
          Robin
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={clsx(
                'text-sm font-medium transition-colors hover:text-[#FF6B6B] relative group',
                pathname === item.path || (item.path.includes('?') && pathname.startsWith('/share')) 
                  ? 'text-[#FF6B6B]' 
                  : 'text-gray-300'
              )}
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF6B6B] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          
          <ContactModal>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#FF6B6B] hover:bg-[#ff5252] text-white rounded-full text-sm font-medium transition-all transform hover:scale-105">
              <MessageSquare size={16} />
              <span>留言板</span>
            </button>
          </ContactModal>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0a0a0a] shadow-lg border-t border-gray-800 p-4 flex flex-col space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="text-base font-medium text-gray-300 hover:text-[#FF6B6B]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <ContactModal>
            <button className="flex w-full items-center justify-center gap-2 px-4 py-2 bg-[#FF6B6B] text-white rounded-full text-sm font-medium">
               <MessageSquare size={16} />
               <span>留言板</span>
            </button>
          </ContactModal>
        </div>
      )}
    </nav>
  );
}

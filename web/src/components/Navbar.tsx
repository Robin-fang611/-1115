'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, MessageSquare } from 'lucide-react';
import { ContactModal } from './ContactModal';

const navItems = [
  { name: '关于我', path: '/about' },
  { name: '项目进展', path: '/projects' },
  { name: 'Blog 分享', path: '/share' },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out',
        isScrolled 
          ? 'bg-white/98 backdrop-blur-lg shadow-xl py-3 border-b-2 border-gray-200' 
          : 'bg-white/95 py-4'
      )}
      style={{
        boxShadow: isScrolled 
          ? '0 4px 20px rgba(0, 0, 0, 0.1)' 
          : 'none',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link 
          href="/" 
          className="text-2xl font-bold text-pink-600 hover:text-pink-700 transition-colors transform hover:scale-105"
          style={{ fontFamily: 'Comic Sans MS, cursive' }}
        >
          🏠 Robin's Island
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-3">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <motion.a
                  href={item.path}
                  key={item.name}
                  className={clsx(
                    'px-5 py-2.5 rounded-full text-sm font-bold transition-all border-2 relative overflow-hidden',
                    isActive
                      ? 'bg-pink-500 text-white border-pink-500 shadow-md'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-pink-400 hover:bg-pink-50'
                  )}
                  style={{ 
                    fontFamily: 'Comic Sans MS, cursive',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                {item.name}
              </motion.a>
            );
          })}
          
          <ContactModal>
            <button 
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-full text-sm font-bold transition-all transform hover:scale-105 shadow-md"
              style={{ 
                fontFamily: 'Comic Sans MS, cursive',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <MessageSquare size={16} />
              <span>留言板</span>
            </button>
          </ContactModal>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-3 text-pink-600 hover:bg-pink-50 rounded-xl transition-all transform hover:scale-110"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{ transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t-2 border-dashed border-pink-300 p-4 flex flex-col space-y-3"
          style={{
            animation: 'slideDown 0.3s ease-out',
            zIndex: 49
          }}
        >
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.name}
                href={item.path}
                className={clsx(
                  'text-base font-bold px-4 py-3 rounded-full border-2 transition-all',
                  isActive
                    ? 'bg-pink-500 text-white border-pink-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-pink-400 hover:bg-pink-50'
                )}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ 
                  fontFamily: 'Comic Sans MS, cursive',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                {item.name}
              </Link>
            );
          })}
          <ContactModal>
            <button 
              className="flex w-full items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full text-sm font-bold transition-all transform hover:scale-102"
              style={{ 
                fontFamily: 'Comic Sans MS, cursive',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
               <MessageSquare size={16} />
               <span>留言板</span>
            </button>
          </ContactModal>
        </div>
      )}
    </nav>
  );
}

// Add animation keyframes
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);
}

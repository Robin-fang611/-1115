'use client';

import { useContentStore } from '@/store/useContentStore';

export function Footer() {
  const { global } = useContentStore();

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 pt-12 pb-8 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center text-sm text-gray-500 border-t border-white/10 pt-8">
          © {new Date().getFullYear()} {global.logoText || 'Personal Brand'}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

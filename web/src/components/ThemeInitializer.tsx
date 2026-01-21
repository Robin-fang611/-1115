'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/store/useThemeStore';

export function ThemeInitializer() {
  const { font } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.remove('font-puhuiti', 'font-deyihei');
    if (font === 'puhuiti') {
      document.documentElement.classList.add('font-puhuiti');
    } else if (font === 'deyihei') {
      document.documentElement.classList.add('font-deyihei');
    }
  }, [font]);

  return null;
}

'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function NextAuthProvider({ children }: Props) {
  // 自动检测 baseUrl
  const getBaseUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.origin;
    }
    return 'http://localhost:3000';
  };

  return (
    <SessionProvider
      refetchInterval={0}
      refetchOnWindowFocus={false}
      basePath="/api/auth"
      baseUrl={getBaseUrl()}
    >
      {children}
    </SessionProvider>
  );
}

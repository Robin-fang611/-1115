'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function NextAuthProvider({ children }: Props) {
  return (
    <SessionProvider
      refetchInterval={0}
      refetchOnWindowFocus={false}
      basePath="/api/auth"
    >
      {children}
    </SessionProvider>
  );
}

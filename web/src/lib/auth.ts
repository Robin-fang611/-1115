import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '61157252bB@';

export async function verifyPassword(password: string): Promise<boolean> {
  if (ADMIN_PASSWORD_HASH) {
    return await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
  }
  return password === ADMIN_PASSWORD;
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export function setAuthCookie(response: NextResponse): NextResponse {
  response.cookies.set('admin_access', 'true', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  });
  return response;
}

export function clearAuthCookie(response: NextResponse): NextResponse {
  response.cookies.set('admin_access', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });
  return response;
}

export function isAuthenticated(cookieValue: string | undefined): boolean {
  return cookieValue === 'true';
}

import { NextResponse } from 'next/server';
import { apiSuccess } from '@/lib/api';
import { clearAuthCookie } from '@/lib/auth';

export async function POST() {
  const response = apiSuccess({ authenticated: false }, 'Logout successful');
  return clearAuthCookie(response);
}

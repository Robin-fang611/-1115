import { NextResponse } from 'next/server';
import { apiSuccess, apiUnauthorized } from '@/lib/api';
import { isAuthenticated } from '@/lib/auth';

export async function GET(request: Request) {
  const cookieHeader = request.headers.get('cookie');
  const cookies = new Map<string, string>();
  
  if (cookieHeader) {
    cookieHeader.split(';').forEach(cookie => {
      const [name, value] = cookie.trim().split('=');
      cookies.set(name, value);
    });
  }

  const adminAccess = cookies.get('admin_access');
  
  if (isAuthenticated(adminAccess)) {
    return apiSuccess({ authenticated: true });
  }
  
  return apiUnauthorized('Not authenticated');
}

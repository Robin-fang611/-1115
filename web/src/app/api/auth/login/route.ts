import { NextResponse } from 'next/server';
import { loginSchema } from '@/lib/validation';
import { apiSuccess, apiBadRequest, apiUnauthorized } from '@/lib/api';
import { verifyPassword, setAuthCookie } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const validation = loginSchema.safeParse(body);
    if (!validation.success) {
      return apiBadRequest('Invalid input');
    }

    const { password } = validation.data;

    const isValid = await verifyPassword(password);
    if (!isValid) {
      return apiUnauthorized('Invalid password');
    }

    const response = apiSuccess({ authenticated: true }, 'Login successful');
    return setAuthCookie(response);
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Login failed' },
      { status: 500 }
    );
  }
}

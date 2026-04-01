import { NextResponse } from 'next/server';
import { ApiResponse } from '@/types';

export function apiSuccess<T>(data: T, message?: string): NextResponse<ApiResponse<T>> {
  return NextResponse.json({
    success: true,
    data,
    message,
  });
}

export function apiError(error: string, status: number = 500): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error,
    },
    { status }
  );
}

export function apiBadRequest(error: string = 'Bad Request'): NextResponse<ApiResponse> {
  return apiError(error, 400);
}

export function apiUnauthorized(error: string = 'Unauthorized'): NextResponse<ApiResponse> {
  return apiError(error, 401);
}

export function apiForbidden(error: string = 'Forbidden'): NextResponse<ApiResponse> {
  return apiError(error, 403);
}

export function apiNotFound(error: string = 'Not Found'): NextResponse<ApiResponse> {
  return apiError(error, 404);
}

export function apiValidationError(errors: any): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: 'Validation Error',
      data: errors,
    },
    { status: 400 }
  );
}

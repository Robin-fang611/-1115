import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ 
    success: true,
    message: '已退出登录'
  });
  
  // 删除 cookie
  response.cookies.set('admin_auth', '', {
    maxAge: 0,
    path: '/',
  });
  
  return response;
}

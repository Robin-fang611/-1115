import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 简单的后台保护中间件
export function middleware(request: NextRequest) {
  // 检查是否是后台路径
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // 获取访问密码 cookie
    const adminAuth = request.cookies.get('admin_auth')?.value;
    
    // 正确的密码（从环境变量读取）
    const correctPassword = process.env.ADMIN_PASSWORD || 'admin123';
    
    // 如果密码正确，允许访问
    if (adminAuth === correctPassword) {
      return NextResponse.next();
    }
    
    // 如果是登录页面，允许访问
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }
    
    // 其他后台页面，重定向到登录页
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  
  return NextResponse.next();
}

// 配置中间件匹配的路由
export const config = {
  matcher: '/admin/:path*',
};

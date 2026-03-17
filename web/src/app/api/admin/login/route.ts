import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    
    // 验证密码
    const correctPassword = process.env.ADMIN_PASSWORD || 'admin123';
    
    if (password === correctPassword) {
      // 创建响应并设置 cookie
      const response = NextResponse.json({ 
        success: true,
        message: '登录成功'
      });
      
      // 设置 cookie，有效期 24 小时（不使用 httpOnly，让客户端可以访问）
      response.cookies.set('admin_auth', password, {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 小时
        path: '/',
      });
      
      return response;
    } else {
      return NextResponse.json(
        { error: '密码错误' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: '登录失败' },
      { status: 500 }
    );
  }
}

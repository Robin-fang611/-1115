import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: any) {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  // 检查是否是认证相关的 API 路由
  const isAuthAPI = pathname.startsWith("/api/auth");
  if (isAuthAPI) {
    return NextResponse.next();
  }

  // 获取 token
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthenticated = !!token;
  const isAdminLoginPage = pathname === "/admin/login";
  const isAdminRoute = pathname.startsWith("/admin");

  // 如果访问的是 admin 登录页
  if (isAdminLoginPage) {
    // 如果已登录，重定向到 dashboard
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/admin/dashboard", nextUrl));
    }
    // 未登录允许访问登录页
    return NextResponse.next();
  }

  // 如果访问的是其他 admin 页面
  if (isAdminRoute) {
    // 未登录则重定向到登录页
    if (!isAuthenticated) {
      const loginUrl = new URL("/admin/login", nextUrl);
      loginUrl.searchParams.set("callbackUrl", nextUrl.toString());
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // 其他路由正常访问
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/auth/:path*"],
};

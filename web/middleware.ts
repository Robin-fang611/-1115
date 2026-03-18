import { NextResponse } from "next/server";

export async function middleware(req: any) {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  // 检查是否是认证相关的 API 路由
  const isAuthAPI = pathname.startsWith("/api/auth");
  if (isAuthAPI) {
    return NextResponse.next();
  }

  const isAdminLoginPage = pathname === "/admin/login";
  const isAdminRoute = pathname.startsWith("/admin");

  // 如果访问的是 admin 登录页，直接允许访问
  if (isAdminLoginPage) {
    return NextResponse.next();
  }

  // 如果访问的是其他 admin 页面，重定向到登录页
  if (isAdminRoute) {
    const loginUrl = new URL("/admin/login", nextUrl);
    loginUrl.searchParams.set("callbackUrl", nextUrl.toString());
    return NextResponse.redirect(loginUrl);
  }

  // 其他路由正常访问
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/auth/:path*"],
};

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuthPage = req.nextUrl.pathname === "/admin/login";
    const isAuthAPI = req.nextUrl.pathname.startsWith("/api/auth");

    // 允许访问认证 API
    if (isAuthAPI) {
      return NextResponse.next();
    }

    // 如果未登录且访问的不是登录页，重定向到登录页
    if (!token && !isAuthPage) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("callbackUrl", req.url);
      return NextResponse.redirect(loginUrl);
    }

    // 如果已登录且访问的是登录页，重定向到仪表盘
    if (token && isAuthPage) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

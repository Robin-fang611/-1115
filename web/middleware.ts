import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAuthenticated } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  if (pathname === "/admin/login" || pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    const cookie = req.cookies.get('admin_access');
    const cookieValue = cookie ? cookie.value : undefined;
    
    if (!isAuthenticated(cookieValue)) {
      const loginUrl = new URL("/admin/login", nextUrl);
      loginUrl.searchParams.set("callbackUrl", nextUrl.toString());
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};

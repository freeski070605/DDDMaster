import { type NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

import { ADMIN_SESSION_COOKIE } from "@/lib/auth";
import { env } from "@/lib/env";

const adminLoginPath = "/admin/login";

async function hasValidSession(request: NextRequest) {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;

  if (!token || !env.jwtSecret) {
    return false;
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(env.jwtSecret));
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (pathname === adminLoginPath) {
    return NextResponse.next();
  }

  const authenticated = await hasValidSession(request);

  if (authenticated) {
    return NextResponse.next();
  }

  const loginUrl = new URL(adminLoginPath, request.url);
  loginUrl.searchParams.set("redirectTo", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"],
};

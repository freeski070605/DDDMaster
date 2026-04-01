import { type NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

import { ADMIN_SESSION_COOKIE } from "@/lib/auth";
import { env } from "@/lib/env";

const adminLoginPath = "/admin/login";

function withSecurityHeaders(response: NextResponse) {
  if (process.env.NODE_ENV !== "production") {
    return response;
  }

  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload",
  );
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set(
    "Content-Security-Policy",
    "frame-ancestors 'self'; upgrade-insecure-requests",
  );

  return response;
}

function getCanonicalRedirect(request: NextRequest) {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  const forwardedProto = request.headers.get("x-forwarded-proto");
  const currentUrl = request.nextUrl.clone();
  const currentHost = request.headers.get("host")?.split(":")[0];
  const canonicalUrl = new URL(env.siteUrl);
  const siteHostname = canonicalUrl.hostname.replace(/^www\./, "");
  const knownHosts = new Set([siteHostname, `www.${siteHostname}`]);
  let shouldRedirect = false;

  if (forwardedProto && forwardedProto !== "https") {
    currentUrl.protocol = "https:";
    shouldRedirect = true;
  }

  if (currentHost && knownHosts.has(currentHost) && currentHost !== canonicalUrl.hostname) {
    currentUrl.hostname = canonicalUrl.hostname;
    shouldRedirect = true;
  }

  return shouldRedirect ? NextResponse.redirect(currentUrl, 308) : null;
}

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
  const canonicalRedirect = getCanonicalRedirect(request);

  if (canonicalRedirect) {
    return withSecurityHeaders(canonicalRedirect);
  }

  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return withSecurityHeaders(NextResponse.next());
  }

  if (pathname === adminLoginPath) {
    return withSecurityHeaders(NextResponse.next());
  }

  const authenticated = await hasValidSession(request);

  if (authenticated) {
    return withSecurityHeaders(NextResponse.next());
  }

  const loginUrl = new URL(adminLoginPath, request.url);
  loginUrl.searchParams.set("redirectTo", pathname);
  return withSecurityHeaders(NextResponse.redirect(loginUrl));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

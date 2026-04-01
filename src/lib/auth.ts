import bcrypt from "bcryptjs";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { env } from "@/lib/env";

export const ADMIN_SESSION_COOKIE = "ddd_admin_session";
const adminSessionDuration = 60 * 60 * 24 * 7;

function getJwtSecret() {
  if (!env.jwtSecret) {
    throw new Error("JWT_SECRET is not configured.");
  }

  return new TextEncoder().encode(env.jwtSecret);
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}

export async function createAdminSession(payload: { id: string; email: string; role: string }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getJwtSecret());
}

export function getAdminSessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: adminSessionDuration,
  };
}

export async function readAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  try {
    const result = await jwtVerify(token, getJwtSecret());
    return result.payload as { id: string; email: string; role: string };
  } catch {
    return null;
  }
}

export async function requireAdminSession() {
  const session = await readAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}

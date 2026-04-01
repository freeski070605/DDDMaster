import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { ADMIN_SESSION_COOKIE, createAdminSession, verifyPassword } from "@/lib/auth";
import { env, isDatabaseConfigured } from "@/lib/env";
import { connectToDatabase } from "@/lib/mongoose";
import { loginSchema } from "@/lib/validators";
import { UserModel } from "@/models";

export async function POST(request: Request) {
  try {
    const payload = loginSchema.parse(await request.json());

    if (isDatabaseConfigured()) {
      await connectToDatabase();
      const user = await UserModel.findOne({ email: payload.email });

      if (user && (await verifyPassword(payload.password, user.password))) {
        const token = await createAdminSession({
          id: user.id,
          email: user.email,
          role: user.role,
        });

        const cookieStore = await cookies();
        cookieStore.set(ADMIN_SESSION_COOKIE, token, {
          httpOnly: true,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });

        return NextResponse.json({ success: true });
      }
    }

    if (payload.email === env.adminEmail && payload.password === env.adminPassword) {
      const token = await createAdminSession({
        id: "env-admin",
        email: payload.email,
        role: "admin",
      });

      const cookieStore = await cookies();
      cookieStore.set(ADMIN_SESSION_COOKIE, token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, error: "Invalid email or password." },
      { status: 401 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unable to sign in." },
      { status: 400 },
    );
  }
}

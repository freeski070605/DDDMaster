import { NextResponse } from "next/server";

import { readAdminSession } from "@/lib/auth";
import { isDatabaseConfigured } from "@/lib/env";
import { connectToDatabase } from "@/lib/mongoose";
import { availabilitySchema } from "@/lib/validators";
import { ConsultationAvailabilityModel } from "@/models";

export async function POST(request: Request) {
  const session = await readAdminSession();

  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
  }

  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      {
        success: false,
        error: "MongoDB is not configured. Connect a database to persist availability.",
      },
      { status: 400 },
    );
  }

  try {
    await connectToDatabase();
    const payload = availabilitySchema.parse(await request.json());
    const slot = await ConsultationAvailabilityModel.create({
      ...payload,
      start: new Date(payload.start),
      end: new Date(payload.end),
    });
    return NextResponse.json({ success: true, slot });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unable to save slot.",
      },
      { status: 400 },
    );
  }
}

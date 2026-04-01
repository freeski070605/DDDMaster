import { NextResponse } from "next/server";

import { readAdminSession } from "@/lib/auth";
import { isDatabaseConfigured } from "@/lib/env";
import { connectToDatabase } from "@/lib/mongoose";
import { availabilitySchema } from "@/lib/validators";
import { ConsultationAvailabilityModel } from "@/models";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
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
    const { id } = await params;
    const slot = await ConsultationAvailabilityModel.findByIdAndUpdate(
      id,
      {
        ...payload,
        start: new Date(payload.start),
        end: new Date(payload.end),
      },
      { new: true },
    );
    return NextResponse.json({ success: true, slot });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unable to update slot.",
      },
      { status: 400 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
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

  await connectToDatabase();
  const { id } = await params;
  await ConsultationAvailabilityModel.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}

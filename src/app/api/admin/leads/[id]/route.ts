import { NextResponse } from "next/server";

import { readAdminSession } from "@/lib/auth";
import { isDatabaseConfigured } from "@/lib/env";
import { connectToDatabase } from "@/lib/mongoose";
import { leadUpdateSchema } from "@/lib/validators";
import { InquiryModel } from "@/models";

export async function PATCH(
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
        error: "MongoDB is not configured. Connect a database to persist lead updates.",
      },
      { status: 400 },
    );
  }

  try {
    await connectToDatabase();
    const payload = leadUpdateSchema.parse(await request.json());
    const { id } = await params;
    const inquiry = await InquiryModel.findByIdAndUpdate(id, payload, { new: true });
    return NextResponse.json({ success: true, inquiry });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unable to update lead.",
      },
      { status: 400 },
    );
  }
}

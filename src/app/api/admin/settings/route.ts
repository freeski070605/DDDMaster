import { NextResponse } from "next/server";

import { readAdminSession } from "@/lib/auth";
import { fallbackSiteSettings } from "@/data/seed-content";
import { isDatabaseConfigured } from "@/lib/env";
import { connectToDatabase } from "@/lib/mongoose";
import { settingsSchema } from "@/lib/validators";
import { SiteSettingsModel } from "@/models";

export async function PUT(request: Request) {
  const session = await readAdminSession();

  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
  }

  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      {
        success: false,
        error: "MongoDB is not configured. Connect a database to persist admin changes.",
      },
      { status: 400 },
    );
  }

  try {
    await connectToDatabase();
    const payload = settingsSchema.parse(await request.json());

    const settings = await SiteSettingsModel.findOneAndUpdate({}, payload, {
      new: true,
      upsert: true,
    });

    return NextResponse.json({ success: true, settings });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unable to update settings.",
      },
      { status: 400 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ success: true, settings: fallbackSiteSettings });
}

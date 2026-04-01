import { NextResponse } from "next/server";

import { readAdminSession } from "@/lib/auth";
import { adminContentCollections } from "@/lib/admin-content";
import { isDatabaseConfigured } from "@/lib/env";
import { connectToDatabase } from "@/lib/mongoose";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ collection: string }> },
) {
  const session = await readAdminSession();

  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
  }

  const { collection } = await params;
  const config =
    adminContentCollections[collection as keyof typeof adminContentCollections];

  if (!config) {
    return NextResponse.json({ success: false, error: "Unknown collection." }, { status: 404 });
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
    const payload = config.schema.parse(await request.json());
    const model = config.model as {
      create: (value: unknown) => Promise<unknown>;
    };
    const item = await model.create(payload);
    return NextResponse.json({ success: true, item });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unable to save content.",
      },
      { status: 400 },
    );
  }
}

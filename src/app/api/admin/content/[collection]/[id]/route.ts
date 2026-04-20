import { NextResponse } from "next/server";

import { readAdminSession } from "@/lib/auth";
import { adminContentCollections } from "@/lib/admin-content";
import { isDatabaseConfigured } from "@/lib/env";
import { connectToDatabase } from "@/lib/mongoose";
import { revalidateAdminContent, revalidatePublicSite } from "@/lib/revalidate-site";

export async function PUT(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ collection: string; id: string }>;
  },
) {
  const session = await readAdminSession();

  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
  }

  const { collection, id } = await params;
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
      findByIdAndUpdate: (
        targetId: string,
        value: unknown,
        options: { new: boolean },
      ) => Promise<unknown>;
    };
    const item = await model.findByIdAndUpdate(id, payload, { new: true });

    revalidatePublicSite();
    revalidateAdminContent();

    return NextResponse.json({ success: true, item });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unable to update content.",
      },
      { status: 400 },
    );
  }
}

export async function DELETE(
  _request: Request,
  {
    params,
  }: {
    params: Promise<{ collection: string; id: string }>;
  },
) {
  const session = await readAdminSession();

  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
  }

  const { collection, id } = await params;
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

  await connectToDatabase();
  const model = config.model as {
    findByIdAndDelete: (targetId: string) => Promise<unknown>;
  };
  await model.findByIdAndDelete(id);

  revalidatePublicSite();
  revalidateAdminContent();

  return NextResponse.json({ success: true });
}

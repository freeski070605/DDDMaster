import { NextResponse } from "next/server";

import { isUploadConfigured } from "@/lib/env";
import { uploadImage } from "@/lib/uploads";

export async function POST(request: Request) {
  if (!isUploadConfigured()) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Cloudinary is not configured yet. Add Cloudinary env vars to enable uploads.",
      },
      { status: 400 },
    );
  }

  const formData = await request.formData();
  const files = formData.getAll("files").filter((value): value is File => value instanceof File);

  if (!files.length) {
    return NextResponse.json(
      { success: false, error: "Please attach at least one image." },
      { status: 400 },
    );
  }

  const uploaded = await Promise.all(files.map((file) => uploadImage(file)));

  return NextResponse.json({ success: true, urls: uploaded });
}

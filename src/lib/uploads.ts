import { v2 as cloudinary } from "cloudinary";

import { env, isUploadConfigured } from "@/lib/env";

let configured = false;

function ensureCloudinary() {
  if (!isUploadConfigured()) {
    throw new Error("Cloudinary is not configured.");
  }

  if (!configured) {
    cloudinary.config({
      cloud_name: env.cloudinaryCloudName,
      api_key: env.cloudinaryApiKey,
      api_secret: env.cloudinaryApiSecret,
    });
    configured = true;
  }
}

export async function uploadImage(file: File) {
  ensureCloudinary();

  const arrayBuffer = await file.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");
  const dataUri = `data:${file.type};base64,${base64}`;

  const result = await cloudinary.uploader.upload(dataUri, {
    folder: "divine-design-and-decor",
    resource_type: "image",
  });

  return result.secure_url;
}

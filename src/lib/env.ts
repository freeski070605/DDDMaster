const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

export const env = {
  siteUrl,
  mongodbUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  adminEmail: process.env.ADMIN_EMAIL ?? "owner@divinedesigndecor.com",
  adminPassword: process.env.ADMIN_PASSWORD,
  resendApiKey: process.env.RESEND_API_KEY,
  resendFrom:
    process.env.RESEND_FROM ?? "Divine Design and Decor <hello@divinedesigndecor.com>",
  adminNotificationEmail:
    process.env.ADMIN_NOTIFICATION_EMAIL ?? process.env.ADMIN_EMAIL ?? "owner@divinedesigndecor.com",
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
  instagramUrl:
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ??
    "https://www.instagram.com/divinedesigndecor",
};

export function isDatabaseConfigured() {
  return Boolean(env.mongodbUri);
}

export function isEmailConfigured() {
  return Boolean(env.resendApiKey);
}

export function isUploadConfigured() {
  return Boolean(
    env.cloudinaryCloudName && env.cloudinaryApiKey && env.cloudinaryApiSecret,
  );
}

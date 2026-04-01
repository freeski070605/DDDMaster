const LOCAL_SITE_URL = "http://localhost:3000";
const PRODUCTION_SITE_URL = "https://www.divinedecor.design";

function normalizeSiteUrl(siteUrl?: string) {
  const isProduction = process.env.NODE_ENV === "production";
  const fallbackSiteUrl = isProduction ? PRODUCTION_SITE_URL : LOCAL_SITE_URL;
  const rawValue = siteUrl?.trim() || fallbackSiteUrl;
  const normalizedValue = /^[a-z]+:\/\//i.test(rawValue) ? rawValue : `https://${rawValue}`;
  const url = new URL(normalizedValue);
  const isLocalhost = ["localhost", "127.0.0.1"].includes(url.hostname);

  if (isProduction && isLocalhost) {
    return PRODUCTION_SITE_URL;
  }

  if (!isLocalhost && url.protocol !== "https:") {
    url.protocol = "https:";
  }

  return url.toString().replace(/\/$/, "");
}

const siteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

export const env = {
  siteUrl,
  siteHost: new URL(siteUrl).host,
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

export function getAbsoluteUrl(path = "/") {
  return new URL(path, env.siteUrl).toString();
}

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

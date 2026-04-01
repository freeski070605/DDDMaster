import { hashPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongoose";
import {
  ConsultationAvailabilityModel,
  FAQModel,
  GalleryItemModel,
  PackageModel,
  ServiceModel,
  SiteSettingsModel,
  TestimonialModel,
  UserModel,
} from "@/models";
import {
  fallbackFaqs,
  fallbackGalleryItems,
  fallbackPackages,
  fallbackServices,
  fallbackSiteSettings,
  fallbackTestimonials,
} from "@/data/seed-content";

async function seed() {
  await connectToDatabase();

  await Promise.all([
    FAQModel.deleteMany({}),
    GalleryItemModel.deleteMany({}),
    PackageModel.deleteMany({}),
    ServiceModel.deleteMany({}),
    SiteSettingsModel.deleteMany({}),
    TestimonialModel.deleteMany({}),
    ConsultationAvailabilityModel.deleteMany({}),
  ]);

  await Promise.all([
    FAQModel.insertMany(fallbackFaqs),
    GalleryItemModel.insertMany(fallbackGalleryItems),
    PackageModel.insertMany(fallbackPackages),
    ServiceModel.insertMany(fallbackServices),
    TestimonialModel.insertMany(fallbackTestimonials),
    SiteSettingsModel.create(fallbackSiteSettings),
  ]);

  const adminEmail = process.env.ADMIN_EMAIL ?? "owner@divinedesigndecor.com";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";

  const existingUser = await UserModel.findOne({ email: adminEmail });

  if (!existingUser) {
    await UserModel.create({
      name: "Divine Design Admin",
      email: adminEmail,
      password: await hashPassword(adminPassword),
      role: "admin",
    });
  }

  console.log("Seed complete.");
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

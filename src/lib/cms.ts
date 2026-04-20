import { unstable_noStore as noStore } from "next/cache";
import { addDays, format, setHours, setMinutes } from "date-fns";

import {
  fallbackFaqs,
  fallbackGalleryItems,
  fallbackPackages,
  fallbackServices,
  fallbackSiteSettings,
  fallbackTestimonials,
  serviceAreas,
} from "@/data/seed-content";
import { isDatabaseConfigured } from "@/lib/env";
import { connectToDatabase } from "@/lib/mongoose";
import {
  ConsultationAvailabilityModel,
  FAQModel,
  GalleryItemModel,
  InquiryModel,
  PackageModel,
  ServiceModel,
  SiteSettingsModel,
  TestimonialModel,
} from "@/models";

export type AdminCollectionName =
  | "gallery"
  | "testimonials"
  | "packages"
  | "faqs"
  | "services";

function serialize<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

function getFallbackAvailability() {
  const base = new Date();

  return [2, 4, 7, 9, 11].map((offset, index) => {
    const day = addDays(base, offset);
    const start = setMinutes(setHours(day, index % 2 === 0 ? 11 : 16), 0);
    const end = setMinutes(setHours(day, index % 2 === 0 ? 11 : 16), 30);

    return {
      _id: `fallback-slot-${index + 1}`,
      label: format(start, "EEEE, MMMM d 'at' h:mm a"),
      start: start.toISOString(),
      end: end.toISOString(),
      notes: "Virtual or phone consultation",
      isBooked: false,
      bookingName: "",
    };
  });
}

export async function getSiteSettings() {
  noStore();

  if (!isDatabaseConfigured()) {
    return fallbackSiteSettings;
  }

  await connectToDatabase();
  const settings = await SiteSettingsModel.findOne().lean();
  const serializedSettings = serialize(settings ?? {});
  return {
    ...fallbackSiteSettings,
    ...serializedSettings,
  };
}

export async function getServices() {
  noStore();

  if (!isDatabaseConfigured()) {
    return [...fallbackServices];
  }

  await connectToDatabase();
  const services = await ServiceModel.find().sort({ startingPrice: 1 }).lean();
  return serialize(services.length ? services : fallbackServices);
}

export async function getServiceBySlug(slug: string) {
  noStore();

  if (!isDatabaseConfigured()) {
    return fallbackServices.find((service) => service.slug === slug) ?? null;
  }

  await connectToDatabase();
  const service = await ServiceModel.findOne({ slug }).lean();
  return serialize(
    service ?? fallbackServices.find((fallback) => fallback.slug === slug) ?? null,
  );
}

export async function getPackages() {
  noStore();

  if (!isDatabaseConfigured()) {
    return [...fallbackPackages];
  }

  await connectToDatabase();
  const packages = await PackageModel.find().sort({ startingPrice: 1 }).lean();
  return serialize(
    packages.length
      ? packages.map((item) => ({
          ...fallbackPackages.find((fallback) => fallback.slug === item.slug),
          ...item,
        }))
      : fallbackPackages,
  );
}

export async function getTestimonials() {
  noStore();

  if (!isDatabaseConfigured()) {
    return [...fallbackTestimonials];
  }

  await connectToDatabase();
  const testimonials = await TestimonialModel.find().sort({ createdAt: -1 }).lean();
  return serialize(testimonials);
}

export async function getFaqs() {
  noStore();

  if (!isDatabaseConfigured()) {
    return [...fallbackFaqs];
  }

  await connectToDatabase();
  const faqs = await FAQModel.find().sort({ createdAt: -1 }).lean();
  return serialize(faqs.length ? faqs : fallbackFaqs);
}

export async function getGalleryItems() {
  noStore();

  if (!isDatabaseConfigured()) {
    return [...fallbackGalleryItems];
  }

  await connectToDatabase();
  const galleryItems = await GalleryItemModel.find().sort({ createdAt: -1 }).lean();
  return serialize(galleryItems.length ? galleryItems : fallbackGalleryItems);
}

export async function getGalleryItemBySlug(slug: string) {
  noStore();

  if (!isDatabaseConfigured()) {
    return fallbackGalleryItems.find((item) => item.slug === slug) ?? null;
  }

  await connectToDatabase();
  const item = await GalleryItemModel.findOne({ slug }).lean();
  return serialize(
    item ?? fallbackGalleryItems.find((fallback) => fallback.slug === slug) ?? null,
  );
}

export async function getAvailableConsultationSlots() {
  noStore();

  if (!isDatabaseConfigured()) {
    return getFallbackAvailability();
  }

  await connectToDatabase();
  const slots = await ConsultationAvailabilityModel.find({
    start: { $gte: new Date() },
    isBooked: false,
  })
    .sort({ start: 1 })
    .lean();

  return serialize(slots.length ? slots : getFallbackAvailability());
}

export async function getAllConsultationSlots() {
  noStore();

  if (!isDatabaseConfigured()) {
    return getFallbackAvailability();
  }

  await connectToDatabase();
  const slots = await ConsultationAvailabilityModel.find().sort({ start: 1 }).lean();
  return serialize(slots.length ? slots : getFallbackAvailability());
}

export async function getInquiries() {
  noStore();

  if (!isDatabaseConfigured()) {
    return [];
  }

  await connectToDatabase();
  const inquiries = await InquiryModel.find()
    .sort({ createdAt: -1 })
    .populate("consultationSlotId")
    .lean();

  return serialize(inquiries);
}

export async function getInquiryById(id: string) {
  noStore();

  if (!isDatabaseConfigured()) {
    return null;
  }

  await connectToDatabase();
  const inquiry = await InquiryModel.findById(id).populate("consultationSlotId").lean();
  return serialize(inquiry);
}

export async function getDashboardAnalytics() {
  noStore();

  if (!isDatabaseConfigured()) {
    return {
      totalInquiries: 0,
      bookedInquiries: 0,
      conversionRate: 0,
      byEventType: [],
      monthlyInquiries: [],
    };
  }

  await connectToDatabase();

  const [totalInquiries, bookedInquiries, byEventType, rawMonthly] = await Promise.all([
    InquiryModel.countDocuments(),
    InquiryModel.countDocuments({ status: "booked" }),
    InquiryModel.aggregate([
      { $group: { _id: "$eventType", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]),
    InquiryModel.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]),
  ]);

  return {
    totalInquiries,
    bookedInquiries,
    conversionRate:
      totalInquiries === 0 ? 0 : Math.round((bookedInquiries / totalInquiries) * 100),
    byEventType: serialize(byEventType).map((item: { _id: string; count: number }) => ({
      label: item._id,
      value: item.count,
    })),
    monthlyInquiries: serialize(rawMonthly).map(
      (item: { _id: { year: number; month: number }; count: number }) => ({
        label: `${item._id.month}/${item._id.year}`,
        value: item.count,
      }),
    ),
  };
}

export async function getAdminCollectionItems(collection: AdminCollectionName) {
  noStore();

  if (!isDatabaseConfigured()) {
    switch (collection) {
      case "gallery":
        return [...fallbackGalleryItems];
      case "testimonials":
        return [...fallbackTestimonials];
      case "packages":
        return [...fallbackPackages];
      case "faqs":
        return [...fallbackFaqs];
      case "services":
        return [...fallbackServices];
    }
  }

  await connectToDatabase();

  switch (collection) {
    case "gallery":
      return serialize(await GalleryItemModel.find().sort({ createdAt: -1 }).lean());
    case "testimonials":
      return serialize(await TestimonialModel.find().sort({ createdAt: -1 }).lean());
    case "packages":
      return serialize(
        (await PackageModel.find().sort({ startingPrice: 1 }).lean()).map((item) => ({
          ...fallbackPackages.find((fallback) => fallback.slug === item.slug),
          ...item,
        })),
      );
    case "faqs":
      return serialize(await FAQModel.find().sort({ createdAt: -1 }).lean());
    case "services":
      return serialize(await ServiceModel.find().sort({ title: 1 }).lean());
  }
}

export function getServiceAreaBySlug(slug: string) {
  return serviceAreas.find((area) => area.slug === slug) ?? null;
}

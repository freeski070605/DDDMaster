import { z } from "zod";

import { budgetRanges, eventTypes } from "@/data/seed-content";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export const inquirySchema = z.object({
  fullName: z.string().min(2, "Please enter your full name."),
  email: z.email(),
  phone: z.string().min(10, "Please include a valid phone number."),
  eventType: z.enum(eventTypes),
  eventDate: z.string().min(1, "Please select your event date."),
  venue: z.string().min(2, "Please add a venue or location."),
  budgetRange: z.enum(budgetRanges),
  guestCount: z.coerce.number().int().min(1).max(5000),
  inspirationNotes: z.string().min(20, "Share a bit more about your vision."),
  servicesNeeded: z.array(z.string()).min(1, "Select at least one service."),
  inspirationImages: z.array(z.string().url()).max(5).default([]),
  consultationSlotId: z.string().optional().or(z.literal("")),
  website: z.string().max(0).optional().default(""),
});

export const galleryItemSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  category: z.enum(eventTypes),
  venue: z.string().min(2),
  description: z.string().min(20),
  image: z.string().url(),
  beforeImage: z.string().url().optional().or(z.literal("")),
  afterImage: z.string().url().optional().or(z.literal("")),
  featured: z.boolean().default(false),
});

export const testimonialSchema = z.object({
  name: z.string().min(2),
  role: z.string().min(2),
  rating: z.number().min(1).max(5),
  quote: z.string().min(20),
  image: z.string().url(),
  featured: z.boolean().default(false),
});

export const packageSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  startingPrice: z.coerce.number().min(0),
  description: z.string().min(20),
  image: z.string().url(),
  highlights: z.array(z.string().min(2)).min(1),
  addOns: z.array(z.string().min(2)).min(1),
  bestFor: z.string().min(10),
  featured: z.boolean().default(false),
});

export const faqSchema = z.object({
  question: z.string().min(10),
  answer: z.string().min(20),
  featured: z.boolean().default(false),
});

export const serviceSchema = z.object({
  slug: z.string().min(2),
  title: z.string().min(2),
  category: z.enum(eventTypes),
  description: z.string().min(20),
  shortDescription: z.string().min(20),
  startingPrice: z.coerce.number().min(0),
  idealFor: z.string().min(20),
  includes: z.array(z.string().min(2)).min(1),
  image: z.string().url(),
  featured: z.boolean().default(false),
});

export const availabilitySchema = z.object({
  label: z.string().min(2),
  start: z.string().min(1),
  end: z.string().min(1),
  notes: z.string().optional().default(""),
  isBooked: z.boolean().default(false),
});

export const settingsSchema = z.object({
  phone: z.string().min(10),
  email: z.email(),
  instagramHandle: z.string().min(2),
  instagramUrl: z.string().url(),
  heroBadge: z.string().min(4),
  heroTitle: z.string().min(10),
  heroSubtitle: z.string().min(20),
  heroPrimaryCta: z.string().min(2),
  heroSecondaryCta: z.string().min(2),
  heroImage: z.string().url(),
  heroImageAlt: z.string().min(8),
  story: z.string().min(20),
  mission: z.string().min(20),
  serviceAreas: z.array(z.string().min(2)).min(1),
  statistics: z.array(
    z.object({
      value: z.string().min(1),
      label: z.string().min(1),
    }),
  ),
  featuredCategoryLabels: z.array(z.string().min(2)).min(1),
  galleryHeadline: z.string().min(10),
  galleryCopy: z.string().min(20),
  showcaseEyebrow: z.string().min(2),
  showcaseTitle: z.string().min(10),
  showcaseCopy: z.string().min(20),
  showcasePrimaryImage: z.string().url(),
  showcasePrimaryImageAlt: z.string().min(8),
  showcaseSecondaryImage: z.string().url(),
  showcaseSecondaryImageAlt: z.string().min(8),
  servicesHeadline: z.string().min(10),
  servicesCopy: z.string().min(20),
  instagramSectionEyebrow: z.string().min(2),
  instagramSectionTitle: z.string().min(10),
  instagramSectionCopy: z.string().min(20),
  instagramImages: z.array(z.string().url()).max(8),
  testimonialsHeadline: z.string().min(10),
  testimonialsCopy: z.string().min(20),
  testimonialsSupportEyebrow: z.string().min(2),
  testimonialsSupportTitle: z.string().min(10),
  testimonialsSupportCopy: z.string().min(20),
  bookingSteps: z.array(
    z.object({
      title: z.string().min(2),
      description: z.string().min(10),
    }),
  ),
  processHeadline: z.string().min(10),
  processCopy: z.string().min(20),
  socialProofHeadline: z.string().min(10),
  socialProofCopy: z.string().min(20),
  serviceAreasHeadline: z.string().min(10),
  serviceAreasCopy: z.string().min(20),
  faqHeadline: z.string().min(10),
  faqCopy: z.string().min(20),
  investmentHeadline: z.string().min(10),
  investmentCopy: z.string().min(20),
  ctaBannerTitle: z.string().min(10),
  ctaBannerCopy: z.string().min(20),
  consultationDurationMinutes: z.coerce.number().int().min(15).max(120),
});

export const leadUpdateSchema = z.object({
  status: z.enum(["new", "contacted", "booked", "closed"]),
  adminNotes: z.string().default(""),
});

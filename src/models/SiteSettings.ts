import { model, models, Schema, type InferSchemaType, type Model } from "mongoose";

const statSchema = new Schema(
  {
    value: { type: String, required: true },
    label: { type: String, required: true },
  },
  { _id: false },
);

const bookingStepSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false },
);

const siteSettingsSchema = new Schema(
  {
    phone: { type: String, required: true },
    email: { type: String, required: true },
    instagramHandle: { type: String, required: true },
    heroBadge: { type: String, required: true },
    heroTitle: { type: String, required: true },
    heroSubtitle: { type: String, required: true },
    heroPrimaryCta: { type: String, required: true },
    heroSecondaryCta: { type: String, required: true },
    heroImage: { type: String, required: true },
    heroImageAlt: { type: String, required: true },
    story: { type: String, required: true },
    mission: { type: String, required: true },
    serviceAreas: [{ type: String, required: true }],
    statistics: [statSchema],
    featuredCategoryLabels: [{ type: String, required: true }],
    galleryHeadline: { type: String, required: true },
    galleryCopy: { type: String, required: true },
    showcaseEyebrow: { type: String, required: true },
    showcaseTitle: { type: String, required: true },
    showcaseCopy: { type: String, required: true },
    showcasePrimaryImage: { type: String, required: true },
    showcasePrimaryImageAlt: { type: String, required: true },
    showcaseSecondaryImage: { type: String, required: true },
    showcaseSecondaryImageAlt: { type: String, required: true },
    servicesHeadline: { type: String, required: true },
    servicesCopy: { type: String, required: true },
    testimonialsHeadline: { type: String, required: true },
    testimonialsCopy: { type: String, required: true },
    bookingSteps: [bookingStepSchema],
    processHeadline: { type: String, required: true },
    processCopy: { type: String, required: true },
    socialProofHeadline: { type: String, required: true },
    socialProofCopy: { type: String, required: true },
    serviceAreasHeadline: { type: String, required: true },
    serviceAreasCopy: { type: String, required: true },
    faqHeadline: { type: String, required: true },
    faqCopy: { type: String, required: true },
    investmentHeadline: { type: String, required: true },
    investmentCopy: { type: String, required: true },
    ctaBannerTitle: { type: String, required: true },
    ctaBannerCopy: { type: String, required: true },
    consultationDurationMinutes: { type: Number, required: true },
  },
  { timestamps: true },
);

export type SiteSettingsDocument = InferSchemaType<typeof siteSettingsSchema>;

export const SiteSettingsModel =
  (models.SiteSettings as Model<SiteSettingsDocument>) ||
  model<SiteSettingsDocument>("SiteSettings", siteSettingsSchema);

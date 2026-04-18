export type EventType =
  | "Wedding"
  | "Birthday"
  | "Baby Shower"
  | "Bridal Shower"
  | "Graduation"
  | "Corporate Event"
  | "Custom Styling";

export type InquiryStatus = "new" | "contacted" | "booked" | "closed";

export type GalleryCategory = EventType;

export type ServiceArea = {
  slug: string;
  name: string;
  headline: string;
  description: string;
  neighborhoods: string[];
  venueTypes: string[];
};

export type HomeStatistic = {
  value: string;
  label: string;
};

export type BookingStep = {
  title: string;
  description: string;
};

export type SiteSettings = {
  phone: string;
  email: string;
  instagramHandle: string;
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  heroImage: string;
  heroImageAlt: string;
  story: string;
  mission: string;
  serviceAreas: string[];
  statistics: HomeStatistic[];
  featuredCategoryLabels: string[];
  galleryHeadline: string;
  galleryCopy: string;
  showcaseEyebrow: string;
  showcaseTitle: string;
  showcaseCopy: string;
  showcasePrimaryImage: string;
  showcasePrimaryImageAlt: string;
  showcaseSecondaryImage: string;
  showcaseSecondaryImageAlt: string;
  servicesHeadline: string;
  servicesCopy: string;
  testimonialsHeadline: string;
  testimonialsCopy: string;
  bookingSteps: BookingStep[];
  processHeadline: string;
  processCopy: string;
  socialProofHeadline: string;
  socialProofCopy: string;
  serviceAreasHeadline: string;
  serviceAreasCopy: string;
  faqHeadline: string;
  faqCopy: string;
  investmentHeadline: string;
  investmentCopy: string;
  ctaBannerTitle: string;
  ctaBannerCopy: string;
  consultationDurationMinutes: number;
};

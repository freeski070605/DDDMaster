import {
  faqSchema,
  galleryItemSchema,
  packageSchema,
  serviceSchema,
  testimonialSchema,
} from "@/lib/validators";
import {
  FAQModel,
  GalleryItemModel,
  PackageModel,
  ServiceModel,
  TestimonialModel,
} from "@/models";

export const adminContentCollections = {
  gallery: {
    model: GalleryItemModel,
    schema: galleryItemSchema,
  },
  testimonials: {
    model: TestimonialModel,
    schema: testimonialSchema,
  },
  packages: {
    model: PackageModel,
    schema: packageSchema,
  },
  faqs: {
    model: FAQModel,
    schema: faqSchema,
  },
  services: {
    model: ServiceModel,
    schema: serviceSchema,
  },
} as const;

import assert from "node:assert/strict";
import test from "node:test";

import { fallbackSiteSettings } from "@/data/seed-content";

import {
  galleryItemSchema,
  packageSchema,
  serviceSchema,
  settingsSchema,
  testimonialSchema,
} from "./validators";

test("gallery items accept site-relative image paths", () => {
  const result = galleryItemSchema.parse({
    title: "Ballroom reveal",
    slug: "ballroom-reveal",
    category: "Wedding",
    venue: "Downtown ballroom",
    description: "A polished ballroom setup with candles, florals, and layered neutral decor.",
    image: "/uploads/gallery/ballroom.jpg",
    beforeImage: "/uploads/gallery/ballroom-before.jpg",
    afterImage: "",
    featured: true,
  });

  assert.equal(result.image, "/uploads/gallery/ballroom.jpg");
});

test("testimonials, packages, and services accept site-relative image paths", () => {
  const testimonial = testimonialSchema.parse({
    name: "Jordan P.",
    role: "Birthday client",
    rating: 5,
    quote: "The setup felt thoughtful, polished, and far beyond what we imagined for the event.",
    image: "/uploads/testimonials/jordan.jpg",
    featured: false,
  });

  const packageItem = packageSchema.parse({
    name: "Luxe Celebration",
    slug: "luxe-celebration",
    startingPrice: 3200,
    description: "A layered package with multiple decor moments and a stronger guest-facing impact.",
    image: "/uploads/packages/luxe.jpg",
    highlights: ["Welcome display", "Backdrop styling"],
    addOns: ["Custom signage"],
    bestFor: "Large showers and elevated milestone events",
    featured: true,
  });

  const service = serviceSchema.parse({
    slug: "weddings",
    title: "Weddings",
    category: "Wedding",
    description: "Full-service styling for ceremonies and receptions with an editorial visual point of view.",
    shortDescription: "Editorial wedding styling with layered details and refined focal points.",
    startingPrice: 3500,
    idealFor: "Couples who want a polished design direction and a calm planning experience.",
    includes: ["Design consultation", "Setup and breakdown"],
    image: "/uploads/services/weddings.jpg",
    featured: true,
  });

  assert.equal(testimonial.image, "/uploads/testimonials/jordan.jpg");
  assert.equal(packageItem.image, "/uploads/packages/luxe.jpg");
  assert.equal(service.image, "/uploads/services/weddings.jpg");
});

test("homepage settings accept site-relative image paths across editable sections", () => {
  const result = settingsSchema.parse({
    ...fallbackSiteSettings,
    heroImage: "/uploads/settings/hero.jpg",
    showcasePrimaryImage: "/uploads/settings/showcase-one.jpg",
    showcaseSecondaryImage: "/uploads/settings/showcase-two.jpg",
    instagramImages: ["/uploads/settings/instagram-one.jpg", "/uploads/settings/instagram-two.jpg"],
    ctaBannerImage: "/uploads/settings/final-banner.jpg",
  });

  assert.equal(result.heroImage, "/uploads/settings/hero.jpg");
  assert.equal(result.showcasePrimaryImage, "/uploads/settings/showcase-one.jpg");
  assert.equal(result.showcaseSecondaryImage, "/uploads/settings/showcase-two.jpg");
  assert.deepEqual(result.instagramImages, [
    "/uploads/settings/instagram-one.jpg",
    "/uploads/settings/instagram-two.jpg",
  ]);
  assert.equal(result.ctaBannerImage, "/uploads/settings/final-banner.jpg");
});

test("invalid image references still fail validation", () => {
  assert.throws(
    () =>
      galleryItemSchema.parse({
        title: "Broken item",
        slug: "broken-item",
        category: "Wedding",
        venue: "Venue",
        description: "This should fail because the image reference is not a URL or site path.",
        image: "not-a-valid-image-reference",
        beforeImage: "",
        afterImage: "",
        featured: false,
      }),
    /Use a full image URL or a site image path that starts with \/\./,
  );
});

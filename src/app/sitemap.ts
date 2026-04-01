import type { MetadataRoute } from "next";

import { fallbackServices, serviceAreas } from "@/data/seed-content";
import { getAbsoluteUrl } from "@/lib/env";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/services",
    "/gallery",
    "/packages",
    "/testimonials",
    "/inquire",
    "/faq",
    "/service-areas",
    "/admin/login",
  ].map((path) => ({
    url: getAbsoluteUrl(path),
    lastModified: new Date(),
  }));

  const serviceRoutes = fallbackServices.map((service) => ({
    url: getAbsoluteUrl(`/services/${service.slug}`),
    lastModified: new Date(),
  }));

  const areaRoutes = serviceAreas.map((area) => ({
    url: getAbsoluteUrl(`/service-areas/${area.slug}`),
    lastModified: new Date(),
  }));

  return [...routes, ...serviceRoutes, ...areaRoutes];
}

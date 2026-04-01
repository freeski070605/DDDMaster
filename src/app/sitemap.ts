import type { MetadataRoute } from "next";

import { fallbackServices, serviceAreas } from "@/data/seed-content";
import { env } from "@/lib/env";

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
    url: `${env.siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const serviceRoutes = fallbackServices.map((service) => ({
    url: `${env.siteUrl}/services/${service.slug}`,
    lastModified: new Date(),
  }));

  const areaRoutes = serviceAreas.map((area) => ({
    url: `${env.siteUrl}/service-areas/${area.slug}`,
    lastModified: new Date(),
  }));

  return [...routes, ...serviceRoutes, ...areaRoutes];
}

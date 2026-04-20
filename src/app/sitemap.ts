import type { MetadataRoute } from "next";

import { serviceAreas } from "@/data/seed-content";
import { getAbsoluteUrl } from "@/lib/env";
import { getServices } from "@/lib/cms";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  const services = await getServices();

  const serviceRoutes = services.map((service) => ({
    url: getAbsoluteUrl(`/services/${service.slug}`),
    lastModified: new Date(),
  }));

  const areaRoutes = serviceAreas.map((area) => ({
    url: getAbsoluteUrl(`/service-areas/${area.slug}`),
    lastModified: new Date(),
  }));

  return [...routes, ...serviceRoutes, ...areaRoutes];
}

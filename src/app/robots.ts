import type { MetadataRoute } from "next";

import { getAbsoluteUrl } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/admin/"],
      },
    ],
    sitemap: getAbsoluteUrl("/sitemap.xml"),
  };
}

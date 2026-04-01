import type { Metadata } from "next";

import { brandName } from "@/data/seed-content";
import { env } from "@/lib/env";

export function createPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${title} | ${brandName}`,
      description,
      url: `${env.siteUrl}${path}`,
      siteName: brandName,
      images: ["/images/events/IMG_0822-2.jpg"],
    },
  };
}

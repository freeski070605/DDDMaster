import type { Metadata } from "next";

import { brandName } from "@/data/seed-content";
import { getAbsoluteUrl } from "@/lib/env";

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
      canonical: getAbsoluteUrl(path),
    },
    openGraph: {
      title: `${title} | ${brandName}`,
      description,
      url: getAbsoluteUrl(path),
      siteName: brandName,
      images: [getAbsoluteUrl("/images/events/IMG_0822-2.jpg")],
    },
    twitter: {
      card: "summary_large_image",
      images: [getAbsoluteUrl("/images/events/IMG_0822-2.jpg")],
    },
  };
}

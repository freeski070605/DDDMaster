import { GalleryGrid } from "@/components/site/gallery-grid";
import { SectionHeading } from "@/components/site/section-heading";
import { getGalleryItems } from "@/lib/cms";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Gallery",
  description:
    "Browse a luxury event decor portfolio featuring weddings, birthdays, baby showers, bridal showers, graduations, and corporate events.",
  path: "/gallery",
});

export default async function GalleryPage() {
  const items = await getGalleryItems();

  return (
    <div className="section">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Portfolio"
          title="A portfolio built around atmosphere, transformation, and detail."
          description="Every installation is designed to feel cohesive in person and elevated on camera, from welcome moments to full-room styling."
          align="center"
        />
        <div className="mt-12">
          <GalleryGrid items={items} />
        </div>
      </div>
    </div>
  );
}

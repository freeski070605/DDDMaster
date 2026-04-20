import { GalleryGrid } from "@/components/site/gallery-grid";
import { SectionHeading } from "@/components/site/section-heading";
import { Card, CardContent } from "@/components/ui/card";
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
          {items.length ? (
            <GalleryGrid items={items} />
          ) : (
            <Card>
              <CardContent>
                <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
                  Gallery coming soon
                </p>
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-3xl text-[color:var(--foreground)]">
                  Gallery images will appear here once they are added in admin.
                </h3>
                <p className="mt-4 text-sm leading-7 text-[color:var(--muted-foreground)]">
                  Only real gallery items are shown now, so the admin dashboard and the live
                  gallery stay in sync.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

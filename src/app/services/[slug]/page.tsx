import { notFound } from "next/navigation";

import { CtaBanner } from "@/components/site/cta-banner";
import { GalleryGrid } from "@/components/site/gallery-grid";
import { SectionHeading } from "@/components/site/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { getGalleryItems, getServiceBySlug } from "@/lib/cms";
import { createPageMetadata } from "@/lib/seo";
import { formatCurrency } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return {};
  }

  return createPageMetadata({
    title: service.title,
    description: service.shortDescription,
    path: `/services/${slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  const gallery = await getGalleryItems();

  if (!service) {
    notFound();
  }

  const relatedGallery = gallery.filter((item) => item.category === service.category);

  return (
    <div className="section">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={service.category}
          title={service.title}
          description={service.description}
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Card>
            <CardContent>
              <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
                Starting investment
              </p>
              <p className="mt-4 text-4xl font-semibold text-[color:var(--foreground)]">
                {formatCurrency(service.startingPrice)}
              </p>
              <p className="mt-6 text-sm leading-7 text-[color:var(--muted-foreground)]">
                Ideal for: {service.idealFor}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
                What&apos;s included
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--muted-foreground)]">
                {service.includes.map((item: string) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        <div className="mt-12">
          <SectionHeading
            eyebrow="Photo examples"
            title="A closer look at this category in action."
            description="Browse a few examples of how we interpret this service for different spaces, guest counts, and event goals."
          />
          <div className="mt-8">
            <GalleryGrid items={relatedGallery.length ? relatedGallery : gallery.slice(0, 3)} />
          </div>
        </div>
        <div className="mt-12">
          <CtaBanner
            title={`Let's design your ${service.title.toLowerCase()} with intention.`}
            copy="Share your date, venue, and inspiration so we can recommend the right decor direction and build a proposal around your priorities."
          />
        </div>
      </div>
    </div>
  );
}

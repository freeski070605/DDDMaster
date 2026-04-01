import Link from "next/link";
import { notFound } from "next/navigation";

import { CtaBanner } from "@/components/site/cta-banner";
import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { serviceAreas } from "@/data/seed-content";
import { getServiceAreaBySlug } from "@/lib/cms";
import { createPageMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  return serviceAreas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = getServiceAreaBySlug(slug);

  if (!area) {
    return {};
  }

  return createPageMetadata({
    title: `${area.name} Event Decor`,
    description: area.description,
    path: `/service-areas/${area.slug}`,
  });
}

export default async function ServiceAreaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = getServiceAreaBySlug(slug);

  if (!area) {
    notFound();
  }

  return (
    <div className="section">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={area.name}
          title={area.headline}
          description={area.description}
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardContent>
              <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
                Neighborhoods we often serve
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--muted-foreground)]">
                {area.neighborhoods.map((neighborhood) => (
                  <li key={neighborhood}>• {neighborhood}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
                Event types and venues
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--muted-foreground)]">
                {area.venueTypes.map((venueType) => (
                  <li key={venueType}>• {venueType}</li>
                ))}
              </ul>
              <Button asChild className="mt-8">
                <Link href="/inquire">Inquire for {area.name}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="mt-12">
          <CtaBanner
            title={`Planning an event in ${area.name}?`}
            copy="Share your date, venue, and design direction and we will help shape a decor plan that fits the space beautifully."
          />
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";

import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { serviceAreas } from "@/data/seed-content";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Service Areas",
  description:
    "Explore event decor service areas across Philadelphia, Delaware County, South Jersey, Chester, Upper Darby, Camden, and nearby communities.",
  path: "/service-areas",
});

export default function ServiceAreasPage() {
  return (
    <div className="section">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Local service"
          title="Serving the Philadelphia region with design-led event decor and dependable execution."
          description="We style celebrations across the city and surrounding communities without making the experience feel generic or stretched thin."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {serviceAreas.map((area) => (
            <Card key={area.slug}>
              <CardContent>
                <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
                  {area.name}
                </p>
                <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[color:var(--foreground)]">
                  {area.headline}
                </h2>
                <p className="mt-4 text-sm leading-7 text-[color:var(--muted-foreground)]">
                  {area.description}
                </p>
                <Button asChild variant="secondary" className="mt-8">
                  <Link href={`/service-areas/${area.slug}`}>Explore area page</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

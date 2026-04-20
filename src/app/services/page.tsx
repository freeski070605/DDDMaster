import Link from "next/link";

import { SectionHeading } from "@/components/site/section-heading";
import { ServiceCard } from "@/components/site/service-card";
import { Button } from "@/components/ui/button";
import { getServices } from "@/lib/cms";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Services",
  description:
    "Explore wedding decor, birthday styling, baby shower decor, bridal shower styling, graduation setups, corporate event decor, and custom luxury event design.",
  path: "/services",
});

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="section">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Services"
          title="Styling support for the moments people talk about long after the event ends."
          description="Each service is designed to feel editorial, personal, and clear in scope so clients can understand the investment and the experience from the start."
          align="center"
        />
        {services.length ? (
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {services.map((service) => (
              <ServiceCard key={service.slug} {...service} />
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-[2rem] border border-white/60 bg-white/80 p-8 text-center shadow-[0_24px_80px_rgba(95,73,123,0.12)]">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
              Services coming soon
            </p>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl text-[color:var(--foreground)]">
              New service offerings will appear here soon.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[color:var(--muted-foreground)]">
              We are preparing updated service details and images for this section.
            </p>
          </div>
        )}
        <div className="mt-12 rounded-[2rem] border border-white/60 bg-white/75 p-8 text-center shadow-[0_24px_80px_rgba(95,73,123,0.12)]">
          <h2 className="font-[family-name:var(--font-display)] text-4xl text-[color:var(--foreground)]">
            Need something more tailored?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[color:var(--muted-foreground)]">
            We can build a custom design scope for your venue, guest count, and visual
            priorities so the proposal feels aligned from day one.
          </p>
          <Button asChild className="mt-8">
            <Link href="/inquire">Request a custom consultation</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

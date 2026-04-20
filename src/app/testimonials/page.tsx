import { SectionHeading } from "@/components/site/section-heading";
import { TestimonialCard } from "@/components/site/testimonial-card";
import { Card, CardContent } from "@/components/ui/card";
import { getSiteSettings, getTestimonials } from "@/lib/cms";
import { createPageMetadata } from "@/lib/seo";
import type { SiteSettings } from "@/types/content";

export const metadata = createPageMetadata({
  title: "Testimonials",
  description:
    "Read client reviews and see why hosts across Philadelphia, Delaware County, and South Jersey trust Divine Design and Decor.",
  path: "/testimonials",
});

export default async function TestimonialsPage() {
  const [testimonials, rawSettings] = await Promise.all([
    getTestimonials(),
    getSiteSettings(),
  ]);
  const settings = rawSettings as SiteSettings;

  return (
    <div className="section">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Client love"
          title={settings.socialProofHeadline}
          description={settings.socialProofCopy}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {settings.statistics.map((item) => (
            <Card key={item.label}>
              <CardContent>
                <p className="text-4xl font-semibold text-[color:var(--foreground)]">
                  {item.value}
                </p>
                <p className="mt-3 text-sm uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">
                  {item.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {testimonials.length ? (
            testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.name} {...testimonial} />
            ))
          ) : (
            <Card className="lg:col-span-2">
              <CardContent>
                <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
                  Testimonials coming soon
                </p>
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-3xl text-[color:var(--foreground)]">
                  This page will show real client reviews once they are published.
                </h3>
                <p className="mt-4 text-sm leading-7 text-[color:var(--muted-foreground)]">
                  Placeholder testimonials have been removed from the live site, so only real
                  published reviews appear here.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

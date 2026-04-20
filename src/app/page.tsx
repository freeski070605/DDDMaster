import Image from "next/image";
import Link from "next/link";

import { CtaBanner } from "@/components/site/cta-banner";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { InstagramStrip } from "@/components/site/instagram-strip";
import { JsonLd } from "@/components/site/schema";
import { SectionHeading } from "@/components/site/section-heading";
import { ServiceCard } from "@/components/site/service-card";
import { TestimonialCard } from "@/components/site/testimonial-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { brandName } from "@/data/seed-content";
import { getAbsoluteUrl } from "@/lib/env";
import {
  getFaqs,
  getGalleryItems,
  getPackages,
  getServices,
  getSiteSettings,
  getTestimonials,
} from "@/lib/cms";
import type { SiteSettings } from "@/types/content";

export default async function HomePage() {
  const [rawSettings, services, testimonials, faqs, galleryItems, packages] =
    await Promise.all([
      getSiteSettings(),
      getServices(),
      getTestimonials(),
      getFaqs(),
      getGalleryItems(),
      getPackages(),
    ]);

  const settings = rawSettings as SiteSettings;
  const featuredServices = services.filter((service) => service.featured).slice(0, 4);
  const featuredTestimonials = testimonials.filter((item) => item.featured).slice(0, 3);
  const featuredFaqs = faqs.filter((item) => item.featured).slice(0, 4);
  const featuredGallery = galleryItems.slice(0, 4);

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: brandName,
            areaServed: settings.serviceAreas,
            telephone: settings.phone,
            email: settings.email,
            url: getAbsoluteUrl("/"),
            image: getAbsoluteUrl(settings.heroImage),
            description: settings.heroSubtitle,
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: featuredFaqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          },
        ]}
      />

      <section className="section overflow-hidden pb-10">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit rounded-full bg-white/85 px-5 py-2 text-sm font-medium text-[color:var(--foreground)] ring-1 ring-[color:var(--border)]">
              {settings.heroBadge}
            </div>
            <h1 className="mt-6 max-w-3xl font-[family-name:var(--font-display)] text-5xl leading-[0.96] text-[color:var(--foreground)] sm:text-6xl lg:text-7xl">
              {settings.heroTitle}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[color:var(--muted-foreground)]">
              {settings.heroSubtitle}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/inquire">{settings.heroPrimaryCta}</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/gallery">{settings.heroSecondaryCta}</Link>
              </Button>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {settings.statistics.map((item) => (
                <Card key={item.label} className="bg-white/90">
                  <CardContent className="p-5">
                    <p className="text-3xl font-semibold text-[color:var(--foreground)]">
                      {item.value}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[color:var(--muted-foreground)]">
                      {item.label}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="relative min-h-[38rem] overflow-hidden rounded-[2.5rem] border border-white/60 shadow-[0_35px_120px_rgba(73,54,97,0.2)]">
            <Image
              src={settings.heroImage}
              alt={settings.heroImageAlt}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(42,31,54,0.06),rgba(42,31,54,0.58))]" />
            <div className="absolute inset-x-5 top-5 rounded-[1.75rem] bg-white/88 p-5 shadow-lg backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--muted-foreground)]">
                What clients book most
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {settings.featuredCategoryLabels.slice(0, 4).map((label) => (
                  <span
                    key={label}
                    className="rounded-full bg-[color:var(--secondary)] px-4 py-2 text-sm text-[color:var(--secondary-foreground)]"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
            {featuredGallery.length ? (
              <div className="absolute inset-x-5 bottom-5 grid gap-4 sm:grid-cols-2">
                {featuredGallery.slice(0, 2).map((item) => (
                  <div
                    key={item.slug}
                    className="rounded-[1.75rem] bg-[rgba(34,24,43,0.48)] p-4 text-white backdrop-blur"
                  >
                    <p className="text-xs uppercase tracking-[0.2em] text-white/70">
                      {item.category}
                    </p>
                    <p className="mt-2 font-[family-name:var(--font-display)] text-2xl">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white/80">{item.venue}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
          <Card className="bg-white/88">
            <CardContent className="space-y-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--muted-foreground)]">
                  Why clients choose us
                </p>
                <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl text-[color:var(--foreground)] sm:text-5xl">
                  {settings.galleryHeadline}
                </h2>
                <p className="mt-4 text-base leading-8 text-[color:var(--muted-foreground)]">
                  {settings.galleryCopy}
                </p>
              </div>
              <div className="grid gap-4">
                <div className="rounded-[1.75rem] bg-[color:var(--secondary)]/65 p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">
                    Our story
                  </p>
                  <p className="mt-3 text-base leading-8 text-[color:var(--foreground)]">
                    {settings.story}
                  </p>
                </div>
                <div className="rounded-[1.75rem] bg-[#f4eee7] p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">
                    Our mission
                  </p>
                  <p className="mt-3 text-base leading-8 text-[color:var(--foreground)]">
                    {settings.mission}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2">
            {featuredGallery.length ? (
              featuredGallery.map((item, index) => (
                <Card
                  key={item.slug}
                  className={index === 0 ? "sm:col-span-2" : ""}
                >
                  <div className="relative min-h-64 overflow-hidden">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(35,24,44,0.62))]" />
                    <div className="absolute inset-x-5 bottom-5 text-white">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/75">
                        {item.category}
                      </p>
                      <h3 className="mt-2 font-[family-name:var(--font-display)] text-3xl">
                        {item.title}
                      </h3>
                      <p className="mt-2 max-w-lg text-sm leading-6 text-white/80">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="sm:col-span-2">
                <CardContent>
                  <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
                    Gallery coming soon
                  </p>
                  <h3 className="mt-4 font-[family-name:var(--font-display)] text-3xl text-[color:var(--foreground)]">
                    Fresh gallery images will appear here soon.
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[color:var(--muted-foreground)]">
                    We are preparing new event images for this section.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <Card className="overflow-hidden">
              <div className="relative min-h-[24rem]">
                <Image
                  src={settings.showcasePrimaryImage}
                  alt={settings.showcasePrimaryImageAlt}
                  fill
                  className="object-cover"
                />
              </div>
            </Card>
            <Card className="overflow-hidden sm:translate-y-10">
              <div className="relative min-h-[24rem]">
                <Image
                  src={settings.showcaseSecondaryImage}
                  alt={settings.showcaseSecondaryImageAlt}
                  fill
                  className="object-cover"
                />
              </div>
            </Card>
          </div>
          <Card className="bg-white/88">
            <CardContent className="flex h-full flex-col justify-center">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--muted-foreground)]">
                {settings.showcaseEyebrow}
              </p>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl text-[color:var(--foreground)] sm:text-5xl">
                {settings.showcaseTitle}
              </h2>
              <p className="mt-5 text-base leading-8 text-[color:var(--muted-foreground)]">
                {settings.showcaseCopy}
              </p>
              <div className="mt-8 rounded-[1.75rem] bg-[color:var(--secondary)]/60 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">
                  Social proof
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[color:var(--foreground)]">
                  {settings.socialProofHeadline}
                </h3>
                <p className="mt-3 text-base leading-8 text-[color:var(--muted-foreground)]">
                  {settings.socialProofCopy}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Services"
            title={settings.servicesHeadline}
            description={settings.servicesCopy}
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {featuredServices.map((service) => (
              <ServiceCard key={service.slug} {...service} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Instagram"
            title="A closer look at recent decor moments and celebration details."
            description="Use this feed as inspiration for backdrops, table styling, welcome moments, and the overall feeling you want guests to walk into."
          />
          <div className="mt-10">
            <InstagramStrip handle={settings.instagramHandle} />
          </div>
        </div>
      </section>

      {featuredTestimonials.length ? (
        <section className="section">
          <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
            <div>
              <SectionHeading
                eyebrow="Testimonials"
                title={settings.testimonialsHeadline}
                description={settings.testimonialsCopy}
              />
            </div>
            <Card className="bg-[linear-gradient(135deg,rgba(117,87,150,0.14),rgba(211,184,140,0.18))]">
              <CardContent>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
                  {settings.testimonialsSupportEyebrow}
                </p>
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-3xl text-[color:var(--foreground)]">
                  {settings.testimonialsSupportTitle}
                </h3>
                <p className="mt-4 text-base leading-8 text-[color:var(--muted-foreground)]">
                  {settings.testimonialsSupportCopy}
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="mx-auto mt-10 grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
            {featuredTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.name} {...testimonial} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="section">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our process"
            title={settings.processHeadline}
            description={settings.processCopy}
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {settings.bookingSteps.map((step, index) => (
              <Card key={step.title} className="bg-white/88">
                <CardContent>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--muted-foreground)]">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-4 font-[family-name:var(--font-display)] text-3xl text-[color:var(--foreground)]">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-base leading-8 text-[color:var(--muted-foreground)]">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
          <div>
            <SectionHeading
              eyebrow="Service areas"
              title={settings.serviceAreasHeadline}
              description={settings.serviceAreasCopy}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {settings.serviceAreas.map((area) => (
              <Card key={area} className="bg-white/88">
                <CardContent>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">
                    Now serving
                  </p>
                  <h3 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[color:var(--foreground)]">
                    {area}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="FAQ"
            title={settings.faqHeadline}
            description={settings.faqCopy}
          />
          <div className="mt-10">
            <FaqAccordion items={featuredFaqs} />
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-[0_24px_80px_rgba(95,73,123,0.12)]">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
              Investment snapshot
            </p>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl text-[color:var(--foreground)] sm:text-5xl">
              {settings.investmentHeadline}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[color:var(--muted-foreground)]">
              {settings.investmentCopy}
            </p>
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {packages.slice(0, 3).map((item) => (
                <div key={item.slug} className="overflow-hidden rounded-[1.5rem] bg-[color:var(--secondary)]/55">
                  {"image" in item && item.image ? (
                    <div className="relative h-44">
                      <Image src={String(item.image)} alt={item.name} fill className="object-cover" />
                    </div>
                  ) : null}
                  <div className="p-5">
                    <p className="font-[family-name:var(--font-display)] text-2xl text-[color:var(--foreground)]">
                      {item.name}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[color:var(--muted-foreground)]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <CtaBanner title={settings.ctaBannerTitle} copy={settings.ctaBannerCopy} />
        </div>
      </section>
    </>
  );
}

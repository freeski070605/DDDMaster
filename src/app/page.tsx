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
import {
  getFaqs,
  getGalleryItems,
  getPackages,
  getServices,
  getSiteSettings,
  getTestimonials,
} from "@/lib/cms";
import { getAbsoluteUrl } from "@/lib/env";

export default async function HomePage() {
  const [settings, services, testimonials, faqs, galleryItems, packages] =
    await Promise.all([
      getSiteSettings(),
      getServices(),
      getTestimonials(),
      getFaqs(),
      getGalleryItems(),
      getPackages(),
    ]);

  const featuredServices = services.filter((service) => service.featured).slice(0, 4);
  const featuredTestimonials = testimonials.filter((item) => item.featured).slice(0, 3);
  const featuredFaqs = faqs.filter((item) => item.featured).slice(0, 4);
  const featuredGallery = galleryItems.slice(0, 3);

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
            image: getAbsoluteUrl("/images/events/IMG_0822-2.jpg"),
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
      <section className="section overflow-hidden">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit rounded-full bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.24em] text-[color:var(--muted-foreground)] ring-1 ring-white/60">
              Philadelphia luxury event decor studio
            </div>
            <h1 className="mt-6 max-w-3xl font-[family-name:var(--font-display)] text-5xl leading-[0.95] text-[color:var(--foreground)] sm:text-6xl lg:text-7xl">
              {settings.heroTitle}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[color:var(--muted-foreground)] sm:text-lg">
              {settings.heroSubtitle}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/gallery">{settings.heroSecondaryCta}</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/inquire">{settings.heroPrimaryCta}</Link>
              </Button>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {settings.statistics.map((item) => (
                <Card key={item.label}>
                  <CardContent className="p-5">
                    <p className="text-3xl font-semibold text-[color:var(--foreground)]">
                      {item.value}
                    </p>
                    <p className="mt-2 text-sm uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">
                      {item.label}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className="relative min-h-[34rem] overflow-hidden rounded-[2.5rem] border border-white/60 shadow-[0_35px_120px_rgba(73,54,97,0.2)]">
            <Image
              src="/images/events/IMG_0822-2.jpg"
              alt="Luxury wedding decor designed by Divine Design and Decor"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(37,24,48,0.08),rgba(37,24,48,0.48))]" />
            <div className="absolute inset-x-6 bottom-6 grid gap-4 sm:grid-cols-2">
              {featuredGallery.map((item) => (
                <div
                  key={item.slug}
                  className="rounded-[1.75rem] bg-white/18 p-4 text-white backdrop-blur"
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
          </div>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Signature events"
            title="Styled for milestones, built for the feeling your guests remember."
            description="Our work spans intimate social gatherings, polished weddings, and custom event concepts that deserve more than a generic decor package."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {settings.featuredCategoryLabels.map((label, index) => (
              <Card key={label} className={index === 0 ? "xl:col-span-2" : ""}>
                <CardContent className="flex min-h-40 flex-col justify-between">
                  <p className="text-sm uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">
                    Category {index + 1}
                  </p>
                  <h3 className="font-[family-name:var(--font-display)] text-3xl text-[color:var(--foreground)]">
                    {label}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <Card className="overflow-hidden">
            <div className="relative min-h-[24rem]">
              <Image
                src="/images/events/IMG_0509-2.jpg"
                alt="Before event transformation setup"
                fill
                className="object-cover"
              />
            </div>
          </Card>
          <Card className="overflow-hidden">
            <div className="relative min-h-[24rem]">
              <Image
                src="/images/events/IMG_0808-2.jpg"
                alt="After event transformation reveal"
                fill
                className="object-cover"
              />
            </div>
          </Card>
        </div>
        <div className="mx-auto mt-8 w-full max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
            Transformation-led styling
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl text-[color:var(--foreground)] sm:text-5xl">
            We design the reveal, not just the decor list.
          </h2>
          <p className="mt-4 text-base leading-8 text-[color:var(--muted-foreground)]">
            Each event is shaped around the emotional impact of the room. That means
            focal points, layered textures, and guest flow are all considered with the
            finished atmosphere in mind.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Services"
            title="Signature styling services with room for custom direction."
            description="Whether you need a single statement installation or full event styling support, our services are designed to meet the moment beautifully."
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
            eyebrow="Testimonials"
            title="Clients trust us when the details matter."
            description="The work has to feel beautiful, but the process should feel steady too. That balance is why our clients refer us again and again."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {featuredTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.name} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {settings.bookingSteps.map((step, index) => (
            <Card key={step.title}>
              <CardContent>
                <p className="text-sm uppercase tracking-[0.22em] text-[color:var(--muted-foreground)]">
                  Step {index + 1}
                </p>
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-3xl text-[color:var(--foreground)]">
                  {step.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[color:var(--muted-foreground)]">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <InstagramStrip handle={settings.instagramHandle} />
        </div>
      </section>

      <section className="section">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <SectionHeading
              eyebrow="Service areas"
              title="Local, polished, and built for hosts across the region."
              description="We regularly style events in Philadelphia, Delaware County, South Jersey, Chester, Upper Darby, Camden, and nearby areas."
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {settings.serviceAreas.map((area) => (
              <Card key={area}>
                <CardContent>
                  <p className="text-sm uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">
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
            title="Answers that make the next step feel easy."
            description="We keep the process straightforward, transparent, and tailored to the kind of event you are planning."
          />
          <div className="mt-10">
            <FaqAccordion items={featuredFaqs} />
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 rounded-[2rem] border border-white/60 bg-white/70 p-6 shadow-[0_24px_80px_rgba(95,73,123,0.12)]">
            <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
              Investment snapshot
            </p>
            <div className="mt-4 grid gap-4 lg:grid-cols-3">
              {packages.slice(0, 3).map((item) => (
                <div key={item.slug} className="rounded-[1.5rem] bg-[color:var(--secondary)]/55 p-5">
                  <p className="font-[family-name:var(--font-display)] text-2xl text-[color:var(--foreground)]">
                    {item.name}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[color:var(--muted-foreground)]">
                    {item.description}
                  </p>
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

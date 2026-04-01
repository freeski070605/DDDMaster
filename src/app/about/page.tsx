import Image from "next/image";

import { CtaBanner } from "@/components/site/cta-banner";
import { SectionHeading } from "@/components/site/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { getSiteSettings } from "@/lib/cms";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Meet the team behind Divine Design and Decor LLC and learn how we create elegant, emotionally resonant event environments.",
  path: "/about",
});

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <div className="section">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="About the studio"
          title="Warm service, refined aesthetics, and a genuine love for meaningful celebrations."
          description="Divine Design and Decor was built for clients who want more than a themed setup. We create experiences that feel personal, polished, and memorable in every frame."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Card className="overflow-hidden">
            <div className="relative min-h-[34rem]">
              <Image
                src="/images/events/IMG_0822-2.jpg"
                alt="Founder portrait style image for Divine Design and Decor"
                fill
                className="object-cover"
              />
            </div>
          </Card>
          <div className="space-y-6">
            <Card>
              <CardContent>
                <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
                  Brand story
                </p>
                <p className="mt-4 text-base leading-8 text-[color:var(--muted-foreground)]">
                  {settings.story}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
                  Mission
                </p>
                <p className="mt-4 text-base leading-8 text-[color:var(--muted-foreground)]">
                  {settings.mission}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
                  Why clients choose us
                </p>
                <ul className="mt-4 space-y-3 text-base leading-8 text-[color:var(--muted-foreground)]">
                  <li>• Design direction that feels elevated, cohesive, and personal.</li>
                  <li>• Warm communication and a steady planning experience.</li>
                  <li>• Setup execution that respects both timeline and venue flow.</li>
                  <li>• Decor that feels premium in person, not just on Pinterest.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="mt-12">
          <CtaBanner
            title="Planning something meaningful?"
            copy="We would love to hear what you are envisioning and shape a decor approach that feels true to the moment."
          />
        </div>
      </div>
    </div>
  );
}

import { CtaBanner } from "@/components/site/cta-banner";
import { PackageCard } from "@/components/site/package-card";
import { SectionHeading } from "@/components/site/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { getPackages } from "@/lib/cms";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Packages and Pricing",
  description:
    "Review package tiers, starting prices, add-ons, and the factors that shape final event decor investment.",
  path: "/packages",
});

const addOns = [
  "Statement backdrops",
  "Throne chairs",
  "Luxury balloon installs",
  "Fresh or faux florals",
  "Tablescape styling",
  "Custom signage",
  "Candle collections",
  "Centerpieces",
];

export default async function PackagesPage() {
  const packages = await getPackages();

  return (
    <div className="section">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Packages and pricing"
          title="Investment presented with clarity, flexibility, and room for customization."
          description="Our packages provide helpful starting points while leaving room to tailor the experience around your venue, guest count, and visual priorities."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {packages.map((item) => (
            <PackageCard key={item.slug} {...item} />
          ))}
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Card>
            <CardContent>
              <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
                Common add-ons
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--muted-foreground)]">
                {addOns.map((item) => (
                  <li key={item}>&bull; {item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
                What affects final cost
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--muted-foreground)]">
                <li>&bull; Venue size, logistics, and setup access windows</li>
                <li>&bull; The number of styled areas or design focal points</li>
                <li>&bull; Rental upgrades, florals, premium signage, and candles</li>
                <li>&bull; Custom builds or sourcing needs beyond standard inventory</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <div className="mt-12">
          <CtaBanner
            title="Want a tailored proposal instead of a one-size-fits-all quote?"
            copy="Tell us what you are hosting, where it is happening, and what kind of atmosphere you want to create. We will recommend a package direction that fits."
          />
        </div>
      </div>
    </div>
  );
}

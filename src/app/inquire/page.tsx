import { InquiryForm } from "@/components/forms/inquiry-form";
import { SectionHeading } from "@/components/site/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { getAvailableConsultationSlots, getServices } from "@/lib/cms";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Inquire",
  description:
    "Submit an inquiry for weddings, birthdays, showers, graduations, corporate events, and custom luxury decor styling.",
  path: "/inquire",
});

export default async function InquirePage() {
  const [services, slots] = await Promise.all([
    getServices(),
    getAvailableConsultationSlots(),
  ]);

  return (
    <div className="section">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Start your inquiry"
            title="Tell us what you are planning and we will take it from there."
            description="Share your event details, inspiration, and priorities so we can review fit, availability, and the best next step for your decor experience."
          />
          <Card>
            <CardContent>
              <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
                What to expect
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--muted-foreground)]">
                <li>• Immediate inquiry confirmation</li>
                <li>• Follow-up after we review your event goals and date</li>
                <li>• Consultation scheduling based on availability</li>
                <li>• A clear recommendation for scope and investment</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <InquiryForm services={services} consultationSlots={slots} />
      </div>
    </div>
  );
}

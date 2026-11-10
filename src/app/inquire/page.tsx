import { InquiryForm } from "@/components/forms/inquiry-form";
import { SectionHeading } from "@/components/site/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { inquiryServiceOptions } from "@/data/seed-content";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Inquire",
  description:
    "Submit an inquiry for weddings, birthdays, showers, graduations, corporate events, and custom luxury decor styling.",
  path: "/inquire",
});

export default async function InquirePage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  const services = inquiryServiceOptions.map((title) => ({ title }));
  const params = await searchParams;
  const errorMessage =
    params?.error === "save"
      ? "We could not save your inquiry. Please try again."
      : params?.error === "invalid"
        ? "Please review the form and complete the required fields."
        : "";

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
                <li>Immediate inquiry confirmation</li>
                <li>Follow-up after we review your event goals and date</li>
                <li>Consultation scheduling based on availability</li>
                <li>A clear recommendation for scope and investment</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-4">
          {errorMessage ? (
            <div className="rounded-[1.5rem] border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {errorMessage}
            </div>
          ) : null}
          <InquiryForm services={services} />
        </div>
      </div>
    </div>
  );
}

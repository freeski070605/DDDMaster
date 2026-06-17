import Script from "next/script";

import { SectionHeading } from "@/components/site/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Inquire",
  description:
    "Submit an inquiry for weddings, birthdays, showers, graduations, corporate events, and custom luxury decor styling.",
  path: "/inquire",
});

export default function InquirePage() {
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
        <Card className="overflow-hidden bg-white/92 shadow-[0_30px_100px_rgba(95,73,123,0.14)]">
          <CardContent className="p-0">
            <div className="border-b border-[color:var(--border)] bg-[color:var(--secondary)]/45 px-5 py-4 sm:px-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
                Event inquiry form
              </p>
            </div>
            <div className="h-[1881px] w-full bg-white">
              <iframe
                src="https://www.divinedecor.design/widget/form/6xA2Z6YDHU2YM26MEREd"
                style={{ width: "100%", height: "100%", border: "none", borderRadius: 3 }}
                id="inline-6xA2Z6YDHU2YM26MEREd"
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="Event Inquiry Form"
                data-height="1881"
                data-layout-iframe-id="inline-6xA2Z6YDHU2YM26MEREd"
                data-form-id="6xA2Z6YDHU2YM26MEREd"
                title="Event Inquiry Form"
              />
            </div>
          </CardContent>
        </Card>
        <Script
          src="https://www.divinedecor.design/js/form_embed.js"
          strategy="afterInteractive"
        />
      </div>
    </div>
  );
}

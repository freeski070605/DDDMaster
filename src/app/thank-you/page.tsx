import Link from "next/link";

import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Inquiry Received",
  description: "Thank you for submitting your Divine Design and Decor event inquiry.",
  path: "/thank-you",
});

export default function ThankYouPage() {
  return (
    <div className="section">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Card>
          <CardContent className="space-y-6">
            <SectionHeading
              eyebrow="Inquiry received"
              title="Thank you. We have your event details."
              description="Our team will review your inquiry and follow up with the best next step for your decor experience."
            />
            <Button asChild>
              <Link href="/">Return home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

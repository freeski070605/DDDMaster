import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "CRM Test",
  description: "Temporary native form page for testing LeadConnector external form tracking.",
  path: "/crm-test",
});

export default function CrmTestPage() {
  return (
    <div className="section">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <Card>
          <CardContent>
            <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
              CRM diagnostic
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[color:var(--foreground)]">
              Native tracking test
            </h1>
            <form
              className="mt-8 space-y-5"
              name="Event Inquiry Form"
              data-form-name="Event Inquiry Form"
              data-form-id="FEWk0e24K6bxe3nchsxy"
              action="/api/inquiries"
              method="post"
            >
              <input type="hidden" name="source" value="Divine Decor Website" />
              <input type="hidden" name="submitted_page_path" value="/crm-test" />
              <input type="hidden" name="submitted_form_name" value="Event Inquiry Form" />
              <input type="hidden" name="event_date" value="2026-07-01" />
              <input type="hidden" name="event_type" value="Custom Styling" />
              <input type="hidden" name="event_location" value="CRM test submission" />
              <input type="hidden" name="estimated_guest_count" value="1" />
              <input type="hidden" name="services_interested" value="Draping" />
              <input type="hidden" name="estimated_decor_budget" value="$3,000 - $5,000" />
              <input
                type="hidden"
                name="event_design_vision"
                value="Temporary CRM tracking diagnostic submission."
              />
              <div className="space-y-2">
                <Label>First Name</Label>
                <Input name="first_name" autoComplete="given-name" required />
              </div>
              <div className="space-y-2">
                <Label>Last Name</Label>
                <Input name="last_name" autoComplete="family-name" required />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input name="email" type="email" autoComplete="email" required />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input name="phone" type="tel" autoComplete="tel" required />
              </div>
              <Button type="submit" className="w-full">
                Submit CRM test
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

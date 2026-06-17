import { Button } from "@/components/ui/button";
import { LeadConnectorSubmitDelay } from "@/components/forms/leadconnector-submit-delay";
import { LeadConnectorTrackingScript } from "@/components/site/leadconnector-tracking-script";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "CRM Form Test",
  description: "Temporary native form page for testing LeadConnector form detection.",
  path: "/crm-form-test",
});

export default function CrmFormTestPage() {
  return (
    <div className="section">
      <LeadConnectorTrackingScript />
      <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
        <Card>
          <CardContent>
            <LeadConnectorSubmitDelay formId="crm-form-test-form" />
            <form
              id="crm-form-test-form"
              action="/api/inquiries"
              className="space-y-5"
              data-form-id="FEWk0e24K6bxe3nchsxy"
              data-form-name="Event Inquiry Form"
              method="post"
              name="Event Inquiry Form"
            >
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

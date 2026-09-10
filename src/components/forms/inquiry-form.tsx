import Script from "next/script";

import { Card, CardContent } from "@/components/ui/card";

const formId = "FEWk0e24K6bxe3nchsxy";
const formName = "Event Inquiry Form";
const formSrc = `https://www.divinedecor.design/widget/form/${formId}`;

export function InquiryForm({
  services: _services,
}: {
  services: ReadonlyArray<{ title: string }>;
}) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4 sm:p-6">
        <div className="w-full overflow-hidden rounded-[1.5rem] bg-white">
          <iframe
            src={formSrc}
            className="block min-h-[1500px] w-full border-0 bg-white sm:min-h-[1400px]"
            id={`inline-${formId}`}
            data-layout="{'id':'INLINE'}"
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name={formName}
            data-height="undefined"
            data-layout-iframe-id={`inline-${formId}`}
            data-form-id={formId}
            data-cookie-consent="true"
            data-cookie-consent-provider="auto"
            title={formName}
          />
        </div>
        <Script
          id="posh-academy-form-embed"
          src="https://www.divinedecor.design/js/form_embed.js"
          strategy="afterInteractive"
        />
      </CardContent>
    </Card>
  );
}

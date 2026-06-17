import Script from "next/script";

export function LeadConnectorTrackingScript() {
  return (
    <Script
      id="leadconnector-external-tracking"
      src="https://link.msgsndr.com/js/external-tracking.js"
      data-tracking-id="tk_c3a113c684684950971185e76007669e"
      data-debug="true"
      strategy="afterInteractive"
    />
  );
}

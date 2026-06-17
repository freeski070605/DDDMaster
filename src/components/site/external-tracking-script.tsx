"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

export function ExternalTrackingScript() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <Script
      id="leadconnector-external-tracking"
      src="https://link.msgsndr.com/js/external-tracking.js"
      data-tracking-id="tk_c3a113c684684950971185e76007669e"
      strategy="afterInteractive"
    />
  );
}

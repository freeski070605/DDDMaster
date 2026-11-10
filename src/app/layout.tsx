import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";

import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { StickyCta } from "@/components/site/sticky-cta";
import { brandName } from "@/data/seed-content";
import { getSiteSettings } from "@/lib/cms";
import { env, getAbsoluteUrl } from "@/lib/env";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  alternates: {
    canonical: getAbsoluteUrl("/"),
  },
  title: {
    default: `${brandName} | Luxury Event Decor in Philadelphia`,
    template: `%s | ${brandName}`,
  },
  description:
    "Luxury event decor for weddings, birthdays, baby showers, bridal showers, graduations, and corporate events in Philadelphia, Delaware County, and South Jersey.",
  openGraph: {
    title: `${brandName} | Luxury Event Decor`,
    description:
      "Upscale event styling, polished booking, and premium design for celebrations that deserve more than ordinary decor.",
    url: getAbsoluteUrl("/"),
    siteName: brandName,
    type: "website",
    images: [getAbsoluteUrl("/images/events/IMG_0822-2.jpg")],
  },
  twitter: {
    card: "summary_large_image",
    images: [getAbsoluteUrl("/images/events/IMG_0822-2.jpg")],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html lang="en" className={`${display.variable} ${body.variable} antialiased`}>
      <body>
        <div className="page-shell min-h-screen">
          <SiteHeader phone={settings.phone} />
          <main>{children}</main>
          <SiteFooter
            phone={settings.phone}
            email={settings.email}
            instagramUrl={settings.instagramUrl}
            serviceAreas={settings.serviceAreas}
          />
          <StickyCta />
        </div>
      </body>
    </html>
  );
}

import Link from "next/link";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";

import { Logo } from "@/components/site/logo";
import { env } from "@/lib/env";
import { formatPhoneForHref } from "@/lib/utils";

export function SiteFooter({
  phone,
  email,
  serviceAreas,
}: {
  phone: string;
  email: string;
  serviceAreas: string[];
}) {
  return (
    <footer className="border-t border-white/50 bg-[#f7f0fa]">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_0.9fr_0.9fr] lg:px-8">
        <div>
          <Logo />
          <p className="mt-5 max-w-md text-sm leading-7 text-[color:var(--muted-foreground)]">
            Divine Design and Decor creates elevated celebrations with calm
            communication, polished design, and a guest experience that feels
            memorable from first look to final photo.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
            Explore
          </h3>
          <div className="mt-5 flex flex-col gap-3 text-sm">
            <Link href="/services">Services</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/packages">Packages</Link>
            <Link href="/inquire">Inquire</Link>
            <Link href="/admin/login">Admin</Link>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
            Contact
          </h3>
          <div className="mt-5 space-y-3 text-sm text-[color:var(--muted-foreground)]">
            <a href={formatPhoneForHref(phone)} className="flex items-center gap-3">
              <Phone className="size-4" />
              {phone}
            </a>
            <a href={`mailto:${email}`} className="flex items-center gap-3">
              <Mail className="size-4" />
              {email}
            </a>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              Serving {serviceAreas.join(", ")}
            </div>
            <a
              href={env.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3"
            >
              <Instagram className="size-4" />
              Follow on Instagram
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/50 px-4 py-5 text-center text-xs uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">
        Divine Design and Decor LLC
      </div>
    </footer>
  );
}

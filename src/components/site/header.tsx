"use client";

import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { Logo } from "@/components/site/logo";
import { Button } from "@/components/ui/button";
import { formatPhoneForHref } from "@/lib/utils";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/packages", label: "Packages" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/faq", label: "FAQ" },
  { href: "/service-areas", label: "Service Areas" },
];

export function SiteHeader({ phone }: { phone: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/50 bg-[color:var(--background)]/88 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
          <Logo />
          <nav className="hidden items-center gap-6 lg:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-[color:var(--muted-foreground)] transition hover:text-[color:var(--foreground)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={formatPhoneForHref(phone)}
              className="inline-flex items-center gap-2 text-sm text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]"
            >
              <Phone className="size-4" />
              {phone}
            </a>
            <Button asChild>
              <Link href="/inquire">Book a Consultation</Link>
            </Button>
          </div>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-[color:var(--border)] bg-white/80 text-[color:var(--foreground)] lg:hidden"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setOpen((current) => !current)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[82px] z-40 mx-4 rounded-[2rem] border border-white/60 bg-[color:var(--background)]/95 p-5 shadow-[0_30px_80px_rgba(73,54,97,0.22)] backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-[color:var(--foreground)] hover:bg-[color:var(--secondary)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 flex flex-col gap-3 border-t border-[color:var(--border)] pt-4">
              <a
                href={formatPhoneForHref(phone)}
                className="text-sm text-[color:var(--muted-foreground)]"
              >
                {phone}
              </a>
              <Button asChild className="w-full">
                <Link href="/inquire" onClick={() => setOpen(false)}>
                  Book a Consultation
                </Link>
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

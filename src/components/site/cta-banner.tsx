import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function CtaBanner({
  title,
  copy,
  image,
  imageAlt,
}: {
  title: string;
  copy: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="overflow-hidden rounded-[2.5rem] bg-[radial-gradient(circle_at_top_left,rgba(173,153,198,0.45),transparent_40%),linear-gradient(135deg,#432e56,#6f5b86_55%,#9b8ab4)] text-white shadow-[0_30px_100px_rgba(59,38,79,0.34)]">
      <div className={`grid gap-0 ${image ? "lg:grid-cols-[1.05fr_0.95fr]" : ""}`}>
        <div className="relative p-8 sm:p-12">
          <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.26em] text-white/70">Next step</p>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl leading-tight sm:text-5xl">
                {title}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-8 text-white/80">{copy}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="secondary">
                <Link href="/gallery">View our work</Link>
              </Button>
              <Button asChild className="bg-white text-[color:var(--primary)] hover:bg-[#f5eefb]">
                <Link href="/inquire">Book a consultation</Link>
              </Button>
            </div>
          </div>
        </div>

        {image ? (
          <div className="relative min-h-72">
            <Image
              src={image}
              alt={imageAlt ?? title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(42,31,54,0.12),rgba(42,31,54,0.48))]" />
          </div>
        ) : null}
      </div>
    </section>
  );
}

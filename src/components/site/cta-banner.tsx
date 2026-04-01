import Link from "next/link";

import { Button } from "@/components/ui/button";

export function CtaBanner({ title, copy }: { title: string; copy: string }) {
  return (
    <section className="overflow-hidden rounded-[2.5rem] bg-[radial-gradient(circle_at_top_left,rgba(173,153,198,0.45),transparent_40%),linear-gradient(135deg,#432e56,#6f5b86_55%,#9b8ab4)] p-8 text-white shadow-[0_30px_100px_rgba(59,38,79,0.34)] sm:p-12">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
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
    </section>
  );
}

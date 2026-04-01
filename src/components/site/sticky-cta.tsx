import Link from "next/link";

import { Button } from "@/components/ui/button";

export function StickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-4 z-40 px-4 lg:hidden">
      <div className="mx-auto flex max-w-md items-center gap-3 rounded-full border border-white/60 bg-[color:var(--background)]/92 p-3 shadow-[0_24px_60px_rgba(73,54,97,0.2)] backdrop-blur-xl">
        <Button asChild className="flex-1">
          <Link href="/inquire">Inquire</Link>
        </Button>
        <Button asChild variant="secondary" className="flex-1">
          <Link href="/gallery">View Work</Link>
        </Button>
      </div>
    </div>
  );
}

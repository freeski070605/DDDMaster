import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="section flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
          Page not found
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-6xl text-[color:var(--foreground)]">
          Let&apos;s get you back to something beautiful.
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[color:var(--muted-foreground)]">
          The page you were looking for is not here, but the rest of the studio is.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">Return home</Link>
        </Button>
      </div>
    </div>
  );
}

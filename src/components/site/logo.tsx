import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-3">
      <span className="flex size-11 items-center justify-center rounded-full bg-[color:var(--primary)] text-lg font-semibold text-[color:var(--primary-foreground)] shadow-[0_10px_30px_rgba(84,61,106,0.28)]">
        DD
      </span>
      <span className="flex flex-col">
        <span className="font-[family-name:var(--font-display)] text-lg tracking-[0.08em] text-[color:var(--foreground)]">
          Divine Design
        </span>
        <span className="text-[0.68rem] uppercase tracking-[0.3em] text-[color:var(--muted-foreground)]">
          and Decor LLC
        </span>
      </span>
    </Link>
  );
}

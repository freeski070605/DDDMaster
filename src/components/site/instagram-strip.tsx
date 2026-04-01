import Image from "next/image";
import Link from "next/link";

import { env } from "@/lib/env";

const images = [
  "/images/events/IMG_0822-2.jpg",
  "/images/events/IMG_0808-2.jpg",
  "/images/events/IMG_0509-2.jpg",
  "/images/events/IMG_0822-2.jpg",
];

export function InstagramStrip({ handle }: { handle: string }) {
  return (
    <div className="rounded-[2rem] border border-white/60 bg-white/75 p-5 shadow-[0_24px_80px_rgba(95,73,123,0.12)]">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--muted-foreground)]">
            Social proof
          </p>
          <h3 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[color:var(--foreground)]">
            Follow the room reveals, details, and transformations.
          </h3>
        </div>
        <Link
          href={env.instagramUrl}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-semibold text-[color:var(--primary)]"
        >
          {handle}
        </Link>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {images.map((image, index) => (
          <div key={`${image}-${index}`} className="relative h-56 overflow-hidden rounded-[1.5rem]">
            <Image src={image} alt={`${handle} event preview ${index + 1}`} fill className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

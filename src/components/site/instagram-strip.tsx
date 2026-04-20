import Image from "next/image";
import Link from "next/link";

type InstagramStripProps = {
  eyebrow: string;
  title: string;
  copy: string;
  handle: string;
  url: string;
  images: string[];
};

export function InstagramStrip({
  eyebrow,
  title,
  copy,
  handle,
  url,
  images,
}: InstagramStripProps) {
  const visibleImages = images.slice(0, 4);

  return (
    <div className="rounded-[2rem] border border-white/60 bg-white/75 p-5 shadow-[0_24px_80px_rgba(95,73,123,0.12)]">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--muted-foreground)]">
            {eyebrow}
          </p>
          <h3 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[color:var(--foreground)]">
            {title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-[color:var(--muted-foreground)]">{copy}</p>
        </div>
        <Link
          href={url}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-semibold text-[color:var(--primary)]"
        >
          {handle}
        </Link>
      </div>

      {visibleImages.length ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visibleImages.map((image, index) => (
            <div key={`${image}-${index}`} className="relative h-56 overflow-hidden rounded-[1.5rem]">
              <Image src={image} alt={`${handle} event preview ${index + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-[1.5rem] bg-[color:var(--secondary)]/35 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">
            Instagram updates
          </p>
          <p className="mt-3 text-sm leading-7 text-[color:var(--foreground)]">
            Follow us on Instagram for the latest event photos and room reveals.
          </p>
        </div>
      )}
    </div>
  );
}

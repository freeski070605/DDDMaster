"use client";

import { useState } from "react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type GalleryItem = {
  _id?: string | { toString(): string };
  title: string;
  category: string;
  venue: string;
  description: string;
  image: string;
};

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const filters = ["All", ...new Set(items.map((item) => item.category))];
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredItems =
    activeFilter === "All"
      ? items
      : items.filter((item) => item.category === activeFilter);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={cn(
              "rounded-full px-4 py-2 text-sm transition",
              activeFilter === filter
                ? "bg-[color:var(--primary)] text-[color:var(--primary-foreground)]"
                : "bg-white/80 text-[color:var(--foreground)] ring-1 ring-[color:var(--border)]",
            )}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
        {filteredItems.map((item) => (
          <article
            key={String(item._id ?? item.title)}
            className="mb-6 overflow-hidden rounded-[2rem] border border-white/60 bg-white/80 shadow-[0_24px_80px_rgba(95,73,123,0.12)]"
          >
            <div className="relative min-h-80">
              <Image src={item.image} alt={item.title} fill className="object-cover" />
            </div>
            <div className="space-y-3 p-5">
              <Badge variant="outline">{item.category}</Badge>
              <h3 className="font-[family-name:var(--font-display)] text-2xl text-[color:var(--foreground)]">
                {item.title}
              </h3>
              <p className="text-sm text-[color:var(--foreground)]">{item.venue}</p>
              <p className="text-sm leading-7 text-[color:var(--muted-foreground)]">
                {item.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

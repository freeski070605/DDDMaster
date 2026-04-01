import Image from "next/image";
import { Star } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export function TestimonialCard({
  name,
  role,
  quote,
  image,
  rating,
}: {
  name: string;
  role: string;
  quote: string;
  image: string;
  rating: number;
}) {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="relative size-16 overflow-hidden rounded-full">
            <Image src={image} alt={name} fill className="object-cover" />
          </div>
          <div>
            <p className="font-semibold text-[color:var(--foreground)]">{name}</p>
            <p className="text-sm text-[color:var(--muted-foreground)]">{role}</p>
          </div>
        </div>
        <div className="mt-5 flex items-center gap-1 text-[color:var(--primary)]">
          {Array.from({ length: rating }).map((_, index) => (
            <Star key={`${name}-${index}`} className="size-4 fill-current" />
          ))}
        </div>
        <p className="mt-5 text-sm leading-7 text-[color:var(--muted-foreground)]">
          <span aria-hidden>&ldquo;</span>
          {quote}
          <span aria-hidden>&rdquo;</span>
        </p>
      </CardContent>
    </Card>
  );
}

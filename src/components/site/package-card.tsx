import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

type PackageCardProps = {
  name: string;
  description: string;
  image: string;
  startingPrice: number;
  highlights: string[];
  bestFor: string;
  featured?: boolean;
};

export function PackageCard({
  name,
  description,
  image,
  startingPrice,
  highlights,
  bestFor,
  featured,
}: PackageCardProps) {
  return (
    <Card className={`overflow-hidden ${featured ? "border-[color:var(--primary)]/30" : ""}`}>
      <div className="relative h-64 overflow-hidden">
        <Image src={image} alt={name} fill className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(38,28,46,0.45))]" />
        {featured ? (
          <div className="absolute right-4 top-4">
            <Badge>Most requested</Badge>
          </div>
        ) : null}
      </div>
      <CardContent>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-3xl text-[color:var(--foreground)]">
              {name}
            </h3>
            <p className="mt-3 text-sm leading-7 text-[color:var(--muted-foreground)]">
              {description}
            </p>
          </div>
        </div>
        <div className="mt-6 text-3xl font-semibold text-[color:var(--foreground)]">
          Starting at {formatCurrency(startingPrice)}
        </div>
        <ul className="mt-6 space-y-3 text-sm leading-7 text-[color:var(--muted-foreground)]">
          {highlights.map((item) => (
            <li key={item}>&bull; {item}</li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-[color:var(--foreground)]">Best for: {bestFor}</p>
        <Button asChild className="mt-8 w-full">
          <Link href="/inquire">Request a custom quote</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

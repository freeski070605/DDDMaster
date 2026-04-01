import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

type ServiceCardProps = {
  slug: string;
  title: string;
  shortDescription: string;
  image: string;
  startingPrice: number;
};

export function ServiceCard({
  slug,
  title,
  shortDescription,
  image,
  startingPrice,
}: ServiceCardProps) {
  return (
    <Card className="group overflow-hidden">
      <div className="relative h-72 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
        />
      </div>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-[family-name:var(--font-display)] text-3xl text-[color:var(--foreground)]">
            {title}
          </h3>
          <ArrowUpRight className="size-5 text-[color:var(--muted-foreground)]" />
        </div>
        <p className="text-sm leading-7 text-[color:var(--muted-foreground)]">
          {shortDescription}
        </p>
        <div className="flex items-center justify-between gap-4 pt-2">
          <span className="text-sm font-medium text-[color:var(--foreground)]">
            Starting at {formatCurrency(startingPrice)}
          </span>
          <Link
            href={`/services/${slug}`}
            className="text-sm font-semibold text-[color:var(--primary)]"
          >
            Explore service
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

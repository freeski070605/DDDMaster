import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-medium tracking-[0.18em] uppercase",
  {
    variants: {
      variant: {
        default: "bg-[color:var(--secondary)] text-[color:var(--secondary-foreground)]",
        outline: "border border-[color:var(--border)] bg-white/70 text-[color:var(--foreground)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

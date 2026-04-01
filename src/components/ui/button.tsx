import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[color:var(--primary)] px-6 py-3 text-[color:var(--primary-foreground)] shadow-[0_20px_50px_rgba(84,61,106,0.18)] hover:bg-[color:var(--primary-strong)]",
        secondary:
          "bg-white/75 px-6 py-3 text-[color:var(--foreground)] ring-1 ring-black/10 backdrop-blur hover:bg-white",
        ghost:
          "px-4 py-2 text-[color:var(--foreground)] hover:bg-white/70",
        outline:
          "px-6 py-3 text-[color:var(--foreground)] ring-1 ring-[color:var(--border)] hover:bg-white/70",
      },
      size: {
        default: "h-11",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-7",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };

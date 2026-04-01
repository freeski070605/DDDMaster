import * as React from "react";

import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-[2rem] border border-white/50 bg-white/78 shadow-[0_24px_80px_rgba(95,73,123,0.12)] backdrop-blur",
        className,
      )}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("p-6 sm:p-8", className)} {...props} />;
}

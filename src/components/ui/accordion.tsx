"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

export function Accordion(props: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root {...props} />;
}

export function AccordionItem(
  props: React.ComponentProps<typeof AccordionPrimitive.Item>,
) {
  return (
    <AccordionPrimitive.Item
      className="rounded-[1.5rem] border border-[color:var(--border)] bg-white/80 px-5"
      {...props}
    />
  );
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header>
      <AccordionPrimitive.Trigger
        className={cn(
          "flex w-full items-center justify-between gap-4 py-5 text-left text-base font-semibold text-[color:var(--foreground)]",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown className="size-5 shrink-0 text-[color:var(--muted-foreground)] transition duration-200 data-[state=open]:rotate-180" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className={cn(
        "overflow-hidden pb-5 text-sm leading-7 text-[color:var(--muted-foreground)]",
        className,
      )}
      {...props}
    />
  );
}

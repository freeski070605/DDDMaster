"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ImageUploadField } from "@/components/forms/image-upload-field";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { budgetRanges } from "@/data/seed-content";
import { inquirySchema } from "@/lib/validators";

type InquiryFormValues = z.input<typeof inquirySchema>;

export function InquiryForm({
  services,
  consultationSlots,
}: {
  services: ReadonlyArray<{ title: string }>;
  consultationSlots: ReadonlyArray<{
    _id: string | { toString(): string };
    label: string;
    start?: string | Date;
  }>;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const form = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      eventType: "Wedding",
      eventDate: "",
      venue: "",
      budgetRange: "$3,000 - $5,000",
      guestCount: 50,
      inspirationNotes: "",
      servicesNeeded: [],
      inspirationImages: [],
      consultationSlotId: "",
      website: "",
    },
  });

  const submitting = form.formState.isSubmitting;
  const inspirationImages = form.watch("inspirationImages") ?? [];
  const selectedServices = form.watch("servicesNeeded") ?? [];

  async function onSubmit(values: InquiryFormValues) {
    setSubmitError("");

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Unable to submit inquiry.");
      }

      setSubmitted(true);
      form.reset();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to submit inquiry.");
    }
  }

  if (submitted) {
    return (
      <Card>
        <CardContent className="space-y-4">
          <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
            Inquiry received
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-4xl text-[color:var(--foreground)]">
            Thank you. We have your details.
          </h2>
          <p className="text-sm leading-7 text-[color:var(--muted-foreground)]">
            A confirmation has been prepared, and we will review your event details
            before following up with next steps.
          </p>
          <Button type="button" onClick={() => setSubmitted(false)}>
            Submit another inquiry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Full name" error={form.formState.errors.fullName?.message}>
              <Input {...form.register("fullName")} />
            </Field>
            <Field label="Email" error={form.formState.errors.email?.message}>
              <Input type="email" {...form.register("email")} />
            </Field>
            <Field label="Phone" error={form.formState.errors.phone?.message}>
              <Input type="tel" {...form.register("phone")} />
            </Field>
            <Field label="Event type" error={form.formState.errors.eventType?.message}>
              <select
                className="flex h-12 w-full rounded-2xl border border-[color:var(--border)] bg-white/80 px-4 text-sm"
                {...form.register("eventType")}
              >
                {[
                  "Wedding",
                  "Birthday",
                  "Baby Shower",
                  "Bridal Shower",
                  "Graduation",
                  "Corporate Event",
                  "Custom Styling",
                ].map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Event date" error={form.formState.errors.eventDate?.message}>
              <Input type="date" {...form.register("eventDate")} />
            </Field>
            <Field label="Venue or location" error={form.formState.errors.venue?.message}>
              <Input {...form.register("venue")} />
            </Field>
            <Field label="Budget range" error={form.formState.errors.budgetRange?.message}>
              <select
                className="flex h-12 w-full rounded-2xl border border-[color:var(--border)] bg-white/80 px-4 text-sm"
                {...form.register("budgetRange")}
              >
                {budgetRanges.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Guest count" error={form.formState.errors.guestCount?.message}>
              <Input type="number" min={1} {...form.register("guestCount", { valueAsNumber: true })} />
            </Field>
          </div>

          <Field label="Services needed" error={form.formState.errors.servicesNeeded?.message}>
            <div className="grid gap-3 sm:grid-cols-2">
              {services.map((service) => {
                const checked = selectedServices.includes(service.title);

                return (
                  <label
                    key={service.title}
                    className="flex items-center gap-3 rounded-2xl border border-[color:var(--border)] bg-white/70 px-4 py-3 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(event) => {
                        const current = form.getValues("servicesNeeded");
                        form.setValue(
                          "servicesNeeded",
                          event.target.checked
                            ? [...current, service.title]
                            : current.filter((item) => item !== service.title),
                          { shouldValidate: true },
                        );
                      }}
                    />
                    {service.title}
                  </label>
                );
              })}
            </div>
          </Field>

          <Field
            label="Preferred consultation slot"
            error={form.formState.errors.consultationSlotId?.message}
          >
            <select
              className="flex h-12 w-full rounded-2xl border border-[color:var(--border)] bg-white/80 px-4 text-sm"
              {...form.register("consultationSlotId")}
            >
              <option value="">No preference yet</option>
              {consultationSlots.map((slot) => (
                <option key={String(slot._id)} value={String(slot._id)}>
                  {slot.label}
                </option>
              ))}
            </select>
          </Field>

          <Field
            label="Inspiration notes"
            error={form.formState.errors.inspirationNotes?.message}
          >
            <Textarea
              placeholder="Tell us about the feeling, colors, venue, focal moments, and any must-haves."
              {...form.register("inspirationNotes")}
            />
          </Field>

          <Field label="Inspiration images">
            <ImageUploadField
              label="Upload inspiration references"
              value={inspirationImages}
              onChange={(urls) =>
                form.setValue("inspirationImages", urls, { shouldValidate: true })
              }
            />
          </Field>

          <input type="text" className="hidden" tabIndex={-1} autoComplete="off" {...form.register("website")} />

          {submitError ? <p className="text-sm text-red-600">{submitError}</p> : null}

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Sending inquiry
              </>
            ) : (
              "Submit inquiry"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}

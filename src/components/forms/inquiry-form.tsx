"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { budgetRanges, eventTypes } from "@/data/seed-content";
import { inquirySchema } from "@/lib/validators";

type InquiryFormValues = z.input<typeof inquirySchema>;

export function InquiryForm({
  services,
}: {
  services: ReadonlyArray<{ title: string }>;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const form = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      eventType: "Wedding",
      eventDate: "",
      eventStartTime: "",
      venue: "",
      eventThemeOrColors: "",
      budgetRange: "$3,000 - $5,000",
      guestCount: 50,
      installationTime: "",
      strikeTime: "",
      inspirationNotes: "",
      servicesNeeded: [],
      inspirationImages: [],
      consultationSlotId: "",
      marketingConsent: false,
      website: "",
    },
  });

  const submitting = form.formState.isSubmitting;
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

  function onInvalid() {
    setSubmitError("Please complete the required fields before submitting.");
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
        <form
          id="event-inquiry-form"
          name="Event Inquiry Form"
          className="space-y-6"
          onSubmit={form.handleSubmit(onSubmit, onInvalid)}
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="First Name" error={form.formState.errors.first_name?.message}>
              <Input autoComplete="given-name" {...form.register("first_name")} />
            </Field>
            <Field label="Last Name" error={form.formState.errors.last_name?.message}>
              <Input autoComplete="family-name" {...form.register("last_name")} />
            </Field>
            <Field label="Email" error={form.formState.errors.email?.message}>
              <Input type="email" autoComplete="email" {...form.register("email")} />
            </Field>
            <Field label="Phone" error={form.formState.errors.phone?.message}>
              <Input type="tel" autoComplete="tel" {...form.register("phone")} />
            </Field>
            <Field label="Event Date" error={form.formState.errors.eventDate?.message}>
              <Input type="date" {...form.register("eventDate")} />
            </Field>
            <Field label="Event Type" error={form.formState.errors.eventType?.message}>
              <select
                className="flex h-12 w-full rounded-2xl border border-[color:var(--border)] bg-white/80 px-4 text-sm"
                {...form.register("eventType")}
              >
                {eventTypes.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Event Location / Venue" error={form.formState.errors.venue?.message}>
              <Input {...form.register("venue")} />
            </Field>
            <Field label="Event Start Time" error={form.formState.errors.eventStartTime?.message}>
              <Input type="time" {...form.register("eventStartTime")} />
            </Field>
            <Field
              label="Event Theme or Colors"
              error={form.formState.errors.eventThemeOrColors?.message}
            >
              <Input {...form.register("eventThemeOrColors")} />
            </Field>
            <Field label="Estimated Guest Count" error={form.formState.errors.guestCount?.message}>
              <Input type="number" min={1} {...form.register("guestCount", { valueAsNumber: true })} />
            </Field>
            <Field label="Installation Time" error={form.formState.errors.installationTime?.message}>
              <Input type="time" {...form.register("installationTime")} />
            </Field>
            <Field
              label="Strike / Breakdown Time"
              error={form.formState.errors.strikeTime?.message}
            >
              <Input type="time" {...form.register("strikeTime")} />
            </Field>
          </div>

          <Field
            label="Which services are you interested in?"
            error={form.formState.errors.servicesNeeded?.message}
          >
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
                      name="servicesNeeded"
                      value={service.title}
                      checked={checked}
                      onChange={(event) => {
                        const current = form.getValues("servicesNeeded");
                        const serviceTitle = event.target.value;
                        form.setValue(
                          "servicesNeeded",
                          event.target.checked
                            ? [...current, serviceTitle]
                            : current.filter((item) => item !== serviceTitle),
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
            label="What is your estimated décor budget?"
            error={form.formState.errors.budgetRange?.message}
          >
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

          <Field
            label="Tell us more about your event or design vision."
            error={form.formState.errors.inspirationNotes?.message}
          >
            <Textarea
              placeholder="Share the feeling, colors, venue details, focal moments, and any must-haves."
              {...form.register("inspirationNotes")}
            />
          </Field>

          <label className="flex items-start gap-3 rounded-2xl border border-[color:var(--border)] bg-white/70 px-4 py-3 text-sm leading-6 text-[color:var(--muted-foreground)]">
            <input
              type="checkbox"
              className="mt-1"
              {...form.register("marketingConsent")}
            />
            <span>
              By checking this box, I consent to receive marketing and promotional
              messages, including special offers, discounts, and product updates, at the
              phone number provided. Message frequency may vary. Message and data rates
              may apply. Text HELP for assistance or reply STOP to opt out.
            </span>
          </label>

          <input type="text" className="hidden" tabIndex={-1} autoComplete="off" {...form.register("website")} />
          <input type="hidden" {...form.register("consultationSlotId")} />

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

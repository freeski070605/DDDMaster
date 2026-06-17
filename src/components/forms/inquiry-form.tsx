"use client";

import { Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import type { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { budgetRanges, eventTypes } from "@/data/seed-content";
import { inquirySchema } from "@/lib/validators";

type InquiryFormValues = z.input<typeof inquirySchema>;
type FieldErrors = Partial<Record<keyof InquiryFormValues, string>>;

const crmFields = {
  firstName: "first_name",
  lastName: "last_name",
  email: "email",
  phone: "phone",
  eventDate: "Event Date",
  eventType: "Event Type",
  venue: "Event Location / Venue",
  eventStartTime: "Event Start Time",
  eventThemeOrColors: "Event Theme or Colors",
  guestCount: "Estimated Guest Count",
  installationTime: "Installation Time",
  strikeTime: "Strike / Breakdown Time",
  servicesNeeded: "Which services are you interested in?",
  budgetRange: "What is your estimated décor budget?",
  inspirationNotes: "Tell us more about your event or design vision.",
  marketingConsent: "Marketing Consent",
} as const;

function getText(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

function getAllText(formData: FormData, name: string) {
  return formData
    .getAll(name)
    .map((value) => String(value).trim())
    .filter(Boolean);
}

function payloadFromForm(formData: FormData): InquiryFormValues {
  return {
    first_name: getText(formData, crmFields.firstName),
    last_name: getText(formData, crmFields.lastName),
    email: getText(formData, crmFields.email),
    phone: getText(formData, crmFields.phone),
    eventType: getText(formData, crmFields.eventType) as InquiryFormValues["eventType"],
    eventDate: getText(formData, crmFields.eventDate),
    eventStartTime: getText(formData, crmFields.eventStartTime),
    venue: getText(formData, crmFields.venue),
    eventThemeOrColors: getText(formData, crmFields.eventThemeOrColors),
    budgetRange: getText(formData, crmFields.budgetRange) as InquiryFormValues["budgetRange"],
    guestCount: Number(getText(formData, crmFields.guestCount)),
    installationTime: getText(formData, crmFields.installationTime),
    strikeTime: getText(formData, crmFields.strikeTime),
    inspirationNotes: getText(formData, crmFields.inspirationNotes),
    servicesNeeded: getAllText(formData, crmFields.servicesNeeded),
    inspirationImages: [],
    consultationSlotId: getText(formData, "consultationSlotId"),
    marketingConsent: formData.has(crmFields.marketingConsent),
    website: getText(formData, "website"),
  };
}

export function InquiryForm({
  services,
}: {
  services: ReadonlyArray<{ title: string }>;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const nativeSubmitStartedRef = useRef(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    setSubmitError("");
    setFieldErrors({});

    const result = inquirySchema.safeParse(payloadFromForm(new FormData(event.currentTarget)));

    if (!result.success) {
      event.preventDefault();
      const nextErrors: FieldErrors = {};

      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof InquiryFormValues | undefined;

        if (field && !nextErrors[field]) {
          nextErrors[field] = issue.message;
        }
      }

      setFieldErrors(nextErrors);
      setSubmitError("Please complete the required fields before submitting.");
      return;
    }

    nativeSubmitStartedRef.current = true;
    setSubmitting(true);
  }

  function onNativeSubmitComplete() {
    if (nativeSubmitStartedRef.current) {
      nativeSubmitStartedRef.current = false;
      setSubmitting(false);
      setSubmitted(true);
      formRef.current?.reset();
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
        <form
          ref={formRef}
          id="event-inquiry-form"
          name="Event Inquiry Form"
          data-form-id="6xA2Z6YDHU2YM26MEREd"
          data-form-name="Event Inquiry Form"
          action="/api/inquiries"
          className="space-y-6"
          method="post"
          onSubmit={onSubmit}
          target="inquiry-submit-frame"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="First Name" error={fieldErrors.first_name}>
              <Input name={crmFields.firstName} autoComplete="given-name" required />
            </Field>
            <Field label="Last Name" error={fieldErrors.last_name}>
              <Input name={crmFields.lastName} autoComplete="family-name" required />
            </Field>
            <Field label="Email" error={fieldErrors.email}>
              <Input name={crmFields.email} type="email" autoComplete="email" required />
            </Field>
            <Field label="Phone" error={fieldErrors.phone}>
              <Input name={crmFields.phone} type="tel" autoComplete="tel" required />
            </Field>
            <Field label="Event Date" error={fieldErrors.eventDate}>
              <Input name={crmFields.eventDate} type="date" required />
            </Field>
            <Field label="Event Type" error={fieldErrors.eventType}>
              <select
                name={crmFields.eventType}
                className="flex h-12 w-full rounded-2xl border border-[color:var(--border)] bg-white/80 px-4 text-sm"
                defaultValue="Wedding"
                required
              >
                {eventTypes.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Event Location / Venue" error={fieldErrors.venue}>
              <Input name={crmFields.venue} required />
            </Field>
            <Field label="Event Start Time" error={fieldErrors.eventStartTime}>
              <Input name={crmFields.eventStartTime} type="time" />
            </Field>
            <Field label="Event Theme or Colors" error={fieldErrors.eventThemeOrColors}>
              <Input name={crmFields.eventThemeOrColors} />
            </Field>
            <Field label="Estimated Guest Count" error={fieldErrors.guestCount}>
              <Input name={crmFields.guestCount} type="number" min={1} defaultValue={50} required />
            </Field>
            <Field label="Installation Time" error={fieldErrors.installationTime}>
              <Input name={crmFields.installationTime} type="time" />
            </Field>
            <Field label="Strike / Breakdown Time" error={fieldErrors.strikeTime}>
              <Input name={crmFields.strikeTime} type="time" />
            </Field>
          </div>

          <Field
            label="Which services are you interested in?"
            error={fieldErrors.servicesNeeded}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {services.map((service) => (
                <label
                  key={service.title}
                  className="flex items-center gap-3 rounded-2xl border border-[color:var(--border)] bg-white/70 px-4 py-3 text-sm"
                >
                  <input
                    type="checkbox"
                    name={crmFields.servicesNeeded}
                    value={service.title}
                  />
                  {service.title}
                </label>
              ))}
            </div>
          </Field>

          <Field
            label="What is your estimated décor budget?"
            error={fieldErrors.budgetRange}
          >
            <select
              name={crmFields.budgetRange}
              className="flex h-12 w-full rounded-2xl border border-[color:var(--border)] bg-white/80 px-4 text-sm"
              defaultValue="$3,000 - $5,000"
              required
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
            error={fieldErrors.inspirationNotes}
          >
            <Textarea
              name={crmFields.inspirationNotes}
              minLength={20}
              placeholder="Share the feeling, colors, venue details, focal moments, and any must-haves."
              required
            />
          </Field>

          <label className="flex items-start gap-3 rounded-2xl border border-[color:var(--border)] bg-white/70 px-4 py-3 text-sm leading-6 text-[color:var(--muted-foreground)]">
            <input
              name={crmFields.marketingConsent}
              value="Yes"
              type="checkbox"
              className="mt-1"
            />
            <span>
              By checking this box, I consent to receive marketing and promotional
              messages, including special offers, discounts, and product updates, at the
              phone number provided. Message frequency may vary. Message and data rates
              may apply. Text HELP for assistance or reply STOP to opt out.
            </span>
          </label>

          <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
          <input type="hidden" name="consultationSlotId" />

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
        <iframe
          className="hidden"
          name="inquiry-submit-frame"
          title="Inquiry submit frame"
          onLoad={onNativeSubmitComplete}
        />
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
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}

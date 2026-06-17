import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { budgetRanges, eventTypes } from "@/data/seed-content";

const formId = "FEWk0e24K6bxe3nchsxy";
const formName = "Event Inquiry Form";

export function InquiryForm({
  services,
}: {
  services: ReadonlyArray<{ title: string }>;
}) {
  return (
    <Card>
      <CardContent>
        <form
          id="event-inquiry-form"
          name={formName}
          data-form-id={formId}
          data-form-name={formName}
          action="/api/inquiries"
          className="space-y-6"
          method="post"
        >
          <input type="hidden" name="source" value="Divine Decor Website" />
          <input type="hidden" name="submitted_page_path" value="/inquire" />
          <input type="hidden" name="submitted_form_name" value={formName} />

          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="First Name">
              <Input name="first_name" autoComplete="given-name" required />
            </Field>
            <Field label="Last Name">
              <Input name="last_name" autoComplete="family-name" required />
            </Field>
            <Field label="Email">
              <Input name="email" type="email" autoComplete="email" required />
            </Field>
            <Field label="Phone">
              <Input name="phone" type="tel" autoComplete="tel" required />
            </Field>
            <Field label="Event Date">
              <Input name="event_date" type="date" required />
            </Field>
            <Field label="Event Type">
              <select
                name="event_type"
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
            <Field label="Event Location / Venue">
              <Input name="event_location" required />
            </Field>
            <Field label="Event Start Time">
              <Input name="event_start_time" type="time" />
            </Field>
            <Field label="Event Theme or Colors">
              <Input name="event_theme_colors" />
            </Field>
            <Field label="Estimated Guest Count">
              <Input name="estimated_guest_count" type="number" min={1} defaultValue={50} required />
            </Field>
            <Field label="Installation Time">
              <Input name="installation_time" type="time" />
            </Field>
            <Field label="Strike / Breakdown Time">
              <Input name="strike_breakdown_time" type="time" />
            </Field>
          </div>

          <Field label="Which services are you interested in?">
            <div className="grid gap-3 sm:grid-cols-2">
              {services.map((service) => (
                <label
                  key={service.title}
                  className="flex items-center gap-3 rounded-2xl border border-[color:var(--border)] bg-white/70 px-4 py-3 text-sm"
                >
                  <input
                    type="checkbox"
                    name="services_interested"
                    value={service.title}
                  />
                  {service.title}
                </label>
              ))}
            </div>
          </Field>

          <Field label="What is your estimated décor budget?">
            <select
              name="estimated_decor_budget"
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

          <Field label="Tell us more about your event or design vision.">
            <Textarea
              name="event_design_vision"
              minLength={20}
              placeholder="Share the feeling, colors, venue details, focal moments, and any must-haves."
              required
            />
          </Field>

          <label className="flex items-start gap-3 rounded-2xl border border-[color:var(--border)] bg-white/70 px-4 py-3 text-sm leading-6 text-[color:var(--muted-foreground)]">
            <input
              name="marketing_consent"
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
          <input type="hidden" name="consultation_slot_id" />

          <Button type="submit" className="w-full">
            Submit inquiry
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { budgetRanges, eventTypes } from "@/data/seed-content";

export function InquiryForm({
  services,
}: {
  services: ReadonlyArray<{ title: string }>;
}) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4 sm:p-6">
        <form action="/api/inquiries" method="post" className="space-y-6">
          <input type="hidden" name="source" value="Divine Decor Website" />
          <input type="hidden" name="submitted_page_path" value="/inquire" />
          <input type="hidden" name="submitted_form_name" value="Event Inquiry Form" />
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website-field">Leave this blank</label>
            <input id="website-field" name="website" tabIndex={-1} autoComplete="off" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label htmlFor="first_name">First name *</Label><Input id="first_name" name="first_name" autoComplete="given-name" required /></div>
            <div className="space-y-2"><Label htmlFor="last_name">Last name *</Label><Input id="last_name" name="last_name" autoComplete="family-name" required /></div>
            <div className="space-y-2"><Label htmlFor="email">Email *</Label><Input id="email" name="email" type="email" autoComplete="email" required /></div>
            <div className="space-y-2"><Label htmlFor="phone">Phone *</Label><Input id="phone" name="phone" type="tel" autoComplete="tel" required minLength={10} /></div>
            <div className="space-y-2"><Label htmlFor="event_type">Event type *</Label><select id="event_type" name="event_type" required defaultValue="" className="w-full rounded-xl border border-[color:var(--border)] bg-white px-4 py-3 text-sm"><option value="" disabled>Select an event</option>{eventTypes.map((type) => <option key={type} value={type}>{type}</option>)}</select></div>
            <div className="space-y-2"><Label htmlFor="event_date">Event date *</Label><Input id="event_date" name="event_date" type="date" required /></div>
            <div className="space-y-2"><Label htmlFor="event_start_time">Event start time</Label><Input id="event_start_time" name="event_start_time" type="time" /></div>
            <div className="space-y-2"><Label htmlFor="event_location">Venue / location *</Label><Input id="event_location" name="event_location" required minLength={2} /></div>
            <div className="space-y-2"><Label htmlFor="estimated_guest_count">Estimated guest count *</Label><Input id="estimated_guest_count" name="estimated_guest_count" type="number" min={1} max={5000} required /></div>
            <div className="space-y-2"><Label htmlFor="estimated_decor_budget">Decor budget *</Label><select id="estimated_decor_budget" name="estimated_decor_budget" required defaultValue="" className="w-full rounded-xl border border-[color:var(--border)] bg-white px-4 py-3 text-sm"><option value="" disabled>Select a budget</option>{budgetRanges.map((range) => <option key={range} value={range}>{range}</option>)}</select></div>
            <div className="space-y-2"><Label htmlFor="event_theme_colors">Theme / colors</Label><Input id="event_theme_colors" name="event_theme_colors" /></div>
            <div className="space-y-2"><Label htmlFor="installation_time">Installation time</Label><Input id="installation_time" name="installation_time" type="time" /></div>
            <div className="space-y-2"><Label htmlFor="strike_breakdown_time">Breakdown time</Label><Input id="strike_breakdown_time" name="strike_breakdown_time" type="time" /></div>
          </div>
          <fieldset className="space-y-3">
            <legend className="text-sm font-medium">Services interested in *</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {services.map(({ title }) => <label key={title} className="flex items-center gap-3 text-sm"><input type="checkbox" name="services_interested" value={title} />{title}</label>)}
            </div>
            <p className="text-xs text-[color:var(--muted-foreground)]">Select at least one service.</p>
          </fieldset>
          <div className="space-y-2"><Label htmlFor="event_design_vision">Tell us about your event vision *</Label><Textarea id="event_design_vision" name="event_design_vision" minLength={20} required placeholder="Describe the atmosphere, styling, and details you have in mind..." /></div>
          <label className="flex items-start gap-3 text-sm"><input type="checkbox" name="marketing_consent" value="yes" />I agree to receive optional marketing updates.</label>
          <Button type="submit" className="w-full">Send event inquiry</Button>
          <p className="text-xs text-[color:var(--muted-foreground)]">Your inquiry is sent directly to Divine Design and Decor.</p>
        </form>
      </CardContent>
    </Card>
  );
}

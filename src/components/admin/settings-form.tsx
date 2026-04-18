"use client";

import { Loader2, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { ImageUploadField } from "@/components/forms/image-upload-field";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { BookingStep, HomeStatistic, SiteSettings } from "@/types/content";

type SettingsFormProps = {
  settings: SiteSettings;
};

type SettingsFormState = {
  phone: string;
  email: string;
  instagramHandle: string;
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  heroImage: string;
  heroImageAlt: string;
  story: string;
  mission: string;
  serviceAreas: string[];
  statistics: HomeStatistic[];
  featuredCategoryLabels: string[];
  galleryHeadline: string;
  galleryCopy: string;
  showcaseEyebrow: string;
  showcaseTitle: string;
  showcaseCopy: string;
  showcasePrimaryImage: string;
  showcasePrimaryImageAlt: string;
  showcaseSecondaryImage: string;
  showcaseSecondaryImageAlt: string;
  servicesHeadline: string;
  servicesCopy: string;
  testimonialsHeadline: string;
  testimonialsCopy: string;
  bookingSteps: BookingStep[];
  processHeadline: string;
  processCopy: string;
  socialProofHeadline: string;
  socialProofCopy: string;
  serviceAreasHeadline: string;
  serviceAreasCopy: string;
  faqHeadline: string;
  faqCopy: string;
  investmentHeadline: string;
  investmentCopy: string;
  ctaBannerTitle: string;
  ctaBannerCopy: string;
  consultationDurationMinutes: string;
};

type TextFieldProps = {
  label: string;
  value: string;
  helper?: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "number";
};

type TextAreaFieldProps = {
  label: string;
  value: string;
  helper?: string;
  onChange: (value: string) => void;
};

type ImageFieldProps = {
  label: string;
  helper: string;
  value: string;
  altLabel: string;
  altValue: string;
  onChange: (value: string) => void;
  onAltChange: (value: string) => void;
};

type ListEditorProps = {
  label: string;
  helper: string;
  items: string[];
  addLabel: string;
  onChange: (items: string[]) => void;
};

type StatisticsEditorProps = {
  items: HomeStatistic[];
  onChange: (items: HomeStatistic[]) => void;
};

type BookingStepsEditorProps = {
  items: BookingStep[];
  onChange: (items: BookingStep[]) => void;
};

function TextField({ label, value, helper, onChange, type = "text" }: TextFieldProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-semibold text-[color:var(--foreground)]">{label}</Label>
      <Input type={type} value={value} onChange={(event) => onChange(event.target.value)} />
      {helper ? (
        <p className="text-sm leading-6 text-[color:var(--muted-foreground)]">{helper}</p>
      ) : null}
    </div>
  );
}

function TextAreaField({ label, value, helper, onChange }: TextAreaFieldProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-semibold text-[color:var(--foreground)]">{label}</Label>
      <Textarea value={value} onChange={(event) => onChange(event.target.value)} />
      {helper ? (
        <p className="text-sm leading-6 text-[color:var(--muted-foreground)]">{helper}</p>
      ) : null}
    </div>
  );
}

function ImageField({
  label,
  helper,
  value,
  altLabel,
  altValue,
  onChange,
  onAltChange,
}: ImageFieldProps) {
  return (
    <div className="space-y-4 rounded-[1.75rem] border border-[color:var(--border)] bg-[color:var(--secondary)]/35 p-5">
      <div>
        <h4 className="text-lg font-semibold text-[color:var(--foreground)]">{label}</h4>
        <p className="mt-1 text-sm leading-6 text-[color:var(--muted-foreground)]">{helper}</p>
      </div>
      <ImageUploadField
        label={`${label} image`}
        multiple={false}
        value={value ? [value] : []}
        onChange={(urls) => onChange(urls[0] ?? "")}
      />
      <TextField label={altLabel} value={altValue} onChange={onAltChange} />
    </div>
  );
}

function ListEditor({ label, helper, items, addLabel, onChange }: ListEditorProps) {
  return (
    <div className="space-y-4 rounded-[1.75rem] border border-[color:var(--border)] bg-white/70 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="text-lg font-semibold text-[color:var(--foreground)]">{label}</h4>
          <p className="mt-1 text-sm leading-6 text-[color:var(--muted-foreground)]">{helper}</p>
        </div>
        <Button
          type="button"
          variant="secondary"
          onClick={() => onChange([...items, ""])}
        >
          <Plus className="size-4" />
          {addLabel}
        </Button>
      </div>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={`${label}-${index}`} className="flex items-center gap-3">
            <Input
              value={item}
              onChange={(event) =>
                onChange(
                  items.map((current, currentIndex) =>
                    currentIndex === index ? event.target.value : current,
                  ),
                )
              }
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => onChange(items.filter((_, currentIndex) => currentIndex !== index))}
              aria-label={`Remove ${label} item ${index + 1}`}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatisticsEditor({ items, onChange }: StatisticsEditorProps) {
  return (
    <div className="space-y-4 rounded-[1.75rem] border border-[color:var(--border)] bg-white/70 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="text-lg font-semibold text-[color:var(--foreground)]">Homepage stats</h4>
          <p className="mt-1 text-sm leading-6 text-[color:var(--muted-foreground)]">
            Use short numbers and plain labels, like 150+ events styled.
          </p>
        </div>
        <Button
          type="button"
          variant="secondary"
          onClick={() => onChange([...items, { value: "", label: "" }])}
        >
          <Plus className="size-4" />
          Add stat
        </Button>
      </div>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={`stat-${index}`}
            className="grid gap-3 rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--secondary)]/25 p-4 md:grid-cols-[180px_1fr_auto]"
          >
            <Input
              value={item.value}
              onChange={(event) =>
                onChange(
                  items.map((current, currentIndex) =>
                    currentIndex === index
                      ? { ...current, value: event.target.value }
                      : current,
                  ),
                )
              }
              placeholder="150+"
            />
            <Input
              value={item.label}
              onChange={(event) =>
                onChange(
                  items.map((current, currentIndex) =>
                    currentIndex === index
                      ? { ...current, label: event.target.value }
                      : current,
                  ),
                )
              }
              placeholder="events styled"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => onChange(items.filter((_, currentIndex) => currentIndex !== index))}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function BookingStepsEditor({ items, onChange }: BookingStepsEditorProps) {
  return (
    <div className="space-y-4 rounded-[1.75rem] border border-[color:var(--border)] bg-white/70 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="text-lg font-semibold text-[color:var(--foreground)]">Booking steps</h4>
          <p className="mt-1 text-sm leading-6 text-[color:var(--muted-foreground)]">
            Keep each step short and reassuring so visitors know what happens next.
          </p>
        </div>
        <Button
          type="button"
          variant="secondary"
          onClick={() => onChange([...items, { title: "", description: "" }])}
        >
          <Plus className="size-4" />
          Add step
        </Button>
      </div>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={`step-${index}`}
            className="space-y-3 rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--secondary)]/25 p-4"
          >
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--muted-foreground)]">
                Step {index + 1}
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  onChange(items.filter((_, currentIndex) => currentIndex !== index))
                }
              >
                <Trash2 className="size-4" />
                Remove
              </Button>
            </div>
            <Input
              value={item.title}
              onChange={(event) =>
                onChange(
                  items.map((current, currentIndex) =>
                    currentIndex === index
                      ? { ...current, title: event.target.value }
                      : current,
                  ),
                )
              }
              placeholder="Inquire"
            />
            <Textarea
              value={item.description}
              onChange={(event) =>
                onChange(
                  items.map((current, currentIndex) =>
                    currentIndex === index
                      ? { ...current, description: event.target.value }
                      : current,
                  ),
                )
              }
              placeholder="Explain what happens in this step."
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="bg-white/88">
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-[family-name:var(--font-display)] text-3xl text-[color:var(--foreground)]">
            {title}
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-[color:var(--muted-foreground)]">
            {description}
          </p>
        </div>
        {children}
      </CardContent>
    </Card>
  );
}

function createInitialState(settings: SiteSettings): SettingsFormState {
  return {
    phone: settings.phone,
    email: settings.email,
    instagramHandle: settings.instagramHandle,
    heroBadge: settings.heroBadge,
    heroTitle: settings.heroTitle,
    heroSubtitle: settings.heroSubtitle,
    heroPrimaryCta: settings.heroPrimaryCta,
    heroSecondaryCta: settings.heroSecondaryCta,
    heroImage: settings.heroImage,
    heroImageAlt: settings.heroImageAlt,
    story: settings.story,
    mission: settings.mission,
    serviceAreas: settings.serviceAreas,
    statistics: settings.statistics,
    featuredCategoryLabels: settings.featuredCategoryLabels,
    galleryHeadline: settings.galleryHeadline,
    galleryCopy: settings.galleryCopy,
    showcaseEyebrow: settings.showcaseEyebrow,
    showcaseTitle: settings.showcaseTitle,
    showcaseCopy: settings.showcaseCopy,
    showcasePrimaryImage: settings.showcasePrimaryImage,
    showcasePrimaryImageAlt: settings.showcasePrimaryImageAlt,
    showcaseSecondaryImage: settings.showcaseSecondaryImage,
    showcaseSecondaryImageAlt: settings.showcaseSecondaryImageAlt,
    servicesHeadline: settings.servicesHeadline,
    servicesCopy: settings.servicesCopy,
    testimonialsHeadline: settings.testimonialsHeadline,
    testimonialsCopy: settings.testimonialsCopy,
    bookingSteps: settings.bookingSteps,
    processHeadline: settings.processHeadline,
    processCopy: settings.processCopy,
    socialProofHeadline: settings.socialProofHeadline,
    socialProofCopy: settings.socialProofCopy,
    serviceAreasHeadline: settings.serviceAreasHeadline,
    serviceAreasCopy: settings.serviceAreasCopy,
    faqHeadline: settings.faqHeadline,
    faqCopy: settings.faqCopy,
    investmentHeadline: settings.investmentHeadline,
    investmentCopy: settings.investmentCopy,
    ctaBannerTitle: settings.ctaBannerTitle,
    ctaBannerCopy: settings.ctaBannerCopy,
    consultationDurationMinutes: String(settings.consultationDurationMinutes),
  };
}

export function SettingsForm({ settings }: SettingsFormProps) {
  const router = useRouter();
  const [formState, setFormState] = useState<SettingsFormState>(() =>
    createInitialState(settings),
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  function updateField<Key extends keyof SettingsFormState>(
    field: Key,
    value: SettingsFormState[Key],
  ) {
    setFormState((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    const payload = {
      ...formState,
      serviceAreas: formState.serviceAreas.map((item) => item.trim()).filter(Boolean),
      statistics: formState.statistics
        .map((item) => ({
          value: item.value.trim(),
          label: item.label.trim(),
        }))
        .filter((item) => item.value && item.label),
      featuredCategoryLabels: formState.featuredCategoryLabels
        .map((item) => item.trim())
        .filter(Boolean),
      bookingSteps: formState.bookingSteps
        .map((item) => ({
          title: item.title.trim(),
          description: item.description.trim(),
        }))
        .filter((item) => item.title && item.description),
      consultationDurationMinutes: Number(formState.consultationDurationMinutes),
    };

    const response = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    setSaving(false);

    if (!response.ok) {
      setMessage(result.error ?? "Unable to save settings.");
      return;
    }

    setMessage("Homepage content saved.");
    router.refresh();
  }

  return (
    <Card className="bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(250,244,252,0.92))]">
      <CardContent className="space-y-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--muted-foreground)]">
              Content studio
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[color:var(--foreground)]">
              Homepage settings
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-8 text-[color:var(--muted-foreground)]">
              Everything here updates the public homepage, including the main images,
              headlines, supporting copy, service areas, process steps, and call-to-action
              sections.
            </p>
          </div>
          <div className="rounded-[1.5rem] bg-[color:var(--secondary)]/55 px-5 py-4 text-sm leading-7 text-[color:var(--foreground)]">
            Designed for simple editing: each section is grouped by what visitors see on
            the page.
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <SectionCard
            title="Contact and scheduling"
            description="Keep your contact details and consultation length up to date."
          >
            <div className="grid gap-5 md:grid-cols-2">
              <TextField
                label="Phone number"
                value={formState.phone}
                onChange={(value) => updateField("phone", value)}
              />
              <TextField
                label="Email address"
                type="email"
                value={formState.email}
                onChange={(value) => updateField("email", value)}
              />
              <TextField
                label="Instagram handle"
                value={formState.instagramHandle}
                helper="Example: @divinedesigndecor"
                onChange={(value) => updateField("instagramHandle", value)}
              />
              <TextField
                label="Consultation length in minutes"
                type="number"
                value={formState.consultationDurationMinutes}
                onChange={(value) => updateField("consultationDurationMinutes", value)}
              />
            </div>
          </SectionCard>

          <SectionCard
            title="Hero section"
            description="This is the first thing people see when they land on the homepage."
          >
            <div className="grid gap-5 lg:grid-cols-2">
              <TextField
                label="Top badge"
                value={formState.heroBadge}
                helper="A short line that explains what you offer in plain language."
                onChange={(value) => updateField("heroBadge", value)}
              />
              <TextField
                label="Main headline"
                value={formState.heroTitle}
                onChange={(value) => updateField("heroTitle", value)}
              />
            </div>
            <TextAreaField
              label="Hero description"
              value={formState.heroSubtitle}
              onChange={(value) => updateField("heroSubtitle", value)}
            />
            <div className="grid gap-5 md:grid-cols-2">
              <TextField
                label="Primary button text"
                value={formState.heroPrimaryCta}
                helper="This button takes people to the inquiry page."
                onChange={(value) => updateField("heroPrimaryCta", value)}
              />
              <TextField
                label="Secondary button text"
                value={formState.heroSecondaryCta}
                helper="This button takes people to the gallery page."
                onChange={(value) => updateField("heroSecondaryCta", value)}
              />
            </div>
            <ImageField
              label="Hero image"
              helper="Upload the main homepage image. A strong horizontal photo works best."
              value={formState.heroImage}
              altLabel="Hero image description"
              altValue={formState.heroImageAlt}
              onChange={(value) => updateField("heroImage", value)}
              onAltChange={(value) => updateField("heroImageAlt", value)}
            />
          </SectionCard>

          <SectionCard
            title="Brand story and highlights"
            description="These sections explain who you are and the types of events you want to feature."
          >
            <div className="grid gap-5 lg:grid-cols-2">
              <TextAreaField
                label="Story"
                value={formState.story}
                onChange={(value) => updateField("story", value)}
              />
              <TextAreaField
                label="Mission"
                value={formState.mission}
                onChange={(value) => updateField("mission", value)}
              />
            </div>
            <ListEditor
              label="Featured event labels"
              helper="These appear near the hero image to show what you are best known for."
              items={formState.featuredCategoryLabels}
              addLabel="Add label"
              onChange={(items) => updateField("featuredCategoryLabels", items)}
            />
            <StatisticsEditor
              items={formState.statistics}
              onChange={(items) => updateField("statistics", items)}
            />
          </SectionCard>

          <SectionCard
            title="Gallery introduction"
            description="This copy introduces the gallery preview section on the homepage."
          >
            <div className="grid gap-5 lg:grid-cols-2">
              <TextField
                label="Gallery section headline"
                value={formState.galleryHeadline}
                onChange={(value) => updateField("galleryHeadline", value)}
              />
              <TextAreaField
                label="Gallery section description"
                value={formState.galleryCopy}
                onChange={(value) => updateField("galleryCopy", value)}
              />
            </div>
          </SectionCard>

          <SectionCard
            title="Showcase images and message"
            description="This section supports the homepage transformation story with two images and supporting text."
          >
            <div className="grid gap-5 lg:grid-cols-2">
              <TextField
                label="Showcase eyebrow"
                value={formState.showcaseEyebrow}
                onChange={(value) => updateField("showcaseEyebrow", value)}
              />
              <TextField
                label="Showcase headline"
                value={formState.showcaseTitle}
                onChange={(value) => updateField("showcaseTitle", value)}
              />
            </div>
            <TextAreaField
              label="Showcase description"
              value={formState.showcaseCopy}
              onChange={(value) => updateField("showcaseCopy", value)}
            />
            <div className="grid gap-5 lg:grid-cols-2">
              <ImageField
                label="Showcase image one"
                helper="Use a close-up or feature shot that feels polished and welcoming."
                value={formState.showcasePrimaryImage}
                altLabel="Image one description"
                altValue={formState.showcasePrimaryImageAlt}
                onChange={(value) => updateField("showcasePrimaryImage", value)}
                onAltChange={(value) => updateField("showcasePrimaryImageAlt", value)}
              />
              <ImageField
                label="Showcase image two"
                helper="Use a second image that complements the first and shows variety."
                value={formState.showcaseSecondaryImage}
                altLabel="Image two description"
                altValue={formState.showcaseSecondaryImageAlt}
                onChange={(value) => updateField("showcaseSecondaryImage", value)}
                onAltChange={(value) => updateField("showcaseSecondaryImageAlt", value)}
              />
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              <TextField
                label="Social proof headline"
                value={formState.socialProofHeadline}
                onChange={(value) => updateField("socialProofHeadline", value)}
              />
              <TextAreaField
                label="Social proof description"
                value={formState.socialProofCopy}
                onChange={(value) => updateField("socialProofCopy", value)}
              />
            </div>
          </SectionCard>

          <SectionCard
            title="Services and testimonials"
            description="These headings introduce your services and review sections on the homepage."
          >
            <div className="grid gap-5 lg:grid-cols-2">
              <TextField
                label="Services headline"
                value={formState.servicesHeadline}
                onChange={(value) => updateField("servicesHeadline", value)}
              />
              <TextAreaField
                label="Services description"
                value={formState.servicesCopy}
                onChange={(value) => updateField("servicesCopy", value)}
              />
              <TextField
                label="Testimonials headline"
                value={formState.testimonialsHeadline}
                onChange={(value) => updateField("testimonialsHeadline", value)}
              />
              <TextAreaField
                label="Testimonials description"
                value={formState.testimonialsCopy}
                onChange={(value) => updateField("testimonialsCopy", value)}
              />
            </div>
          </SectionCard>

          <SectionCard
            title="Process, areas, and FAQ"
            description="Update the sections that help visitors understand your process and where you work."
          >
            <div className="grid gap-5 lg:grid-cols-2">
              <TextField
                label="Process headline"
                value={formState.processHeadline}
                onChange={(value) => updateField("processHeadline", value)}
              />
              <TextAreaField
                label="Process description"
                value={formState.processCopy}
                onChange={(value) => updateField("processCopy", value)}
              />
              <TextField
                label="Service areas headline"
                value={formState.serviceAreasHeadline}
                onChange={(value) => updateField("serviceAreasHeadline", value)}
              />
              <TextAreaField
                label="Service areas description"
                value={formState.serviceAreasCopy}
                onChange={(value) => updateField("serviceAreasCopy", value)}
              />
              <TextField
                label="FAQ headline"
                value={formState.faqHeadline}
                onChange={(value) => updateField("faqHeadline", value)}
              />
              <TextAreaField
                label="FAQ description"
                value={formState.faqCopy}
                onChange={(value) => updateField("faqCopy", value)}
              />
            </div>
            <ListEditor
              label="Service areas"
              helper="Add one service area per line item."
              items={formState.serviceAreas}
              addLabel="Add area"
              onChange={(items) => updateField("serviceAreas", items)}
            />
            <BookingStepsEditor
              items={formState.bookingSteps}
              onChange={(items) => updateField("bookingSteps", items)}
            />
          </SectionCard>

          <SectionCard
            title="Packages and final call to action"
            description="This section closes the homepage with package guidance and your final booking prompt."
          >
            <div className="grid gap-5 lg:grid-cols-2">
              <TextField
                label="Investment headline"
                value={formState.investmentHeadline}
                onChange={(value) => updateField("investmentHeadline", value)}
              />
              <TextAreaField
                label="Investment description"
                value={formState.investmentCopy}
                onChange={(value) => updateField("investmentCopy", value)}
              />
              <TextField
                label="Final call-to-action headline"
                value={formState.ctaBannerTitle}
                onChange={(value) => updateField("ctaBannerTitle", value)}
              />
              <TextAreaField
                label="Final call-to-action description"
                value={formState.ctaBannerCopy}
                onChange={(value) => updateField("ctaBannerCopy", value)}
              />
            </div>
          </SectionCard>

          {message ? (
            <p className="text-sm font-medium text-[color:var(--muted-foreground)]">{message}</p>
          ) : null}

          <div className="sticky bottom-4 flex justify-end">
            <Button type="submit" size="lg" disabled={saving} className="min-w-56">
              {saving ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Saving changes
                </>
              ) : (
                "Save homepage settings"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

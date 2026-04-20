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

type SaveTone = "neutral" | "success" | "error" | "warning";

type SettingsFormState = {
  phone: string;
  email: string;
  instagramHandle: string;
  instagramUrl: string;
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
  instagramSectionEyebrow: string;
  instagramSectionTitle: string;
  instagramSectionCopy: string;
  instagramImages: string[];
  testimonialsHeadline: string;
  testimonialsCopy: string;
  testimonialsSupportEyebrow: string;
  testimonialsSupportTitle: string;
  testimonialsSupportCopy: string;
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

type ImageGalleryFieldProps = {
  label: string;
  helper: string;
  value: string[];
  onChange: (value: string[]) => void;
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

function ImageGalleryField({ label, helper, value, onChange }: ImageGalleryFieldProps) {
  return (
    <div className="space-y-4 rounded-[1.75rem] border border-[color:var(--border)] bg-[color:var(--secondary)]/35 p-5">
      <div>
        <h4 className="text-lg font-semibold text-[color:var(--foreground)]">{label}</h4>
        <p className="mt-1 text-sm leading-6 text-[color:var(--muted-foreground)]">{helper}</p>
      </div>
      <ImageUploadField label={label} multiple value={value} onChange={onChange} />
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
          <h4 className="text-lg font-semibold text-[color:var(--foreground)]">Site stats</h4>
          <p className="mt-1 text-sm leading-6 text-[color:var(--muted-foreground)]">
            These stats appear on the homepage and the testimonials page. Use real numbers only.
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
  appearsOn,
  children,
}: {
  title: string;
  description: string;
  appearsOn?: string[];
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
          {appearsOn?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {appearsOn.map((item) => (
                <span
                  key={`${title}-${item}`}
                  className="rounded-full bg-[color:var(--secondary)]/55 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--secondary-foreground)]"
                >
                  {item}
                </span>
              ))}
            </div>
          ) : null}
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
    instagramUrl: settings.instagramUrl,
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
    instagramSectionEyebrow: settings.instagramSectionEyebrow,
    instagramSectionTitle: settings.instagramSectionTitle,
    instagramSectionCopy: settings.instagramSectionCopy,
    instagramImages: settings.instagramImages,
    testimonialsHeadline: settings.testimonialsHeadline,
    testimonialsCopy: settings.testimonialsCopy,
    testimonialsSupportEyebrow: settings.testimonialsSupportEyebrow,
    testimonialsSupportTitle: settings.testimonialsSupportTitle,
    testimonialsSupportCopy: settings.testimonialsSupportCopy,
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

function getFormFingerprint(formState: SettingsFormState) {
  return JSON.stringify(formState);
}

function getStatusStyles(tone: SaveTone) {
  switch (tone) {
    case "success":
      return "border-emerald-200 bg-emerald-50 text-emerald-900";
    case "error":
      return "border-red-200 bg-red-50 text-red-900";
    case "warning":
      return "border-amber-200 bg-amber-50 text-amber-900";
    default:
      return "border-[color:var(--border)] bg-white/80 text-[color:var(--foreground)]";
  }
}

function formatSavedTime(date: Date) {
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function SettingsForm({ settings }: SettingsFormProps) {
  const router = useRouter();
  const [formState, setFormState] = useState<SettingsFormState>(() => createInitialState(settings));
  const [savedState, setSavedState] = useState<SettingsFormState>(() => createInitialState(settings));
  const [saving, setSaving] = useState(false);
  const [statusTone, setStatusTone] = useState<SaveTone>("neutral");
  const [statusMessage, setStatusMessage] = useState(
    "You are editing the live homepage, plus the phone and email shown in the site header and footer.",
  );

  const hasUnsavedChanges = getFormFingerprint(formState) !== getFormFingerprint(savedState);

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
    setStatusTone("neutral");
    setStatusMessage("Saving homepage changes now...");

    const payload = {
      ...formState,
      serviceAreas: formState.serviceAreas.map((item) => item.trim()).filter(Boolean),
      instagramImages: formState.instagramImages.map((item) => item.trim()).filter(Boolean),
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
      setStatusTone("error");
      setStatusMessage(result.error ?? "Unable to save settings.");
      return;
    }

    const nextSavedState = createInitialState(result.settings as SiteSettings);
    setSavedState(nextSavedState);
    setFormState(nextSavedState);
    setStatusTone("success");
    setStatusMessage(
      `Homepage changes saved at ${formatSavedTime(new Date())}. The public site has been refreshed.`,
    );
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

        <div
          className={`rounded-[1.75rem] border px-5 py-4 text-sm leading-7 ${getStatusStyles(
            saving ? "neutral" : statusTone === "neutral" && hasUnsavedChanges ? "warning" : statusTone,
          )}`}
        >
          <p className="font-semibold">
            {saving
              ? "Saving homepage changes..."
              : statusMessage}
          </p>
          <p className="mt-1">
            {saving
              ? "Please wait while your content and images are being updated."
              : hasUnsavedChanges
                ? "You have unsaved changes on this page."
                : "No unsaved changes right now."}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-sm">
          {[
            "Homepage top area",
            "Homepage image sections",
            "Instagram section",
            "Reviews and social proof",
            "Services and packages",
            "Process and FAQ",
          ].map((label) => (
            <span
              key={label}
              className="rounded-full bg-white/80 px-4 py-2 text-[color:var(--muted-foreground)] ring-1 ring-[color:var(--border)]"
            >
              {label}
            </span>
          ))}
        </div>

        <Card className="bg-[color:var(--secondary)]/28">
          <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "Hero section",
                copy: "Changes the very top of the homepage, including the big image, headline, buttons, and stats.",
              },
              {
                title: "Gallery and showcase",
                copy: "Changes the gallery intro text and the two large image sections lower on the homepage.",
              },
              {
                title: "Testimonials and social proof",
                copy: "Changes review headings, trust-building copy, and the stats shown on the testimonials page.",
              },
              {
                title: "Final sections",
                copy: "Changes the process, service areas, FAQ intro, package intro, and final call-to-action banner.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-[1.5rem] bg-white/80 p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--muted-foreground)]">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-7 text-[color:var(--foreground)]">{item.copy}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <SectionCard
            title="Contact and scheduling"
            description="Keep your contact details and consultation length up to date."
            appearsOn={["Site header", "Site footer", "Instagram link", "Inquiry scheduling"]}
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
                label="Instagram profile link"
                value={formState.instagramUrl}
                helper="Paste the full Instagram URL used for the homepage section and footer link."
                onChange={(value) => updateField("instagramUrl", value)}
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
            appearsOn={["Homepage top section", "Homepage hero image", "Homepage stats"]}
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
            appearsOn={["Homepage story area", "Homepage event labels", "Testimonials page stats"]}
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
            appearsOn={["Homepage gallery intro"]}
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
            appearsOn={["Homepage showcase images", "Homepage social proof box"]}
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
            appearsOn={["Homepage services section", "Homepage testimonials section"]}
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
              <TextField
                label="Social proof badge"
                value={formState.testimonialsSupportEyebrow}
                helper="This small label sits above the trust message next to the testimonials on the homepage."
                onChange={(value) => updateField("testimonialsSupportEyebrow", value)}
              />
              <TextField
                label="Social proof headline"
                value={formState.testimonialsSupportTitle}
                helper="This replaces the hardcoded trust message next to homepage testimonials."
                onChange={(value) => updateField("testimonialsSupportTitle", value)}
              />
            </div>
            <TextAreaField
              label="Social proof description"
              value={formState.testimonialsSupportCopy}
              helper="Use real trust-building language here. This is shown beside homepage testimonials."
              onChange={(value) => updateField("testimonialsSupportCopy", value)}
            />
          </SectionCard>

          <SectionCard
            title="Instagram section"
            description="This controls the Instagram block on the homepage, including the title, description, profile link, and the images shown there."
            appearsOn={["Homepage Instagram section", "Site footer Instagram link"]}
          >
            <div className="grid gap-5 lg:grid-cols-2">
              <TextField
                label="Instagram section label"
                value={formState.instagramSectionEyebrow}
                helper="Small label shown above the Instagram headline."
                onChange={(value) => updateField("instagramSectionEyebrow", value)}
              />
              <TextField
                label="Instagram section headline"
                value={formState.instagramSectionTitle}
                helper="This replaces the hardcoded Instagram section title on the homepage."
                onChange={(value) => updateField("instagramSectionTitle", value)}
              />
            </div>
            <TextAreaField
              label="Instagram section description"
              value={formState.instagramSectionCopy}
              helper="Explain what visitors will see in these images."
              onChange={(value) => updateField("instagramSectionCopy", value)}
            />
            <ImageGalleryField
              label="Instagram section images"
              helper="Upload up to 8 real images for the Instagram section. If you leave this empty, visitors will see a simple follow-us message instead of fake images."
              value={formState.instagramImages}
              onChange={(value) => updateField("instagramImages", value)}
            />
          </SectionCard>

          <SectionCard
            title="Process, areas, and FAQ"
            description="Update the sections that help visitors understand your process and where you work."
            appearsOn={["Homepage process section", "Homepage service areas", "Homepage FAQ intro"]}
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
            appearsOn={["Homepage package intro", "Homepage final banner"]}
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

          <div className="sticky bottom-4 flex justify-end">
            <Button
              type="submit"
              size="lg"
              disabled={saving || !hasUnsavedChanges}
              className="min-w-56"
            >
              {saving ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Saving changes
                </>
              ) : !hasUnsavedChanges ? (
                "All changes saved"
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

"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type SettingsFormProps = {
  settings: Record<string, unknown>;
};

export function SettingsForm({ settings }: SettingsFormProps) {
  const router = useRouter();
  const [formState, setFormState] = useState({
    phone: String(settings.phone ?? ""),
    email: String(settings.email ?? ""),
    instagramHandle: String(settings.instagramHandle ?? ""),
    heroTitle: String(settings.heroTitle ?? ""),
    heroSubtitle: String(settings.heroSubtitle ?? ""),
    heroPrimaryCta: String(settings.heroPrimaryCta ?? ""),
    heroSecondaryCta: String(settings.heroSecondaryCta ?? ""),
    story: String(settings.story ?? ""),
    mission: String(settings.mission ?? ""),
    serviceAreas: Array.isArray(settings.serviceAreas)
      ? (settings.serviceAreas as string[]).join("\n")
      : "",
    statistics: Array.isArray(settings.statistics)
      ? (settings.statistics as Array<{ value: string; label: string }>)
          .map((item) => `${item.value}|${item.label}`)
          .join("\n")
      : "",
    featuredCategoryLabels: Array.isArray(settings.featuredCategoryLabels)
      ? (settings.featuredCategoryLabels as string[]).join("\n")
      : "",
    bookingSteps: Array.isArray(settings.bookingSteps)
      ? (settings.bookingSteps as Array<{ title: string; description: string }>)
          .map((item) => `${item.title}|${item.description}`)
          .join("\n")
      : "",
    socialProofHeadline: String(settings.socialProofHeadline ?? ""),
    socialProofCopy: String(settings.socialProofCopy ?? ""),
    ctaBannerTitle: String(settings.ctaBannerTitle ?? ""),
    ctaBannerCopy: String(settings.ctaBannerCopy ?? ""),
    consultationDurationMinutes: String(settings.consultationDurationMinutes ?? 30),
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    const payload = {
      ...formState,
      serviceAreas: formState.serviceAreas.split("\n").map((item) => item.trim()).filter(Boolean),
      statistics: formState.statistics
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
          const [value, label] = line.split("|");
          return { value: value?.trim() ?? "", label: label?.trim() ?? "" };
        }),
      featuredCategoryLabels: formState.featuredCategoryLabels
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      bookingSteps: formState.bookingSteps
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
          const [title, description] = line.split("|");
          return {
            title: title?.trim() ?? "",
            description: description?.trim() ?? "",
          };
        }),
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

    setMessage("Homepage settings updated.");
    router.refresh();
  }

  return (
    <Card>
      <CardContent>
        <div className="mb-6">
          <h2 className="font-[family-name:var(--font-display)] text-3xl text-[color:var(--foreground)]">
            Homepage settings
          </h2>
          <p className="text-sm leading-7 text-[color:var(--muted-foreground)]">
            Update hero messaging, service areas, stats, booking steps, and global CTA copy.
          </p>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          {[
            "phone",
            "email",
            "instagramHandle",
            "heroTitle",
            "heroPrimaryCta",
            "heroSecondaryCta",
            "socialProofHeadline",
            "ctaBannerTitle",
            "consultationDurationMinutes",
          ].map((field) => (
            <div key={field} className="space-y-2">
              <Label>{field}</Label>
              <Input
                value={formState[field as keyof typeof formState]}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    [field]: event.target.value,
                  }))
                }
              />
            </div>
          ))}
          {[
            "heroSubtitle",
            "story",
            "mission",
            "socialProofCopy",
            "ctaBannerCopy",
            "serviceAreas",
            "statistics",
            "featuredCategoryLabels",
            "bookingSteps",
          ].map((field) => (
            <div key={field} className="space-y-2">
              <Label>{field}</Label>
              <Textarea
                value={formState[field as keyof typeof formState]}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    [field]: event.target.value,
                  }))
                }
              />
            </div>
          ))}
          {message ? <p className="text-sm text-[color:var(--muted-foreground)]">{message}</p> : null}
          <Button type="submit" disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Saving
              </>
            ) : (
              "Save homepage settings"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

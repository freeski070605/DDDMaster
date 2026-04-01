"use client";

import Image from "next/image";
import { Loader2, Plus, Upload, X } from "lucide-react";
import { useId, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ImageUploadFieldProps = {
  label: string;
  value: string[];
  onChange: (urls: string[]) => void;
  multiple?: boolean;
};

export function ImageUploadField({
  label,
  value,
  onChange,
  multiple = true,
}: ImageUploadFieldProps) {
  const inputId = useId();
  const [uploading, setUploading] = useState(false);
  const [manualUrl, setManualUrl] = useState("");
  const [error, setError] = useState("");

  async function handleFiles(files: FileList | null) {
    if (!files?.length) {
      return;
    }

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();

      Array.from(files).forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch("/api/uploads", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Unable to upload images.");
      }

      const nextUrls = multiple ? [...value, ...result.urls] : result.urls.slice(0, 1);
      onChange(nextUrls);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Unable to upload.");
    } finally {
      setUploading(false);
    }
  }

  function addManualUrl() {
    if (!manualUrl.trim()) {
      return;
    }

    onChange(multiple ? [...value, manualUrl.trim()] : [manualUrl.trim()]);
    setManualUrl("");
  }

  function removeUrl(target: string) {
    onChange(value.filter((url) => url !== target));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <label htmlFor={inputId} className="text-sm font-medium text-[color:var(--foreground)]">
          {label}
        </label>
        <label
          htmlFor={inputId}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[color:var(--border)] bg-white/80 px-4 py-2 text-sm text-[color:var(--foreground)]"
        >
          {uploading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
          Upload image
        </label>
      </div>
      <input
        id={inputId}
        type="file"
        accept="image/*"
        multiple={multiple}
        className="hidden"
        onChange={(event) => void handleFiles(event.target.files)}
      />
      <div className="flex gap-3">
        <Input
          value={manualUrl}
          onChange={(event) => setManualUrl(event.target.value)}
          placeholder="Or paste an image URL"
        />
        <Button type="button" variant="secondary" onClick={addManualUrl}>
          <Plus className="size-4" />
        </Button>
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {value.length ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {value.map((url) => (
            <div
              key={url}
              className="relative overflow-hidden rounded-[1.5rem] border border-[color:var(--border)] bg-white"
            >
              <div className="relative h-40">
                <Image src={url} alt="Uploaded preview" fill className="object-cover" />
              </div>
              <button
                type="button"
                onClick={() => removeUrl(url)}
                className="absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-full bg-black/60 text-white"
                aria-label="Remove image"
              >
                <X className="size-4" />
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

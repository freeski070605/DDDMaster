"use client";

import Image from "next/image";
import { Loader2, Pencil, Plus, Search, Sparkles, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { ImageUploadField } from "@/components/forms/image-upload-field";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type FieldConfig = {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "checkbox" | "tags" | "select" | "image";
  options?: string[];
  helper?: string;
  placeholder?: string;
};

type CollectionManagerProps = {
  sectionId?: string;
  title: string;
  description: string;
  whereItShows?: string[];
  collection: "gallery" | "testimonials" | "packages" | "faqs" | "services";
  fields: FieldConfig[];
  items: Array<Record<string, unknown>>;
  emptyItem: Record<string, unknown>;
};

type FeedbackTone = "neutral" | "success" | "error" | "warning";

function getItemTitle(item: Record<string, unknown>) {
  return String(item.title ?? item.name ?? item.question ?? "Untitled");
}

function getItemSubtitle(item: Record<string, unknown>) {
  return String(item.slug ?? item.role ?? item.category ?? item.venue ?? "");
}

function getItemImage(item: Record<string, unknown>) {
  const image = item.image;
  return typeof image === "string" && image ? image : null;
}

function getGalleryMedia(item: Record<string, unknown>) {
  return [
    { label: "Main", url: typeof item.image === "string" ? item.image : "" },
    { label: "Before", url: typeof item.beforeImage === "string" ? item.beforeImage : "" },
    { label: "After", url: typeof item.afterImage === "string" ? item.afterImage : "" },
  ].filter((entry) => entry.url);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function isWideField(type: FieldConfig["type"]) {
  return type === "textarea" || type === "tags" || type === "image";
}

function getSingularLabel(title: string) {
  if (title === "Gallery") {
    return "gallery item";
  }

  if (title === "FAQs") {
    return "FAQ";
  }

  if (title.endsWith("ies")) {
    return `${title.slice(0, -3)}y`.toLowerCase();
  }

  if (title.endsWith("s")) {
    return title.slice(0, -1).toLowerCase();
  }

  return title.toLowerCase();
}

function getFeedbackStyles(tone: FeedbackTone) {
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

export function CollectionManager({
  sectionId,
  title,
  description,
  whereItShows,
  collection,
  fields,
  items,
  emptyItem,
}: CollectionManagerProps) {
  const router = useRouter();
  const singularLabel = getSingularLabel(title);
  const [formState, setFormState] = useState<Record<string, unknown>>(emptyItem);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [feedbackTone, setFeedbackTone] = useState<FeedbackTone>("neutral");
  const [message, setMessage] = useState(
    `Choose a ${singularLabel} on the left, or create a new one here.`,
  );
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = items.filter((item) => {
    const haystack = [
      getItemTitle(item),
      getItemSubtitle(item),
      String(item.description ?? item.quote ?? item.answer ?? ""),
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(searchTerm.trim().toLowerCase());
  });
  const isGalleryCollection = collection === "gallery";

  function startEdit(item: Record<string, unknown>) {
    const nextState = { ...item };

    fields.forEach((field) => {
      if (field.type === "tags" && Array.isArray(item[field.name])) {
        nextState[field.name] = (item[field.name] as string[]).join("\n");
      }
    });

    setFormState(nextState);
    setEditingId(String(item._id));
    setFeedbackTone("neutral");
    setMessage(`Editing "${getItemTitle(item)}". Save when you are ready to publish the change.`);
  }

  function reset(options?: { preserveMessage?: boolean }) {
    setFormState(emptyItem);
    setEditingId(null);

    if (!options?.preserveMessage) {
      setFeedbackTone("neutral");
      setMessage(`Creating a new ${singularLabel}. Nothing goes live until you save it.`);
    }
  }

  function buildPayload() {
    const payload = { ...formState };

    fields.forEach((field) => {
      if (field.type === "tags") {
        payload[field.name] = String(payload[field.name] ?? "")
          .split(/\n|,/)
          .map((value) => value.trim())
          .filter(Boolean);
      }
    });

    return payload;
  }

  function fillSlugFromTitle() {
    const source = String(formState.title ?? formState.name ?? "");

    if (!source.trim()) {
      setFeedbackTone("warning");
      setMessage("Add a title or name first, then use Fill slug.");
      return;
    }

    setFeedbackTone("neutral");
    setFormState((current) => ({
      ...current,
      slug: slugify(source),
    }));
    setMessage("Slug filled from the current title or name.");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const isEditing = Boolean(editingId);
    setLoading(true);
    setFeedbackTone("neutral");
    setMessage(`Saving this ${singularLabel} now...`);

    const response = await fetch(
      isEditing
        ? `/api/admin/content/${collection}/${editingId}`
        : `/api/admin/content/${collection}`,
      {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload()),
      },
    );

    const result = await response.json();
    setLoading(false);

    if (!response.ok) {
      setFeedbackTone("error");
      setMessage(result.error ?? "Unable to save item.");
      return;
    }

    const savedItem =
      result.item && typeof result.item === "object"
        ? (result.item as Record<string, unknown>)
        : formState;
    const savedTitle = getItemTitle(savedItem);

    setFeedbackTone("success");
    setMessage(
      `${isEditing ? "Saved changes to" : "Created"} "${savedTitle}" at ${formatSavedTime(
        new Date(),
      )}. The admin list and public site have been refreshed.`,
    );
    reset({ preserveMessage: true });
    router.refresh();
  }

  async function handleDelete(id: string, itemTitle: string) {
    const confirmed = window.confirm("Delete this item?");

    if (!confirmed) {
      return;
    }

    const response = await fetch(`/api/admin/content/${collection}/${id}`, {
      method: "DELETE",
    });

    const result = await response.json();

    if (!response.ok) {
      setFeedbackTone("error");
      setMessage(result.error ?? "Unable to delete item.");
      return;
    }

    if (editingId === id) {
      setFormState(emptyItem);
      setEditingId(null);
    }

    setFeedbackTone("success");
    setMessage(
      `Deleted "${itemTitle}" at ${formatSavedTime(
        new Date(),
      )}. The admin list and public site have been refreshed.`,
    );
    router.refresh();
  }

  return (
    <Card id={sectionId} className="bg-white/88 scroll-mt-24">
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--muted-foreground)]">
              Manage collection
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[color:var(--foreground)]">
              {title}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-[color:var(--muted-foreground)]">
              {description}
            </p>
            {whereItShows?.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {whereItShows.map((item) => (
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
          <div className="flex flex-wrap gap-3">
            <div className="rounded-full bg-[color:var(--secondary)] px-4 py-2 text-sm text-[color:var(--secondary-foreground)]">
              {items.length} total items
            </div>
            <Button type="button" variant="secondary" onClick={() => reset()}>
              <Plus className="size-4" />
              Add new {singularLabel}
            </Button>
          </div>
        </div>

        <div
          className={`rounded-[1.75rem] border px-5 py-4 text-sm leading-7 ${getFeedbackStyles(
            loading ? "neutral" : feedbackTone,
          )}`}
        >
          <p className="font-semibold">
            {loading
              ? `Saving ${editingId ? "changes to this item" : `this ${singularLabel}`}...`
              : editingId
                ? `Currently editing: ${getItemTitle(formState)}`
                : `Creating a new ${singularLabel}`}
          </p>
          <p className="mt-1">{message}</p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-4">
            <div className="rounded-[1.75rem] border border-[color:var(--border)] bg-[color:var(--secondary)]/35 p-4">
              <Label className="text-sm font-semibold text-[color:var(--foreground)]">
                Search items
              </Label>
              <div className="relative mt-2">
                <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[color:var(--muted-foreground)]" />
                <Input
                  className="pl-10"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder={`Search ${title.toLowerCase()}`}
                />
              </div>
            </div>

            <div className={isGalleryCollection ? "grid gap-4 md:grid-cols-2" : "space-y-3"}>
              {filteredItems.length ? (
                filteredItems.map((item) => {
                  const itemId = String(item._id ?? item.slug ?? item.name);
                  const image = getItemImage(item);
                  const active = editingId === String(item._id);
                  const galleryMedia = getGalleryMedia(item);

                  return (
                    <div
                      key={itemId}
                      className={`rounded-[1.75rem] border p-4 transition ${
                        active
                          ? "border-[color:var(--primary)] bg-[color:var(--secondary)]/35"
                          : "border-[color:var(--border)] bg-white/75"
                      } ${isGalleryCollection ? "h-full" : ""}`}
                    >
                      {isGalleryCollection ? (
                        <div className="flex h-full flex-col gap-4">
                          <div className="grid gap-3 sm:grid-cols-[1.3fr_0.7fr]">
                            <div className="relative min-h-52 overflow-hidden rounded-[1.25rem] bg-[color:var(--secondary)]/45">
                              {image ? (
                                <Image
                                  src={image}
                                  alt={getItemTitle(item)}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="flex h-full items-center justify-center text-xs text-[color:var(--muted-foreground)]">
                                  No main image
                                </div>
                              )}
                            </div>
                            <div className="grid gap-3">
                              {galleryMedia.slice(1, 3).length ? (
                                galleryMedia.slice(1, 3).map((media) => (
                                  <div
                                    key={`${itemId}-${media.label}`}
                                    className="relative min-h-24 overflow-hidden rounded-[1.25rem] bg-[color:var(--secondary)]/45"
                                  >
                                    <Image
                                      src={media.url}
                                      alt={`${getItemTitle(item)} ${media.label.toLowerCase()} view`}
                                      fill
                                      className="object-cover"
                                    />
                                    <div className="absolute left-2 top-2 rounded-full bg-black/55 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                                      {media.label}
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="flex min-h-24 items-center justify-center rounded-[1.25rem] bg-[color:var(--secondary)]/35 p-3 text-center text-xs text-[color:var(--muted-foreground)]">
                                  Add before and after images for fuller gallery control.
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="font-semibold text-[color:var(--foreground)]">
                                {getItemTitle(item)}
                              </p>
                              {item.featured ? (
                                <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--primary)]/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--primary)]">
                                  <Sparkles className="size-3" />
                                  Featured
                                </span>
                              ) : null}
                            </div>
                            {getItemSubtitle(item) ? (
                              <p className="mt-1 text-sm text-[color:var(--muted-foreground)]">
                                {getItemSubtitle(item)}
                              </p>
                            ) : null}
                            <p className="mt-2 text-sm text-[color:var(--muted-foreground)]">
                              {galleryMedia.length} image{galleryMedia.length === 1 ? "" : "s"} attached
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                              <Button type="button" variant="secondary" onClick={() => startEdit(item)}>
                                <Pencil className="size-4" />
                                Edit
                              </Button>
                              {item._id ? (
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() =>
                                    void handleDelete(String(item._id), getItemTitle(item))
                                  }
                                >
                                  <Trash2 className="size-4" />
                                  Delete
                                </Button>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-4">
                          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[1.25rem] bg-[color:var(--secondary)]/45">
                            {image ? (
                              <Image
                                src={image}
                                alt={getItemTitle(item)}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center text-xs text-[color:var(--muted-foreground)]">
                                No image
                              </div>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="font-semibold text-[color:var(--foreground)]">
                                {getItemTitle(item)}
                              </p>
                              {item.featured ? (
                                <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--primary)]/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--primary)]">
                                  <Sparkles className="size-3" />
                                  Featured
                                </span>
                              ) : null}
                            </div>
                            {getItemSubtitle(item) ? (
                              <p className="mt-1 text-sm text-[color:var(--muted-foreground)]">
                                {getItemSubtitle(item)}
                              </p>
                            ) : null}
                            <div className="mt-4 flex flex-wrap gap-2">
                              <Button type="button" variant="secondary" onClick={() => startEdit(item)}>
                                <Pencil className="size-4" />
                                Edit
                              </Button>
                              {item._id ? (
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() =>
                                    void handleDelete(String(item._id), getItemTitle(item))
                                  }
                                >
                                  <Trash2 className="size-4" />
                                  Delete
                                </Button>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div
                  className={`rounded-[1.75rem] border border-dashed border-[color:var(--border)] bg-white/65 p-8 text-sm leading-7 text-[color:var(--muted-foreground)] ${
                    isGalleryCollection ? "md:col-span-2" : ""
                  }`}
                >
                  {searchTerm.trim()
                    ? "No items matched your search."
                    : isGalleryCollection
                      ? "No gallery items have been added yet. Create your first gallery item here and it will appear on the live site."
                      : "No items matched your search."}
                </div>
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(248,241,250,0.92))] p-5 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
                  {editingId ? "Editing item" : "Create new item"}
                </p>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[color:var(--foreground)]">
                  {editingId ? getItemTitle(formState) : `New ${singularLabel}`}
                </h3>
              </div>
              {editingId ? (
                <Button type="button" variant="secondary" onClick={() => reset()}>
                  Cancel edit
                </Button>
              ) : null}
            </div>

            <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
              <div className="grid gap-5 lg:grid-cols-2">
                {fields.map((field) => (
                  <div
                    key={field.name}
                    className={`space-y-2 ${isWideField(field.type) ? "lg:col-span-2" : ""}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <Label className="text-sm font-semibold text-[color:var(--foreground)]">
                        {field.label}
                      </Label>
                      {field.name === "slug" ? (
                        <Button type="button" variant="ghost" size="sm" onClick={fillSlugFromTitle}>
                          Fill slug
                        </Button>
                      ) : null}
                    </div>

                    {field.type === "textarea" ? (
                      <Textarea
                        value={String(formState[field.name] ?? "")}
                        placeholder={field.placeholder}
                        onChange={(event) =>
                          setFormState((current) => ({
                            ...current,
                            [field.name]: event.target.value,
                          }))
                        }
                      />
                    ) : null}

                    {field.type === "text" || field.type === "number" ? (
                      <Input
                        type={field.type === "number" ? "number" : "text"}
                        value={String(formState[field.name] ?? "")}
                        placeholder={field.placeholder}
                        onChange={(event) =>
                          setFormState((current) => ({
                            ...current,
                            [field.name]:
                              field.type === "number"
                                ? Number(event.target.value)
                                : event.target.value,
                          }))
                        }
                      />
                    ) : null}

                    {field.type === "tags" ? (
                      <>
                        <Textarea
                          value={String(formState[field.name] ?? "")}
                          onChange={(event) =>
                            setFormState((current) => ({
                              ...current,
                              [field.name]: event.target.value,
                            }))
                          }
                          placeholder="One item per line"
                        />
                        <p className="text-sm leading-6 text-[color:var(--muted-foreground)]">
                          {field.helper ?? "Add one list item per line."}
                        </p>
                      </>
                    ) : null}

                    {field.type === "checkbox" ? (
                      <label className="flex min-h-14 items-center gap-3 rounded-[1.5rem] border border-[color:var(--border)] bg-white/75 px-4 py-3 text-sm text-[color:var(--foreground)]">
                        <input
                          type="checkbox"
                          checked={Boolean(formState[field.name])}
                          onChange={(event) =>
                            setFormState((current) => ({
                              ...current,
                              [field.name]: event.target.checked,
                            }))
                          }
                        />
                        Show this item as featured
                      </label>
                    ) : null}

                    {field.type === "select" ? (
                      <select
                        className="flex h-12 w-full rounded-2xl border border-[color:var(--border)] bg-white/80 px-4 text-sm text-[color:var(--foreground)]"
                        value={String(formState[field.name] ?? "")}
                        onChange={(event) =>
                          setFormState((current) => ({
                            ...current,
                            [field.name]: event.target.value,
                          }))
                        }
                      >
                        {field.options?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : null}

                    {field.type === "image" ? (
                      <ImageUploadField
                        label={field.label}
                        multiple={false}
                        value={formState[field.name] ? [String(formState[field.name])] : []}
                        onChange={(urls) =>
                          setFormState((current) => ({
                            ...current,
                            [field.name]: urls[0] ?? "",
                          }))
                        }
                      />
                    ) : null}

                    {field.type !== "tags" && field.helper ? (
                      <p className="text-sm leading-6 text-[color:var(--muted-foreground)]">
                        {field.helper}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Button type="submit" size="lg" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Saving
                    </>
                  ) : (
                    <>
                      <Plus className="size-4" />
                      {editingId ? "Update item" : "Create item"}
                    </>
                  )}
                </Button>
                {editingId ? (
                  <Button type="button" variant="outline" size="lg" onClick={() => reset()}>
                    Clear form
                  </Button>
                ) : null}
              </div>
            </form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

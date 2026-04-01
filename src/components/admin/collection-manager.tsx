"use client";

import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
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
};

type CollectionManagerProps = {
  title: string;
  description: string;
  collection: "gallery" | "testimonials" | "packages" | "faqs" | "services";
  fields: FieldConfig[];
  items: Array<Record<string, unknown>>;
  emptyItem: Record<string, unknown>;
};

export function CollectionManager({
  title,
  description,
  collection,
  fields,
  items,
  emptyItem,
}: CollectionManagerProps) {
  const router = useRouter();
  const [formState, setFormState] = useState<Record<string, unknown>>(emptyItem);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function startEdit(item: Record<string, unknown>) {
    const nextState = { ...item };

    fields.forEach((field) => {
      if (field.type === "tags" && Array.isArray(item[field.name])) {
        nextState[field.name] = (item[field.name] as string[]).join("\n");
      }
    });

    setFormState(nextState);
    setEditingId(String(item._id));
  }

  function reset() {
    setFormState(emptyItem);
    setEditingId(null);
    setMessage("");
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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const response = await fetch(
      editingId
        ? `/api/admin/content/${collection}/${editingId}`
        : `/api/admin/content/${collection}`,
      {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload()),
      },
    );

    const result = await response.json();
    setLoading(false);

    if (!response.ok) {
      setMessage(result.error ?? "Unable to save item.");
      return;
    }

    setMessage(editingId ? "Item updated." : "Item created.");
    reset();
    router.refresh();
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm("Delete this item?");

    if (!confirmed) {
      return;
    }

    const response = await fetch(`/api/admin/content/${collection}/${id}`, {
      method: "DELETE",
    });

    const result = await response.json();

    if (!response.ok) {
      setMessage(result.error ?? "Unable to delete item.");
      return;
    }

    router.refresh();
  }

  return (
    <Card>
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl text-[color:var(--foreground)]">
              {title}
            </h2>
            <p className="text-sm leading-7 text-[color:var(--muted-foreground)]">
              {description}
            </p>
          </div>
          {editingId ? (
            <Button type="button" variant="secondary" onClick={reset}>
              Cancel edit
            </Button>
          ) : null}
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.name} className="space-y-2">
              <Label>{field.label}</Label>
              {field.type === "textarea" ? (
                <Textarea
                  value={String(formState[field.name] ?? "")}
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
              ) : null}
              {field.type === "checkbox" ? (
                <label className="flex items-center gap-3 rounded-2xl border border-[color:var(--border)] bg-white/70 px-4 py-3 text-sm">
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
                  Mark as featured
                </label>
              ) : null}
              {field.type === "select" ? (
                <select
                  className="flex h-12 w-full rounded-2xl border border-[color:var(--border)] bg-white/80 px-4 text-sm"
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
            </div>
          ))}
          {message ? <p className="text-sm text-[color:var(--muted-foreground)]">{message}</p> : null}
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Saving
              </>
            ) : (
              <>
                <Plus className="size-4" />
                {editingId ? "Update item" : "Add item"}
              </>
            )}
          </Button>
        </form>

        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={String(item._id ?? item.slug ?? item.name)}
              className="flex flex-col gap-3 rounded-[1.5rem] border border-[color:var(--border)] bg-white/75 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold text-[color:var(--foreground)]">
                  {String(item.title ?? item.name ?? item.question ?? "Untitled")}
                </p>
                <p className="text-sm text-[color:var(--muted-foreground)]">
                  {String(item.slug ?? item.role ?? item.category ?? "")}
                </p>
              </div>
              <div className="flex gap-3">
                <Button type="button" variant="secondary" onClick={() => startEdit(item)}>
                  <Pencil className="size-4" />
                  Edit
                </Button>
                {item._id ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => void handleDelete(String(item._id))}
                  >
                    <Trash2 className="size-4" />
                    Delete
                  </Button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

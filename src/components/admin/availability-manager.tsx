"use client";

import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Slot = {
  _id: string;
  label: string;
  start: string;
  end: string;
  notes?: string;
  isBooked?: boolean;
};

function toDateTimeLocal(value: string) {
  const date = new Date(value);
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 16);
}

export function AvailabilityManager({ slots }: { slots: Slot[] }) {
  const router = useRouter();
  const [formState, setFormState] = useState({
    label: "",
    start: "",
    end: "",
    notes: "",
    isBooked: false,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  function reset() {
    setFormState({
      label: "",
      start: "",
      end: "",
      notes: "",
      isBooked: false,
    });
    setEditingId(null);
  }

  function startEdit(slot: Slot) {
    setEditingId(slot._id);
    setFormState({
      label: slot.label,
      start: toDateTimeLocal(slot.start),
      end: toDateTimeLocal(slot.end),
      notes: slot.notes ?? "",
      isBooked: Boolean(slot.isBooked),
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    const response = await fetch(
      editingId ? `/api/admin/availability/${editingId}` : "/api/admin/availability",
      {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      },
    );

    const result = await response.json();
    setSaving(false);

    if (!response.ok) {
      setMessage(result.error ?? "Unable to save slot.");
      return;
    }

    reset();
    router.refresh();
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm("Delete this consultation slot?");

    if (!confirmed) {
      return;
    }

    const response = await fetch(`/api/admin/availability/${id}`, { method: "DELETE" });
    const result = await response.json();

    if (!response.ok) {
      setMessage(result.error ?? "Unable to delete slot.");
      return;
    }

    router.refresh();
  }

  return (
    <Card>
      <CardContent className="space-y-6">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-3xl text-[color:var(--foreground)]">
            Consultation availability
          </h2>
          <p className="text-sm leading-7 text-[color:var(--muted-foreground)]">
            Add, update, or remove bookable consultation windows.
          </p>
        </div>
        <form className="grid gap-5 lg:grid-cols-2" onSubmit={handleSubmit}>
          <div className="space-y-2 lg:col-span-2">
            <Label>Label</Label>
            <Input
              value={formState.label}
              onChange={(event) =>
                setFormState((current) => ({ ...current, label: event.target.value }))
              }
              placeholder="Thursday, April 10 at 6:00 PM"
            />
          </div>
          <div className="space-y-2">
            <Label>Start time</Label>
            <Input
              type="datetime-local"
              value={formState.start}
              onChange={(event) =>
                setFormState((current) => ({ ...current, start: event.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label>End time</Label>
            <Input
              type="datetime-local"
              value={formState.end}
              onChange={(event) =>
                setFormState((current) => ({ ...current, end: event.target.value }))
              }
            />
          </div>
          <div className="space-y-2 lg:col-span-2">
            <Label>Notes</Label>
            <Textarea
              value={formState.notes}
              onChange={(event) =>
                setFormState((current) => ({ ...current, notes: event.target.value }))
              }
            />
          </div>
          <div className="lg:col-span-2 flex items-center gap-3">
            <label className="flex items-center gap-3 rounded-2xl border border-[color:var(--border)] bg-white/70 px-4 py-3 text-sm">
              <input
                type="checkbox"
                checked={formState.isBooked}
                onChange={(event) =>
                  setFormState((current) => ({ ...current, isBooked: event.target.checked }))
                }
              />
              Mark slot as booked
            </label>
          </div>
          {message ? <p className="text-sm text-[color:var(--muted-foreground)] lg:col-span-2">{message}</p> : null}
          <div className="flex gap-3 lg:col-span-2">
            <Button type="submit" disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Saving
                </>
              ) : (
                <>
                  <Plus className="size-4" />
                  {editingId ? "Update slot" : "Add slot"}
                </>
              )}
            </Button>
            {editingId ? (
              <Button type="button" variant="secondary" onClick={reset}>
                Cancel edit
              </Button>
            ) : null}
          </div>
        </form>
        <div className="space-y-3">
          {slots.map((slot) => (
            <div
              key={slot._id}
              className="flex flex-col gap-3 rounded-[1.5rem] border border-[color:var(--border)] bg-white/75 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold text-[color:var(--foreground)]">{slot.label}</p>
                <p className="text-sm text-[color:var(--muted-foreground)]">
                  {new Date(slot.start).toLocaleString()} to {new Date(slot.end).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-3">
                <Button type="button" variant="secondary" onClick={() => startEdit(slot)}>
                  <Pencil className="size-4" />
                  Edit
                </Button>
                <Button type="button" variant="outline" onClick={() => void handleDelete(slot._id)}>
                  <Trash2 className="size-4" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

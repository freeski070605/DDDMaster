"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function LeadStatusForm({
  leadId,
  initialStatus,
  initialNotes,
}: {
  leadId: string;
  initialStatus: string;
  initialNotes: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus);
  const [notes, setNotes] = useState(initialNotes);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    const response = await fetch(`/api/admin/leads/${leadId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, adminNotes: notes }),
    });

    const result = await response.json();
    setSaving(false);

    if (!response.ok) {
      setMessage(result.error ?? "Unable to update lead.");
      return;
    }

    setMessage("Lead updated.");
    router.refresh();
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label>Status</Label>
        <select
          className="flex h-12 w-full rounded-2xl border border-[color:var(--border)] bg-white/80 px-4 text-sm"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          {["new", "contacted", "booked", "closed"].map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <Label>Admin notes</Label>
        <Textarea value={notes} onChange={(event) => setNotes(event.target.value)} />
      </div>
      {message ? <p className="text-sm text-[color:var(--muted-foreground)]">{message}</p> : null}
      <Button type="submit" disabled={saving}>
        {saving ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Saving
          </>
        ) : (
          "Save updates"
        )}
      </Button>
    </form>
  );
}

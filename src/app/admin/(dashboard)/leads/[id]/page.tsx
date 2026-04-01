import { notFound } from "next/navigation";

import { LeadStatusForm } from "@/components/admin/lead-status-form";
import { Card, CardContent } from "@/components/ui/card";
import { getInquiryById } from "@/lib/cms";

export default async function AdminLeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lead = await getInquiryById(id);

  if (!lead) {
    notFound();
  }

  const consultationSlot =
    lead.consultationSlotId &&
    typeof lead.consultationSlotId === "object" &&
    "label" in lead.consultationSlotId
      ? String(lead.consultationSlotId.label ?? "")
      : "Not selected";

  return (
    <div className="space-y-6">
      <Card>
        <CardContent>
          <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
            Lead detail
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-5xl text-[color:var(--foreground)]">
            {lead.fullName}
          </h1>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Info label="Email" value={lead.email} />
            <Info label="Phone" value={lead.phone} />
            <Info label="Event type" value={lead.eventType} />
            <Info label="Event date" value={new Date(lead.eventDate).toLocaleDateString()} />
            <Info label="Venue" value={lead.venue} />
            <Info label="Budget" value={lead.budgetRange} />
            <Info label="Guest count" value={String(lead.guestCount)} />
            <Info label="Consultation slot" value={consultationSlot} />
          </div>
          <div className="mt-6 rounded-[1.5rem] bg-[color:var(--secondary)]/55 p-5">
            <p className="text-sm uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">
              Inspiration notes
            </p>
            <p className="mt-3 text-sm leading-7 text-[color:var(--muted-foreground)]">
              {lead.inspirationNotes}
            </p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <LeadStatusForm
            leadId={String(lead._id)}
            initialStatus={lead.status}
            initialNotes={lead.adminNotes ?? ""}
          />
        </CardContent>
      </Card>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.5rem] border border-[color:var(--border)] bg-white/75 p-4">
      <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">
        {label}
      </p>
      <p className="mt-2 text-sm text-[color:var(--foreground)]">{value}</p>
    </div>
  );
}

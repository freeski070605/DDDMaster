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
            <Info label="Event start time" value={lead.eventStartTime || "Not provided"} />
            <Info label="Venue" value={lead.venue} />
            <Info label="Theme or colors" value={lead.eventThemeOrColors || "Not provided"} />
            <Info label="Budget" value={lead.budgetRange} />
            <Info label="Guest count" value={String(lead.guestCount)} />
            <Info label="Installation time" value={lead.installationTime || "Not provided"} />
            <Info label="Strike / breakdown" value={lead.strikeTime || "Not provided"} />
            <Info label="Consultation slot" value={consultationSlot} />
            <Info
              label="Marketing consent"
              value={lead.marketingConsent ? "Consented" : "Not selected"}
            />
            <Info label="Internal saved status" value={lead.internalSavedStatus || "saved"} />
            <Info
              label="External tracking mode"
              value={lead.externalTrackingMode || "native_form_tracking"}
            />
            <Info label="CRM sync status" value={lead.crmSyncStatus || "not_attempted"} />
            <Info label="CRM contact ID" value={lead.crmContactId || "Not synced"} />
            <Info
              label="CRM tag sync status"
              value={lead.crmTagSyncStatus || "not_attempted"}
            />
            <Info
              label="CRM opportunity status"
              value={lead.crmOpportunitySyncStatus || "not_attempted"}
            />
            <Info label="CRM opportunity ID" value={lead.crmOpportunityId || "Not synced"} />
            <Info label="CRM pipeline" value={lead.crmPipelineName || "Not resolved"} />
            <Info label="CRM pipeline ID" value={lead.crmPipelineId || "Not resolved"} />
            <Info label="CRM stage" value={lead.crmPipelineStageName || "Not resolved"} />
            <Info label="CRM stage ID" value={lead.crmPipelineStageId || "Not resolved"} />
            <Info label="Submitted page" value={lead.submittedPagePath || "/inquire"} />
            <Info label="Submitted form" value={lead.submittedFormName || "Event Inquiry Form"} />
            <Info label="Source" value={lead.source || "Divine Decor Website"} />
          </div>
          {lead.crmTagsAdded?.length ? (
            <div className="mt-6 rounded-[1.5rem] bg-white/75 p-5 ring-1 ring-[color:var(--border)]">
              <p className="text-sm uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">
                CRM tags added
              </p>
              <p className="mt-3 text-sm leading-7 text-[color:var(--foreground)]">
                {lead.crmTagsAdded.join(", ")}
              </p>
            </div>
          ) : null}
          {lead.crmSyncWarnings?.length || lead.crmSyncError ? (
            <div className="mt-6 rounded-[1.5rem] bg-red-50 p-5 ring-1 ring-red-200">
              <p className="text-sm uppercase tracking-[0.18em] text-red-700">
                CRM sync diagnostics
              </p>
              {lead.crmSyncError ? (
                <p className="mt-3 text-sm leading-7 text-red-700">{lead.crmSyncError}</p>
              ) : null}
              {lead.crmSyncWarnings?.length ? (
                <p className="mt-3 text-sm leading-7 text-red-700">
                  {lead.crmSyncWarnings.join(" ")}
                </p>
              ) : null}
            </div>
          ) : null}
          <div className="mt-6 rounded-[1.5rem] bg-white/75 p-5 ring-1 ring-[color:var(--border)]">
            <p className="text-sm uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">
              Services interested in
            </p>
            <p className="mt-3 text-sm leading-7 text-[color:var(--foreground)]">
              {lead.servicesNeeded?.length ? lead.servicesNeeded.join(", ") : "Not selected"}
            </p>
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

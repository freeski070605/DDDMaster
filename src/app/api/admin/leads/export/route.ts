import { NextResponse } from "next/server";

import { readAdminSession } from "@/lib/auth";
import { isDatabaseConfigured } from "@/lib/env";
import { connectToDatabase } from "@/lib/mongoose";
import { InquiryModel } from "@/models";

export async function GET() {
  const session = await readAdminSession();

  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
  }

  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      {
        success: false,
        error: "MongoDB is not configured. Connect a database to export leads.",
      },
      { status: 400 },
    );
  }

  await connectToDatabase();
  const inquiries = await InquiryModel.find().sort({ createdAt: -1 }).lean();

  const headers = [
    "Full Name",
    "Email",
    "Phone",
    "Event Type",
    "Event Date",
    "Event Start Time",
    "Venue",
    "Theme Or Colors",
    "Budget",
    "Guest Count",
    "Installation Time",
    "Strike / Breakdown Time",
    "Services Interested In",
    "Marketing Consent",
    "Internal Saved Status",
    "External Tracking Mode",
    "Submitted Page",
    "Submitted Form",
    "Source",
    "CRM Sync Status",
    "CRM Contact ID",
    "CRM Tags Added",
    "CRM Tag Sync Status",
    "CRM Opportunity Sync Status",
    "CRM Opportunity ID",
    "CRM Pipeline ID",
    "CRM Pipeline Name",
    "CRM Stage ID",
    "CRM Stage Name",
    "CRM Synced At",
    "CRM Sync Error",
    "CRM Sync Warnings",
    "Status",
    "Created At",
  ];

  const rows = inquiries.map((item) =>
    [
      item.fullName,
      item.email,
      item.phone,
      item.eventType,
      new Date(item.eventDate).toISOString(),
      item.eventStartTime ?? "",
      item.venue,
      item.eventThemeOrColors ?? "",
      item.budgetRange,
      item.guestCount,
      item.installationTime ?? "",
      item.strikeTime ?? "",
      item.servicesNeeded?.join("; ") ?? "",
      item.marketingConsent ? "Yes" : "No",
      item.internalSavedStatus ?? "saved",
      item.externalTrackingMode ?? "native_form_tracking",
      item.submittedPagePath ?? "/inquire",
      item.submittedFormName ?? "Event Inquiry Form",
      item.source ?? "Divine Decor Website",
      item.crmSyncStatus ?? "not_attempted",
      item.crmContactId ?? "",
      item.crmTagsAdded?.join("; ") ?? "",
      item.crmTagSyncStatus ?? "not_attempted",
      item.crmOpportunitySyncStatus ?? "not_attempted",
      item.crmOpportunityId ?? "",
      item.crmPipelineId ?? "",
      item.crmPipelineName ?? "",
      item.crmPipelineStageId ?? "",
      item.crmPipelineStageName ?? "",
      item.crmSyncedAt ? new Date(item.crmSyncedAt).toISOString() : "",
      item.crmSyncError ?? "",
      item.crmSyncWarnings?.join("; ") ?? "",
      item.status,
      new Date(item.createdAt).toISOString(),
    ]
      .map((value) => `"${String(value).replaceAll('"', '""')}"`)
      .join(","),
  );

  const csv = [headers.join(","), ...rows].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": 'attachment; filename="divine-design-leads.csv"',
    },
  });
}

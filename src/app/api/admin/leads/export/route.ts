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
    "Venue",
    "Budget",
    "Guest Count",
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
      item.venue,
      item.budgetRange,
      item.guestCount,
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

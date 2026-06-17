import { NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";

import { sendInquiryEmails } from "@/lib/email";
import { isDatabaseConfigured } from "@/lib/env";
import { connectToDatabase } from "@/lib/mongoose";
import { inquirySchema } from "@/lib/validators";
import { ConsultationAvailabilityModel, InquiryModel } from "@/models";

const crmFields = {
  firstName: "first_name",
  lastName: "last_name",
  email: "email",
  phone: "phone",
  eventDate: "Event Date",
  eventType: "Event Type",
  venue: "Event Location / Venue",
  eventStartTime: "Event Start Time",
  eventThemeOrColors: "Event Theme or Colors",
  guestCount: "Estimated Guest Count",
  installationTime: "Installation Time",
  strikeTime: "Strike / Breakdown Time",
  servicesNeeded: "Which services are you interested in?",
  budgetRange: "What is your estimated décor budget?",
  inspirationNotes: "Tell us more about your event or design vision.",
  marketingConsent: "Marketing Consent",
} as const;

function getText(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

function getAllText(formData: FormData, name: string) {
  return formData
    .getAll(name)
    .map((value) => String(value).trim())
    .filter(Boolean);
}

async function getInquiryPayload(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return request.json();
  }

  const formData = await request.formData();

  return {
    first_name: getText(formData, crmFields.firstName),
    last_name: getText(formData, crmFields.lastName),
    email: getText(formData, crmFields.email),
    phone: getText(formData, crmFields.phone),
    eventType: getText(formData, crmFields.eventType),
    eventDate: getText(formData, crmFields.eventDate),
    eventStartTime: getText(formData, crmFields.eventStartTime),
    venue: getText(formData, crmFields.venue),
    eventThemeOrColors: getText(formData, crmFields.eventThemeOrColors),
    budgetRange: getText(formData, crmFields.budgetRange),
    guestCount: getText(formData, crmFields.guestCount),
    installationTime: getText(formData, crmFields.installationTime),
    strikeTime: getText(formData, crmFields.strikeTime),
    inspirationNotes: getText(formData, crmFields.inspirationNotes),
    servicesNeeded: getAllText(formData, crmFields.servicesNeeded),
    inspirationImages: [],
    consultationSlotId: getText(formData, "consultationSlotId"),
    marketingConsent: formData.has(crmFields.marketingConsent),
    website: getText(formData, "website"),
  };
}

export async function POST(request: Request) {
  try {
    const payload = inquirySchema.parse(await getInquiryPayload(request));
    const fullName = `${payload.first_name} ${payload.last_name}`.trim();

    if (payload.website) {
      return NextResponse.json({ success: true });
    }

    let inquiryId: string | null = null;

    if (isDatabaseConfigured()) {
      try {
        await connectToDatabase();

        let consultationSlotId = null;

        if (payload.consultationSlotId && isValidObjectId(payload.consultationSlotId)) {
          const slot = await ConsultationAvailabilityModel.findOneAndUpdate(
            {
              _id: payload.consultationSlotId,
              isBooked: false,
            },
            {
              $set: {
                isBooked: true,
                bookingName: fullName,
              },
            },
            { new: true },
          );

          consultationSlotId = slot?._id ?? null;
        }

        const inquiry = await InquiryModel.create({
          ...payload,
          firstName: payload.first_name,
          lastName: payload.last_name,
          fullName,
          eventDate: new Date(payload.eventDate),
          consultationSlotId,
        });

        inquiryId = inquiry.id;
      } catch (databaseError) {
        console.error("Unable to save inquiry locally.", databaseError);
      }
    }

    void sendInquiryEmails({
        fullName,
        email: payload.email,
        eventType: payload.eventType,
        eventDate: new Date(payload.eventDate).toDateString(),
        venue: payload.venue,
    }).catch((emailError) => {
      console.error("Unable to send inquiry email.", emailError);
    });

    return NextResponse.json({ success: true, id: inquiryId });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "We could not submit your inquiry.",
      },
      { status: 400 },
    );
  }
}

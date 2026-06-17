import { NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";

import { sendInquiryEmails } from "@/lib/email";
import { isDatabaseConfigured } from "@/lib/env";
import { connectToDatabase } from "@/lib/mongoose";
import { inquirySchema } from "@/lib/validators";
import { ConsultationAvailabilityModel, InquiryModel } from "@/models";

function getText(formData: FormData, ...names: string[]) {
  for (const name of names) {
    const value = String(formData.get(name) ?? "").trim();

    if (value) {
      return value;
    }
  }

  return "";
}

function getAllText(formData: FormData, ...names: string[]) {
  return names
    .flatMap((name) => formData.getAll(name))
    .map((value) => String(value).trim())
    .filter(Boolean);
}

function isJsonRequest(request: Request) {
  return (request.headers.get("content-type") ?? "").includes("application/json");
}

async function getInquiryPayload(request: Request) {
  if (isJsonRequest(request)) {
    return request.json();
  }

  const formData = await request.formData();
  const servicesNeeded = getAllText(
    formData,
    "services_interested",
    "Which services are you interested in?",
  );

  return {
    first_name: getText(formData, "first_name"),
    last_name: getText(formData, "last_name"),
    email: getText(formData, "email"),
    phone: getText(formData, "phone"),
    eventType: getText(formData, "event_type", "Event Type") || "Custom Styling",
    eventDate:
      getText(formData, "event_date", "Event Date") || new Date().toISOString().slice(0, 10),
    eventStartTime: getText(formData, "event_start_time", "Event Start Time"),
    venue: getText(formData, "event_location", "Event Location / Venue") || "CRM form test",
    eventThemeOrColors: getText(formData, "event_theme_colors", "Event Theme or Colors"),
    budgetRange:
      getText(formData, "estimated_decor_budget", "What is your estimated décor budget?") ||
      "$3,000 - $5,000",
    guestCount: getText(formData, "estimated_guest_count", "Estimated Guest Count") || "1",
    installationTime: getText(formData, "installation_time", "Installation Time"),
    strikeTime: getText(formData, "strike_breakdown_time", "Strike / Breakdown Time"),
    inspirationNotes:
      getText(
        formData,
        "event_design_vision",
        "Tell us more about your event or design vision.",
      ) || "Temporary CRM form detection test submission.",
    servicesNeeded: servicesNeeded.length ? servicesNeeded : ["Draping"],
    inspirationImages: [],
    consultationSlotId: getText(formData, "consultation_slot_id", "consultationSlotId"),
    marketingConsent: formData.has("marketing_consent") || formData.has("Marketing Consent"),
    website: getText(formData, "website"),
    source: getText(formData, "source") || "Divine Decor Website",
    submittedPagePath: getText(formData, "submitted_page_path"),
    submittedFormName: getText(formData, "submitted_form_name") || "Event Inquiry Form",
  };
}

function formRedirect(request: Request, path: string) {
  return NextResponse.redirect(new URL(path, request.url), 303);
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "unknown";
  const jsonRequest = isJsonRequest(request);

  console.info("[inquiries] received", {
    contentType,
    mode: jsonRequest ? "json" : "native_form",
  });

  try {
    const rawPayload = await getInquiryPayload(request);
    const payload = inquirySchema.parse(rawPayload);
    const fullName = `${payload.first_name} ${payload.last_name}`.trim();

    if (payload.website) {
      console.info("[inquiries] honeypot ignored", { mode: jsonRequest ? "json" : "native_form" });
      return jsonRequest ? NextResponse.json({ success: true }) : formRedirect(request, "/thank-you");
    }

    let inquiryId: string | null = null;
    let internalSaveSucceeded = false;

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
          source: rawPayload.source || "Divine Decor Website",
          submittedPagePath: rawPayload.submittedPagePath || "/inquire",
          submittedFormName: rawPayload.submittedFormName || "Event Inquiry Form",
          internalSavedStatus: "saved",
          externalTrackingMode: "native_form_tracking",
        });

        inquiryId = inquiry.id;
        internalSaveSucceeded = true;

        console.info("[inquiries] internal save succeeded", {
          inquiryId,
          mode: jsonRequest ? "json" : "native_form",
          submittedPagePath: rawPayload.submittedPagePath || "/inquire",
          submittedFormName: rawPayload.submittedFormName || "Event Inquiry Form",
        });
      } catch (databaseError) {
        console.error("[inquiries] internal save failed", databaseError);
      }
    } else {
      console.warn("[inquiries] database not configured");
    }

    if (!internalSaveSucceeded) {
      if (jsonRequest) {
        return NextResponse.json(
          { success: false, error: "Inquiry could not be saved internally." },
          { status: 500 },
        );
      }

      return formRedirect(request, "/inquire?error=save");
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

    if (jsonRequest) {
      return NextResponse.json({ success: true, id: inquiryId });
    }

    return formRedirect(request, "/thank-you");
  } catch (error) {
    console.error("[inquiries] submission failed", {
      mode: jsonRequest ? "json" : "native_form",
      error: error instanceof Error ? error.message : "Unknown error",
    });

    if (!jsonRequest) {
      return formRedirect(request, "/inquire?error=invalid");
    }

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

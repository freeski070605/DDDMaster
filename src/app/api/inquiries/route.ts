import { NextResponse } from "next/server";

import { sendInquiryEmails } from "@/lib/email";
import { isDatabaseConfigured } from "@/lib/env";
import { connectToDatabase } from "@/lib/mongoose";
import { inquirySchema } from "@/lib/validators";
import { ConsultationAvailabilityModel, InquiryModel } from "@/models";

export async function POST(request: Request) {
  try {
    const payload = inquirySchema.parse(await request.json());

    if (payload.website) {
      return NextResponse.json({ success: true });
    }

    if (!isDatabaseConfigured()) {
      return NextResponse.json({
        success: true,
        demoMode: true,
      });
    }

    await connectToDatabase();

    let consultationSlotId = null;

    if (payload.consultationSlotId) {
      const slot = await ConsultationAvailabilityModel.findOneAndUpdate(
        {
          _id: payload.consultationSlotId,
          isBooked: false,
        },
        {
          $set: {
            isBooked: true,
            bookingName: payload.fullName,
          },
        },
        { new: true },
      );

      consultationSlotId = slot?._id ?? null;
    }

    const inquiry = await InquiryModel.create({
      ...payload,
      eventDate: new Date(payload.eventDate),
      consultationSlotId,
    });

    await sendInquiryEmails({
      fullName: inquiry.fullName,
      email: inquiry.email,
      eventType: inquiry.eventType,
      eventDate: inquiry.eventDate.toDateString(),
      venue: inquiry.venue,
    });

    return NextResponse.json({ success: true, id: inquiry.id });
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

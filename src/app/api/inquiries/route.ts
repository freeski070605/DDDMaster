import { NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";

import { sendInquiryEmails } from "@/lib/email";
import { isDatabaseConfigured } from "@/lib/env";
import { connectToDatabase } from "@/lib/mongoose";
import { inquirySchema } from "@/lib/validators";
import { ConsultationAvailabilityModel, InquiryModel } from "@/models";

export async function POST(request: Request) {
  try {
    const payload = inquirySchema.parse(await request.json());
    const fullName = `${payload.firstName} ${payload.lastName}`.trim();

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

import { model, models, Schema, type InferSchemaType, type Model } from "mongoose";

const consultationAvailabilitySchema = new Schema(
  {
    label: { type: String, required: true },
    start: { type: Date, required: true, index: true },
    end: { type: Date, required: true },
    notes: { type: String, default: "" },
    isBooked: { type: Boolean, default: false },
    bookingName: { type: String, default: "" },
  },
  { timestamps: true },
);

export type ConsultationAvailabilityDocument = InferSchemaType<
  typeof consultationAvailabilitySchema
>;

export const ConsultationAvailabilityModel =
  (models.ConsultationAvailability as Model<ConsultationAvailabilityDocument>) ||
  model<ConsultationAvailabilityDocument>(
    "ConsultationAvailability",
    consultationAvailabilitySchema,
  );

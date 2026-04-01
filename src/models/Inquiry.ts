import { model, models, Schema, type InferSchemaType, type Model } from "mongoose";

const inquirySchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, index: true },
    phone: { type: String, required: true },
    eventType: { type: String, required: true, index: true },
    eventDate: { type: Date, required: true },
    venue: { type: String, required: true },
    budgetRange: { type: String, required: true },
    guestCount: { type: Number, required: true },
    inspirationNotes: { type: String, required: true },
    servicesNeeded: [{ type: String, required: true }],
    inspirationImages: [{ type: String }],
    consultationSlotId: {
      type: Schema.Types.ObjectId,
      ref: "ConsultationAvailability",
      default: null,
    },
    status: {
      type: String,
      enum: ["new", "contacted", "booked", "closed"],
      default: "new",
      index: true,
    },
    adminNotes: { type: String, default: "" },
  },
  { timestamps: true },
);

export type InquiryDocument = InferSchemaType<typeof inquirySchema>;

export const InquiryModel =
  (models.Inquiry as Model<InquiryDocument>) ||
  model<InquiryDocument>("Inquiry", inquirySchema);

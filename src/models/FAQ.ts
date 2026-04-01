import { model, models, Schema, type InferSchemaType, type Model } from "mongoose";

const faqSchema = new Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export type FAQDocument = InferSchemaType<typeof faqSchema>;

export const FAQModel =
  (models.FAQ as Model<FAQDocument>) || model<FAQDocument>("FAQ", faqSchema);

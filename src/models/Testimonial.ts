import { model, models, Schema, type InferSchemaType, type Model } from "mongoose";

const testimonialSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    quote: { type: String, required: true },
    image: { type: String, required: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export type TestimonialDocument = InferSchemaType<typeof testimonialSchema>;

export const TestimonialModel =
  (models.Testimonial as Model<TestimonialDocument>) ||
  model<TestimonialDocument>("Testimonial", testimonialSchema);

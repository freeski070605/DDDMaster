import { model, models, Schema, type InferSchemaType, type Model } from "mongoose";

const packageSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    startingPrice: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    highlights: [{ type: String, required: true }],
    addOns: [{ type: String, required: true }],
    bestFor: { type: String, required: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export type PackageDocument = InferSchemaType<typeof packageSchema>;

export const PackageModel =
  (models.Package as Model<PackageDocument>) ||
  model<PackageDocument>("Package", packageSchema);

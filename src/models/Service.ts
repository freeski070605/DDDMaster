import { model, models, Schema, type InferSchemaType, type Model } from "mongoose";

const serviceSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    startingPrice: { type: Number, required: true },
    idealFor: { type: String, required: true },
    includes: [{ type: String, required: true }],
    image: { type: String, required: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export type ServiceDocument = InferSchemaType<typeof serviceSchema>;

export const ServiceModel =
  (models.Service as Model<ServiceDocument>) ||
  model<ServiceDocument>("Service", serviceSchema);

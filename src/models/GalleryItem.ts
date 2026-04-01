import { model, models, Schema, type InferSchemaType, type Model } from "mongoose";

const galleryItemSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    category: { type: String, required: true, index: true },
    venue: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    beforeImage: { type: String, default: "" },
    afterImage: { type: String, default: "" },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export type GalleryItemDocument = InferSchemaType<typeof galleryItemSchema>;

export const GalleryItemModel =
  (models.GalleryItem as Model<GalleryItemDocument>) ||
  model<GalleryItemDocument>("GalleryItem", galleryItemSchema);

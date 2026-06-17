import { model, models, Schema, type InferSchemaType, type Model } from "mongoose";

const inquirySchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, index: true },
    phone: { type: String, required: true },
    eventType: { type: String, required: true, index: true },
    eventDate: { type: Date, required: true },
    eventStartTime: { type: String, default: "" },
    venue: { type: String, required: true },
    eventThemeOrColors: { type: String, default: "" },
    budgetRange: { type: String, required: true },
    guestCount: { type: Number, required: true },
    installationTime: { type: String, default: "" },
    strikeTime: { type: String, default: "" },
    inspirationNotes: { type: String, required: true },
    servicesNeeded: [{ type: String, required: true }],
    inspirationImages: [{ type: String }],
    marketingConsent: { type: Boolean, default: false },
    source: { type: String, default: "Divine Decor Website" },
    submittedPagePath: { type: String, default: "/inquire" },
    submittedFormName: { type: String, default: "Event Inquiry Form" },
    internalSavedStatus: { type: String, default: "saved" },
    externalTrackingMode: { type: String, default: "native_form_tracking" },
    crmSyncStatus: {
      type: String,
      enum: ["not_attempted", "success", "partial_success", "failed"],
      default: "not_attempted",
      index: true,
    },
    crmContactId: { type: String, default: "" },
    crmTagsAdded: [{ type: String }],
    crmTagSyncStatus: {
      type: String,
      enum: ["not_attempted", "success", "failed"],
      default: "not_attempted",
    },
    crmOpportunitySyncStatus: {
      type: String,
      enum: ["not_attempted", "success", "failed", "failed_pipeline_stage_resolution"],
      default: "not_attempted",
      index: true,
    },
    crmOpportunityId: { type: String, default: "" },
    crmPipelineId: { type: String, default: "" },
    crmPipelineName: { type: String, default: "" },
    crmPipelineStageId: { type: String, default: "" },
    crmPipelineStageName: { type: String, default: "" },
    crmSyncedAt: { type: Date, default: null },
    crmSyncError: { type: String, default: "" },
    crmSyncWarnings: [{ type: String }],
    crmLastPayloadSummary: { type: Schema.Types.Mixed, default: null },
    crmLastResponseSummary: { type: Schema.Types.Mixed, default: null },
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

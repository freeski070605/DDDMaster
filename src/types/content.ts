export type EventType =
  | "Wedding"
  | "Birthday"
  | "Baby Shower"
  | "Bridal Shower"
  | "Graduation"
  | "Corporate Event"
  | "Custom Styling";

export type InquiryStatus = "new" | "contacted" | "booked" | "closed";

export type GalleryCategory = EventType;

export type ServiceArea = {
  slug: string;
  name: string;
  headline: string;
  description: string;
  neighborhoods: string[];
  venueTypes: string[];
};

export type HomeStatistic = {
  value: string;
  label: string;
};

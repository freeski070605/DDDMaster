import { AvailabilityManager } from "@/components/admin/availability-manager";
import { getAllConsultationSlots } from "@/lib/cms";

export default async function AdminAvailabilityPage() {
  const slots = await getAllConsultationSlots();

  return <AvailabilityManager slots={slots as Array<{ _id: string; label: string; start: string; end: string; notes?: string; isBooked?: boolean }>} />;
}

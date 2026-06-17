import dns from "node:dns";
import { addDays, format, setHours, setMinutes } from "date-fns";

import { connectToDatabase } from "@/lib/mongoose";
import { ConsultationAvailabilityModel } from "@/models";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

function buildStarterAvailability() {
  const base = new Date();

  return [2, 4, 7, 9, 11, 14, 16, 18].map((offset, index) => {
    const day = addDays(base, offset);
    const hour = index % 2 === 0 ? 11 : 18;
    const start = setMinutes(setHours(day, hour), 0);
    const end = setMinutes(setHours(day, hour), 30);

    return {
      label: format(start, "EEEE, MMMM d 'at' h:mm a"),
      start,
      end,
      notes: "Virtual or phone consultation",
      isBooked: false,
      bookingName: "",
    };
  });
}

async function syncAvailability() {
  await connectToDatabase();

  const slots = buildStarterAvailability();

  for (const slot of slots) {
    await ConsultationAvailabilityModel.findOneAndUpdate(
      { start: slot.start },
      { $setOnInsert: slot },
      { new: true, upsert: true },
    );
  }

  console.log(`Synced ${slots.length} availability slots.`);
}

syncAvailability()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

import dns from "node:dns";

import { fallbackServices } from "@/data/seed-content";
import { connectToDatabase } from "@/lib/mongoose";
import { ServiceModel } from "@/models";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

async function syncServices() {
  await connectToDatabase();

  for (const service of fallbackServices) {
    await ServiceModel.findOneAndUpdate(
      { slug: service.slug },
      { $set: service },
      { new: true, upsert: true },
    );
  }

  console.log(`Synced ${fallbackServices.length} services.`);
}

syncServices()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

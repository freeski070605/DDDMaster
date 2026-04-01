import { Resend } from "resend";

import { brandName } from "@/data/seed-content";
import { env, isEmailConfigured } from "@/lib/env";

function getClient() {
  if (!isEmailConfigured()) {
    return null;
  }

  return new Resend(env.resendApiKey);
}

export async function sendInquiryEmails({
  fullName,
  email,
  eventType,
  eventDate,
  venue,
}: {
  fullName: string;
  email: string;
  eventType: string;
  eventDate: string;
  venue: string;
}) {
  const client = getClient();

  if (!client) {
    return;
  }

  await Promise.all([
    client.emails.send({
      from: env.resendFrom,
      to: email,
      subject: `${brandName} received your inquiry`,
      html: `<p>Hi ${fullName},</p><p>Thank you for reaching out to ${brandName}. We received your inquiry for your ${eventType.toLowerCase()} on ${eventDate} at ${venue} and will follow up soon with next steps.</p><p>Warmly,<br />${brandName}</p>`,
    }),
    client.emails.send({
      from: env.resendFrom,
      to: env.adminNotificationEmail,
      subject: `New inquiry: ${fullName} | ${eventType}`,
      html: `<p>A new inquiry was submitted.</p><ul><li>Name: ${fullName}</li><li>Email: ${email}</li><li>Event type: ${eventType}</li><li>Date: ${eventDate}</li><li>Venue: ${venue}</li></ul>`,
    }),
  ]);
}

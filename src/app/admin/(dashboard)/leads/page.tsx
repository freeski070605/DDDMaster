import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getInquiries } from "@/lib/cms";

export default async function AdminLeadsPage() {
  const inquiries = await getInquiries();

  return (
    <Card>
      <CardContent>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
              Leads
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-display)] text-5xl text-[color:var(--foreground)]">
              Inquiry pipeline
            </h1>
          </div>
          <Button asChild variant="secondary">
            <Link href="/api/admin/leads/export" prefetch={false}>
              Export CSV
            </Link>
          </Button>
        </div>
        <div className="mt-8 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[color:var(--border)] text-[color:var(--muted-foreground)]">
                <th className="px-3 py-3 font-medium">Client</th>
                <th className="px-3 py-3 font-medium">Event</th>
                <th className="px-3 py-3 font-medium">Date</th>
                <th className="px-3 py-3 font-medium">Status</th>
                <th className="px-3 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((lead) => (
                <tr
                  key={String(lead._id)}
                  className="border-b border-[color:var(--border)]/60"
                >
                  <td className="px-3 py-4">
                    <p className="font-semibold text-[color:var(--foreground)]">{lead.fullName}</p>
                    <p className="text-[color:var(--muted-foreground)]">{lead.email}</p>
                  </td>
                  <td className="px-3 py-4">{lead.eventType}</td>
                  <td className="px-3 py-4">
                    {new Date(lead.eventDate).toLocaleDateString()}
                  </td>
                  <td className="px-3 py-4 capitalize">{lead.status}</td>
                  <td className="px-3 py-4">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/leads/${String(lead._id)}`}>Open</Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!inquiries.length ? (
            <p className="pt-6 text-sm text-[color:var(--muted-foreground)]">
              No inquiries yet. This table will populate as new leads come in.
            </p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

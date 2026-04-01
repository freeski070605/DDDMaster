import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getDashboardAnalytics, getInquiries } from "@/lib/cms";

export default async function AdminDashboardPage() {
  const [analytics, inquiries] = await Promise.all([
    getDashboardAnalytics(),
    getInquiries(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
          Dashboard
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-5xl text-[color:var(--foreground)]">
          Business snapshot
        </h1>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <StatCard label="Total inquiries" value={String(analytics.totalInquiries)} />
        <StatCard label="Booked inquiries" value={String(analytics.bookedInquiries)} />
        <StatCard label="Conversion rate" value={`${analytics.conversionRate}%`} />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent>
            <h2 className="font-[family-name:var(--font-display)] text-3xl text-[color:var(--foreground)]">
              Inquiries by event type
            </h2>
            <div className="mt-6 space-y-3">
              {analytics.byEventType.length ? (
                analytics.byEventType.map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-sm text-[color:var(--muted-foreground)]">
                      {item.label}
                    </span>
                    <span className="font-semibold text-[color:var(--foreground)]">
                      {item.value}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-[color:var(--muted-foreground)]">
                  No inquiry data yet.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h2 className="font-[family-name:var(--font-display)] text-3xl text-[color:var(--foreground)]">
              Monthly inquiries
            </h2>
            <div className="mt-6 space-y-3">
              {analytics.monthlyInquiries.length ? (
                analytics.monthlyInquiries.map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-sm text-[color:var(--muted-foreground)]">
                      {item.label}
                    </span>
                    <span className="font-semibold text-[color:var(--foreground)]">
                      {item.value}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-[color:var(--muted-foreground)]">
                  Monthly analytics will appear after inquiries are submitted.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardContent>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-[family-name:var(--font-display)] text-3xl text-[color:var(--foreground)]">
              Latest leads
            </h2>
            <Button asChild variant="secondary">
              <Link href="/admin/leads">Open leads manager</Link>
            </Button>
          </div>
          <div className="mt-6 space-y-3">
            {inquiries.slice(0, 5).map((lead) => (
              <div
                key={String(lead._id)}
                className="flex flex-col gap-2 rounded-[1.5rem] border border-[color:var(--border)] bg-white/75 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-semibold text-[color:var(--foreground)]">{lead.fullName}</p>
                  <p className="text-sm text-[color:var(--muted-foreground)]">
                    {lead.eventType} • {lead.venue}
                  </p>
                </div>
                <Button asChild variant="outline">
                  <Link href={`/admin/leads/${String(lead._id)}`}>Review lead</Link>
                </Button>
              </div>
            ))}
            {!inquiries.length ? (
              <p className="text-sm text-[color:var(--muted-foreground)]">
                Leads will appear here once inquiries are submitted.
              </p>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardContent>
        <p className="text-sm uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">
          {label}
        </p>
        <p className="mt-4 text-4xl font-semibold text-[color:var(--foreground)]">
          {value}
        </p>
      </CardContent>
    </Card>
  );
}

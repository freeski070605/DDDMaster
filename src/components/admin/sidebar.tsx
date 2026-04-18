"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BarChart3, CalendarDays, FilePenLine, LogOut, Mailbox, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard", icon: BarChart3 },
  { href: "/admin/leads", label: "Leads", icon: Mailbox },
  { href: "/admin/content", label: "Content", icon: FilePenLine },
  { href: "/admin/availability", label: "Availability", icon: CalendarDays },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function signOut() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <aside className="rounded-[2rem] border border-white/60 bg-white/82 p-5 shadow-[0_24px_80px_rgba(95,73,123,0.12)] lg:sticky lg:top-24">
      <div className="flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-full bg-[color:var(--primary)] text-[color:var(--primary-foreground)]">
          <Shield className="size-5" />
        </div>
        <div>
          <p className="font-semibold text-[color:var(--foreground)]">Admin dashboard</p>
          <p className="text-sm text-[color:var(--muted-foreground)]">Divine Design and Decor</p>
        </div>
      </div>
      <div className="mt-5 rounded-[1.5rem] bg-[color:var(--secondary)]/45 p-4 text-sm leading-7 text-[color:var(--foreground)]">
        Bigger buttons, grouped sections, and a simpler content workspace are available in
        Content.
      </div>
      <nav className="mt-6 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex min-h-14 items-center gap-3 rounded-2xl px-4 py-3 text-base transition",
                active
                  ? "bg-[color:var(--primary)] text-[color:var(--primary-foreground)]"
                  : "text-[color:var(--foreground)] hover:bg-[color:var(--secondary)]",
              )}
            >
              <Icon className="size-5" />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <Button type="button" variant="outline" size="lg" className="mt-6 w-full" onClick={signOut}>
        <LogOut className="size-4" />
        Sign out
      </Button>
    </aside>
  );
}

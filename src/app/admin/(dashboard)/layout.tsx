import { AdminSidebar } from "@/components/admin/sidebar";
import { requireAdminSession } from "@/lib/auth";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdminSession();

  return (
    <div className="section">
      <div className="mx-auto grid w-full max-w-[94rem] gap-6 px-4 sm:px-6 lg:grid-cols-[300px_1fr] lg:px-8">
        <AdminSidebar />
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}

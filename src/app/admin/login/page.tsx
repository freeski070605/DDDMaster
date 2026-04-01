import { AdminLoginForm } from "@/components/admin/login-form";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Admin Login",
  description: "Secure admin login for Divine Design and Decor.",
  path: "/admin/login",
});

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ redirectTo?: string }>;
}) {
  const resolvedSearchParams = await searchParams;

  return (
    <div className="section flex min-h-[70vh] items-center justify-center px-4">
      <div className="text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
          Divine Design and Decor
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl text-[color:var(--foreground)]">
          Admin access
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[color:var(--muted-foreground)]">
          Sign in to manage inquiries, content, and consultation availability.
        </p>
        <div className="mt-8">
          <AdminLoginForm redirectTo={resolvedSearchParams?.redirectTo ?? "/admin"} />
        </div>
      </div>
    </div>
  );
}

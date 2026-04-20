import { revalidatePath } from "next/cache";

export function revalidatePublicSite() {
  revalidatePath("/", "layout");
}

export function revalidateAdminContent() {
  revalidatePath("/admin/content");
}

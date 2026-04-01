import type { Metadata } from "next";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { AdminShell } from "./AdminShell";

export const metadata: Metadata = {
  title: "Prosperity Press — Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Login page renders without the shell
  if (!user) {
    return <>{children}</>;
  }

  return <AdminShell user={user}>{children}</AdminShell>;
}

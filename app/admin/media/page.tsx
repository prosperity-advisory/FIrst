import { createSupabaseServerClient } from "@/lib/supabase-server";
import { MediaLibraryClient } from "./MediaLibraryClient";

export default async function MediaLibraryPage() {
  const supabase = await createSupabaseServerClient();

  const { data: items } = await supabase
    .from("media")
    .select("*")
    .order("uploaded_at", { ascending: false });

  return <MediaLibraryClient initialItems={items ?? []} />;
}

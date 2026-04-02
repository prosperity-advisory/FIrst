import { createSupabaseServerClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import { PageEditorClient } from "./PageEditorClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PageEditorPage({ params }: Props) {
  const { slug: rawSlug } = await params;
  const dbSlug = rawSlug === "_home" ? "" : rawSlug;
  const supabase = await createSupabaseServerClient();

  // Fetch page by slug
  const { data: page } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", dbSlug)
    .single();

  if (!page) notFound();

  // Fetch sections for this page
  const { data: sections } = await supabase
    .from("sections")
    .select("*")
    .eq("page_id", page.id)
    .order("sort_order");

  return (
    <PageEditorClient
      page={page}
      sections={sections ?? []}
      slug={rawSlug}
    />
  );
}

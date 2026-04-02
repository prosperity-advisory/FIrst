import { createSupabaseServerClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import { componentRegistry } from "@/lib/component-registry";
import { SectionEditorClient } from "./SectionEditorClient";

interface Props {
  params: Promise<{ slug: string; id: string }>;
}

export default async function SectionEditorPage({ params }: Props) {
  const { slug, id } = await params;
  const dbSlug = slug === "_home" ? "" : slug;
  const supabase = await createSupabaseServerClient();

  // Fetch the page (for breadcrumb title)
  const { data: page } = await supabase
    .from("pages")
    .select("id, title, slug")
    .eq("slug", dbSlug)
    .single();

  if (!page) notFound();

  // Fetch the section
  const { data: section } = await supabase
    .from("sections")
    .select("*")
    .eq("id", id)
    .eq("page_id", page.id)
    .single();

  if (!section) notFound();

  const componentDef = componentRegistry[section.component_type];
  const componentLabel = componentDef?.label ?? section.component_type;

  return (
    <SectionEditorClient
      section={section}
      pageTitle={page.title}
      slug={slug}
      componentLabel={componentLabel}
      fields={componentDef?.fields ?? []}
    />
  );
}

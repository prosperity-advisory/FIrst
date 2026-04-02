"use server";

import { createSupabaseServerClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";

// ---------------------------------------------------------------------------
// Page metadata
// ---------------------------------------------------------------------------

export async function updatePageMeta(
  pageId: string,
  data: {
    title: string;
    meta_description: string;
    og_image: string;
  }
) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("pages")
    .update({
      title: data.title,
      meta_description: data.meta_description,
      og_image: data.og_image,
      updated_at: new Date().toISOString(),
    })
    .eq("id", pageId);

  if (error) throw new Error(error.message);
  revalidatePath("/", "layout");
}

// ---------------------------------------------------------------------------
// Section visibility
// ---------------------------------------------------------------------------

export async function toggleSectionVisibility(
  sectionId: string,
  isVisible: boolean
) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("sections")
    .update({ is_visible: isVisible, updated_at: new Date().toISOString() })
    .eq("id", sectionId);

  if (error) throw new Error(error.message);
  revalidatePath("/", "layout");
}

// ---------------------------------------------------------------------------
// Section reorder
// ---------------------------------------------------------------------------

export async function swapSectionOrder(
  sectionA: { id: string; sort_order: number },
  sectionB: { id: string; sort_order: number }
) {
  const supabase = await createSupabaseServerClient();

  const { error: errA } = await supabase
    .from("sections")
    .update({
      sort_order: sectionB.sort_order,
      updated_at: new Date().toISOString(),
    })
    .eq("id", sectionA.id);

  if (errA) throw new Error(errA.message);

  const { error: errB } = await supabase
    .from("sections")
    .update({
      sort_order: sectionA.sort_order,
      updated_at: new Date().toISOString(),
    })
    .eq("id", sectionB.id);

  if (errB) throw new Error(errB.message);
  revalidatePath("/", "layout");
}

// ---------------------------------------------------------------------------
// Add section
// ---------------------------------------------------------------------------

export async function addSection(
  pageId: string,
  componentType: string,
  sortOrder: number
) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("sections").insert({
    page_id: pageId,
    component_type: componentType,
    sort_order: sortOrder,
    is_visible: true,
    content: {},
  });

  if (error) throw new Error(error.message);
  revalidatePath("/", "layout");
}

// ---------------------------------------------------------------------------
// Delete section
// ---------------------------------------------------------------------------

export async function deleteSection(sectionId: string) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("sections")
    .delete()
    .eq("id", sectionId);

  if (error) throw new Error(error.message);
  revalidatePath("/", "layout");
}

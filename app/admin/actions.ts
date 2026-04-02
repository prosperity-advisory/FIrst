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
// Update section content
// ---------------------------------------------------------------------------

export async function updateSectionContent(
  sectionId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: Record<string, any>
) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("sections")
    .update({ content, updated_at: new Date().toISOString() })
    .eq("id", sectionId);

  if (error) throw new Error(error.message);
  revalidatePath("/", "layout");
}

// ---------------------------------------------------------------------------
// Upload to Supabase Storage + media table
// ---------------------------------------------------------------------------

export async function uploadImage(formData: FormData): Promise<string> {
  const file = formData.get("file") as File;
  if (!file) throw new Error("No file provided");

  const supabase = await createSupabaseServerClient();
  const ext = file.name.split(".").pop() ?? "png";
  const storagePath = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("media")
    .upload(storagePath, file, { contentType: file.type, upsert: false });

  if (uploadError) throw new Error(uploadError.message);

  const { data } = supabase.storage.from("media").getPublicUrl(storagePath);
  const publicUrl = data.publicUrl;

  // Create media table record
  await supabase.from("media").insert({
    filename: file.name,
    url: publicUrl,
    alt_text: "",
    mime_type: file.type,
    file_size: file.size,
  });

  return publicUrl;
}

// ---------------------------------------------------------------------------
// Media library CRUD
// ---------------------------------------------------------------------------

export async function getMediaItems() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("media")
    .select("*")
    .order("uploaded_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function updateMediaAltText(id: string, altText: string) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("media")
    .update({ alt_text: altText })
    .eq("id", id);

  if (error) throw new Error(error.message);
}

export async function deleteMediaItem(id: string, url: string) {
  const supabase = await createSupabaseServerClient();

  // Extract storage path from public URL
  const match = url.match(/\/storage\/v1\/object\/public\/media\/(.+)$/);
  if (match) {
    await supabase.storage.from("media").remove([match[1]]);
  }

  const { error } = await supabase.from("media").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

// ---------------------------------------------------------------------------
// Update site settings
// ---------------------------------------------------------------------------

export async function updateSiteSettings(
  key: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: Record<string, any>
) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("site_settings")
    .update({ value, updated_at: new Date().toISOString() })
    .eq("key", key);

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

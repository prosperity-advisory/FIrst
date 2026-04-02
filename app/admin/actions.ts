"use server";

import { createSupabaseServerClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve } from "path";

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

// ---------------------------------------------------------------------------
// Snapshot & Restore
// ---------------------------------------------------------------------------

const SNAPSHOT_PATH = resolve(process.cwd(), "supabase", "snapshot.json");

export async function takeSnapshot() {
  const supabase = await createSupabaseServerClient();

  const { data: pages } = await supabase
    .from("pages").select("*").order("sort_order");
  const { data: sections } = await supabase
    .from("sections").select("*").order("page_id").order("sort_order");
  const { data: settings } = await supabase
    .from("site_settings").select("*");
  const { data: media } = await supabase
    .from("media").select("*").order("uploaded_at", { ascending: false });

  const snapshot = {
    created_at: new Date().toISOString(),
    pages: pages ?? [],
    sections: sections ?? [],
    site_settings: settings ?? [],
    media: media ?? [],
  };

  writeFileSync(SNAPSHOT_PATH, JSON.stringify(snapshot, null, 2) + "\n");

  return {
    created_at: snapshot.created_at,
    pages: snapshot.pages.length,
    sections: snapshot.sections.length,
    settings: snapshot.site_settings.length,
    media: snapshot.media.length,
  };
}

export async function getSnapshotInfo() {
  if (!existsSync(SNAPSHOT_PATH)) return null;
  try {
    const raw = JSON.parse(readFileSync(SNAPSHOT_PATH, "utf-8"));
    return {
      created_at: raw.created_at as string,
      pages: (raw.pages as unknown[]).length,
      sections: (raw.sections as unknown[]).length,
      settings: (raw.site_settings as unknown[]).length,
      media: (raw.media as unknown[]).length,
    };
  } catch {
    return null;
  }
}

export async function restoreSnapshot() {
  if (!existsSync(SNAPSHOT_PATH)) {
    throw new Error("No snapshot found. Take a snapshot first.");
  }

  const snapshot = JSON.parse(readFileSync(SNAPSHOT_PATH, "utf-8"));
  const supabase = await createSupabaseServerClient();

  // Clear in order (sections first due to FK)
  await supabase.from("sections").delete().gte("sort_order", -1);
  await supabase.from("pages").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("site_settings").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("media").delete().neq("id", "00000000-0000-0000-0000-000000000000");

  // Re-insert
  if (snapshot.pages?.length) {
    const { error } = await supabase.from("pages").insert(snapshot.pages);
    if (error) throw new Error(`pages: ${error.message}`);
  }
  if (snapshot.sections?.length) {
    const { error } = await supabase.from("sections").insert(snapshot.sections);
    if (error) throw new Error(`sections: ${error.message}`);
  }
  if (snapshot.site_settings?.length) {
    const { error } = await supabase.from("site_settings").insert(snapshot.site_settings);
    if (error) throw new Error(`site_settings: ${error.message}`);
  }
  if (snapshot.media?.length) {
    const { error } = await supabase.from("media").insert(snapshot.media);
    if (error) throw new Error(`media: ${error.message}`);
  }

  revalidatePath("/", "layout");

  return {
    pages: snapshot.pages?.length ?? 0,
    sections: snapshot.sections?.length ?? 0,
    settings: snapshot.site_settings?.length ?? 0,
    media: snapshot.media?.length ?? 0,
  };
}

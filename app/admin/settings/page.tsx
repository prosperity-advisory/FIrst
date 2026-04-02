import { createSupabaseServerClient } from "@/lib/supabase-server";
import { siteSettingsRegistry } from "@/lib/component-registry";
import { SettingsEditorClient } from "./SettingsEditorClient";

export default async function SettingsPage() {
  const supabase = await createSupabaseServerClient();

  const { data: rows } = await supabase
    .from("site_settings")
    .select("key, value");

  // Build a keyed object: { company: {...}, header: {...}, ... }
  const settings: Record<string, Record<string, unknown>> = {};
  for (const row of rows ?? []) {
    settings[row.key] = (row.value ?? {}) as Record<string, unknown>;
  }

  // Build ordered sections from registry
  const sections = Object.entries(siteSettingsRegistry).map(([key, def]) => ({
    key,
    label: def.label,
    fields: def.fields,
    values: settings[key] ?? {},
  }));

  return <SettingsEditorClient sections={sections} />;
}

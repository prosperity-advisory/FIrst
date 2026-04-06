/**
 * Migration: Update downloadable_guides and video_list sections in Supabase.
 *
 * - Renames {text} items to {title}
 * - Adds pdfUrl (defaulting to /documents/privacy-notice.pdf) for guides
 * - Adds empty url field for videos
 *
 * Run:  npx tsx supabase/migrate-guides-videos.ts
 */

import { config } from 'dotenv';
config({ path: '.env.local' });
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const sb = createClient(url, key);

async function main() {
  // Fetch both section types
  const { data: sections, error } = await sb
    .from('sections')
    .select('id, component_type, content')
    .in('component_type', ['downloadable_guides', 'video_list']);

  if (error) throw new Error(error.message);
  if (!sections?.length) {
    console.log('No downloadable_guides or video_list sections found.');
    return;
  }

  for (const section of sections) {
    const content = section.content as Record<string, unknown>;
    const items = content.items as Array<Record<string, string>> | undefined;

    if (!items?.length) {
      console.log(`  [${section.component_type}] No items — skipping.`);
      continue;
    }

    let updated = false;

    if (section.component_type === 'downloadable_guides') {
      const newItems = items.map((item) => ({
        title: item.title || item.text || '',
        pdfUrl: item.pdfUrl || '/documents/privacy-notice.pdf',
      }));
      content.items = newItems;
      if (!content.cta) content.cta = 'View PDF';
      updated = true;
      console.log(`  [downloadable_guides] Migrated ${newItems.length} items`);
      for (const item of newItems) {
        console.log(`    - ${item.title} => ${item.pdfUrl}`);
      }
    }

    if (section.component_type === 'video_list') {
      const newItems = items.map((item) => ({
        title: item.title || item.text || '',
        url: item.url || '',
      }));
      content.items = newItems;
      updated = true;
      console.log(`  [video_list] Migrated ${newItems.length} items`);
      for (const item of newItems) {
        console.log(`    - ${item.title}${item.url ? ` => ${item.url}` : ' (no URL yet)'}`);
      }
    }

    if (updated) {
      const { error: updateErr } = await sb
        .from('sections')
        .update({ content, updated_at: new Date().toISOString() })
        .eq('id', section.id);

      if (updateErr) throw new Error(`Failed to update ${section.id}: ${updateErr.message}`);
      console.log(`  Saved section ${section.id}\n`);
    }
  }

  console.log('Done!');
}

main().catch((e) => { console.error(e); process.exit(1); });

/**
 * Snapshot script — dumps the current Supabase CMS state to a JSON file.
 * This creates a restorable baseline of all pages, sections, site_settings,
 * and media records.
 *
 * Run:  npx tsx supabase/snapshot.ts
 * Output: supabase/snapshot.json
 */

import { config } from 'dotenv';
config({ path: '.env.local' });
import { createClient } from '@supabase/supabase-js';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) { console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY'); process.exit(1); }

const sb = createClient(url, key);

async function main() {
  console.log('Taking snapshot of CMS state...\n');

  // Pages
  const { data: pages, error: pErr } = await sb
    .from('pages')
    .select('*')
    .order('sort_order');
  if (pErr) throw new Error(`pages: ${pErr.message}`);
  console.log(`  Pages: ${pages.length}`);

  // Sections
  const { data: sections, error: sErr } = await sb
    .from('sections')
    .select('*')
    .order('page_id')
    .order('sort_order');
  if (sErr) throw new Error(`sections: ${sErr.message}`);
  console.log(`  Sections: ${sections.length}`);

  // Site settings
  const { data: settings, error: stErr } = await sb
    .from('site_settings')
    .select('*');
  if (stErr) throw new Error(`site_settings: ${stErr.message}`);
  console.log(`  Settings: ${settings.length}`);

  // Media records (not the files themselves — those stay in Storage)
  const { data: media, error: mErr } = await sb
    .from('media')
    .select('*')
    .order('uploaded_at', { ascending: false });
  if (mErr) throw new Error(`media: ${mErr.message}`);
  console.log(`  Media: ${media.length}`);

  const snapshot = {
    created_at: new Date().toISOString(),
    supabase_url: url,
    pages,
    sections,
    site_settings: settings,
    media,
  };

  const outPath = resolve(__dirname, 'snapshot.json');
  writeFileSync(outPath, JSON.stringify(snapshot, null, 2) + '\n');
  console.log(`\nSnapshot saved to: supabase/snapshot.json`);
  console.log(`  ${pages.length} pages, ${sections.length} sections, ${settings.length} settings, ${media.length} media records`);
}

main().catch((e) => { console.error(e); process.exit(1); });

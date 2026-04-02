/**
 * Restore script — resets the Supabase CMS to the state saved in snapshot.json.
 * This wipes all current pages, sections, site_settings, and media records,
 * then re-inserts everything from the snapshot.
 *
 * Media files in Storage are NOT deleted — only the database records are restored.
 * This means images uploaded after the snapshot will still exist in Storage but
 * won't appear in the media library until re-uploaded.
 *
 * Run:  npx tsx supabase/restore.ts
 * Input: supabase/snapshot.json
 */

import { config } from 'dotenv';
config({ path: '.env.local' });
import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) { console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY'); process.exit(1); }

const sb = createClient(url, key);

async function main() {
  const snapshotPath = resolve(__dirname, 'snapshot.json');
  if (!existsSync(snapshotPath)) {
    console.error('No snapshot found at supabase/snapshot.json');
    console.error('Run "npx tsx supabase/snapshot.ts" first to create one.');
    process.exit(1);
  }

  const snapshot = JSON.parse(readFileSync(snapshotPath, 'utf-8'));
  console.log(`Restoring snapshot from ${snapshot.created_at}`);
  console.log(`  ${snapshot.pages.length} pages, ${snapshot.sections.length} sections, ${snapshot.site_settings.length} settings, ${snapshot.media.length} media\n`);

  // Confirm
  const readline = await import('readline');
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const answer = await new Promise<string>((resolve) =>
    rl.question('This will REPLACE all current CMS data. Continue? (yes/no): ', resolve)
  );
  rl.close();
  if (answer.toLowerCase() !== 'yes') {
    console.log('Aborted.');
    process.exit(0);
  }

  console.log('\nRestoring...');

  // 1. Clear existing data (sections first due to FK)
  const { error: delSections } = await sb.from('sections').delete().gte('sort_order', -1);
  if (delSections) throw new Error(`delete sections: ${delSections.message}`);
  console.log('  Cleared sections');

  const { error: delPages } = await sb.from('pages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (delPages) throw new Error(`delete pages: ${delPages.message}`);
  console.log('  Cleared pages');

  const { error: delSettings } = await sb.from('site_settings').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (delSettings) throw new Error(`delete site_settings: ${delSettings.message}`);
  console.log('  Cleared site_settings');

  const { error: delMedia } = await sb.from('media').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (delMedia) throw new Error(`delete media: ${delMedia.message}`);
  console.log('  Cleared media');

  // 2. Re-insert pages
  if (snapshot.pages.length > 0) {
    const { error } = await sb.from('pages').insert(snapshot.pages);
    if (error) throw new Error(`insert pages: ${error.message}`);
    console.log(`  Restored ${snapshot.pages.length} pages`);
  }

  // 3. Re-insert sections
  if (snapshot.sections.length > 0) {
    const { error } = await sb.from('sections').insert(snapshot.sections);
    if (error) throw new Error(`insert sections: ${error.message}`);
    console.log(`  Restored ${snapshot.sections.length} sections`);
  }

  // 4. Re-insert site_settings
  if (snapshot.site_settings.length > 0) {
    const { error } = await sb.from('site_settings').insert(snapshot.site_settings);
    if (error) throw new Error(`insert site_settings: ${error.message}`);
    console.log(`  Restored ${snapshot.site_settings.length} settings`);
  }

  // 5. Re-insert media records
  if (snapshot.media.length > 0) {
    const { error } = await sb.from('media').insert(snapshot.media);
    if (error) throw new Error(`insert media: ${error.message}`);
    console.log(`  Restored ${snapshot.media.length} media records`);
  }

  console.log('\nRestore complete! Restart your dev server to see changes.');
}

main().catch((e) => { console.error(e); process.exit(1); });

/**
 * Backfill the `media` table from whatever actually lives in the Storage bucket.
 *
 * Why: when the project was migrated to the client's Supabase account, the
 * Storage objects copied over but the `media` table records didn't. The admin
 * Image Library reads from the table, so it appears empty even though the
 * files are present.
 *
 * Approach: enumerate every object in the `media` bucket (recursively), and
 * for any object that doesn't already have a row in `public.media`, insert one
 * with filename = basename, url = the public URL, mime = derived from
 * extension, file_size = from the storage metadata.
 *
 * Idempotent — safe to re-run. Will not duplicate rows.
 *
 * Run: npx tsx supabase/backfill-media-table.ts
 */

import { config } from 'dotenv';
config({ path: '.env.local' });
import { createClient } from '@supabase/supabase-js';
import { extname, basename } from 'path';

const MIME_MAP: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.mp4': 'video/mp4',
  '.mov': 'video/quicktime',
};

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const sb = createClient(url, key);
const BUCKET = 'media';

interface StorageObject {
  name: string;
  id: string | null;
  metadata: { size?: number; mimetype?: string } | null;
  created_at?: string | null;
}

async function listFolder(prefix: string): Promise<{ path: string; obj: StorageObject }[]> {
  const out: { path: string; obj: StorageObject }[] = [];
  let offset = 0;
  const limit = 100;
  while (true) {
    const { data, error } = await sb.storage
      .from(BUCKET)
      .list(prefix, { limit, offset, sortBy: { column: 'name', order: 'asc' } });
    if (error) throw new Error(`list ${prefix || '/'}: ${error.message}`);
    if (!data || data.length === 0) break;
    for (const item of data) {
      const fullPath = prefix ? `${prefix}/${item.name}` : item.name;
      // Folders come back with id === null and no metadata — recurse into them.
      if (item.id === null && !item.metadata) {
        out.push(...(await listFolder(fullPath)));
      } else {
        out.push({ path: fullPath, obj: item as StorageObject });
      }
    }
    if (data.length < limit) break;
    offset += limit;
  }
  return out;
}

async function main() {
  console.log(`Listing all objects in bucket "${BUCKET}"...`);
  const objects = await listFolder('');
  console.log(`  Found ${objects.length} objects\n`);

  // Pull the existing media URLs so we don't duplicate rows.
  const { data: existing, error: existingErr } = await sb
    .from('media')
    .select('url');
  if (existingErr) throw new Error(`load existing media: ${existingErr.message}`);
  const existingUrls = new Set((existing ?? []).map((r) => r.url as string));
  console.log(`Existing media rows: ${existingUrls.size}\n`);

  const rowsToInsert: Array<{
    filename: string;
    url: string;
    alt_text: string;
    mime_type: string;
    file_size: number;
    uploaded_at?: string;
  }> = [];

  for (const { path, obj } of objects) {
    const { data } = sb.storage.from(BUCKET).getPublicUrl(path);
    const publicUrl = data.publicUrl;
    if (existingUrls.has(publicUrl)) {
      continue;
    }
    const ext = extname(path).toLowerCase();
    const mime = obj.metadata?.mimetype || MIME_MAP[ext] || 'application/octet-stream';
    const size = obj.metadata?.size ?? 0;
    rowsToInsert.push({
      filename: basename(path),
      url: publicUrl,
      alt_text: '',
      mime_type: mime,
      file_size: size,
      uploaded_at: obj.created_at ?? undefined,
    });
  }

  if (rowsToInsert.length === 0) {
    console.log('Nothing to backfill — every storage object already has a media row.');
    return;
  }

  console.log(`Inserting ${rowsToInsert.length} new media rows:`);
  for (const r of rowsToInsert) {
    console.log(`  + ${r.filename}  (${r.mime_type}, ${r.file_size} bytes)`);
  }

  const { error: insertErr } = await sb.from('media').insert(rowsToInsert);
  if (insertErr) throw new Error(`insert: ${insertErr.message}`);

  const { count } = await sb
    .from('media')
    .select('*', { count: 'exact', head: true });
  console.log(`\nDone. media table now has ${count} rows.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

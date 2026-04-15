/**
 * One-off: create the /disclosures page + sections in Supabase so it appears
 * in the admin Pages list. Mirrors what migration 004_add_disclosures_page.sql does.
 * Idempotent — re-running replaces sections and updates the page row.
 *
 * Run:  npx tsx supabase/apply-004-disclosures.ts
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { readFileSync } from 'fs';
import { join } from 'path';

config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_ROLE) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const sb = createClient(SUPABASE_URL, SERVICE_ROLE, {
  auth: { persistSession: false },
});

const disclosures = JSON.parse(
  readFileSync(join(process.cwd(), 'content/disclosures.json'), 'utf-8')
);

async function main() {
  console.log('→ Upserting /disclosures page row');
  const { data: page, error: pageErr } = await sb
    .from('pages')
    .upsert(
      {
        slug: 'disclosures',
        title: disclosures.meta.title,
        meta_description: disclosures.meta.description,
        og_title: disclosures.meta.ogTitle ?? null,
        og_description: disclosures.meta.ogDescription ?? null,
        is_published: true,
        sort_order: 13,
      },
      { onConflict: 'slug' }
    )
    .select('id')
    .single();

  if (pageErr) throw pageErr;
  const pageId = page.id as string;
  console.log(`  page_id = ${pageId}`);

  console.log('→ Clearing existing sections on this page');
  const { error: delErr } = await sb.from('sections').delete().eq('page_id', pageId);
  if (delErr) throw delErr;

  const rows: {
    page_id: string;
    component_type: string;
    sort_order: number;
    content: Record<string, unknown>;
  }[] = [];

  let sortOrder = 0;

  rows.push({
    page_id: pageId,
    component_type: 'interior_hero',
    sort_order: ++sortOrder,
    content: {
      eyebrow: disclosures.hero.eyebrow,
      headline: disclosures.hero.headline,
      subtitle: disclosures.hero.subheadline,
      backgroundImage: disclosures.hero.backgroundImage,
    },
  });

  // Intro block: empty heading → renders as plain intro paragraphs
  rows.push({
    page_id: pageId,
    component_type: 'paragraphs_section',
    sort_order: ++sortOrder,
    content: {
      heading: '',
      paragraphs: disclosures.intro.paragraphs.map((t: string) => ({ text: t })),
    },
  });

  for (const section of disclosures.sections) {
    rows.push({
      page_id: pageId,
      component_type: 'paragraphs_section',
      sort_order: ++sortOrder,
      content: {
        heading: section.heading,
        paragraphs: section.paragraphs.map((t: string) => ({ text: t })),
      },
    });
  }

  console.log(`→ Inserting ${rows.length} sections`);
  const { error: insErr } = await sb.from('sections').insert(rows);
  if (insErr) throw insErr;

  console.log('\nDone. Visit /admin/pages — "Disclosures" should now be listed.');
}

main().catch((err) => {
  console.error('Failed:', err);
  process.exit(1);
});

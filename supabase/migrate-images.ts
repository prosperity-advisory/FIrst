/**
 * Image migration script — uploads active images from /public/images/ to
 * Supabase Storage "media" bucket and updates section content JSONB with
 * the new URLs.
 *
 * Run: npx tsx supabase/migrate-images.ts
 */

import { config } from 'dotenv';
config({ path: '.env.local' });
import { createClient } from '@supabase/supabase-js';
import { readFileSync, statSync } from 'fs';
import { resolve, extname } from 'path';

const MIME_MAP: Record<string, string> = {
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.gif': 'image/gif', '.webp': 'image/webp', '.svg': 'image/svg+xml',
};

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) { console.error('Missing env vars'); process.exit(1); }

const sb = createClient(url, key);

// ---------------------------------------------------------------------------
// Map of local paths → { page slug, section component_type, content field path }
// ---------------------------------------------------------------------------

interface ImageMapping {
  localPath: string;
  /** Where this image is referenced in the DB */
  refs: {
    pageSlug: string;
    componentType: string;
    /** Dot-path into the content JSONB, e.g. "backgroundImage" */
    field: string;
  }[];
}

const IMAGE_MAPPINGS: ImageMapping[] = [
  // HOME page
  {
    localPath: 'Hero 3 blank.jpg',
    refs: [{ pageSlug: '', componentType: 'hero', field: 'backgroundImage' }],
  },
  {
    localPath: 'Replacement for lady on home page 2 jpg.JPG',
    refs: [{ pageSlug: '', componentType: 'mission', field: 'image' }],
  },
  {
    localPath: 'Process google final.jpg',
    refs: [{ pageSlug: '', componentType: 'process_steps', field: 'bannerImage' }],
  },
  {
    localPath: 'Front building.jpg',
    refs: [
      { pageSlug: '', componentType: 'contact_section', field: 'image' },
      { pageSlug: 'contact', componentType: 'interior_hero', field: 'backgroundImage' },
      { pageSlug: 'contact', componentType: 'contact_section', field: 'image' },
    ],
  },
  // ABOUT page
  {
    localPath: 'Main Heading Image for about us-Our Mission page -JPG.JPG',
    refs: [{ pageSlug: 'about', componentType: 'interior_hero', field: 'backgroundImage' }],
  },
  {
    localPath: 'Our Mission 2.0 JPG.JPG',
    refs: [{ pageSlug: 'about', componentType: 'about_mission', field: 'image' }],
  },
  // SERVICES page
  {
    localPath: 'services 2.0.JPG',
    refs: [{ pageSlug: 'services', componentType: 'interior_hero', field: 'backgroundImage' }],
  },
  // PROCESS page
  {
    localPath: 'OUR Process replacement- JPG.JPG',
    refs: [{ pageSlug: 'process', componentType: 'interior_hero', field: 'backgroundImage' }],
  },
  {
    localPath: 'road to prosperity wide 2.jpg',
    refs: [{ pageSlug: 'process', componentType: 'roadmap_summary', field: 'image' }],
  },
  // PLANNING page
  {
    localPath: 'Hero Image 2 -JPG.JPG',
    refs: [{ pageSlug: 'planning', componentType: 'interior_hero', field: 'backgroundImage' }],
  },
  {
    localPath: 'Dashboard.JPG',
    refs: [{ pageSlug: 'planning', componentType: 'client_portal', field: 'image' }],
  },
  // PORTFOLIOS page
  {
    localPath: 'invest page.png',
    refs: [{ pageSlug: 'portfolios', componentType: 'interior_hero', field: 'backgroundImage' }],
  },
  // CASE STUDIES page
  {
    localPath: 'Planning Scenarios-JPG.JPG',
    refs: [{ pageSlug: 'case-studies', componentType: 'interior_hero', field: 'backgroundImage' }],
  },
  // WHO WE SERVE page
  {
    localPath: 'Who We Serve-JPG.JPG',
    refs: [{ pageSlug: 'who-we-serve', componentType: 'interior_hero', field: 'backgroundImage' }],
  },
  // FAQS page
  {
    localPath: 'Hero Image- jpg.JPG',
    refs: [{ pageSlug: 'faqs', componentType: 'interior_hero', field: 'backgroundImage' }],
  },
  // FEES page
  {
    localPath: 'tree jpg.JPG',
    refs: [{ pageSlug: 'fees', componentType: 'interior_hero', field: 'backgroundImage' }],
  },
  // RESOURCES page
  {
    localPath: 'services google.jpg',
    refs: [{ pageSlug: 'resources', componentType: 'interior_hero', field: 'backgroundImage' }],
  },
  // LOGO
  {
    localPath: 'single-logo-trimmed.png',
    refs: [], // Logo is handled via site_settings, not section content
  },
];

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const publicDir = resolve(__dirname, '..', 'public', 'images');
  const urlMap: Record<string, string> = {};

  // 1. Upload each image to Supabase Storage + media table
  for (const mapping of IMAGE_MAPPINGS) {
    const filePath = resolve(publicDir, mapping.localPath);
    let fileBuffer: Buffer;
    try {
      fileBuffer = readFileSync(filePath);
    } catch {
      console.warn(`  SKIP (not found): ${mapping.localPath}`);
      continue;
    }

    const stat = statSync(filePath);
    const ext = extname(mapping.localPath).toLowerCase();
    const mimeType = MIME_MAP[ext] || 'application/octet-stream';
    const storagePath = `images/${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;

    console.log(`Uploading: ${mapping.localPath} → ${storagePath}`);

    const { error: uploadError } = await sb.storage
      .from('media')
      .upload(storagePath, fileBuffer, { contentType: mimeType, upsert: false });

    if (uploadError) {
      console.error(`  ERROR uploading ${mapping.localPath}:`, uploadError.message);
      continue;
    }

    const { data } = sb.storage.from('media').getPublicUrl(storagePath);
    const publicUrl = data.publicUrl;
    urlMap[mapping.localPath] = publicUrl;
    console.log(`  URL: ${publicUrl}`);

    // Insert into media table
    await sb.from('media').insert({
      filename: mapping.localPath,
      url: publicUrl,
      alt_text: '',
      mime_type: mimeType,
      file_size: stat.size,
    });
  }

  // 2. Update section content JSONB with new URLs
  for (const mapping of IMAGE_MAPPINGS) {
    const publicUrl = urlMap[mapping.localPath];
    if (!publicUrl) continue;

    for (const ref of mapping.refs) {
      // Look up page id
      const { data: page } = await sb
        .from('pages')
        .select('id')
        .eq('slug', ref.pageSlug)
        .single();

      if (!page) {
        console.warn(`  Page not found: "${ref.pageSlug}"`);
        continue;
      }

      // Find the section
      const { data: section } = await sb
        .from('sections')
        .select('id, content')
        .eq('page_id', page.id)
        .eq('component_type', ref.componentType)
        .single();

      if (!section) {
        console.warn(`  Section not found: ${ref.componentType} on page "${ref.pageSlug}"`);
        continue;
      }

      // Update the content field
      const content = (section.content ?? {}) as Record<string, unknown>;
      content[ref.field] = publicUrl;

      const { error } = await sb
        .from('sections')
        .update({ content, updated_at: new Date().toISOString() })
        .eq('id', section.id);

      if (error) {
        console.error(`  ERROR updating section ${section.id}:`, error.message);
      } else {
        console.log(`  Updated: ${ref.pageSlug || '(home)'}/${ref.componentType}.${ref.field}`);
      }
    }
  }

  // 3. Update logo in site_settings (company.logoUrl)
  if (urlMap['single-logo-trimmed.png']) {
    const { data: companySetting } = await sb
      .from('site_settings')
      .select('value')
      .eq('key', 'company')
      .single();

    if (companySetting) {
      const val = (companySetting.value ?? {}) as Record<string, unknown>;
      val.logoUrl = urlMap['single-logo-trimmed.png'];
      await sb.from('site_settings').update({ value: val }).eq('key', 'company');
      console.log('  Updated: site_settings/company.logoUrl');
    }
  }

  console.log('\nDone! URL mapping:');
  for (const [local, remote] of Object.entries(urlMap)) {
    console.log(`  /images/${local} → ${remote}`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });

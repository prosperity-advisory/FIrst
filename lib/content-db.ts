/**
 * Supabase content layer — fetches page data, sections, and site settings.
 * Every function is wrapped in React `cache()` so duplicate calls within a
 * single request are automatically deduped.
 */

import { cache } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function getClient() {
  if (!supabaseUrl || !supabaseAnonKey) return null;
  return createClient(supabaseUrl, supabaseAnonKey);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyContent = Record<string, any>;

export interface PageMeta {
  title: string;
  description: string | undefined;
  ogTitle: string | undefined;
  ogDescription: string | undefined;
}

export interface PageData {
  meta: PageMeta;
  sections: { component_type: string; sort_order: number; content: AnyContent }[];
  /** Returns the first section matching `type`, or null. */
  section: (type: string) => AnyContent | null;
  /** Returns all sections matching `type`, preserving sort order. */
  sectionsOfType: (type: string) => AnyContent[];
}

/**
 * Fetch a single published page by slug, along with all its visible sections.
 * Returns null if Supabase is unreachable or the page doesn't exist.
 */
export const getPage = cache(async (slug: string): Promise<PageData | null> => {
  const client = getClient();
  if (!client) return null;

  try {
    const { data: page, error } = await client
      .from('pages')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single();

    if (error || !page) return null;

    const { data: sections } = await client
      .from('sections')
      .select('component_type, sort_order, content')
      .eq('page_id', page.id)
      .eq('is_visible', true)
      .order('sort_order');

    const secs = (sections ?? []) as PageData['sections'];

    return {
      meta: {
        title: page.title,
        description: page.meta_description ?? undefined,
        ogTitle: page.og_title ?? undefined,
        ogDescription: page.og_description ?? undefined,
      },
      sections: secs,
      section(type: string) {
        return secs.find((s) => s.component_type === type)?.content ?? null;
      },
      sectionsOfType(type: string) {
        return secs.filter((s) => s.component_type === type).map((s) => s.content);
      },
    };
  } catch (e) {
    console.warn(`[content-db] Failed to fetch page "/${slug}":`, e);
    return null;
  }
});

/**
 * Fetch all site_settings rows and return them as a keyed object.
 * Keys: company, header, footer, cta_band_defaults
 */
export const getSiteSettings = cache(async (): Promise<AnyContent | null> => {
  const client = getClient();
  if (!client) return null;

  try {
    const { data, error } = await client.from('site_settings').select('key, value');
    if (error || !data) return null;
    return Object.fromEntries(data.map((r: { key: string; value: unknown }) => [r.key, r.value]));
  } catch (e) {
    console.warn('[content-db] Failed to fetch site settings:', e);
    return null;
  }
});

/**
 * Fetch all published pages (for nav generation, sitemap, etc.)
 */
export const getAllPages = cache(async () => {
  const client = getClient();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from('pages')
      .select('slug, title, meta_description, sort_order')
      .eq('is_published', true)
      .order('sort_order');
    if (error) return null;
    return data;
  } catch (e) {
    console.warn('[content-db] Failed to fetch all pages:', e);
    return null;
  }
});

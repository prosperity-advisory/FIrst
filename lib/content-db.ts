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
  /** Returns the first visible section matching `type`, or null. */
  section: (type: string) => AnyContent | null;
  /** Returns all visible sections matching `type`, preserving sort order. */
  sectionsOfType: (type: string) => AnyContent[];
  /** Returns true if a section of this type exists but is hidden. */
  isHidden: (type: string) => boolean;
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

    // Fetch ALL sections (visible + hidden) so we can distinguish
    // "section not created" from "section hidden by admin"
    const { data: allSections } = await client
      .from('sections')
      .select('component_type, sort_order, content, is_visible')
      .eq('page_id', page.id)
      .order('sort_order');

    const all = (allSections ?? []) as { component_type: string; sort_order: number; content: AnyContent; is_visible: boolean }[];
    const secs = all.filter((s) => s.is_visible) as PageData['sections'];
    const hiddenTypes = new Set(all.filter((s) => !s.is_visible).map((s) => s.component_type));

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
      isHidden(type: string) {
        return hiddenTypes.has(type);
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

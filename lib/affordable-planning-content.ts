import { affordablePlanningContent } from '@/content/affordable-planning';
import {
  createAffordablePlanningCmsFixture,
  isAffordablePlanningCmsTargetAllowed,
  mapAffordablePlanningCmsContent,
  resolveAffordablePlanningPageContent,
  type AffordablePlanningCmsSection,
} from '@/content/affordable-planning-cms';

/**
 * Use the local draft by default. An explicit isolated-mode opt-in can read a
 * non-production project for development; production reads require a separate
 * activation flag and remain blocked by the route's development-only guard.
 */
export async function getAffordablePlanningPageContent() {
  const fallback = mapAffordablePlanningCmsContent(
    createAffordablePlanningCmsFixture(),
    affordablePlanningContent.meta,
  );
  const mode = process.env.AFFORDABLE_PLANNING_CMS_SOURCE;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const authorizedDevRef = process.env.AFFORDABLE_PLANNING_CMS_DEV_REF;
  // Production CMS reads remain dormant until the route is explicitly
  // activated after adviser review and content setup.
  const nodeEnv = process.env.NODE_ENV;
  if (!isAffordablePlanningCmsTargetAllowed(mode, url, nodeEnv, authorizedDevRef)) {
    return resolveAffordablePlanningPageContent(nodeEnv, null, fallback);
  }

  try {
    const { getPage } = await import('@/lib/content-db');
    const page = await getPage('affordable-planning');
    // getPage() selects only is_published=true records, so any returned record
    // is an explicitly published page. Missing and unpublished pages both
    // return null and must never fall through to local copy in production.
    if (!page) return resolveAffordablePlanningPageContent(nodeEnv, null, fallback);
    const sections: AffordablePlanningCmsSection[] = page.sections.map((section) => ({
      ...section,
      is_visible: true,
    }));
    const content = mapAffordablePlanningCmsContent(sections, {
      title: page.meta.title,
      meta_description: page.meta.description,
    });
    return resolveAffordablePlanningPageContent(nodeEnv, { is_published: true, content }, fallback);
  } catch {
    return resolveAffordablePlanningPageContent(nodeEnv, null, fallback);
  }
}

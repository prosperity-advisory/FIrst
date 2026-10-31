import { affordablePlanningContent } from './affordable-planning';

/** Shape already stored by the existing pages/sections CMS tables. */
export interface AffordablePlanningCmsSection {
  component_type: string;
  sort_order: number;
  is_visible: boolean;
  content: Record<string, unknown>;
}

export type AffordablePlanningContent = typeof affordablePlanningContent;
export type AffordablePlanningPageMeta = {
  title?: string | null;
  meta_description?: string | null;
};

export type AffordablePlanningCmsPageResult = {
  is_published: boolean;
  content: AffordablePlanningContent;
};

/** Local fallback is allowed only in development; production fails closed. */
export function resolveAffordablePlanningPageContent(
  nodeEnv: string | undefined,
  page: AffordablePlanningCmsPageResult | null,
  fallback: AffordablePlanningContent,
): AffordablePlanningContent | null {
  if (page?.is_published) return page.content;
  return nodeEnv === 'development' ? fallback : null;
}

/** Pure guard: fixture tests can verify this without touching the network. */
export function isAffordablePlanningCmsTargetAllowed(
  mode: string | undefined,
  url: string | undefined,
  nodeEnv: string | undefined,
  authorizedDevRef?: string,
) {
  if (!mode || !url) return false;
  let hostname = '';
  try {
    hostname = new URL(url).hostname.toLowerCase();
  } catch {
    return false;
  }
  if (mode === 'isolated' && nodeEnv === 'development') {
    const projectRef = hostname.endsWith('.supabase.co') ? hostname.split('.')[0] : '';
    if (projectRef === 'ealafgyzpvgphdkhtqkv' || !authorizedDevRef) return false;
    if (hostname === 'localhost' || hostname === '127.0.0.1') return authorizedDevRef === 'local';
    return Boolean(projectRef) && projectRef === authorizedDevRef;
  }
  return mode === 'production' && nodeEnv === 'production';
}

export const affordablePlanningSectionTypes = [
  'affordable_planning_hero',
  'affordable_planning_why',
  'affordable_planning_coverage',
  'affordable_planning_packages',
  'affordable_planning_deliverables',
  'affordable_planning_process',
  'affordable_planning_adviser',
  'affordable_planning_faq',
  'affordable_planning_final_cta',
  'affordable_planning_disclosures',
  'affordable_planning_illustrations',
] as const;

const text = (value: unknown, fallback: string): string =>
  typeof value === 'string' ? value : fallback;

function imagePath(value: unknown, fallback: string): string {
  if (typeof value !== 'string' || !value.trim()) return fallback;
  const legacyPreview = value.match(/^\/api\/affordable-preview\/(plan-page-0[1-3]|budget-preview)(?:\.webp)?$/);
  return legacyPreview ? `/images/affordable/${legacyPreview[1]}.webp` : value;
}

const records = (value: unknown): Record<string, unknown>[] =>
  Array.isArray(value)
    ? value.filter((item): item is Record<string, unknown> => typeof item === 'object' && item !== null)
    : [];

function stringItems(value: unknown, fallback: string[]) {
  const result = records(value).map((item) => text(item.text, ''));
  return result.length ? result : fallback;
}

/**
 * Serialize the existing approved local content into the existing CMS section
 * record shape. This function is pure and performs no Supabase/Storage access.
 */
export function createAffordablePlanningCmsFixture(
  source: AffordablePlanningContent = affordablePlanningContent,
): AffordablePlanningCmsSection[] {
  const sections: AffordablePlanningCmsSection[] = [
    { component_type: 'affordable_planning_hero', sort_order: 0, is_visible: true, content: {
      eyebrow: source.hero.eyebrow,
      title: source.hero.title,
      subtitle: source.hero.subtitle,
      body: source.hero.body,
      firm: source.hero.firm,
      cta: source.hero.cta,
      ctaHref: source.hero.ctaHref,
      reassurance: source.hero.reassurance,
      imageSrc: source.hero.image.src,
      imageAlt: source.hero.image.alt,
    } },
    { component_type: 'affordable_planning_why', sort_order: 1, is_visible: true, content: {
      title: source.why.title,
      paragraphs: source.why.paragraphs.map((paragraph) => ({ text: paragraph })),
    } },
    { component_type: 'affordable_planning_coverage', sort_order: 2, is_visible: true, content: {
      title: source.coverage.title,
      intro: source.coverage.intro,
      items: source.coverage.items,
      note: source.coverage.note,
    } },
    { component_type: 'affordable_planning_packages', sort_order: 3, is_visible: true, content: {
      title: source.packages.title,
      eyebrow: source.packages.eyebrow,
      options: source.packages.options.map((option) => ({
        name: option.name,
        price: option.price,
        fee: option.fee,
        text: option.text,
        includes: option.includes,
        imageSrc: option.image?.src ?? '',
        imageAlt: option.image?.alt ?? '',
      })),
      scopeTitle: source.packages.scopeTitle,
      scopeText: source.packages.scopeText,
      status: source.packages.status,
    } },
    { component_type: 'affordable_planning_deliverables', sort_order: 4, is_visible: true, content: {
      title: source.deliverables.title,
      paragraphs: source.deliverables.paragraphs.map((paragraph) => ({ text: paragraph })),
      note: source.deliverables.note,
      clarification: source.deliverables.clarification,
    } },
    { component_type: 'affordable_planning_process', sort_order: 5, is_visible: true, content: {
      title: source.process.title,
      steps: source.process.steps,
      note: source.process.note,
    } },
    { component_type: 'affordable_planning_adviser', sort_order: 6, is_visible: true, content: {
      title: source.prosperity.title,
      imageSrc: source.prosperity.image,
      imageAlt: source.prosperity.imageAlt,
      paragraphs: source.prosperity.paragraphs.map((paragraph) => ({ text: paragraph })),
      closing: source.prosperity.closing,
    } },
    { component_type: 'affordable_planning_faq', sort_order: 7, is_visible: true, content: {
      title: source.faqs.title,
      items: source.faqs.items,
    } },
    { component_type: 'affordable_planning_final_cta', sort_order: 8, is_visible: true, content: {
      title: source.finalCta.title,
      paragraphs: source.finalCta.paragraphs.map((paragraph) => ({ text: paragraph })),
      cta: source.finalCta.cta,
      ctaHref: source.finalCta.ctaHref,
      note: source.finalCta.note,
    } },
    { component_type: 'affordable_planning_disclosures', sort_order: 9, is_visible: true, content: source.disclosures },
    { component_type: 'affordable_planning_illustrations', sort_order: 10, is_visible: true, content: {
      galleryTitle: source.illustrations.gallery.title,
      galleryIntroduction: source.illustrations.gallery.introduction,
      galleryCompletenessNotice: source.illustrations.gallery.completenessNotice,
      galleryItems: source.illustrations.gallery.items,
      planCoverSrc: source.illustrations.planPages[0].src,
      planCoverAlt: source.illustrations.planPages[0].alt,
      financialOverviewSrc: source.illustrations.planPages[1].src,
      financialOverviewAlt: source.illustrations.planPages[1].alt,
      roadmapSrc: source.illustrations.planPages[2].src,
      roadmapAlt: source.illustrations.planPages[2].alt,
      budgetSrc: source.illustrations.budgetPreview.src,
      budgetAlt: source.illustrations.budgetPreview.alt,
    } },
  ];
  return sections;
}

/** Test-only stand-in for the existing updateSectionContent replacement save. */
export function simulateAffordablePlanningCmsSave(
  sections: AffordablePlanningCmsSection[],
  componentType: (typeof affordablePlanningSectionTypes)[number],
  nextContent: Record<string, unknown>,
): AffordablePlanningCmsSection[] {
  return sections.map((section) => section.component_type === componentType
    ? { ...section, content: structuredClone(nextContent) }
    : section);
}

/**
 * Map existing CMS page/section records into the landing page's structured
 * content. Missing or hidden fields fall back to the local approved draft.
 */
export function mapAffordablePlanningCmsContent(
  sections: AffordablePlanningCmsSection[],
  pageMeta: AffordablePlanningPageMeta = {},
  fallback: AffordablePlanningContent = affordablePlanningContent,
): AffordablePlanningContent {
  const byType = new Map(
    sections.filter((section) => section.is_visible).map((section) => [section.component_type, section.content]),
  );
  const section = (type: (typeof affordablePlanningSectionTypes)[number]) => byType.get(type) ?? {};
  const hero = section('affordable_planning_hero');
  const why = section('affordable_planning_why');
  const coverage = section('affordable_planning_coverage');
  const packages = section('affordable_planning_packages');
  const deliverables = section('affordable_planning_deliverables');
  const process = section('affordable_planning_process');
  const adviser = section('affordable_planning_adviser');
  const faqs = section('affordable_planning_faq');
  const finalCta = section('affordable_planning_final_cta');
  const illustrations = section('affordable_planning_illustrations');
  const disclosures = section('affordable_planning_disclosures');
  const clarification = typeof deliverables.clarification === 'object' && deliverables.clarification !== null
    ? deliverables.clarification as Record<string, unknown>
    : {};

  const mappedOptions = records(packages.options).map((option, index) => {
    const defaultOption = fallback.packages.options[index] ?? fallback.packages.options[0];
    const imageSrc = imagePath(option.imageSrc, defaultOption.image?.src ?? '');
    return {
      name: text(option.name, defaultOption.name),
      price: text(option.price, defaultOption.price),
      fee: text(option.fee, defaultOption.fee),
      text: text(option.text, defaultOption.text),
      includes: text(option.includes, defaultOption.includes),
      image: imageSrc ? { src: imageSrc, alt: text(option.imageAlt, defaultOption.image?.alt ?? '') } : null,
    };
  });

  const mapped = {
    ...fallback,
    meta: {
      title: text(pageMeta.title, fallback.meta.title),
      description: text(pageMeta.meta_description, fallback.meta.description),
    },
    hero: {
      ...fallback.hero,
      eyebrow: text(hero.eyebrow, fallback.hero.eyebrow),
      title: text(hero.title, fallback.hero.title),
      subtitle: text(hero.subtitle, fallback.hero.subtitle),
      body: text(hero.body, fallback.hero.body),
      firm: text(hero.firm, fallback.hero.firm),
      cta: text(hero.cta, fallback.hero.cta),
      ctaHref: text(hero.ctaHref, fallback.hero.ctaHref),
      reassurance: text(hero.reassurance, fallback.hero.reassurance),
      image: {
        src: imagePath(hero.imageSrc, fallback.hero.image.src),
        alt: text(hero.imageAlt, fallback.hero.image.alt),
      },
    },
    why: {
      title: text(why.title, fallback.why.title),
      paragraphs: stringItems(why.paragraphs, fallback.why.paragraphs),
    },
    coverage: {
      title: text(coverage.title, fallback.coverage.title),
      intro: text(coverage.intro, fallback.coverage.intro),
      items: records(coverage.items).map((item, index) => ({
        title: text(item.title, fallback.coverage.items[index]?.title ?? ''),
        text: text(item.text, fallback.coverage.items[index]?.text ?? ''),
      })),
      note: text(coverage.note, fallback.coverage.note),
    },
    packages: {
      ...fallback.packages,
      title: text(packages.title, fallback.packages.title),
      eyebrow: text(packages.eyebrow, fallback.packages.eyebrow),
      options: mappedOptions.length ? mappedOptions : fallback.packages.options,
      scopeTitle: text(packages.scopeTitle, fallback.packages.scopeTitle),
      scopeText: text(packages.scopeText, fallback.packages.scopeText),
      status: text(packages.status, fallback.packages.status),
    },
    deliverables: {
      title: text(deliverables.title, fallback.deliverables.title),
      paragraphs: stringItems(deliverables.paragraphs, fallback.deliverables.paragraphs),
      note: text(deliverables.note, fallback.deliverables.note),
      clarification: {
        title: text(clarification.title, fallback.deliverables.clarification.title),
        text: text(clarification.text, fallback.deliverables.clarification.text),
        approval: text(clarification.approval, fallback.deliverables.clarification.approval),
      },
    },
    process: {
      title: text(process.title, fallback.process.title),
      steps: records(process.steps).map((item, index) => ({
        title: text(item.title, fallback.process.steps[index]?.title ?? ''),
        text: text(item.text, fallback.process.steps[index]?.text ?? ''),
      })),
      note: text(process.note, fallback.process.note),
    },
    prosperity: {
      ...fallback.prosperity,
      title: text(adviser.title, fallback.prosperity.title),
      image: imagePath(adviser.imageSrc, fallback.prosperity.image),
      imageAlt: text(adviser.imageAlt, fallback.prosperity.imageAlt),
      paragraphs: stringItems(adviser.paragraphs, fallback.prosperity.paragraphs),
      closing: text(adviser.closing, fallback.prosperity.closing),
    },
    faqs: {
      title: text(faqs.title, fallback.faqs.title),
      items: records(faqs.items).map((item, index) => ({
        question: text(item.question, fallback.faqs.items[index]?.question ?? ''),
        answer: text(item.answer, fallback.faqs.items[index]?.answer ?? ''),
      })),
    },
    finalCta: {
      title: text(finalCta.title, fallback.finalCta.title),
      paragraphs: stringItems(finalCta.paragraphs, fallback.finalCta.paragraphs),
      cta: text(finalCta.cta, fallback.finalCta.cta),
      ctaHref: text(finalCta.ctaHref, fallback.finalCta.ctaHref),
      note: text(finalCta.note, fallback.finalCta.note),
    },
    disclosures: {
      firm: text(disclosures.firm, fallback.disclosures.firm),
      advisory: text(disclosures.advisory, fallback.disclosures.advisory),
      insurance: text(disclosures.insurance, fallback.disclosures.insurance),
      footer: records(disclosures.footer).map((group, index) => ({
        heading: text(group.heading, fallback.disclosures.footer[index]?.heading ?? ''),
        links: records(group.links).map((link, linkIndex) => ({
          label: text(link.label, fallback.disclosures.footer[index]?.links[linkIndex]?.label ?? ''),
          href: text(link.href, fallback.disclosures.footer[index]?.links[linkIndex]?.href ?? ''),
        })),
      })),
    },
    illustrations: {
      planPages: [
        { ...fallback.illustrations.planPages[0], src: imagePath(illustrations.planCoverSrc, fallback.illustrations.planPages[0].src), alt: text(illustrations.planCoverAlt, fallback.illustrations.planPages[0].alt) },
        { ...fallback.illustrations.planPages[1], src: imagePath(illustrations.financialOverviewSrc, fallback.illustrations.planPages[1].src), alt: text(illustrations.financialOverviewAlt, fallback.illustrations.planPages[1].alt) },
        { ...fallback.illustrations.planPages[2], src: imagePath(illustrations.roadmapSrc, fallback.illustrations.planPages[2].src), alt: text(illustrations.roadmapAlt, fallback.illustrations.planPages[2].alt) },
      ],
      budgetPreview: {
        ...fallback.illustrations.budgetPreview,
        src: imagePath(illustrations.budgetSrc, fallback.illustrations.budgetPreview.src),
        alt: text(illustrations.budgetAlt, fallback.illustrations.budgetPreview.alt),
      },
      gallery: {
        title: text(illustrations.galleryTitle, fallback.illustrations.gallery.title),
        introduction: text(illustrations.galleryIntroduction, fallback.illustrations.gallery.introduction),
        completenessNotice: text(illustrations.galleryCompletenessNotice, fallback.illustrations.gallery.completenessNotice),
        items: records(illustrations.galleryItems).length
          ? records(illustrations.galleryItems).map((item, index) => ({
            ...fallback.illustrations.gallery.items[index],
            src: imagePath(item.src, fallback.illustrations.gallery.items[index]?.src ?? ''),
            alt: text(item.alt, fallback.illustrations.gallery.items[index]?.alt ?? ''),
            title: text(item.title, fallback.illustrations.gallery.items[index]?.title ?? ''),
            label: text(item.label, fallback.illustrations.gallery.items[index]?.label ?? ''),
            description: text(item.description, fallback.illustrations.gallery.items[index]?.description ?? ''),
            ...(text(item.projectionLimitation, fallback.illustrations.gallery.items[index]?.projectionLimitation ?? '')
              ? { projectionLimitation: text(item.projectionLimitation, fallback.illustrations.gallery.items[index]?.projectionLimitation ?? '') }
              : {}),
          }))
          : fallback.illustrations.gallery.items.map((item, index) => {
            const legacyImage = index === 0
              ? { src: illustrations.planCoverSrc, alt: illustrations.planCoverAlt, fallback: fallback.illustrations.planPages[0] }
              : index === 2
                ? { src: illustrations.financialOverviewSrc, alt: illustrations.financialOverviewAlt, fallback: fallback.illustrations.planPages[1] }
                : index === 4
                  ? { src: illustrations.roadmapSrc, alt: illustrations.roadmapAlt, fallback: fallback.illustrations.planPages[2] }
                  : index === 5
                    ? { src: illustrations.budgetSrc, alt: illustrations.budgetAlt, fallback: fallback.illustrations.budgetPreview }
                    : null;
            return legacyImage
              ? { ...item, src: imagePath(legacyImage.src, legacyImage.fallback.src), alt: text(legacyImage.alt, legacyImage.fallback.alt) }
              : item;
          }),
      },
      // This disclosure is rendered by the page component and remains code-controlled;
      // the existing CMS section schema intentionally stays unchanged.
      disclosure: fallback.illustrations.disclosure,
    },
  };

  return mapped as AffordablePlanningContent;
}

/**
 * Async content loaders — try Supabase first, fall back to JSON imports.
 *
 * Each getter reconstructs the same object shape the pages already expect,
 * so page-level changes are limited to adding `await`.
 */

import { cache } from 'react';
import { getPage } from './content-db';

// JSON fallbacks (kept in place — never deleted)
import homeJson from '@/content/home.json';
import servicesJson from '@/content/services.json';
import portfoliosJson from '@/content/portfolios.json';
import planningJson from '@/content/planning.json';
import aboutJson from '@/content/about.json';
import contactJson from '@/content/contact.json';
import whoWeServeJson from '@/content/who-we-serve.json';
import processJson from '@/content/process.json';
import feesJson from '@/content/fees.json';
import faqsJson from '@/content/faqs.json';
import resourcesJson from '@/content/resources.json';
import caseStudiesJson from '@/content/case-studies.json';
import sharedJson from '@/content/shared.json';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type A = Record<string, any>;

/** Reverse the seed script's textArray helper: {text}[] → string[] */
function ta(arr: { text: string }[] | undefined | null): string[] {
  return (arr ?? []).map((i) => i.text);
}

/** Recursively normalize accordion sections from DB: convert {text}[] items to string[] */
function normalizeSections(sections: A[]): A[] {
  return sections.map((s) => ({
    ...s,
    items: s.items ? (Array.isArray(s.items) && s.items[0]?.text !== undefined ? ta(s.items) : s.items) : undefined,
    subsections: s.subsections ? normalizeSections(s.subsections) : undefined,
  }));
}

// ---------------------------------------------------------------------------
// HOME
// ---------------------------------------------------------------------------

export const getHomeContent = cache(async () => {
  const page = await getPage('');
  if (!page) {
    console.warn('[content] Falling back to JSON for /');
    return {
      ...homeJson,
      hero: {
        eyebrow: 'Your Fiduciary Partner',
        headline: homeJson.hero.headline,
        subheadline: homeJson.hero.subheadline,
        ctaText: homeJson.hero.cta.text,
        ctaHref: homeJson.hero.cta.href,
        backgroundImage: homeJson.hero.backgroundImage ?? undefined,
      },
      mission: {
        eyebrow: 'Our Mission',
        headline: 'Welcome to Prosperity Planning',
        body: homeJson.welcome.body,
        badges: [] as { icon: string; label: string }[],
        image: homeJson.mission.image ?? undefined,
        imageAlt: homeJson.mission.imageAlt ?? undefined,
      },
      process: {
        eyebrow: 'The Road to Prosperity',
        headline: 'Your Journey to Financial Clarity',
        subtitle: 'We guide every client through a structured six-step process designed to build confidence and keep every decision intentional.',
        steps: homeJson.process.steps.map((s) => ({ ...s, description: '' })),
        ctaText: 'Discover Our Six Step Process →',
        ctaHref: '/process',
        bannerImage: homeJson.process.bannerImage ?? undefined,
        bannerAlt: homeJson.process.bannerAlt ?? undefined,
      },
      contact: {
        eyebrow: 'Get In Touch',
        headline: 'Woodland Hills Office Visits by Appointment',
        details: [] as { icon: string; label: string; value: string; href?: string | null }[],
        ctaText: 'Contact Us →',
        ctaHref: '/contact',
        mapLabel: 'Woodland Hills, CA',
        mapSublabel: '21255 Burbank Blvd, Suite 120',
        image: homeJson.contact.image ?? undefined,
        imageAlt: homeJson.contact.imageAlt ?? undefined,
      },
      businessOwner: null as null,
    };
  }
  const hero = page.section('hero');
  const mission = page.section('mission');
  const ps = page.section('process_steps');
  const cs = page.section('contact_section');
  const sg = page.section('services_grid');
  const boa = page.section('business_owner_accordion');
  return {
    ...homeJson,
    meta: page.meta,
    hero: hero
      ? {
          eyebrow: hero.eyebrow ?? homeJson.hero.headline,
          headline: hero.headline ?? homeJson.hero.headline,
          subheadline: hero.subheadline ?? homeJson.hero.subheadline,
          ctaText: hero.ctaText ?? homeJson.hero.cta.text,
          ctaHref: hero.ctaHref ?? homeJson.hero.cta.href,
          backgroundImage: hero.backgroundImage as string | undefined,
        }
      : {
          eyebrow: 'Your Fiduciary Partner',
          headline: homeJson.hero.headline,
          subheadline: homeJson.hero.subheadline,
          ctaText: homeJson.hero.cta.text,
          ctaHref: homeJson.hero.cta.href,
          backgroundImage: undefined as string | undefined,
        },
    mission: mission
      ? {
          eyebrow: mission.eyebrow ?? 'Our Mission',
          headline: mission.headline ?? 'Welcome to Prosperity Planning',
          body: mission.body ?? homeJson.welcome.body,
          badges: mission.badges ?? [],
          image: mission.image as string | undefined,
          imageAlt: mission.imageAlt as string | undefined,
        }
      : { ...homeJson.mission, eyebrow: 'Our Mission', headline: 'Welcome to Prosperity Planning', body: homeJson.welcome.body, badges: [] },
    process: ps
      ? {
          eyebrow: ps.eyebrow ?? 'The Road to Prosperity',
          headline: ps.headline ?? 'Your Journey to Financial Clarity',
          subtitle: ps.subtitle ?? '',
          steps: ps.steps ?? homeJson.process.steps,
          ctaText: ps.ctaText ?? 'Discover Our Six Step Process →',
          ctaHref: ps.ctaHref ?? '/process',
          bannerImage: ps.bannerImage as string | undefined,
          bannerAlt: ps.bannerAlt as string | undefined,
        }
      : { ...homeJson.process, eyebrow: 'The Road to Prosperity', headline: 'Your Journey to Financial Clarity', subtitle: '', ctaText: 'Discover Our Six Step Process →', ctaHref: '/process' },
    contact: cs
      ? {
          eyebrow: cs.eyebrow ?? 'Get In Touch',
          headline: cs.headline ?? 'Woodland Hills Office Visits by Appointment',
          details: cs.details ?? [],
          ctaText: cs.ctaText ?? 'Contact Us →',
          ctaHref: cs.ctaHref ?? '/contact',
          mapLabel: cs.mapLabel ?? 'Woodland Hills, CA',
          mapSublabel: cs.mapSublabel ?? '21255 Burbank Blvd, Suite 120',
          image: cs.image as string | undefined,
          imageAlt: cs.imageAlt as string | undefined,
        }
      : { image: undefined as string | undefined, imageAlt: undefined as string | undefined },
    services: sg
      ? { eyebrow: sg.eyebrow, heading: sg.headline, body: sg.body, categories: sg.categories, nextSteps: sg.nextSteps }
      : homeJson.services,
    businessOwner: boa
      ? {
          heading: boa.heading,
          body: boa.body,
          ctaText: boa.ctaText,
          ctaHref: boa.ctaHref,
          learnMoreText: boa.learnMoreText,
          learnMoreHref: boa.learnMoreHref,
          relevanceItems: boa.relevanceItems ? ta(boa.relevanceItems) : [],
          sections: boa.sections ? normalizeSections(boa.sections) : [],
        }
      : null,
  };
});

// ---------------------------------------------------------------------------
// SERVICES
// ---------------------------------------------------------------------------

export const getServicesContent = cache(async () => {
  const page = await getPage('services');
  if (!page) { console.warn('[content] Falling back to JSON for /services'); return servicesJson; }

  const hero = page.section('interior_hero');
  const si = page.section('services_intro');
  const sa = page.section('service_accordion');
  const ap = page.section('services_approach');
  const disc = page.section('disclosure');

  return {
    meta: page.meta,
    hero: { ...servicesJson.hero, eyebrow: hero?.eyebrow, headline: hero?.headline, body: hero?.subtitle, backgroundImage: hero?.backgroundImage as string | undefined },
    intro: si ? {
      paragraphs: ta(si.paragraphs),
      cta: { text: si.ctaText, href: si.ctaHref, prefix: si.ctaPrefix },
      exploreHeading: si.exploreHeading,
      exploreBody: si.exploreBody,
      exploreNote: si.exploreNote,
      exploreLinks: si.exploreLinks,
    } : servicesJson.intro,
    sections: sa ? sa.sections.map((s: A) => ({
      ...s,
      planningAreas: ta(s.planningAreas),
      disclaimers: ta(s.disclaimers),
      relevanceItems: ta(s.relevanceItems),
      whyItems: ta(s.whyItems),
    })) : servicesJson.sections,
    approach: ap ? {
      heading: ap.heading,
      paragraphs: ta(ap.paragraphs),
      cta: { heading: ap.ctaHeading, body: ap.ctaBody, text: ap.ctaText, href: ap.ctaHref },
    } : servicesJson.approach,
    disclosures: disc?.text ?? servicesJson.disclosures,
  };
});

// ---------------------------------------------------------------------------
// PORTFOLIOS
// ---------------------------------------------------------------------------

export const getPortfoliosContent = cache(async () => {
  const page = await getPage('portfolios');
  if (!page) { console.warn('[content] Falling back to JSON for /portfolios'); return portfoliosJson; }

  const hero = page.section('interior_hero');
  const pc = page.section('portfolio_cards');
  const textSections = page.sectionsOfType('text_section');
  const fs = page.section('foundation_section');
  const dl = page.section('disclosure_list');

  return {
    meta: page.meta,
    hero: { ...portfoliosJson.hero, headline: hero?.headline, intro: hero?.subtitle, body: pc?.introBody ?? portfoliosJson.hero.body, backgroundImage: hero?.backgroundImage as string | undefined },
    portfolios: pc?.portfolios ?? portfoliosJson.portfolios,
    management: textSections[0] ?? portfoliosJson.management,
    fiduciary: textSections[1] ?? portfoliosJson.fiduciary,
    foundation: fs ? {
      heading: fs.heading, intro: fs.intro, items: ta(fs.items), body: fs.body,
      cta: { text: fs.ctaText, href: fs.ctaHref },
    } : portfoliosJson.foundation,
    disclosures: dl ? ta(dl.items) : portfoliosJson.disclosures,
  };
});

// ---------------------------------------------------------------------------
// PLANNING
// ---------------------------------------------------------------------------

export const getPlanningContent = cache(async () => {
  const page = await getPage('planning');
  if (!page) { console.warn('[content] Falling back to JSON for /planning'); return planningJson; }

  const hero = page.section('interior_hero');
  const hb = page.section('hero_body');
  const sc = page.section('service_cards');
  const cp = page.section('client_portal');

  return {
    meta: page.meta,
    hero: {
      ...planningJson.hero,
      eyebrow: hero?.eyebrow ?? planningJson.hero.eyebrow,
      headline: hero?.headline,
      tagline: hero?.subtitle,
      backgroundImage: hero?.backgroundImage as string | undefined,
      body: hb?.paragraphs?.[0]?.text ?? planningJson.hero.body,
      detail: hb?.paragraphs?.[1]?.text ?? planningJson.hero.detail,
      cta: { text: hero?.ctaText ?? planningJson.hero.cta.text, href: hero?.ctaHref ?? planningJson.hero.cta.href },
    },
    serviceCards: sc ? sc.cards.map((c: A) => ({
      title: c.title, body: c.body, tagline: c.tagline,
      cta: c.ctaText ? { text: c.ctaText, href: c.ctaHref } : undefined,
    })) : planningJson.serviceCards,
    portal: { ...planningJson.portal, ...(cp ?? {}), image: cp?.image as string | undefined },
  };
});

// ---------------------------------------------------------------------------
// ABOUT
// ---------------------------------------------------------------------------

export const getAboutContent = cache(async () => {
  const page = await getPage('about');
  if (!page) { console.warn('[content] Falling back to JSON for /about'); return aboutJson; }

  const hero = page.section('interior_hero');
  const mission = page.section('about_mission');
  const services = page.section('about_services');
  const textSections = page.sectionsOfType('text_section');
  const badges = page.section('feature_badges');
  const ctaBand = page.section('cta_band');

  return {
    meta: page.meta,
    hero: { ...aboutJson.hero, eyebrow: hero?.eyebrow, headline: hero?.headline ?? aboutJson.hero.headline, backgroundImage: hero?.backgroundImage as string | undefined },
    mission: { ...aboutJson.mission, ...(mission ?? {}), image: mission?.image as string | undefined },
    ourServices: services ? {
      heading: services.heading, body: services.body, items: ta(services.items), outro: services.outro,
    } : aboutJson.ourServices,
    trustedPartner: textSections[0] ?? aboutJson.trustedPartner,
    features: badges ? badges.features.map((f: A) => f.label) : aboutJson.features,
    tailored: textSections[1] ?? aboutJson.tailored,
    ctaBand: ctaBand ? { heading: ctaBand.headline, body: ctaBand.subtext } : aboutJson.ctaBand,
  };
});

// ---------------------------------------------------------------------------
// CONTACT
// ---------------------------------------------------------------------------

export const getContactContent = cache(async () => {
  const page = await getPage('contact');
  if (!page) { console.warn('[content] Falling back to JSON for /contact'); return contactJson; }

  const hero = page.section('interior_hero');
  const loc = page.section('location_info');
  const sc = page.section('service_cards');

  return {
    meta: page.meta,
    hero: {
      ...contactJson.hero,
      headline: hero?.headline ?? contactJson.hero.headline,
      backgroundImage: hero?.backgroundImage as string | undefined,
      cta: { text: hero?.ctaText ?? contactJson.hero.cta.text, href: hero?.ctaHref ?? contactJson.hero.cta.href },
    },
    location: loc ? {
      heading: loc.heading, name: loc.name, address: loc.address, city: loc.city,
      state: loc.state, zip: loc.zip, phone: loc.phone, email: loc.email,
      disclosures: ta(loc.disclosures),
    } : contactJson.location,
    serviceCards: sc ? sc.cards.map((c: A) => ({
      title: c.title, body: c.body,
      cta: c.ctaText ? { text: c.ctaText, href: c.ctaHref } : undefined,
    })) : contactJson.serviceCards,
  };
});

// ---------------------------------------------------------------------------
// WHO WE SERVE
// ---------------------------------------------------------------------------

export const getWhoWeServeContent = cache(async () => {
  const page = await getPage('who-we-serve');
  if (!page) { console.warn('[content] Falling back to JSON for /who-we-serve'); return whoWeServeJson; }

  const hero = page.section('interior_hero');
  const ai = page.section('audience_intro');
  const ao = page.section('audience_overview');
  const ap = page.section('audience_profiles');
  const twoCol = page.sectionsOfType('two_column_text');
  const ce = page.section('connects_everything');
  const cc = page.section('closing_cta');

  return {
    meta: page.meta,
    hero: {
      ...whoWeServeJson.hero,
      eyebrow: hero?.eyebrow, headline: hero?.headline, subheadline: hero?.subtitle,
      backgroundImage: hero?.backgroundImage as string | undefined,
      heroBody: ai?.heroBody ?? whoWeServeJson.hero.heroBody,
      cta: { text: hero?.ctaText, href: hero?.ctaHref },
    },
    builtAroundYou: ai ? { heading: ai.heading, body: ai.body } : whoWeServeJson.builtAroundYou,
    quickOverview: ao ?? whoWeServeJson.quickOverview,
    audiences: ap ? ap.audiences.map((a: A) => ({
      ...a, focusedOn: ta(a.focusedOn), planningAreas: ta(a.planningAreas),
    })) : whoWeServeJson.audiences,
    taxAware: twoCol[0] ?? whoWeServeJson.taxAware,
    noOneCategory: twoCol[1] ?? whoWeServeJson.noOneCategory,
    connectsEverything: ce ? {
      heading: ce.heading, body: ce.body, subheading: ce.subheading, items: ta(ce.items), footer: ce.footer,
    } : whoWeServeJson.connectsEverything,
    closingCta: cc ? {
      heading: cc.heading, body: cc.body, body2: cc.body2,
      cta: { text: cc.ctaText, href: cc.ctaHref },
    } : whoWeServeJson.closingCta,
  };
});

// ---------------------------------------------------------------------------
// PROCESS
// ---------------------------------------------------------------------------

export const getProcessContent = cache(async () => {
  const page = await getPage('process');
  if (!page) { console.warn('[content] Falling back to JSON for /process'); return processJson; }

  const hero = page.section('interior_hero');
  const hb = page.section('hero_body');
  const wim = page.section('why_it_matters');
  const rm = page.section('roadmap_summary');
  const ds = page.section('detailed_steps');
  const bls = page.sectionsOfType('bullet_list_section');
  const tls = page.section('titled_list_section');
  const ps = page.section('paragraphs_section');
  const faq = page.section('faq_accordion');
  const cc = page.section('closing_cta');
  const disc = page.section('disclosure');

  return {
    meta: page.meta,
    hero: {
      ...processJson.hero,
      eyebrow: hero?.eyebrow, headline: hero?.headline, subheadline: hero?.subtitle,
      backgroundImage: hero?.backgroundImage as string | undefined,
      body: hb ? ta(hb.paragraphs) : processJson.hero.body,
      cta: { text: hero?.ctaText, href: hero?.ctaHref },
    },
    whyItMatters: wim ? {
      heading: wim.heading, body: wim.body, listHeading: wim.listHeading,
      items: ta(wim.items), paragraphs: ta(wim.paragraphs),
    } : processJson.whyItMatters,
    roadmap: { ...processJson.roadmap, ...(rm ?? {}), image: rm?.image as string | undefined },
    steps: ds ? ds.steps.map((s: A) => ({
      number: s.number, title: s.title, subtitle: s.subtitle,
      body: ta(s.body), listHeading: s.listHeading, items: ta(s.items),
      whyMatters: s.whyMatters, whatYouLeaveWith: ta(s.whatYouLeaveWith), cta: s.cta,
    })) : processJson.steps,
    whoIsFor: bls[0] ? { heading: bls[0].heading, listHeading: bls[0].listHeading, items: ta(bls[0].items) } : processJson.whoIsFor,
    whatItAddresses: bls[1] ? {
      heading: bls[1].heading, listHeading: bls[1].listHeading, items: ta(bls[1].items), footnote: bls[1].footnote,
    } : processJson.whatItAddresses,
    whatToExpect: tls ?? processJson.whatToExpect,
    planningExperience: ps ? { heading: ps.heading, paragraphs: ta(ps.paragraphs) } : processJson.planningExperience,
    faq: faq ?? processJson.faq,
    closing: cc ? {
      heading: cc.heading, paragraphs: cc.body?.split('\n\n') ?? [],
      cta: { text: cc.ctaText, href: cc.ctaHref },
    } : processJson.closing,
    compliance: disc?.text ?? processJson.compliance,
  };
});

// ---------------------------------------------------------------------------
// FEES
// ---------------------------------------------------------------------------

export const getFeesContent = cache(async () => {
  const page = await getPage('fees');
  if (!page) { console.warn('[content] Falling back to JSON for /fees'); return feesJson; }

  const hero = page.section('interior_hero');
  const fs = page.section('fee_sections');
  const disc = page.section('disclosure');
  const cb = page.section('cta_band');

  return {
    meta: page.meta,
    hero: { ...feesJson.hero, eyebrow: hero?.eyebrow, headline: hero?.headline, subheadline: hero?.subtitle, backgroundImage: hero?.backgroundImage as string | undefined },
    sections: fs ? fs.sections.map((s: A) => ({
      id: s.id, heading: s.heading, paragraphs: ta(s.paragraphs),
      listHeading: s.listHeading, items: ta(s.items), footnotes: ta(s.footnotes),
    })) : feesJson.sections,
    disclosure: disc?.text ?? feesJson.disclosure,
    ctaBand: cb ? { heading: cb.headline, body: cb.subtext } : feesJson.ctaBand,
  };
});

// ---------------------------------------------------------------------------
// FAQS
// ---------------------------------------------------------------------------

export const getFaqsContent = cache(async () => {
  const page = await getPage('faqs');
  if (!page) { console.warn('[content] Falling back to JSON for /faqs'); return faqsJson; }

  const hero = page.section('interior_hero');
  const fc = page.section('faq_categories');
  const cb = page.section('cta_band');

  return {
    meta: page.meta,
    hero: { ...faqsJson.hero, eyebrow: hero?.eyebrow, headline: hero?.headline, subheadline: hero?.subtitle, backgroundImage: hero?.backgroundImage as string | undefined },
    intro: { paragraphs: fc ? ta(fc.introParagraphs) : faqsJson.intro.paragraphs },
    categories: fc?.categories ?? faqsJson.categories,
    disclosures: fc?.disclosures ?? faqsJson.disclosures,
    ctaBand: cb ? { heading: cb.headline, body: cb.subtext } : faqsJson.ctaBand,
  };
});

// ---------------------------------------------------------------------------
// RESOURCES
// ---------------------------------------------------------------------------

export const getResourcesContent = cache(async () => {
  const page = await getPage('resources');
  if (!page) { console.warn('[content] Falling back to JSON for /resources'); return resourcesJson; }

  const hero = page.section('interior_hero');
  const hb = page.section('hero_body');
  const sh = page.section('resources_start_here');
  const htu = page.section('resources_how_to_use');
  const cg = page.section('calculator_groups');
  const pi = page.section('prosperity_insight');
  const hw = page.section('how_and_why');
  const rl = page.section('resource_library');
  const dg = page.section('downloadable_guides');
  const vl = page.section('video_list');
  const disc = page.section('disclosure');
  const cl = page.section('resources_closing');

  return {
    meta: page.meta,
    hero: {
      ...resourcesJson.hero,
      eyebrow: hero?.eyebrow, headline: hero?.headline, backgroundImage: hero?.backgroundImage as string | undefined,
      body: hb ? ta(hb.paragraphs) : resourcesJson.hero.body,
      cta: hb ? { text: hb.ctaText, href: hb.ctaHref, prefix: hb.ctaPrefix } : resourcesJson.hero.cta,
    },
    startHere: sh ?? resourcesJson.startHere,
    howToUse: htu ? {
      heading: htu.heading, intro: htu.intro, listHeading: htu.listHeading,
      items: ta(htu.items), footnote: htu.footnote,
    } : resourcesJson.howToUse,
    calculators: cg ?? resourcesJson.calculators,
    prosperityInsight: pi ? { heading: pi.heading, paragraphs: ta(pi.paragraphs) } : resourcesJson.prosperityInsight,
    howAndWhy: hw ? {
      heading: hw.heading, paragraphs: ta(hw.paragraphs), listHeading: hw.listHeading,
      items: ta(hw.items), closing: hw.closing, cta: hw.cta,
    } : resourcesJson.howAndWhy,
    resourceLibrary: rl ?? resourcesJson.resourceLibrary,
    downloadableGuides: dg ? { heading: dg.heading, items: ta(dg.items), cta: dg.cta } : resourcesJson.downloadableGuides,
    videos: vl ? { heading: vl.heading, items: ta(vl.items) } : resourcesJson.videos,
    educationalNote: disc?.text ?? resourcesJson.educationalNote,
    closing: cl ? {
      heading: cl.heading, paragraphs: ta(cl.paragraphs),
      cta: { text: cl.ctaText, href: cl.ctaHref, prefix: cl.ctaPrefix },
    } : resourcesJson.closing,
  };
});

// ---------------------------------------------------------------------------
// CASE STUDIES
// ---------------------------------------------------------------------------

export const getCaseStudiesContent = cache(async () => {
  const page = await getPage('case-studies');
  if (!page) { console.warn('[content] Falling back to JSON for /case-studies'); return caseStudiesJson; }

  const hero = page.section('interior_hero');
  const csi = page.section('case_studies_intro');
  const csp = page.section('case_studies_process');
  const si = page.section('scenarios_intro');
  const cats = page.sectionsOfType('scenario_category');
  const bls = page.sectionsOfType('bullet_list_section');
  const ps = page.section('paragraphs_section');
  const cc = page.section('closing_cta');
  const disc = page.section('disclosure');

  return {
    meta: page.meta,
    hero: { ...caseStudiesJson.hero, eyebrow: hero?.eyebrow, headline: hero?.headline, subheadline: hero?.subtitle, backgroundImage: hero?.backgroundImage as string | undefined },
    heroIntro: csi ? { paragraphs: ta(csi.heroIntroParagraphs), tagline: csi.tagline } : caseStudiesJson.heroIntro,
    whatYoullSee: csi ? { heading: csi.whatYoullSeeHeading, items: ta(csi.whatYoullSeeItems) } : caseStudiesJson.whatYoullSee,
    introSection: csi ? { heading: csi.introHeading, paragraphs: ta(csi.introParagraphs) } : caseStudiesJson.introSection,
    whatDesignedToShow: csi ? { heading: csi.whatDesignedHeading, items: csi.whatDesignedItems } : caseStudiesJson.whatDesignedToShow,
    planningProcess: csp ? {
      heading: csp.heading, subtitle: csp.subtitle,
      paragraphs: ta(csp.paragraphs), steps: csp.steps,
    } : caseStudiesJson.planningProcess,
    scenariosIntro: si ? {
      heading: si.heading, paragraphs: ta(si.paragraphs),
      illustrativeHeading: si.illustrativeHeading,
      illustrativeParagraphs: ta(si.illustrativeParagraphs),
      howToUse: { heading: si.howToUseHeading, items: ta(si.howToUseItems), disclaimer: si.howToUseDisclaimer },
    } : caseStudiesJson.scenariosIntro,
    quickLinks: si?.quickLinks ?? caseStudiesJson.quickLinks,
    categories: cats.length > 0 ? cats : caseStudiesJson.categories,
    whoThisIsFor: bls[0] ? { heading: bls[0].heading, body: bls[0].listHeading, items: ta(bls[0].items) } : caseStudiesJson.whoThisIsFor,
    whyHypothetical: ps ? { heading: ps.heading, paragraphs: ta(ps.paragraphs) } : caseStudiesJson.whyHypothetical,
    closingCta: cc ? {
      paragraphs: cc.body?.split('\n\n') ?? [],
      cta: { text: cc.ctaText, href: cc.ctaHref },
    } : caseStudiesJson.closingCta,
    compliance: disc ? { heading: 'Important Disclosures', paragraphs: disc.text?.split('\n\n') ?? [] } : caseStudiesJson.compliance,
  };
});

// ---------------------------------------------------------------------------
// SHARED
// ---------------------------------------------------------------------------

export const getSharedContent = cache(async () => {
  return sharedJson;
});

// ---------------------------------------------------------------------------
// Page metadata helper
// ---------------------------------------------------------------------------

type PageKey =
  | 'home' | 'services' | 'portfolios' | 'planning' | 'about' | 'contact'
  | 'who-we-serve' | 'process' | 'fees' | 'faqs' | 'resources' | 'case-studies';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const loaderMap: Record<PageKey, () => Promise<{ meta: any }>> = {
  home: getHomeContent,
  services: getServicesContent,
  portfolios: getPortfoliosContent,
  planning: getPlanningContent,
  about: getAboutContent,
  contact: getContactContent,
  'who-we-serve': getWhoWeServeContent,
  process: getProcessContent,
  fees: getFeesContent,
  faqs: getFaqsContent,
  resources: getResourcesContent,
  'case-studies': getCaseStudiesContent,
};

export async function getPageMeta(page: PageKey) {
  const content = await loaderMap[page]();
  return content.meta;
}

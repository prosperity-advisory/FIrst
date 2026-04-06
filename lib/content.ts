/**
 * Async content loaders — try Supabase first, fall back to JSON imports.
 *
 * Each getter reconstructs the same object shape the pages already expect,
 * so page-level changes are limited to adding `await`.
 */

import { cache } from 'react';
import { getPage, type PageData } from './content-db';

/**
 * Return `null` if the section is hidden in the admin, otherwise return `data`.
 * This lets pages skip rendering hidden sections while still showing
 * fallback data for sections that haven't been created in the DB yet.
 */
function vis<T>(page: PageData, type: string, data: T): T | null {
  return page.isHidden(type) ? null : data;
}

/** Extract section image data from a DB section content object */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function simg(section: Record<string, any> | null) {
  if (!section?.sectionImage) return undefined;
  return {
    url: section.sectionImage as string,
    alt: (section.sectionImageAlt as string) || '',
    caption: (section.sectionImageCaption as string) || '',
    layout: (section.sectionImageLayout as string) || 'featured-below',
  };
}

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
    hero: vis(page, 'hero', hero
      ? {
          eyebrow: hero.eyebrow ?? homeJson.hero.headline,
          headline: hero.headline ?? homeJson.hero.headline,
          subheadline: hero.subheadline ?? homeJson.hero.subheadline,
          ctaText: hero.ctaText ?? homeJson.hero.cta.text,
          ctaHref: hero.ctaHref ?? homeJson.hero.cta.href,
          backgroundImage: hero.backgroundImage as string | undefined,
          sectionImage: simg(hero),
        }
      : {
          eyebrow: 'Your Fiduciary Partner',
          headline: homeJson.hero.headline,
          subheadline: homeJson.hero.subheadline,
          ctaText: homeJson.hero.cta.text,
          ctaHref: homeJson.hero.cta.href,
          backgroundImage: undefined as string | undefined,
        }),
    mission: vis(page, 'mission', mission
      ? {
          eyebrow: mission.eyebrow ?? 'Our Mission',
          headline: mission.headline ?? 'Welcome to Prosperity Planning',
          body: mission.body ?? homeJson.welcome.body,
          badges: mission.badges ?? [],
          image: mission.image as string | undefined,
          imageAlt: mission.imageAlt as string | undefined,
        }
      : { ...homeJson.mission, eyebrow: 'Our Mission', headline: 'Welcome to Prosperity Planning', body: homeJson.welcome.body, badges: [] as { icon: string; label: string }[] }),
    process: vis(page, 'process_steps', ps
      ? {
          eyebrow: ps.eyebrow ?? 'The Road to Prosperity',
          headline: ps.headline ?? 'Your Journey to Financial Clarity',
          subtitle: ps.subtitle ?? '',
          steps: ps.steps ?? homeJson.process.steps,
          ctaText: ps.ctaText ?? 'Discover Our Six Step Process →',
          ctaHref: ps.ctaHref ?? '/process',
          bannerImage: ps.bannerImage as string | undefined,
          bannerAlt: ps.bannerAlt as string | undefined,
          sectionImage: simg(ps),
        }
      : { ...homeJson.process, eyebrow: 'The Road to Prosperity', headline: 'Your Journey to Financial Clarity', subtitle: '', ctaText: 'Discover Our Six Step Process →', ctaHref: '/process' }),
    contact: vis(page, 'contact_section', cs
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
          sectionImage: simg(cs),
        }
      : { image: undefined as string | undefined, imageAlt: undefined as string | undefined }),
    services: vis(page, 'services_grid', sg
      ? { eyebrow: sg.eyebrow, heading: sg.headline, body: sg.body, categories: sg.categories, nextSteps: sg.nextSteps, ctaButtons: sg.ctaButtons, sectionImage: simg(sg) }
      : homeJson.services),
    businessOwner: vis(page, 'business_owner_accordion', boa
      ? {
          heading: boa.heading,
          body: boa.body,
          ctaText: boa.ctaText,
          ctaHref: boa.ctaHref,
          learnMoreText: boa.learnMoreText,
          learnMoreHref: boa.learnMoreHref,
          relevanceItems: boa.relevanceItems ? ta(boa.relevanceItems) : [],
          sections: boa.sections ? normalizeSections(boa.sections) : [],
          sectionImage: simg(boa),
        }
      : null),
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
    hero: vis(page, 'interior_hero', { ...servicesJson.hero, eyebrow: hero?.eyebrow, headline: hero?.headline, body: hero?.subtitle, backgroundImage: hero?.backgroundImage as string | undefined, sectionImage: simg(hero) }),
    intro: vis(page, 'services_intro', si ? {
      paragraphs: ta(si.paragraphs),
      cta: { text: si.ctaText, href: si.ctaHref, prefix: si.ctaPrefix },
      exploreHeading: si.exploreHeading,
      exploreBody: si.exploreBody,
      exploreNote: si.exploreNote,
      exploreLinks: si.exploreLinks,
      sectionImage: simg(si),
    } : servicesJson.intro),
    sections: vis(page, 'service_accordion', sa ? sa.sections.map((s: A) => ({
      ...s,
      planningAreas: ta(s.planningAreas),
      disclaimers: ta(s.disclaimers),
      relevanceItems: ta(s.relevanceItems),
      whyItems: ta(s.whyItems),
    })) : servicesJson.sections),
    approach: vis(page, 'services_approach', ap ? {
      heading: ap.heading,
      paragraphs: ta(ap.paragraphs),
      cta: { heading: ap.ctaHeading, body: ap.ctaBody, text: ap.ctaText, href: ap.ctaHref },
      sectionImage: simg(ap),
    } : servicesJson.approach),
    disclosures: vis(page, 'disclosure', disc?.text ?? servicesJson.disclosures),
    imageBlocks: page.sectionsOfType('image_block'),
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
    hero: vis(page, 'interior_hero', { ...portfoliosJson.hero, headline: hero?.headline, intro: hero?.subtitle, body: pc?.introBody ?? portfoliosJson.hero.body, backgroundImage: hero?.backgroundImage as string | undefined, sectionImage: simg(hero) }),
    portfolios: vis(page, 'portfolio_cards', pc?.portfolios ?? portfoliosJson.portfolios),
    management: vis(page, 'text_section', { ...portfoliosJson.management, ...(textSections[0] ?? {}), sectionImage: simg(textSections[0]) }),
    fiduciary: vis(page, 'text_section', { ...portfoliosJson.fiduciary, ...(textSections[1] ?? {}), sectionImage: simg(textSections[1]) }),
    foundation: vis(page, 'foundation_section', fs ? {
      heading: fs.heading, intro: fs.intro, items: ta(fs.items), body: fs.body,
      cta: { text: fs.ctaText, href: fs.ctaHref },
      sectionImage: simg(fs),
    } : portfoliosJson.foundation),
    disclosures: vis(page, 'disclosure_list', dl ? ta(dl.items) : portfoliosJson.disclosures),
    imageBlocks: page.sectionsOfType('image_block'),
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
    hero: vis(page, 'interior_hero', {
      ...planningJson.hero,
      eyebrow: hero?.eyebrow ?? planningJson.hero.eyebrow,
      headline: hero?.headline,
      tagline: hero?.subtitle,
      backgroundImage: hero?.backgroundImage as string | undefined,
      body: hb?.paragraphs?.[0]?.text ?? planningJson.hero.body,
      detail: hb?.paragraphs?.[1]?.text ?? planningJson.hero.detail,
      cta: { text: hero?.ctaText ?? planningJson.hero.cta.text, href: hero?.ctaHref ?? planningJson.hero.cta.href },
      sectionImage: simg(hero),
    }),
    serviceCards: vis(page, 'service_cards', sc ? sc.cards.map((c: A) => ({
      title: c.title, body: c.body, tagline: c.tagline,
      cta: c.ctaText ? { text: c.ctaText, href: c.ctaHref } : undefined,
    })) : planningJson.serviceCards),
    portal: vis(page, 'client_portal', { ...planningJson.portal, ...(cp ?? {}), image: cp?.image as string | undefined, sectionImage: simg(cp) }),
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
    hero: vis(page, 'interior_hero', { ...aboutJson.hero, eyebrow: hero?.eyebrow, headline: hero?.headline ?? aboutJson.hero.headline, backgroundImage: hero?.backgroundImage as string | undefined, sectionImage: simg(hero) }),
    mission: vis(page, 'about_mission', { ...aboutJson.mission, ...(mission ?? {}), image: mission?.image as string | undefined, sectionImage: simg(mission) }),
    ourServices: vis(page, 'about_services', services ? {
      heading: services.heading, body: services.body, items: ta(services.items), outro: services.outro,
      sectionImage: simg(services),
    } : aboutJson.ourServices),
    trustedPartner: vis(page, 'text_section', { ...aboutJson.trustedPartner, ...(textSections[0] ?? {}), sectionImage: simg(textSections[0]) }),
    features: vis(page, 'feature_badges', badges ? badges.features.map((f: A) => f.label) : aboutJson.features),
    tailored: vis(page, 'text_section', { ...aboutJson.tailored, ...(textSections[1] ?? {}), sectionImage: simg(textSections[1]) }),
    ctaBand: vis(page, 'cta_band', ctaBand ? { heading: ctaBand.headline, body: ctaBand.subtext } : aboutJson.ctaBand),
    imageBlocks: page.sectionsOfType('image_block'),
  };
});

// ---------------------------------------------------------------------------
// CONTACT
// ---------------------------------------------------------------------------

export const getContactContent = cache(async () => {
  const page = await getPage('contact');
  if (!page) { console.warn('[content] Falling back to JSON for /contact'); return { ...contactJson, contactSection: null }; }

  const hero = page.section('interior_hero');
  const loc = page.section('location_info');
  const sc = page.section('service_cards');
  const cs = page.section('contact_section');

  return {
    meta: page.meta,
    hero: vis(page, 'interior_hero', {
      ...contactJson.hero,
      headline: hero?.headline ?? contactJson.hero.headline,
      subtitle: hero?.subtitle,
      backgroundImage: hero?.backgroundImage as string | undefined,
      cta: { text: hero?.ctaText ?? contactJson.hero.cta.text, href: hero?.ctaHref ?? contactJson.hero.cta.href },
      sectionImage: simg(hero),
    }),
    contactSection: vis(page, 'contact_section', cs ? {
      ctaText: cs.ctaText, ctaHref: cs.ctaHref,
      details: cs.details, image: cs.image as string | undefined, imageAlt: cs.imageAlt as string | undefined,
      eyebrow: cs.eyebrow, headline: cs.headline, mapLabel: cs.mapLabel, mapSublabel: cs.mapSublabel,
      sectionImage: simg(cs),
    } : null),
    location: vis(page, 'location_info', loc ? {
      heading: loc.heading, name: loc.name, address: loc.address, city: loc.city,
      state: loc.state, zip: loc.zip, phone: loc.phone, email: loc.email,
      disclosures: ta(loc.disclosures),
      sectionImage: simg(loc),
    } : contactJson.location),
    serviceCards: vis(page, 'service_cards', sc ? sc.cards.map((c: A) => ({
      title: c.title, body: c.body,
      cta: c.ctaText ? { text: c.ctaText, href: c.ctaHref } : undefined,
    })) : contactJson.serviceCards),
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
    hero: vis(page, 'interior_hero', {
      ...whoWeServeJson.hero,
      eyebrow: hero?.eyebrow, headline: hero?.headline, subheadline: hero?.subtitle,
      backgroundImage: hero?.backgroundImage as string | undefined,
      heroBody: ai?.heroBody ?? whoWeServeJson.hero.heroBody,
      cta: { text: hero?.ctaText, href: hero?.ctaHref },
      sectionImage: simg(hero),
    }),
    builtAroundYou: vis(page, 'audience_intro', ai ? { heading: ai.heading, body: ai.body, sectionImage: simg(ai) } : whoWeServeJson.builtAroundYou),
    quickOverview: vis(page, 'audience_overview', ao ? { ...whoWeServeJson.quickOverview, ...ao, sectionImage: simg(ao) } : whoWeServeJson.quickOverview),
    audiences: vis(page, 'audience_profiles', ap ? ap.audiences.map((a: A) => ({
      ...a, focusedOn: ta(a.focusedOn), planningAreas: ta(a.planningAreas),
    })) : whoWeServeJson.audiences),
    taxAware: vis(page, 'two_column_text', twoCol[0] ?? whoWeServeJson.taxAware),
    noOneCategory: vis(page, 'two_column_text', twoCol[1] ?? whoWeServeJson.noOneCategory),
    connectsEverything: vis(page, 'connects_everything', ce ? {
      heading: ce.heading, body: ce.body, subheading: ce.subheading, items: ta(ce.items), footer: ce.footer,
      sectionImage: simg(ce),
    } : whoWeServeJson.connectsEverything),
    closingCta: vis(page, 'closing_cta', cc ? {
      heading: cc.heading, body: cc.body, body2: cc.body2,
      cta: { text: cc.ctaText, href: cc.ctaHref },
      sectionImage: simg(cc),
    } : whoWeServeJson.closingCta),
    imageBlocks: page.sectionsOfType('image_block'),
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
    hero: vis(page, 'interior_hero', {
      ...processJson.hero,
      eyebrow: hero?.eyebrow, headline: hero?.headline, subheadline: hero?.subtitle,
      backgroundImage: hero?.backgroundImage as string | undefined,
      body: hb ? ta(hb.paragraphs) : processJson.hero.body,
      cta: { text: hero?.ctaText, href: hero?.ctaHref },
      sectionImage: simg(hero),
    }),
    whyItMatters: vis(page, 'why_it_matters', wim ? {
      heading: wim.heading, body: wim.body, listHeading: wim.listHeading,
      items: ta(wim.items), paragraphs: ta(wim.paragraphs),
      sectionImage: simg(wim),
    } : processJson.whyItMatters),
    roadmap: vis(page, 'roadmap_summary', { ...processJson.roadmap, ...(rm ?? {}), image: rm?.image as string | undefined, sectionImage: simg(rm) }),
    steps: vis(page, 'detailed_steps', ds ? ds.steps.map((s: A) => ({
      number: s.number, title: s.title, subtitle: s.subtitle,
      body: ta(s.body), listHeading: s.listHeading, items: ta(s.items),
      whyMatters: s.whyMatters, whatYouLeaveWith: ta(s.whatYouLeaveWith), cta: s.cta,
    })) : processJson.steps),
    whoIsFor: vis(page, 'bullet_list_section', bls[0] ? { heading: bls[0].heading, listHeading: bls[0].listHeading, items: ta(bls[0].items) } : processJson.whoIsFor),
    whatItAddresses: vis(page, 'bullet_list_section', bls[1] ? {
      heading: bls[1].heading, listHeading: bls[1].listHeading, items: ta(bls[1].items), footnote: bls[1].footnote,
    } : processJson.whatItAddresses),
    whatToExpect: vis(page, 'titled_list_section', tls ?? processJson.whatToExpect),
    planningExperience: vis(page, 'paragraphs_section', ps ? { heading: ps.heading, paragraphs: ta(ps.paragraphs), sectionImage: simg(ps) } : processJson.planningExperience),
    faq: vis(page, 'faq_accordion', faq ?? processJson.faq),
    closing: vis(page, 'closing_cta', cc ? {
      heading: cc.heading, paragraphs: cc.body?.split('\n\n') ?? [],
      cta: { text: cc.ctaText, href: cc.ctaHref },
      sectionImage: simg(cc),
    } : processJson.closing),
    compliance: vis(page, 'disclosure', disc?.text ?? processJson.compliance),
    imageBlocks: page.sectionsOfType('image_block'),
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
    hero: vis(page, 'interior_hero', { ...feesJson.hero, eyebrow: hero?.eyebrow, headline: hero?.headline, subheadline: hero?.subtitle, backgroundImage: hero?.backgroundImage as string | undefined, sectionImage: simg(hero) }),
    sections: vis(page, 'fee_sections', fs ? fs.sections.map((s: A) => ({
      id: s.id, heading: s.heading, paragraphs: ta(s.paragraphs),
      listHeading: s.listHeading, items: ta(s.items), footnotes: ta(s.footnotes),
    })) : feesJson.sections),
    disclosure: vis(page, 'disclosure', disc?.text ?? feesJson.disclosure),
    ctaBand: vis(page, 'cta_band', cb ? { heading: cb.headline, body: cb.subtext } : feesJson.ctaBand),
    imageBlocks: page.sectionsOfType('image_block'),
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
    hero: vis(page, 'interior_hero', { ...faqsJson.hero, eyebrow: hero?.eyebrow, headline: hero?.headline, subheadline: hero?.subtitle, backgroundImage: hero?.backgroundImage as string | undefined, sectionImage: simg(hero) }),
    intro: vis(page, 'faq_categories', { paragraphs: fc ? ta(fc.introParagraphs) : faqsJson.intro.paragraphs }),
    categories: vis(page, 'faq_categories', fc?.categories ?? faqsJson.categories),
    disclosures: vis(page, 'faq_categories', fc?.disclosures ?? faqsJson.disclosures),
    ctaBand: vis(page, 'cta_band', cb ? { heading: cb.headline, body: cb.subtext } : faqsJson.ctaBand),
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
    hero: vis(page, 'interior_hero', {
      ...resourcesJson.hero,
      eyebrow: hero?.eyebrow, headline: hero?.headline, backgroundImage: hero?.backgroundImage as string | undefined,
      body: hb ? ta(hb.paragraphs) : resourcesJson.hero.body,
      cta: hb ? { text: hb.ctaText, href: hb.ctaHref, prefix: hb.ctaPrefix } : resourcesJson.hero.cta,
      sectionImage: simg(hero),
    }),
    startHere: vis(page, 'resources_start_here', sh ? { ...resourcesJson.startHere, ...sh, sectionImage: simg(sh) } : resourcesJson.startHere),
    howToUse: vis(page, 'resources_how_to_use', htu ? {
      heading: htu.heading, intro: htu.intro, listHeading: htu.listHeading,
      items: ta(htu.items), footnote: htu.footnote,
      sectionImage: simg(htu),
    } : resourcesJson.howToUse),
    calculators: vis(page, 'calculator_groups', cg ?? resourcesJson.calculators),
    prosperityInsight: vis(page, 'prosperity_insight', pi ? { heading: pi.heading, paragraphs: ta(pi.paragraphs) } : resourcesJson.prosperityInsight),
    howAndWhy: vis(page, 'how_and_why', hw ? {
      heading: hw.heading, paragraphs: ta(hw.paragraphs), listHeading: hw.listHeading,
      items: ta(hw.items), closing: hw.closing, cta: hw.cta,
    } : resourcesJson.howAndWhy),
    resourceLibrary: vis(page, 'resource_library', rl ?? resourcesJson.resourceLibrary),
    downloadableGuides: vis(page, 'downloadable_guides', dg ? { heading: dg.heading, items: ta(dg.items), cta: dg.cta } : resourcesJson.downloadableGuides),
    videos: vis(page, 'video_list', vl ? { heading: vl.heading, items: ta(vl.items) } : resourcesJson.videos),
    educationalNote: vis(page, 'disclosure', disc?.text ?? resourcesJson.educationalNote),
    closing: vis(page, 'resources_closing', cl ? {
      heading: cl.heading, paragraphs: ta(cl.paragraphs),
      cta: { text: cl.ctaText, href: cl.ctaHref, prefix: cl.ctaPrefix },
      sectionImage: simg(cl),
    } : resourcesJson.closing),
    imageBlocks: page.sectionsOfType('image_block'),
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
    hero: vis(page, 'interior_hero', { ...caseStudiesJson.hero, eyebrow: hero?.eyebrow, headline: hero?.headline, subheadline: hero?.subtitle, backgroundImage: hero?.backgroundImage as string | undefined, sectionImage: simg(hero) }),
    heroCta1Text: hero?.ctaText ?? 'Schedule Your Free 15-Minute Clarity Session',
    heroCta1Href: hero?.ctaHref ?? 'https://calendly.com/prosperityplanningandadvisory/clarity-session',
    heroCta2Text: hero?.cta2Text ?? 'Explore Example Scenarios Below',
    heroCta2Href: hero?.cta2Href ?? '#scenarios',
    scenarioCtaText: csi?.scenarioCtaText ?? 'Schedule Your Free 15-Minute Clarity Session',
    heroIntro: vis(page, 'case_studies_intro', csi ? { paragraphs: ta(csi.heroIntroParagraphs), tagline: csi.tagline } : caseStudiesJson.heroIntro),
    whatYoullSee: vis(page, 'case_studies_intro', csi ? { heading: csi.whatYoullSeeHeading, items: ta(csi.whatYoullSeeItems) } : caseStudiesJson.whatYoullSee),
    introSection: vis(page, 'case_studies_intro', csi ? { heading: csi.introHeading, paragraphs: ta(csi.introParagraphs) } : caseStudiesJson.introSection),
    whatDesignedToShow: vis(page, 'case_studies_intro', csi ? { heading: csi.whatDesignedHeading, items: csi.whatDesignedItems } : caseStudiesJson.whatDesignedToShow),
    planningProcess: vis(page, 'case_studies_process', csp ? {
      heading: csp.heading, subtitle: csp.subtitle,
      paragraphs: ta(csp.paragraphs), steps: csp.steps,
      sectionImage: simg(csp),
    } : caseStudiesJson.planningProcess),
    scenariosIntro: vis(page, 'scenarios_intro', si ? {
      heading: si.heading, paragraphs: ta(si.paragraphs),
      illustrativeHeading: si.illustrativeHeading,
      illustrativeParagraphs: ta(si.illustrativeParagraphs),
      howToUse: { heading: si.howToUseHeading, items: ta(si.howToUseItems), disclaimer: si.howToUseDisclaimer },
    } : caseStudiesJson.scenariosIntro),
    quickLinks: vis(page, 'scenarios_intro', si?.quickLinks ?? caseStudiesJson.quickLinks),
    categories: vis(page, 'scenario_category', cats.length > 0 ? cats : caseStudiesJson.categories),
    whoThisIsFor: vis(page, 'bullet_list_section', bls[0] ? { heading: bls[0].heading, body: bls[0].listHeading, items: ta(bls[0].items) } : caseStudiesJson.whoThisIsFor),
    whyHypothetical: vis(page, 'paragraphs_section', ps ? { heading: ps.heading, paragraphs: ta(ps.paragraphs) } : caseStudiesJson.whyHypothetical),
    closingCta: vis(page, 'closing_cta', cc ? {
      paragraphs: cc.body?.split('\n\n') ?? [],
      cta: { text: cc.ctaText, href: cc.ctaHref },
      sectionImage: simg(cc),
    } : caseStudiesJson.closingCta),
    compliance: vis(page, 'disclosure', disc ? { heading: 'Important Disclosures', paragraphs: disc.text?.split('\n\n') ?? [] } : caseStudiesJson.compliance),
    imageBlocks: page.sectionsOfType('image_block'),
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

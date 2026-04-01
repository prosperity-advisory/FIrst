/**
 * Seed script — reads every /content/*.json file and populates Supabase tables:
 *   pages, sections, site_settings
 *
 * Run: npm run db:seed
 * Requires: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in env
 */

import { config } from 'dotenv';
config({ path: '.env.local' });
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// ---------------------------------------------------------------------------
// Supabase client (service role — bypasses RLS)
// ---------------------------------------------------------------------------

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const sb = createClient(url, key);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function loadJson(name: string) {
  const path = resolve(__dirname, '..', 'content', name);
  return JSON.parse(readFileSync(path, 'utf-8'));
}

/** Simple string array → array of { text } objects for the registry format */
function textArray(items: string[]): { text: string }[] {
  return (items ?? []).map((text) => ({ text }));
}

let insertedSections = 0;
let insertedPages = 0;

async function insertPage(slug: string, meta: { title: string; description: string; ogTitle?: string; ogDescription?: string }, sortOrder: number) {
  const { data, error } = await sb
    .from('pages')
    .upsert(
      {
        slug,
        title: meta.title,
        meta_description: meta.description,
        og_title: meta.ogTitle ?? null,
        og_description: meta.ogDescription ?? null,
        sort_order: sortOrder,
      },
      { onConflict: 'slug' }
    )
    .select('id')
    .single();

  if (error) {
    console.error(`  ERROR inserting page "${slug}":`, error.message);
    throw error;
  }
  insertedPages++;
  console.log(`  Page: /${slug || '(home)'} → ${data.id}`);
  return data.id as string;
}

async function insertSection(pageId: string, componentType: string, sortOrder: number, content: Record<string, unknown>) {
  const { error } = await sb.from('sections').insert({
    page_id: pageId,
    component_type: componentType,
    sort_order: sortOrder,
    content,
  });
  if (error) {
    console.error(`    ERROR inserting section "${componentType}":`, error.message);
    throw error;
  }
  insertedSections++;
  console.log(`    ${sortOrder}. ${componentType}`);
}

async function upsertSetting(key: string, value: unknown) {
  const { error } = await sb
    .from('site_settings')
    .upsert({ key, value }, { onConflict: 'key' });
  if (error) {
    console.error(`  ERROR upserting setting "${key}":`, error.message);
    throw error;
  }
  console.log(`  Setting: ${key}`);
}

// ---------------------------------------------------------------------------
// Seed pages + sections
// ---------------------------------------------------------------------------

async function seed() {
  console.log('\n=== Clearing existing data ===');
  await sb.from('sections').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await sb.from('pages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await sb.from('site_settings').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  console.log('  Cleared pages, sections, site_settings\n');

  // ========================================================================
  // SITE SETTINGS
  // ========================================================================
  console.log('=== Seeding site_settings ===');

  const shared = loadJson('shared.json');

  await upsertSetting('company', {
    name: shared.company.name,
    phone: shared.company.phone,
    email: shared.company.email,
    address: shared.company.address,
    calendlyUrl: shared.company.calendly,
    logoUrl: shared.company.logo,
  });

  // Header — from the actual hardcoded NAV_ITEMS in Header.tsx
  await upsertSetting('header', {
    navItems: [
      { label: 'Home', href: '/' },
      {
        label: 'Services', href: '/services',
        children: [
          { label: 'All Services', href: '/services' },
          { label: 'Prosperity Pathways\u2122 Portfolios', href: '/portfolios' },
          { label: 'Personal Prosperity Planning\u2122', href: '/planning' },
        ],
      },
      {
        label: 'Learn', href: '#',
        children: [
          { label: 'Planning Scenarios & Examples', href: '/case-studies' },
          { label: 'Resources & Learning Center', href: '/resources' },
          { label: 'FAQs', href: '/faqs' },
          { label: 'Fees & How We\u2019re Paid', href: '/fees' },
        ],
      },
      { label: 'Our Process', href: '/process' },
      { label: 'Who We Serve', href: '/who-we-serve' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    ctaText: 'Schedule Review',
    ctaMobileText: 'Schedule Your Strategy Review',
  });

  // Footer — from the actual hardcoded content in Footer.tsx
  await upsertSetting('footer', {
    companyName: 'Prosperity | Planning & Advisory',
    description: 'A fiduciary financial planning firm proudly serving individuals and small business owners.',
    linkGroups: [
      {
        heading: 'Services',
        links: [
          { label: 'All Services', href: '/services' },
          { label: 'Prosperity Pathways\u2122 Portfolios', href: '/portfolios' },
          { label: 'Personal Prosperity Planning\u2122', href: '/planning' },
        ],
      },
      {
        heading: 'About',
        links: [
          { label: 'Our Mission', href: '/about' },
          { label: 'Our Process', href: '/process' },
          { label: 'Who We Serve', href: '/who-we-serve' },
          { label: 'Fees & How We\u2019re Paid', href: '/fees' },
        ],
      },
      {
        heading: 'Resources',
        links: [
          { label: 'FAQs', href: '/faqs' },
          { label: 'Resources & Learning Center', href: '/resources' },
          { label: 'Planning Scenarios', href: '/case-studies' },
          { label: 'Contact Us', href: '/contact' },
        ],
      },
    ],
    disclosures: [
      'Prosperity Planning and Advisory, LLC is a registered investment adviser in the State of California. Registration does not imply a certain level of skill or training.',
      'Advisory services are provided by a registered investment adviser representative of the Firm. Investment strategies involve risk, including the potential loss of principal.',
      'Information on this website is for general informational and educational purposes only and does not constitute individualized investment advice, a recommendation, or an offer to buy or sell any security.',
      'Past performance is not indicative of future results. Any planning strategies discussed are based on general principles and may not be suitable for all individuals.',
      'We do not provide tax or legal advice. Hyperlinks to third-party content are provided for convenience and do not imply endorsement.',
    ],
    insuranceDisclaimer: 'Prosperity Planning and Advisory, LLC is a fee-only registered investment adviser and does not sell insurance products or receive insurance commissions.',
    privacyPolicyHref: '/documents/privacy-notice.pdf',
  });

  await upsertSetting('cta_band_defaults', {
    headline: 'Create Your Financial Plan With Us',
    subtext: 'No question is too small when it comes to your future. Talk to an adviser today and make confident financial decisions.',
    ctaText: 'Schedule Your Complimentary Strategy Review \u2192',
    ctaHref: 'https://calendly.com/prosperityplanningandadvisory/clarity-session',
  });

  // ========================================================================
  // PAGES
  // ========================================================================

  console.log('\n=== Seeding pages & sections ===');

  // --- HOME ---
  const home = loadJson('home.json');
  const homeId = await insertPage('', home.meta, 1);
  let s = 0;

  await insertSection(homeId, 'hero', ++s, {
    eyebrow: 'Your Fiduciary Partner',
    headline: 'Your Financial Plan<br/>Starts Here.',
    subheadline: 'Clarity. Confidence. Control. \u2014 A Financial Planner & Adviser proudly serving with integrity, where your best interest isn\u2019t just a commitment, it\u2019s our standard.',
    ctaText: 'Schedule Your Complimentary Strategy Review \u2192',
    ctaHref: home.hero.cta.href,
    backgroundImage: '/images/Hero 3 blank.jpg',
  });

  await insertSection(homeId, 'mission', ++s, {
    eyebrow: 'Our Mission',
    headline: 'Welcome to Prosperity Planning',
    body: 'At Prosperity Planning & Advisory, we partner with individuals and small business owners to work toward their financial goals with achievable strategies. As a fiduciary firm, we are legally and ethically committed to putting your best interests first in every recommendation we make. Whether you\u2019re preparing for retirement, building wealth, or strengthening your business, we deliver professional guidance and ongoing support.',
    image: '/images/Replacement for lady on home page 2 jpg.JPG',
    imageAlt: 'Financial advisor walking a path toward the future at sunrise',
    badges: [
      { icon: 'shield', label: 'Fiduciary Standard' },
      { icon: 'dollar', label: 'Clear & Transparent Pricing' },
      { icon: 'users', label: 'Personalized Strategies' },
    ],
  });

  await insertSection(homeId, 'process_steps', ++s, {
    eyebrow: 'The Road to Prosperity',
    headline: 'Your Journey to Financial Clarity',
    subtitle: 'We guide every client through a structured six-step process designed to build confidence and keep every decision intentional.',
    intro: home.process.intro,
    steps: [
      { number: 1, title: 'Initial Meeting', description: 'Understanding your goals and priorities' },
      { number: 2, title: 'Discovery', description: 'Uncovering your full financial picture' },
      { number: 3, title: 'Design', description: 'Crafting tailored strategies for your situation' },
      { number: 4, title: 'Recommend', description: 'Presenting a clear path forward' },
      { number: 5, title: 'Implement', description: 'Putting strategies into action with care' },
      { number: 6, title: 'Follow-Up', description: 'Ongoing support as life evolves' },
    ],
    ctaText: 'Discover Our Six Step Process \u2192',
    ctaHref: '/process',
    bannerImage: '/images/Process google final.jpg',
    bannerAlt: 'The six-step road to prosperity financial planning process',
  });

  await insertSection(homeId, 'services_grid', ++s, {
    eyebrow: home.services.eyebrow,
    headline: home.services.heading,
    body: home.services.body,
    categories: home.services.categories,
    nextSteps: home.services.nextSteps,
  });

  await insertSection(homeId, 'business_owner_accordion', ++s, {
    heading: 'Business Owner & Advanced Planning',
    body: 'Supporting business owners, professionals, and high-income households navigating complex financial decisions, competing priorities, and major financial transitions.',
    bodyExtra: 'Many business owners reach a point where traditional planning is no longer enough. As income grows, business value increases, and future transition decisions become more significant, planning often requires a more coordinated approach across cash flow, tax awareness, key-person retention, and long-term ownership strategy.',
    relevanceIntro: 'This area is typically most relevant for business owners, professionals, and households with more complex financial structures or upcoming financial transitions.',
    relevanceHeading: 'When This Type of Planning Becomes Important',
    relevanceItems: textArray([
      'Preparing for a business sale, liquidity event, or other major transition',
      'Experiencing a significant increase in income or business profitability',
      'Looking for ways to improve tax efficiency while protecting cash flow',
      'Exploring strategies to retain and reward key employees',
      'Planning for succession, continuity, or ownership changes',
      'Coordinating business decisions with personal retirement and legacy goals',
    ]),
    sections: [
      { heading: 'Business Planning', body: 'Coordinating personal and business financial decisions into a unified strategy that supports day-to-day operations and long-term goals.' },
      {
        heading: 'Executive Retention & Reward Strategies',
        body: 'Helping business owners evaluate strategies designed to attract, retain, and reward key leadership while aligning incentives with long-term business success.',
        subsections: [
          { heading: 'Retaining and Rewarding Key Executives', body: 'Exploring approaches that go beyond salary and standard benefits to help support retention and align incentives.' },
          { heading: 'Qualified Retirement Plans', body: 'Reviewing retirement plan designs that may support tax efficiency, long-term savings, and employee retention.' },
          { heading: 'Non-Qualified Deferred Compensation', body: 'Evaluating flexible compensation strategies for key executives that extend beyond qualified plan contribution limits.' },
          { heading: 'Defined Benefit & Pension Plans', body: 'Reviewing advanced retirement plan strategies designed to maximize tax-deferred savings for eligible business owners and professionals.' },
          { heading: 'Executive Bonus Arrangements', body: 'Exploring bonus-based strategies that may help reward and retain key employees in a tax-aware manner.' },
          { heading: 'Business Retirement Plan Strategies', body: 'Reviewing retirement plan options for business owners and key employees as part of a broader planning strategy.' },
        ],
      },
      {
        heading: 'Tax-Efficient Business & Exit Planning',
        body: 'Planning ahead for major financial decisions, liquidity events, and ownership transitions with an emphasis on tax awareness, cash-flow preservation, and long-term value.',
        subsections: [
          { heading: 'Reducing Taxes on Income or Exit', body: 'Coordinating planning strategies in advance of major transactions or liquidity events to help evaluate ways to reduce tax friction and improve overall tax efficiency over time.' },
          {
            heading: 'Planning Approaches That May Be Evaluated',
            body: 'Depending on your situation, more advanced strategies may be explored in coordination with your tax and legal professionals. These approaches are not appropriate for all clients and may involve varying levels of risk, complexity, cost, and liquidity constraints.',
            items: textArray([
              'Structured Installment Sales \u2014 may help spread recognition of gains over time and convert proceeds into installment-based income',
              'Charitable Remainder Trusts \u2014 may be evaluated as part of charitable, income, and tax-aware planning',
              'Cost Segregation Planning (Coordination) \u2014 may help accelerate depreciation for certain real estate holdings when appropriate',
              'Deferred Sales Trusts (DST) \u2014 may be evaluated in certain cases involving highly appreciated assets or business sale planning',
            ]),
          },
          {
            heading: 'Succession & Business Continuity Planning',
            body: 'Preparing for ownership changes, unexpected events, and long-term business continuity through structured planning.',
            subsections: [
              { heading: 'Planning Ownership Transition', body: 'Helping evaluate succession and continuity strategies that support more intentional ownership changes over time.' },
              { heading: 'Business Continuation Planning', body: 'Planning for unexpected events and ownership transitions with the goal of helping protect business value and operational continuity.' },
              { heading: 'Buy-Sell Agreements', body: 'Coordinating planning discussions around funded agreements that may help structure ownership transitions and protect business partners.' },
            ],
          },
        ],
      },
      {
        heading: 'Advanced Planning Coordination',
        body: 'Bringing together complex planning elements \u2014 such as concentrated wealth, liquidity events, insurance planning, tax-sensitive decisions, and long-term income considerations \u2014 into a coordinated strategy aligned with your overall financial plan.',
        items: textArray([
          'Understand your broader financial and business picture',
          'Identify planning areas where taxes, cash flow, and long-term goals may intersect',
          'Coordinate with your CPA, attorney, and other professionals where appropriate',
          'Evaluate multiple planning approaches based on your goals, timeline, and risk considerations',
          'Help implement selected strategies through the appropriate professionals and service providers',
          'Monitor and adjust the planning approach as circumstances evolve',
        ]),
      },
    ],
    disclaimer: 'All advanced planning strategies are evaluated in coordination with appropriate tax and legal professionals. Prosperity Planning & Advisory does not provide tax or legal advice. Insurance or other non-advisory products, where applicable, are offered separately outside the advisory relationship. Clients are under no obligation to implement any recommendation or purchase any product through any affiliated or separate capacity.',
    ctaText: 'Schedule Your Complimentary Strategy Review',
    ctaHref: 'https://calendly.com/prosperityplanningandadvisory/clarity-session',
    learnMoreText: 'Learn More',
    learnMoreHref: '/services#business-advanced',
  });

  await insertSection(homeId, 'contact_section', ++s, {
    eyebrow: 'Get In Touch',
    headline: 'Woodland Hills Office Visits by Appointment',
    ctaText: 'Contact Us \u2192',
    ctaHref: '/contact',
    mapLabel: 'Woodland Hills, CA',
    mapSublabel: '21255 Burbank Blvd, Suite 120',
    image: '/images/Front building.jpg',
    imageAlt: 'Prosperity Planning & Advisory office in Woodland Hills, CA',
    details: [
      { icon: 'map-pin', label: 'Address', value: '21255 Burbank Boulevard, Suite 120\nWoodland Hills, CA 91367', href: null },
      { icon: 'phone', label: 'Phone', value: '888-427-5240', href: 'tel:888-427-5240' },
      { icon: 'mail', label: 'Email', value: 'help@prosperityadvisory.net', href: 'mailto:help@prosperityadvisory.net' },
    ],
  });

  await insertSection(homeId, 'cta_band', ++s, {});

  // --- SERVICES ---
  const services = loadJson('services.json');
  const servicesId = await insertPage('services', services.meta, 2);
  s = 0;

  await insertSection(servicesId, 'interior_hero', ++s, {
    eyebrow: services.hero.eyebrow,
    headline: services.hero.headline,
    subtitle: services.hero.body,
    backgroundImage: '/images/services-hero.jpg',
  });

  await insertSection(servicesId, 'services_intro', ++s, {
    paragraphs: services.intro.paragraphs.map((t: string) => ({ text: t })),
    ctaText: services.intro.cta.text,
    ctaHref: services.intro.cta.href,
    ctaPrefix: services.intro.cta.prefix,
    exploreHeading: services.intro.exploreHeading,
    exploreBody: services.intro.exploreBody,
    exploreNote: services.intro.exploreNote,
    exploreLinks: services.intro.exploreLinks,
  });

  await insertSection(servicesId, 'service_accordion', ++s, {
    sections: services.sections.map((sec: Record<string, unknown>) => ({
      ...sec,
      // Convert string arrays to { text } arrays for registry consistency where needed
      planningAreas: textArray((sec.planningAreas as string[]) ?? []),
      disclaimers: textArray((sec.disclaimers as string[]) ?? []),
      relevanceItems: textArray((sec.relevanceItems as string[]) ?? []),
      whyItems: textArray((sec.whyItems as string[]) ?? []),
    })),
  });

  await insertSection(servicesId, 'services_approach', ++s, {
    heading: services.approach.heading,
    paragraphs: services.approach.paragraphs.map((t: string) => ({ text: t })),
    ctaHeading: services.approach.cta.heading,
    ctaBody: services.approach.cta.body,
    ctaText: services.approach.cta.text,
    ctaHref: services.approach.cta.href,
  });

  await insertSection(servicesId, 'disclosure', ++s, {
    text: services.disclosures,
  });

  await insertSection(servicesId, 'cta_band', ++s, {
    headline: services.approach.cta.heading,
    subtext: services.approach.cta.body,
  });

  // --- PORTFOLIOS ---
  const portfolios = loadJson('portfolios.json');
  const portfoliosId = await insertPage('portfolios', portfolios.meta, 3);
  s = 0;

  await insertSection(portfoliosId, 'interior_hero', ++s, {
    eyebrow: 'Prosperity Pathways\u2122 Portfolios',
    headline: portfolios.hero.headline,
    subtitle: portfolios.hero.intro,
    backgroundImage: '/images/portfolios-hero.jpg',
  });

  await insertSection(portfoliosId, 'portfolio_cards', ++s, {
    introBody: portfolios.hero.body,
    introDetail: portfolios.hero.intro,
    portfolios: portfolios.portfolios,
  });

  await insertSection(portfoliosId, 'text_section', ++s, {
    heading: portfolios.management.heading,
    body: portfolios.management.body,
    detail: portfolios.management.detail,
  });

  await insertSection(portfoliosId, 'text_section', ++s, {
    heading: portfolios.fiduciary.heading,
    body: portfolios.fiduciary.body,
    detail: portfolios.fiduciary.detail,
  });

  await insertSection(portfoliosId, 'foundation_section', ++s, {
    heading: portfolios.foundation.heading,
    intro: portfolios.foundation.intro,
    items: textArray(portfolios.foundation.items),
    body: portfolios.foundation.body,
    ctaText: portfolios.foundation.cta.text,
    ctaHref: portfolios.foundation.cta.href,
  });

  await insertSection(portfoliosId, 'disclosure_list', ++s, {
    items: textArray(portfolios.disclosures),
  });

  await insertSection(portfoliosId, 'cta_band', ++s, {});

  // --- PLANNING ---
  const planning = loadJson('planning.json');
  const planningId = await insertPage('planning', planning.meta, 4);
  s = 0;

  await insertSection(planningId, 'interior_hero', ++s, {
    eyebrow: planning.hero.eyebrow,
    headline: 'Personal Prosperity Planning\u2122',
    subtitle: planning.hero.tagline,
    ctaText: planning.hero.cta.text,
    ctaHref: planning.hero.cta.href,
    backgroundImage: '/images/planning-hero.jpg',
  });

  await insertSection(planningId, 'hero_body', ++s, {
    paragraphs: [{ text: planning.hero.body }, { text: planning.hero.detail }],
  });

  await insertSection(planningId, 'service_cards', ++s, {
    cards: planning.serviceCards.map((c: Record<string, unknown>, i: number) => ({
      icon: ['clipboard', 'piggy-bank', 'line-chart', 'shield-check', 'briefcase', 'calendar'][i] ?? 'clipboard',
      title: c.title,
      body: c.body,
      tagline: c.tagline ?? null,
      ctaText: (c.cta as { text?: string })?.text ?? null,
      ctaHref: (c.cta as { href?: string })?.href ?? null,
    })),
  });

  await insertSection(planningId, 'client_portal', ++s, {
    heading: planning.portal.heading,
    body: planning.portal.body,
    accessHeading: planning.portal.accessHeading,
    accessBody: planning.portal.accessBody,
    features: planning.portal.features.map((f: { title: string; body: string }, i: number) => ({
      icon: ['dashboard', 'vault', 'chart', 'sync'][i] ?? 'chart',
      title: f.title,
      body: f.body,
    })),
  });

  await insertSection(planningId, 'cta_band', ++s, {});

  // --- ABOUT ---
  const about = loadJson('about.json');
  const aboutId = await insertPage('about', about.meta, 5);
  s = 0;

  await insertSection(aboutId, 'interior_hero', ++s, {
    eyebrow: 'Our Mission & Who We Are',
    headline: about.hero.headline,
    backgroundImage: '/images/about-hero.jpg',
  });

  await insertSection(aboutId, 'about_mission', ++s, {
    heading: about.mission.heading,
    body: about.mission.body,
  });

  await insertSection(aboutId, 'about_services', ++s, {
    heading: about.ourServices.heading,
    body: about.ourServices.body,
    items: textArray(about.ourServices.items),
    outro: about.ourServices.outro,
  });

  await insertSection(aboutId, 'text_section', ++s, {
    heading: about.trustedPartner.heading,
    body: about.trustedPartner.body,
  });

  await insertSection(aboutId, 'feature_badges', ++s, {
    features: about.features.map((label: string, i: number) => ({
      icon: ['shield', 'compass', 'layers', 'target', 'refresh', 'crosshair'][i] ?? 'star',
      label,
    })),
  });

  await insertSection(aboutId, 'text_section', ++s, {
    heading: about.tailored.heading,
    body: about.tailored.body,
  });

  await insertSection(aboutId, 'cta_band', ++s, {
    headline: about.ctaBand.heading,
    subtext: about.ctaBand.body,
  });

  // --- CONTACT ---
  const contact = loadJson('contact.json');
  const contactId = await insertPage('contact', contact.meta, 6);
  s = 0;

  await insertSection(contactId, 'interior_hero', ++s, {
    headline: contact.hero.headline,
    subtitle: 'We\u2019d love to hear from you. Reach out to schedule your complimentary strategy review.',
    ctaText: contact.hero.cta.text,
    ctaHref: contact.hero.cta.href,
    backgroundImage: '/images/contact-hero.jpg',
  });

  await insertSection(contactId, 'contact_section', ++s, {
    eyebrow: 'Our Location',
    headline: contact.location.heading,
    ctaText: 'Schedule Your Complimentary Strategy Review \u2192',
    ctaHref: 'https://calendly.com/prosperityplanningandadvisory/clarity-session',
    mapLabel: 'Woodland Hills, CA',
    mapSublabel: contact.location.address,
    image: '/images/Front building.jpg',
    imageAlt: 'Prosperity Planning & Advisory office in Woodland Hills, CA',
    details: [
      { icon: 'map-pin', label: 'Address', value: `${contact.location.address}\n${contact.location.city}, ${contact.location.state} ${contact.location.zip}`, href: null },
      { icon: 'phone', label: 'Phone', value: contact.location.phone, href: `tel:${contact.location.phone.replace(/\D/g, '')}` },
      { icon: 'mail', label: 'Email', value: contact.location.email, href: `mailto:${contact.location.email}` },
    ],
  });

  await insertSection(contactId, 'service_cards', ++s, {
    heading: 'Our Services',
    cards: contact.serviceCards.map((c: Record<string, unknown>) => ({
      title: c.title,
      body: c.body,
      ctaText: (c.cta as { text?: string })?.text ?? null,
      ctaHref: (c.cta as { href?: string })?.href ?? null,
    })),
  });

  await insertSection(contactId, 'location_info', ++s, {
    heading: contact.location.heading,
    name: contact.location.name,
    address: contact.location.address,
    city: contact.location.city,
    state: contact.location.state,
    zip: contact.location.zip,
    phone: contact.location.phone,
    email: contact.location.email,
    disclosures: textArray(contact.location.disclosures),
  });

  await insertSection(contactId, 'cta_band', ++s, {});

  // --- WHO WE SERVE ---
  const wws = loadJson('who-we-serve.json');
  const wwsId = await insertPage('who-we-serve', wws.meta, 7);
  s = 0;

  await insertSection(wwsId, 'interior_hero', ++s, {
    eyebrow: wws.hero.eyebrow,
    headline: wws.hero.headline,
    subtitle: wws.hero.subheadline,
    ctaText: wws.hero.cta.text,
    ctaHref: wws.hero.cta.href,
    backgroundImage: '/images/who-we-serve-hero.jpg',
  });

  await insertSection(wwsId, 'audience_intro', ++s, {
    heroBody: wws.hero.heroBody,
    heading: wws.builtAroundYou.heading,
    body: wws.builtAroundYou.body,
  });

  await insertSection(wwsId, 'audience_overview', ++s, {
    heading: wws.quickOverview.heading,
    items: wws.quickOverview.items,
  });

  await insertSection(wwsId, 'audience_profiles', ++s, {
    audiences: wws.audiences.map((a: Record<string, unknown>) => ({
      ...a,
      focusedOn: textArray(a.focusedOn as string[]),
      planningAreas: textArray(a.planningAreas as string[]),
    })),
  });

  await insertSection(wwsId, 'two_column_text', ++s, {
    heading: wws.taxAware.heading,
    body1: wws.taxAware.body1,
    body2: wws.taxAware.body2,
  });

  await insertSection(wwsId, 'two_column_text', ++s, {
    heading: wws.noOneCategory.heading,
    body1: wws.noOneCategory.body1,
    body2: wws.noOneCategory.body2,
  });

  await insertSection(wwsId, 'connects_everything', ++s, {
    heading: wws.connectsEverything.heading,
    body: wws.connectsEverything.body,
    subheading: wws.connectsEverything.subheading,
    items: textArray(wws.connectsEverything.items),
    footer: wws.connectsEverything.footer,
  });

  await insertSection(wwsId, 'closing_cta', ++s, {
    heading: wws.closingCta.heading,
    body: wws.closingCta.body,
    body2: wws.closingCta.body2,
    ctaText: wws.closingCta.cta.text,
    ctaHref: wws.closingCta.cta.href,
  });

  // --- PROCESS ---
  const proc = loadJson('process.json');
  const processId = await insertPage('process', proc.meta, 8);
  s = 0;

  await insertSection(processId, 'interior_hero', ++s, {
    eyebrow: proc.hero.eyebrow,
    headline: proc.hero.headline,
    subtitle: proc.hero.subheadline,
    ctaText: proc.hero.cta.text,
    ctaHref: proc.hero.cta.href,
    backgroundImage: '/images/process-hero.jpg',
  });

  await insertSection(processId, 'hero_body', ++s, {
    paragraphs: proc.hero.body.map((t: string) => ({ text: t })),
  });

  await insertSection(processId, 'why_it_matters', ++s, {
    heading: proc.whyItMatters.heading,
    body: proc.whyItMatters.body,
    listHeading: proc.whyItMatters.listHeading,
    items: textArray(proc.whyItMatters.items),
    paragraphs: proc.whyItMatters.paragraphs.map((t: string) => ({ text: t })),
  });

  await insertSection(processId, 'roadmap_summary', ++s, {
    heading: proc.roadmap.heading,
    subheading: proc.roadmap.subheading,
    intro: proc.roadmap.intro,
    summary: proc.roadmap.summary,
  });

  await insertSection(processId, 'detailed_steps', ++s, {
    steps: proc.steps.map((step: Record<string, unknown>) => ({
      number: step.number,
      title: step.title,
      subtitle: step.subtitle,
      body: ((step.body as string[]) ?? []).map((t: string) => ({ text: t })),
      listHeading: step.listHeading,
      items: textArray((step.items as string[]) ?? []),
      whyMatters: step.whyMatters,
      whatYouLeaveWith: textArray((step.whatYouLeaveWith as string[]) ?? []),
      cta: step.cta ?? null,
    })),
  });

  await insertSection(processId, 'bullet_list_section', ++s, {
    heading: proc.whoIsFor.heading,
    listHeading: proc.whoIsFor.listHeading,
    items: textArray(proc.whoIsFor.items),
  });

  await insertSection(processId, 'bullet_list_section', ++s, {
    heading: proc.whatItAddresses.heading,
    listHeading: proc.whatItAddresses.listHeading,
    items: textArray(proc.whatItAddresses.items),
    footnote: proc.whatItAddresses.footnote,
  });

  await insertSection(processId, 'titled_list_section', ++s, {
    heading: proc.whatToExpect.heading,
    items: proc.whatToExpect.items,
  });

  await insertSection(processId, 'paragraphs_section', ++s, {
    heading: proc.planningExperience.heading,
    paragraphs: proc.planningExperience.paragraphs.map((t: string) => ({ text: t })),
  });

  await insertSection(processId, 'faq_accordion', ++s, {
    heading: proc.faq.heading,
    questions: proc.faq.questions,
  });

  await insertSection(processId, 'closing_cta', ++s, {
    heading: proc.closing.heading,
    body: proc.closing.paragraphs.join('\n\n'),
    ctaText: proc.closing.cta.text,
    ctaHref: proc.closing.cta.href,
  });

  await insertSection(processId, 'disclosure', ++s, {
    text: proc.compliance,
  });

  // --- FEES ---
  const fees = loadJson('fees.json');
  const feesId = await insertPage('fees', fees.meta, 9);
  s = 0;

  await insertSection(feesId, 'interior_hero', ++s, {
    eyebrow: fees.hero.eyebrow,
    headline: fees.hero.headline,
    subtitle: fees.hero.subheadline,
    backgroundImage: '/images/fees-hero.jpg',
  });

  await insertSection(feesId, 'fee_sections', ++s, {
    sections: fees.sections.map((sec: Record<string, unknown>) => ({
      id: sec.id,
      heading: sec.heading,
      paragraphs: ((sec.paragraphs as string[]) ?? []).map((t: string) => ({ text: t })),
      listHeading: sec.listHeading ?? null,
      items: textArray((sec.items as string[]) ?? []),
      footnotes: textArray((sec.footnotes as string[]) ?? []),
    })),
  });

  await insertSection(feesId, 'disclosure', ++s, {
    text: fees.disclosure,
  });

  await insertSection(feesId, 'cta_band', ++s, {
    headline: fees.ctaBand.heading,
    subtext: fees.ctaBand.body,
  });

  // --- FAQS ---
  const faqs = loadJson('faqs.json');
  const faqsId = await insertPage('faqs', faqs.meta, 10);
  s = 0;

  await insertSection(faqsId, 'interior_hero', ++s, {
    eyebrow: faqs.hero.eyebrow,
    headline: faqs.hero.headline,
    subtitle: faqs.hero.subheadline,
    backgroundImage: '/images/faqs-hero.jpg',
  });

  await insertSection(faqsId, 'faq_categories', ++s, {
    introParagraphs: faqs.intro.paragraphs.map((t: string) => ({ text: t })),
    categories: faqs.categories,
    disclosures: faqs.disclosures,
  });

  await insertSection(faqsId, 'cta_band', ++s, {
    headline: faqs.ctaBand.heading,
    subtext: faqs.ctaBand.body,
  });

  // --- RESOURCES ---
  const resources = loadJson('resources.json');
  const resourcesId = await insertPage('resources', resources.meta, 11);
  s = 0;

  await insertSection(resourcesId, 'interior_hero', ++s, {
    eyebrow: resources.hero.eyebrow,
    headline: resources.hero.headline,
    backgroundImage: '/images/resources-hero.jpg',
  });

  await insertSection(resourcesId, 'hero_body', ++s, {
    paragraphs: resources.hero.body.map((t: string) => ({ text: t })),
    ctaText: resources.hero.cta.text,
    ctaPrefix: resources.hero.cta.prefix,
    ctaHref: resources.hero.cta.href,
  });

  await insertSection(resourcesId, 'resources_start_here', ++s, {
    heading: resources.startHere.heading,
    intro: resources.startHere.intro,
    items: resources.startHere.items,
  });

  await insertSection(resourcesId, 'resources_how_to_use', ++s, {
    heading: resources.howToUse.heading,
    intro: resources.howToUse.intro,
    listHeading: resources.howToUse.listHeading,
    items: textArray(resources.howToUse.items),
    footnote: resources.howToUse.footnote,
  });

  await insertSection(resourcesId, 'calculator_groups', ++s, {
    heading: resources.calculators.heading,
    groups: resources.calculators.groups,
  });

  await insertSection(resourcesId, 'prosperity_insight', ++s, {
    heading: resources.prosperityInsight.heading,
    paragraphs: resources.prosperityInsight.paragraphs.map((t: string) => ({ text: t })),
  });

  await insertSection(resourcesId, 'how_and_why', ++s, {
    heading: resources.howAndWhy.heading,
    paragraphs: resources.howAndWhy.paragraphs.map((t: string) => ({ text: t })),
    listHeading: resources.howAndWhy.listHeading,
    items: textArray(resources.howAndWhy.items),
    closing: resources.howAndWhy.closing,
    cta: resources.howAndWhy.cta,
  });

  await insertSection(resourcesId, 'resource_library', ++s, {
    heading: resources.resourceLibrary.heading,
    topics: resources.resourceLibrary.topics,
  });

  await insertSection(resourcesId, 'downloadable_guides', ++s, {
    heading: resources.downloadableGuides.heading,
    items: textArray(resources.downloadableGuides.items),
    cta: resources.downloadableGuides.cta,
  });

  await insertSection(resourcesId, 'video_list', ++s, {
    heading: resources.videos.heading,
    items: textArray(resources.videos.items),
  });

  await insertSection(resourcesId, 'disclosure', ++s, {
    text: resources.educationalNote,
  });

  await insertSection(resourcesId, 'resources_closing', ++s, {
    heading: resources.closing.heading,
    paragraphs: resources.closing.paragraphs.map((t: string) => ({ text: t })),
    ctaText: resources.closing.cta.text,
    ctaPrefix: resources.closing.cta.prefix,
    ctaHref: resources.closing.cta.href,
  });

  // --- CASE STUDIES ---
  const cs = loadJson('case-studies.json');
  const csId = await insertPage('case-studies', cs.meta, 12);
  s = 0;

  await insertSection(csId, 'interior_hero', ++s, {
    eyebrow: cs.hero.eyebrow,
    headline: cs.hero.headline,
    subtitle: cs.hero.subheadline,
    backgroundImage: '/images/case-studies-hero.jpg',
  });

  await insertSection(csId, 'case_studies_intro', ++s, {
    heroIntroParagraphs: cs.heroIntro.paragraphs.map((t: string) => ({ text: t })),
    tagline: cs.heroIntro.tagline,
    whatYoullSeeHeading: cs.whatYoullSee.heading,
    whatYoullSeeItems: textArray(cs.whatYoullSee.items),
    introHeading: cs.introSection.heading,
    introParagraphs: cs.introSection.paragraphs.map((t: string) => ({ text: t })),
    whatDesignedHeading: cs.whatDesignedToShow.heading,
    whatDesignedItems: cs.whatDesignedToShow.items,
  });

  await insertSection(csId, 'case_studies_process', ++s, {
    heading: cs.planningProcess.heading,
    subtitle: cs.planningProcess.subtitle,
    paragraphs: cs.planningProcess.paragraphs.map((t: string) => ({ text: t })),
    steps: cs.planningProcess.steps,
  });

  await insertSection(csId, 'scenarios_intro', ++s, {
    heading: cs.scenariosIntro.heading,
    paragraphs: cs.scenariosIntro.paragraphs.map((t: string) => ({ text: t })),
    illustrativeHeading: cs.scenariosIntro.illustrativeHeading,
    illustrativeParagraphs: cs.scenariosIntro.illustrativeParagraphs.map((t: string) => ({ text: t })),
    howToUseHeading: cs.scenariosIntro.howToUse.heading,
    howToUseItems: textArray(cs.scenariosIntro.howToUse.items),
    howToUseDisclaimer: cs.scenariosIntro.howToUse.disclaimer,
    quickLinks: cs.quickLinks,
  });

  // Each scenario category as its own section
  for (const cat of cs.categories) {
    await insertSection(csId, 'scenario_category', ++s, cat);
  }

  // Closing sections
  await insertSection(csId, 'bullet_list_section', ++s, {
    heading: cs.whoThisIsFor.heading,
    listHeading: cs.whoThisIsFor.body,
    items: textArray(cs.whoThisIsFor.items),
  });

  await insertSection(csId, 'paragraphs_section', ++s, {
    heading: cs.whyHypothetical.heading,
    paragraphs: cs.whyHypothetical.paragraphs.map((t: string) => ({ text: t })),
  });

  await insertSection(csId, 'closing_cta', ++s, {
    heading: 'Ready to Start Your Planning Conversation?',
    body: cs.closingCta.paragraphs.join('\n\n'),
    ctaText: cs.closingCta.cta.text,
    ctaHref: cs.closingCta.cta.href,
  });

  await insertSection(csId, 'disclosure', ++s, {
    text: cs.compliance.paragraphs.join('\n\n'),
  });

  // ========================================================================
  // SUMMARY
  // ========================================================================
  console.log('\n=== Seed complete ===');
  console.log(`  Pages inserted: ${insertedPages}`);
  console.log(`  Sections inserted: ${insertedSections}`);
  console.log(`  Site settings: 4 (company, header, footer, cta_band_defaults)\n`);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});

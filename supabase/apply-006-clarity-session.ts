/**
 * One-off: upload the 4 Clarity Session images to Supabase Storage (media
 * bucket), then upsert the /clarity-session page + its 10 sections with the
 * resulting public URLs. Mirrors migration 006_add_clarity_session_page.sql.
 * Idempotent — re-running replaces all sections. Re-running re-uploads the
 * images under fresh storage paths (old ones stay orphaned; clean up manually
 * if needed).
 *
 * Run:  npx tsx supabase/apply-006-clarity-session.ts
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { readFileSync, statSync } from 'fs';
import { extname, resolve } from 'path';

config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_ROLE) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const sb = createClient(SUPABASE_URL, SERVICE_ROLE, { auth: { persistSession: false } });

const MIME_MAP: Record<string, string> = {
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.gif': 'image/gif', '.webp': 'image/webp', '.svg': 'image/svg+xml',
};

const IMAGES_TO_UPLOAD: { key: string; localFile: string; alt: string }[] = [
  { key: 'hero',        localFile: 'Hero Image.png',                       alt: 'Advisor and client reviewing a financial plan together' },
  { key: 'business',    localFile: 'Business owner section image.png',     alt: 'Business owner reviewing tax-aware planning options with an advisor' },
  { key: 'preretire',   localFile: 'Pre retire Section Image.png',         alt: 'Couple reviewing retirement planning strategy with a fiduciary advisor' },
  { key: 'scenarios',   localFile: 'Planning scenarios sections image.png', alt: 'Planning scenarios visualized' },
];

async function uploadImage(localFile: string, alt: string): Promise<string> {
  const filePath = resolve(process.cwd(), 'public', 'images', localFile);
  const buf = readFileSync(filePath);
  const stat = statSync(filePath);
  const ext = extname(localFile).toLowerCase();
  const mime = MIME_MAP[ext] || 'application/octet-stream';
  const storagePath = `images/clarity-${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;

  const { error: upErr } = await sb.storage.from('media').upload(storagePath, buf, {
    contentType: mime,
    upsert: false,
  });
  if (upErr) throw upErr;

  const { data } = sb.storage.from('media').getPublicUrl(storagePath);
  const publicUrl = data.publicUrl;

  await sb.from('media').insert({
    filename: localFile,
    url: publicUrl,
    alt_text: alt,
    mime_type: mime,
    file_size: stat.size,
  });

  console.log(`  ✓ ${localFile} → ${publicUrl}`);
  return publicUrl;
}

async function main() {
  console.log('→ Uploading Clarity Session images to Supabase Storage');
  const urls: Record<string, string> = {};
  for (const img of IMAGES_TO_UPLOAD) {
    urls[img.key] = await uploadImage(img.localFile, img.alt);
  }

  console.log('\n→ Upserting /clarity-session page');
  const { data: page, error: pageErr } = await sb
    .from('pages')
    .upsert(
      {
        slug: 'clarity-session',
        title: 'Financial Clarity Session — Planning-First Guidance for Business Owners & Pre-Retirees',
        meta_description:
          'Schedule a complimentary Clarity Session to evaluate tax-aware strategies, retirement readiness, and risk alignment with a fiduciary, planning-first approach.',
        og_title: 'Financial Clarity Session | Prosperity Planning & Advisory',
        og_description:
          'Planning-first guidance for business owners and pre-retirees. Evaluate strategies before making the next financial decision.',
        is_published: true,
        sort_order: 14,
      },
      { onConflict: 'slug' }
    )
    .select('id')
    .single();
  if (pageErr) throw pageErr;
  const pageId = page.id as string;
  console.log(`  page_id = ${pageId}`);

  console.log('→ Clearing existing sections on /clarity-session');
  const { error: delErr } = await sb.from('sections').delete().eq('page_id', pageId);
  if (delErr) throw delErr;

  const sections: { component_type: string; content: Record<string, unknown> }[] = [
    {
      component_type: 'clarity_split_hero',
      content: {
        eyebrow: 'A Planning-First Conversation',
        headline: 'Clarity Before Your Next Financial Decision',
        subheadline:
          'Financial planning for business owners and pre-retirees who want to evaluate tax-aware strategies, retirement readiness, and risk alignment with a clear, structured approach.',
        ctaText: 'Schedule Your Complimentary Clarity Session',
        ctaHref: '',
        ctaMicrocopy:
          'Introductory session to evaluate fit and general planning considerations. No obligation. No personalized advice provided.',
        qualificationLine:
          'Best suited for individuals and business owners seeking thoughtful, planning-first guidance—not quick product recommendations.',
        secondaryLinkText: 'Explore Planning Scenarios',
        secondaryLinkHref: '#scenarios',
        image: urls.hero,
        imageAlt: 'Advisor and client reviewing a financial plan together',
        trustItems: [
          { text: 'Fiduciary Guidance' },
          { text: 'Clear Process & Next Steps' },
          { text: 'Tax-Aware Planning Approach' },
          { text: 'Personalized Strategies' },
        ],
      },
    },
    {
      component_type: 'clarity_audience_cards',
      content: {
        eyebrow: 'Who We Help',
        headline: 'Choose the planning path that fits where you are today',
        subheadline: '',
        cards: [
          {
            label: 'For Business Owners',
            title: 'Business Owners Seeking Tax-Efficient Planning',
            body: '',
            bullets: [
              { text: 'Evaluate retirement plan strategies for higher-income years' },
              { text: 'Explore SEP IRA, Solo 401(k), profit-sharing, and defined benefit structures' },
              { text: 'Align business decisions with long-term personal goals' },
              { text: 'Coordinate planning with CPA and legal professionals' },
            ],
            anchorId: 'business-owners',
            linkText: 'Learn More',
          },
          {
            label: 'For Pre-Retirees',
            title: 'Pre-Retirees Seeking Retirement Clarity',
            body: 'Evaluating retirement income strategies, including education on annuity options and other income approaches, to help clients better understand tradeoffs around income stability, liquidity, and long-term flexibility.',
            bullets: [
              { text: '401(k) rollover consultation before retirement or job transition' },
              { text: 'Backdoor Roth IRA education and tax-aware retirement planning' },
              { text: 'Risk alignment based on timeline and income needs' },
              { text: 'Retirement strategy focused on income, taxes, and sustainability' },
            ],
            anchorId: 'pre-retirees',
            linkText: 'Learn More',
          },
        ],
      },
    },
    {
      component_type: 'clarity_why_list',
      content: {
        eyebrow: 'Why Clients Choose Prosperity',
        headline: 'Why clients come here before making major financial decisions',
        subheadline:
          "Most people come in with uncertainty—not a clear plan. Here's how we approach that differently.",
        items: [
          { title: 'Fiduciary Standard', body: 'Focused on your best interest in every recommendation.' },
          { title: 'Defined Planning Process', body: 'You always know exactly what happens next.' },
          { title: 'Tax-Aware Planning', body: 'Integrated into every decision, not treated as an afterthought.' },
          { title: 'Planning Before Implementation', body: 'Strategy comes first—product decisions follow, not lead.' },
          { title: 'Personalized Recommendations', body: 'Based on your situation, not a one-size-fits-all template.' },
        ],
      },
    },
    {
      component_type: 'clarity_detail_block',
      content: {
        anchorId: 'business-owners',
        eyebrow: 'For Business Owners',
        headline: 'Tax-aware planning for business owners who need more than generic advice',
        intro: 'When income increases and business complexity grows, financial decisions become more interconnected.',
        groups: [
          {
            heading: 'Retirement Plan Strategy',
            bullets: [
              { text: 'Compare SEP IRA, Solo 401(k), profit-sharing, and defined benefit options' },
              { text: 'Evaluate higher-deduction retirement strategies' },
              { text: 'Explore advanced retirement plan structures for higher contribution potential' },
            ],
          },
          {
            heading: 'Tax & Business Planning Considerations',
            bullets: [
              { text: 'Navigate fluctuating income and tax exposure' },
              { text: 'Evaluate succession and long-term exit planning' },
              {
                text: 'Evaluate capital gains planning strategies in coordination with your tax professional, particularly around business sales, real estate, or concentrated investments',
              },
              { text: 'Coordinate strategies with CPA and legal professionals' },
            ],
          },
        ],
        closing:
          'We help you evaluate planning options that may be appropriate for your situation and coordinate decisions so your strategy is not handled in silos.',
        notes: [
          { text: 'Planning strategies discussed are evaluated in coordination with your tax and legal professionals where appropriate.' },
          { text: 'Not all strategies are appropriate for every situation and may involve varying levels of complexity, risk, or cost.' },
        ],
        ctaText: 'Schedule Your Complimentary Clarity Session',
        ctaHref: '',
        image: urls.business,
        imageAlt: 'Business owner reviewing tax-aware planning options with an advisor',
        imageSide: 'right',
      },
    },
    {
      component_type: 'clarity_detail_block',
      content: {
        anchorId: 'pre-retirees',
        eyebrow: 'For Pre-Retirees',
        headline: 'Retirement planning for people who want alignment before making the wrong move',
        intro: 'Retirement is about timing, taxes, income, and risk—not just investments.',
        groups: [
          {
            heading: '',
            bullets: [
              { text: 'Unsure if your current portfolio matches your timeline' },
              { text: 'Need clarity before rolling over retirement accounts' },
              { text: 'Want to understand Roth and backdoor Roth strategies' },
              { text: 'Concerned about taking too much risk too late' },
              { text: 'Want coordination between income, taxes, and investments' },
              { text: 'Looking to avoid costly mistakes during retirement transitions' },
            ],
          },
        ],
        closing:
          'We help you evaluate your current position and align your strategy with your retirement goals and comfort with risk.',
        notes: [
          { text: 'All planning decisions remain yours, and we aim to provide clarity to support informed decision-making.' },
        ],
        ctaText: 'Schedule Your Complimentary Clarity Session',
        ctaHref: '',
        image: urls.preretire,
        imageAlt: 'Couple reviewing retirement planning strategy with a fiduciary advisor',
        imageSide: 'left',
      },
    },
    {
      component_type: 'clarity_scenarios_grid',
      content: {
        eyebrow: 'Explore Planning Scenarios',
        headline: 'Preview how strategies may apply to your situation',
        subheadline: 'Preview how different strategies may apply to your situation before making decisions.',
        body: 'These scenarios help you ask better questions before making important financial decisions.',
        scenarios: [
          { title: 'Tax-efficient retirement plan comparisons', body: 'Side-by-side comparisons of SEP IRA, Solo 401(k), profit-sharing, and defined benefit structures.' },
          { title: '401(k) rollover vs. staying in plan', body: 'Evaluate tradeoffs around fees, investment options, and creditor protection before a rollover.' },
          { title: 'Roth vs. traditional strategies', body: 'Explore when each approach may be appropriate across different income and tax bracket scenarios.' },
          { title: 'Risk reduction and portfolio alignment', body: 'Align risk exposure with retirement timeline, income needs, and comfort with volatility.' },
          { title: 'Business owner planning comparisons', body: 'Coordinate personal and business-side decisions around contributions, income, and succession.' },
        ],
        footnote: 'These examples are educational starting points—not one-size-fits-all solutions.',
        disclaimer: 'These examples are for educational purposes only and are not personalized recommendations.',
        ctaText: 'Explore Planning Scenarios',
        ctaHref: '/case-studies',
        image: urls.scenarios,
        imageAlt: 'Planning scenarios visualized',
      },
    },
    {
      component_type: 'clarity_services_overview',
      content: {
        eyebrow: 'Services Overview',
        headline: 'Comprehensive Financial Planning Services',
        services: [
          { title: 'Retirement Planning', body: 'Coordinate income, taxes, and long-term strategy.' },
          { title: 'Tax-Aware Planning', body: 'Evaluate strategies to improve after-tax outcomes.' },
          { title: 'Investment & Portfolio Alignment', body: 'Align risk with your timeline and goals.' },
          { title: 'Business Owner Planning', body: 'Support retirement and strategic planning decisions.' },
          { title: 'Risk Management Planning', body: 'Evaluate protection strategies and exposures.' },
        ],
        linkText: 'View All Services',
        linkHref: '/services',
      },
    },
    {
      component_type: 'clarity_process_steps',
      content: {
        eyebrow: 'After You Book',
        headline: 'What happens after you book',
        subheadline: 'Best for individuals and business owners seeking structured financial clarity.',
        steps: [
          { title: 'Schedule & Confirmation', body: 'You receive a calendar invite and confirmation details.' },
          { title: 'Pre-Meeting Preparation', body: 'Short questionnaire to focus the conversation.' },
          { title: 'Initial Consultation', body: '15–30 minutes, virtual or phone. We discuss your goals and planning priorities.' },
          { title: 'Next Steps Clarity', body: 'You leave with a clearer understanding of your next financial priorities and what comes next.' },
        ],
        note: 'This is a focused planning conversation—not a sales presentation.',
        filterNote: 'Not ideal for those looking for quick product recommendations without a structured planning discussion.',
        scopeNote: 'The initial clarity session is an introductory conversation designed to evaluate fit and general planning considerations.',
      },
    },
    {
      component_type: 'faq_accordion',
      content: {
        heading: 'Frequently Asked Questions',
        questions: [
          { question: 'Do I need to be ready to become a client?', answer: 'No. This conversation is to determine fit and clarify next steps.' },
          { question: "What happens after the consultation if there's a fit?", answer: "You'll understand the recommended next step and what moving forward would look like." },
          { question: 'What should I prepare?', answer: 'Basic financial information and your key questions.' },
          { question: 'Do you provide tax or legal advice?', answer: 'We provide planning guidance and coordinate with your professionals where appropriate.' },
          { question: 'How long is the meeting?', answer: 'Typically 15–30 minutes depending on your situation.' },
          { question: 'Will I be sold anything?', answer: 'No. The goal is clarity and fit—not product sales.' },
        ],
      },
    },
    {
      component_type: 'clarity_final_cta',
      content: {
        eyebrow: 'Next Step',
        headline: 'Make your next financial decision with more clarity',
        subheadline: 'Schedule a consultation to evaluate your next steps with a structured approach.',
        ctaText: 'Schedule Your Complimentary Clarity Session',
        ctaHref: '',
        secondaryLinks: [
          { text: 'Explore Planning Scenarios', href: '/case-studies' },
          { text: 'View All Services', href: '/services' },
        ],
        subtext: "You'll receive a confirmation, calendar invite, and brief pre-meeting questions so the conversation is productive from the start.",
        noObligationNote: 'There is no obligation to move forward after the initial conversation.',
        urgencyNote: 'We keep a limited number of consultations available each week to maintain a focused experience.',
      },
    },
  ];

  const rows = sections.map((s, i) => ({
    page_id: pageId,
    component_type: s.component_type,
    sort_order: i + 1,
    content: s.content,
  }));

  console.log(`→ Inserting ${rows.length} sections`);
  const { error: insErr } = await sb.from('sections').insert(rows);
  if (insErr) throw insErr;

  console.log('\n✓ Done. Visit /clarity-session on the site and /admin/pages/clarity-session to edit.');
}

main().catch((e) => {
  console.error('Failed:', e);
  process.exit(1);
});

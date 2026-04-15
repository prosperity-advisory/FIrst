import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Accordion } from "@/components/ui/Accordion";
import { FadeUp } from "@/components/ui/FadeUp";
import { BreadcrumbJsonLd, FaqPageJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";
import { ClaritySplitHero } from "@/components/sections/clarity/ClaritySplitHero";
import { ClarityAudienceCards } from "@/components/sections/clarity/ClarityAudienceCards";
import { ClarityWhyList } from "@/components/sections/clarity/ClarityWhyList";
import { ClarityDetailBlock } from "@/components/sections/clarity/ClarityDetailBlock";
import { ClarityScenariosGrid } from "@/components/sections/clarity/ClarityScenariosGrid";
import { ClarityServicesOverview } from "@/components/sections/clarity/ClarityServicesOverview";
import { ClarityProcessSteps } from "@/components/sections/clarity/ClarityProcessSteps";
import { ClarityFinalCta } from "@/components/sections/clarity/ClarityFinalCta";
import { getPage } from "@/lib/content-db";

const SLUG = "clarity-session";

const CANONICAL = "https://prosperityadvisory.net/clarity-session";

const KEYWORDS = [
  "financial clarity session",
  "fiduciary financial advisor",
  "fee-only financial planner",
  "Woodland Hills financial advisor",
  "California financial planner",
  "pre-retirement planning",
  "business owner financial planning",
  "tax-aware retirement planning",
  "SEP IRA Solo 401k planning",
  "401(k) rollover consultation",
  "backdoor Roth IRA",
  "financial planning consultation",
];

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage(SLUG);
  const hero = page?.section("clarity_split_hero");
  const ogImage = hero?.image as string | undefined;

  const title = page?.meta.title ?? "Financial Clarity Session | Prosperity Planning & Advisory";
  const description =
    page?.meta.description ??
    "Schedule a complimentary Clarity Session to evaluate tax-aware strategies, retirement readiness, and risk alignment with a fiduciary, planning-first approach.";

  return {
    title,
    description,
    keywords: KEYWORDS,
    alternates: { canonical: CANONICAL },
    openGraph: {
      type: "website",
      url: CANONICAL,
      siteName: "Prosperity Planning & Advisory",
      title: page?.meta.ogTitle ?? title,
      description: page?.meta.ogDescription ?? description,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 1200, alt: hero?.imageAlt ?? title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: page?.meta.ogTitle ?? title,
      description: page?.meta.ogDescription ?? description,
      images: ogImage ? [ogImage] : undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SectionContent = Record<string, any>;

export default async function ClaritySessionPage() {
  const page = await getPage(SLUG);
  if (!page) notFound();

  const faqSection = page.section("faq_accordion");
  const faqQuestions = (faqSection?.questions ?? []) as { question: string; answer: string }[];

  return (
    <main>
      <BreadcrumbJsonLd items={[{ name: "Clarity Session", path: "/clarity-session" }]} />
      <ServiceJsonLd
        name="Financial Clarity Session"
        description={
          page.meta.description ??
          "Complimentary introductory planning conversation to evaluate fit and general planning considerations for business owners and pre-retirees."
        }
        url={CANONICAL}
        serviceType="Financial Planning Consultation"
        areaServed={["California", "United States"]}
      />
      {faqQuestions.length > 0 && <FaqPageJsonLd questions={faqQuestions} />}

      {page.sections.map((section, idx) => {
        const key = `${section.component_type}-${idx}`;
        const c = section.content as SectionContent;
        switch (section.component_type) {
          case "clarity_split_hero":
            return (
              <ClaritySplitHero
                key={key}
                eyebrow={c.eyebrow}
                headline={c.headline}
                subheadline={c.subheadline}
                ctaText={c.ctaText}
                ctaHref={c.ctaHref}
                ctaMicrocopy={c.ctaMicrocopy}
                qualificationLine={c.qualificationLine}
                secondaryLinkText={c.secondaryLinkText}
                secondaryLinkHref={c.secondaryLinkHref}
                image={c.image}
                imageAlt={c.imageAlt}
                trustItems={c.trustItems}
              />
            );

          case "clarity_audience_cards":
            return (
              <ClarityAudienceCards
                key={key}
                eyebrow={c.eyebrow}
                headline={c.headline}
                subheadline={c.subheadline}
                cards={c.cards}
              />
            );

          case "clarity_why_list":
            return (
              <ClarityWhyList
                key={key}
                eyebrow={c.eyebrow}
                headline={c.headline}
                subheadline={c.subheadline}
                items={c.items}
              />
            );

          case "clarity_detail_block":
            return (
              <ClarityDetailBlock
                key={key}
                anchorId={c.anchorId}
                eyebrow={c.eyebrow}
                headline={c.headline}
                intro={c.intro}
                groups={c.groups}
                closing={c.closing}
                notes={c.notes}
                ctaText={c.ctaText}
                ctaHref={c.ctaHref}
                image={c.image}
                imageAlt={c.imageAlt}
                imageSide={c.imageSide}
                background={idx % 2 === 0 ? "cream" : "white"}
              />
            );

          case "clarity_scenarios_grid":
            return (
              <ClarityScenariosGrid
                key={key}
                eyebrow={c.eyebrow}
                headline={c.headline}
                subheadline={c.subheadline}
                body={c.body}
                scenarios={c.scenarios}
                footnote={c.footnote}
                disclaimer={c.disclaimer}
                ctaText={c.ctaText}
                ctaHref={c.ctaHref}
                image={c.image}
                imageAlt={c.imageAlt}
              />
            );

          case "clarity_services_overview":
            return (
              <ClarityServicesOverview
                key={key}
                eyebrow={c.eyebrow}
                headline={c.headline}
                services={c.services}
                linkText={c.linkText}
                linkHref={c.linkHref}
              />
            );

          case "clarity_process_steps":
            return (
              <ClarityProcessSteps
                key={key}
                eyebrow={c.eyebrow}
                headline={c.headline}
                subheadline={c.subheadline}
                steps={c.steps}
                note={c.note}
                filterNote={c.filterNote}
                scopeNote={c.scopeNote}
              />
            );

          case "faq_accordion":
            return (
              <section key={key} className="bg-white py-16 md:py-20 lg:py-24 px-4 sm:px-6">
                <div className="mx-auto max-w-[820px]">
                  <FadeUp>
                    {c.heading && (
                      <h2 className="font-serif text-[28px] sm:text-[32px] md:text-[38px] lg:text-[42px] font-bold text-navy leading-tight text-center mb-10 md:mb-12">
                        {c.heading}
                      </h2>
                    )}
                  </FadeUp>
                  <Accordion items={c.questions ?? []} />
                </div>
              </section>
            );

          case "clarity_final_cta":
            return (
              <ClarityFinalCta
                key={key}
                eyebrow={c.eyebrow}
                headline={c.headline}
                subheadline={c.subheadline}
                ctaText={c.ctaText}
                ctaHref={c.ctaHref}
                secondaryLinks={c.secondaryLinks}
                subtext={c.subtext}
                noObligationNote={c.noObligationNote}
                urgencyNote={c.urgencyNote}
              />
            );

          default:
            return null;
        }
      })}
    </main>
  );
}

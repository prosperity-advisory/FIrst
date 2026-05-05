import type { Metadata } from "next";
import { InteriorHero } from "@/components/sections/InteriorHero";
import { PortfolioCard } from "@/components/sections/PortfolioCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { FadeUp } from "@/components/ui/FadeUp";
import { SectionImage, ImageBlockSection } from "@/components/ui/SectionImage";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { getPortfoliosContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPortfoliosContent();
  return {
    title: content.meta.title,
    description: content.meta.description,
    openGraph: {
      title: content.meta.ogTitle,
      description: content.meta.ogDescription,
    },
    alternates: { canonical: 'https://prosperityadvisory.net/portfolios' },
  };
}

export default async function PortfoliosPage() {
  const content = await getPortfoliosContent();
  return (
    <main>
      <BreadcrumbJsonLd items={[{ name: 'Prosperity Pathways\u2122 Portfolios', path: '/portfolios' }]} />
      {content.hero && (
        <InteriorHero
          eyebrow="Prosperity Pathways™ Portfolios"
          headline={content.hero.headline}
          subtitle={content.hero.intro}
          backgroundImage={content.hero.backgroundImage ?? "/images/invest page.png"}
        />
      )}

      {/* Portfolio Grid */}
      {content.portfolios && content.portfolios.length > 0 && (
      <section className="bg-cream py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6">
        <div className="mx-auto max-w-[1200px]">
          <SectionImage image={content.portfoliosSectionImage}>
            <FadeUp>
              <p className="text-base sm:text-[17px] md:text-lg text-slate leading-[1.8] max-w-[780px] mx-auto text-center mb-10 md:mb-12 lg:mb-14">
                {content.hero?.body}
              </p>
            </FadeUp>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-7">
              {content.portfolios.map((portfolio: { id: string; name: string; summary: string; goal: string; purpose: string; description: string; tagline: string }, i: number) => (
                <PortfolioCard
                  key={portfolio.id}
                  portfolio={portfolio}
                  index={i}
                />
              ))}
            </div>
          </SectionImage>
        </div>
      </section>
      )}

      {/* Management & Fiduciary */}
      {content.management && content.fiduciary && (
      <section className="bg-white py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6">
        <div className="mx-auto max-w-[800px] text-center">
          <SectionImage image={(content.management as any).sectionImage}>
            <FadeUp>
              <h2 className="section-headline">{content.management.heading}</h2>
              <p className="text-base sm:text-[17px] md:text-lg text-slate leading-[1.8] mb-4">
                {content.management.body}
              </p>
              <p className="text-[15px] md:text-base text-slate-light leading-relaxed mb-10 md:mb-14">
                {content.management.detail}
              </p>
            </FadeUp>
          </SectionImage>

          <SectionImage image={(content.fiduciary as any).sectionImage}>
            <FadeUp delay={1}>
              <div className="w-12 h-[3px] bg-gold mx-auto mb-4" />
              <h2 className="section-headline">{content.fiduciary.heading}</h2>
              <p className="text-base sm:text-[17px] md:text-lg text-slate leading-[1.8] mb-3">
                {content.fiduciary.body}
              </p>
              <p className="text-[15px] md:text-base text-slate-light leading-relaxed">
                {content.fiduciary.detail}
              </p>
            </FadeUp>
          </SectionImage>
        </div>
      </section>
      )}

      {/* Foundation */}
      {content.foundation && (
      <section className="relative bg-linear-[160deg] from-navy to-navy-deep py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6 overflow-hidden">
        <div className="absolute -top-[200px] -right-[200px] w-[500px] h-[500px] border border-gold/[0.06] rounded-full pointer-events-none" />

        <div className="relative z-[1] mx-auto max-w-[800px] text-center">
          <SectionImage image={(content.foundation as any).sectionImage}>
          <FadeUp>
            <h2 className="section-headline text-white">
              {content.foundation.heading}
            </h2>
            <p className="text-base sm:text-[17px] md:text-lg text-cream/80 leading-relaxed mb-8 md:mb-10">
              {content.foundation.intro}
            </p>
          </FadeUp>

          <FadeUp delay={1}>
            <ul className="text-left max-w-[500px] mx-auto space-y-4 mb-8 md:mb-10">
              {content.foundation.items.map((item) => (
                <li key={item} className="flex items-center gap-3.5">
                  <span className="w-[7px] h-[7px] bg-gold rounded-full shrink-0" />
                  <span className="text-[15px] md:text-base text-white/90">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </FadeUp>

          <FadeUp delay={2}>
            <p className="text-base sm:text-[17px] text-cream/80 leading-relaxed mb-8">
              {content.foundation.body}
            </p>
            <a href={content.foundation.cta.href} className="btn btn-gold">
              {content.foundation.cta.text} →
            </a>
          </FadeUp>
          </SectionImage>
        </div>
      </section>
      )}

      {/* Disclosures */}
      {content.disclosures && content.disclosures.length > 0 && (
      <section className="bg-cream py-8 sm:py-10 md:py-12 px-4 sm:px-6">
        <div className="mx-auto max-w-[800px]">
          <SectionImage image={(content as any).disclosuresImage}>
            {content.disclosures.map((disclosure, i) => (
              <p
                key={i}
                className="text-xs text-slate-light leading-relaxed mb-3 last:mb-0"
              >
                {disclosure}
              </p>
            ))}
          </SectionImage>
        </div>
      </section>
      )}

      {/* Image blocks */}
      {(content as any).imageBlocks?.map((block: any, i: number) => (
        <ImageBlockSection
          key={i}
          image={{ url: block.image, alt: block.alt, caption: block.caption }}
          background={block.background}
        />
      ))}

      <CtaBand pageSlug="portfolios" />
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { InteriorHero } from "@/components/sections/InteriorHero";
import { FadeUp } from "@/components/ui/FadeUp";
import { CalendlyButton } from "@/components/ui/CalendlyButton";
import { SectionImage, ImageBlockSection } from "@/components/ui/SectionImage";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { getWhoWeServeContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getWhoWeServeContent();
  return {
    title: content.meta.title,
    description: content.meta.description,
    openGraph: {
      title: content.meta.ogTitle,
      description: content.meta.ogDescription,
    },
    alternates: { canonical: 'https://prosperityadvisory.net/who-we-serve' },
  };
}

export default async function WhoWeServePage() {
  const content = await getWhoWeServeContent();
  return (
    <main>
      <BreadcrumbJsonLd items={[{ name: 'Who We Serve', path: '/who-we-serve' }]} />
      {/* Hero */}
      {content.hero && (
        <InteriorHero
          eyebrow={content.hero.eyebrow}
          headline={content.hero.headline}
          subtitle={content.hero.subheadline}
          ctaText={content.hero.cta.text}
          ctaHref={content.hero.cta.href}
          backgroundImage={content.hero.backgroundImage ?? "/images/Who We Serve-JPG.JPG"}
        />
      )}

      {/* Hero extended body */}
      {content.hero && (
      <section className="bg-white py-10 sm:py-12 md:py-14 px-4 sm:px-6">
        <div className="mx-auto max-w-[800px] text-center">
          <FadeUp>
            <p className="text-base sm:text-[17px] md:text-lg text-slate leading-[1.8]">
              {content.hero.heroBody}
            </p>
          </FadeUp>
        </div>
      </section>
      )}

      {/* Financial Planning Built Around You */}
      {content.builtAroundYou && (
      <section className="bg-cream py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-24 px-4 sm:px-6">
        <div className="mx-auto max-w-[800px] text-center">
          <SectionImage image={(content.builtAroundYou as any)?.sectionImage}>
          <FadeUp>
            <h2 className="section-headline">{content.builtAroundYou.heading}</h2>
            <p className="text-base sm:text-[17px] md:text-lg text-slate leading-[1.8] mt-4">
              {content.builtAroundYou.body}
            </p>
          </FadeUp>
          </SectionImage>
        </div>
      </section>
      )}

      {/* Who This Is For (Quick Overview) */}
      {content.quickOverview && (
      <section className="bg-white py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-24 px-4 sm:px-6">
        <div className="mx-auto max-w-[900px]">
          <SectionImage image={(content.quickOverview as any)?.sectionImage}>
          <FadeUp>
            <h2 className="section-headline text-center">{content.quickOverview.heading}</h2>
          </FadeUp>
          <div className="mt-8 md:mt-10 space-y-4">
            {content.quickOverview.items.map((item: { label: string; desc: string }, i: number) => (
              <FadeUp key={i} delay={Math.min(i, 5) as 0 | 1 | 2 | 3 | 4 | 5}>
                <div className="flex items-start gap-3">
                  <span className="w-[7px] h-[7px] bg-gold rounded-full shrink-0 mt-[9px]" />
                  <p className="text-[15px] md:text-base text-slate leading-relaxed">
                    <span className="font-semibold text-navy">{item.label}:</span>{" "}
                    {item.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
          </SectionImage>
        </div>
      </section>
      )}

      {/* Individual Audience Sections */}
      {content.audiences && content.audiences.length > 0 && content.audiences.map((audience: any, i: number) => {
        const isEven = i % 2 === 0;
        return (
          <section
            key={audience.id}
            className={`${isEven ? "bg-cream" : "bg-white"} py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6`}
          >
            <div className="mx-auto max-w-[900px]">
              <FadeUp>
                <h2 className="font-serif text-[22px] sm:text-[26px] md:text-[28px] lg:text-[32px] font-semibold text-navy leading-tight mb-4">
                  {audience.title}
                </h2>
                <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mb-6">
                  {audience.intro}
                </p>
              </FadeUp>

              {/* You may be focused on */}
              <FadeUp delay={1}>
                <h3 className="font-serif text-[18px] sm:text-[20px] md:text-[22px] font-semibold text-navy mb-3">
                  You may be focused on:
                </h3>
                <ul className="space-y-2.5 mb-8">
                  {audience.focusedOn.map((item: string) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="w-[7px] h-[7px] bg-gold rounded-full shrink-0 mt-[9px]" />
                      <span className="text-[15px] md:text-base text-slate leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </FadeUp>

              {/* How Prosperity helps */}
              <FadeUp delay={2}>
                <h3 className="font-serif text-[18px] sm:text-[20px] md:text-[22px] font-semibold text-navy mb-3">
                  How Prosperity helps:
                </h3>
                <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mb-8">
                  {audience.howWeHelp}
                </p>
              </FadeUp>

              {/* Planning areas often involved */}
              <FadeUp delay={3}>
                <h3 className="font-serif text-[18px] sm:text-[20px] md:text-[22px] font-semibold text-navy mb-3">
                  Planning areas often involved:
                </h3>
                <ul className="space-y-2.5 mb-8">
                  {audience.planningAreas.map((item: string) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="w-[7px] h-[7px] bg-gold rounded-full shrink-0 mt-[9px]" />
                      <span className="text-[15px] md:text-base text-slate leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </FadeUp>

              {/* CTA link */}
              <FadeUp delay={4}>
                <Link
                  href={audience.ctaHref}
                  className="inline-flex items-center text-gold font-semibold text-[15px] md:text-base hover:text-gold-light transition-colors"
                >
                  → {audience.ctaText}
                </Link>
              </FadeUp>
            </div>
          </section>
        );
      })}

      {/* Tax-Aware Financial Planning */}
      {content.taxAware && (
      <section className="bg-cream py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-24 px-4 sm:px-6">
        <div className="mx-auto max-w-[800px] text-center">
          <FadeUp>
            <h2 className="section-headline">{content.taxAware.heading}</h2>
            <p className="text-base sm:text-[17px] md:text-lg text-slate leading-[1.8] mt-4">
              {content.taxAware.body1}
            </p>
            <p className="text-base sm:text-[17px] md:text-lg text-slate leading-[1.8] mt-4">
              {content.taxAware.body2}
            </p>
          </FadeUp>
        </div>
      </section>
      )}

      {/* You Don't Have to Fit Into Just One Category */}
      {content.noOneCategory && (
      <section className="bg-white py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-24 px-4 sm:px-6">
        <div className="mx-auto max-w-[800px] text-center">
          <FadeUp>
            <h2 className="section-headline">{content.noOneCategory.heading}</h2>
            <p className="text-base sm:text-[17px] md:text-lg text-slate leading-[1.8] mt-4">
              {content.noOneCategory.body1}
            </p>
            <p className="text-base sm:text-[17px] md:text-lg text-slate leading-[1.8] mt-4">
              {content.noOneCategory.body2}
            </p>
          </FadeUp>
        </div>
      </section>
      )}

      {/* Planning That Connects Everything */}
      {content.connectsEverything && (
      <section className="bg-cream py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-24 px-4 sm:px-6">
        <div className="mx-auto max-w-[800px] text-center">
          <SectionImage image={(content.connectsEverything as any)?.sectionImage}>
          <FadeUp>
            <h2 className="section-headline">{content.connectsEverything.heading}</h2>
            <p className="text-base sm:text-[17px] md:text-lg text-slate leading-[1.8] mt-4">
              {content.connectsEverything.body}
            </p>
            <p className="text-base sm:text-[17px] md:text-lg text-slate leading-[1.8] mt-6 font-semibold text-navy">
              {content.connectsEverything.subheading}
            </p>
          </FadeUp>
          <div className="mt-6 space-y-2.5 inline-block text-left">
            {content.connectsEverything.items.map((item, i) => (
              <FadeUp key={i} delay={Math.min(i + 1, 5) as 0 | 1 | 2 | 3 | 4 | 5}>
                <div className="flex items-start gap-3">
                  <span className="w-[7px] h-[7px] bg-gold rounded-full shrink-0 mt-[9px]" />
                  <span className="text-[15px] md:text-base text-slate leading-relaxed">
                    {item}
                  </span>
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp>
            <p className="text-base sm:text-[17px] md:text-lg text-slate leading-[1.8] mt-6">
              {content.connectsEverything.footer}
            </p>
          </FadeUp>
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

      {/* Closing CTA — Start with Clarity */}
      {content.closingCta && (
      <section className="bg-linear-to-br from-gold to-gold-light py-12 md:py-16 lg:py-[clamp(56px,6vw,88px)] px-4 md:px-6 text-center">
        <div className="mx-auto max-w-[680px]">
          <SectionImage image={(content.closingCta as any)?.sectionImage}>
          <h2 className="font-serif text-[24px] xs:text-[26px] sm:text-[30px] md:text-[34px] lg:text-[38px] xl:text-[42px] text-navy mb-3.5">
            {content.closingCta.heading}
          </h2>
          <p className="text-[15px] md:text-base lg:text-[17px] text-navy/80 mb-4 leading-relaxed">
            {content.closingCta.body}
          </p>
          <p className="text-[15px] md:text-base lg:text-[17px] text-navy/80 mb-7 md:mb-9 leading-relaxed">
            {content.closingCta.body2}
          </p>
          <CalendlyButton url={content.closingCta.cta.href} className="btn btn-navy">
            {content.closingCta.cta.text}
          </CalendlyButton>
          </SectionImage>
        </div>
      </section>
      )}
    </main>
  );
}

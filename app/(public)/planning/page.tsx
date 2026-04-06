import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { InteriorHero } from "@/components/sections/InteriorHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { FadeUp } from "@/components/ui/FadeUp";
import { SectionImage } from "@/components/ui/SectionImage";
import { getPlanningContent } from "@/lib/content";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { getIcon } from "@/lib/icons";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPlanningContent();
  return {
    title: content.meta.title,
    description: content.meta.description,
    openGraph: {
      title: content.meta.ogTitle,
      description: content.meta.ogDescription,
    },
    alternates: { canonical: 'https://prosperityadvisory.net/planning' },
  };
}

const defaultServiceIcons = ["target", "users", "heart", "shield", "dollar", "bar-chart"];
const defaultPortalIcons = ["briefcase", "target", "bar-chart", "heart"];

export default async function PlanningPage() {
  const content = await getPlanningContent();
  return (
    <main>
      <BreadcrumbJsonLd items={[{ name: 'Personal Prosperity Planning\u2122', path: '/planning' }]} />
      {content.hero && (
        <InteriorHero
          eyebrow={content.hero.eyebrow}
          headline={content.hero.headline ?? "Personal Prosperity Planning™"}
          subtitle={content.hero.tagline}
          ctaText={content.hero.cta.text}
          backgroundImage={content.hero.backgroundImage ?? "/images/Hero Image 2 -JPG.JPG"}
        />
      )}

      {/* Intro body */}
      {content.hero && (
      <section className="bg-white py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6">
        <div className="mx-auto max-w-[800px] text-center">
          <FadeUp>
            <p className="text-base sm:text-[17px] md:text-lg text-slate leading-[1.8] mb-4">
              {content.hero.body}
            </p>
          </FadeUp>
          <FadeUp delay={1}>
            <p className="text-[15px] sm:text-base md:text-[17px] text-slate-light leading-[1.8]">
              {content.hero.detail}
            </p>
          </FadeUp>
        </div>
      </section>
      )}

      {/* Service Cards */}
      {content.serviceCards && content.serviceCards.length > 0 && (
      <section className="bg-cream py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6">
        <div className="mx-auto max-w-[1200px]">
          <FadeUp>
            <div className="text-center mb-10 md:mb-12">
              <span className="eyebrow">Our Planning Services</span>
              <h2 className="section-headline">
                Comprehensive Planning for Every Stage of Life
              </h2>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-7">
            {content.serviceCards.map((card: { title: string; body: string; tagline?: string; cta?: { text: string; href: string } }, i: number) => {
              const delay = ((i % 3) + 1) as 1 | 2 | 3;
              return (
                <FadeUp key={card.title} delay={delay} className="group">
                  <div className="bg-white p-5 xs:p-6 sm:p-7 lg:p-10 rounded-lg border border-border border-t-[3px] border-t-transparent transition-all duration-[400ms] hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(20,57,43,0.1)] hover:border-t-gold h-full flex flex-col">
                    <div className="w-12 h-12 lg:w-[52px] lg:h-[52px] rounded-[10px] bg-linear-to-br from-gold/10 to-gold/5 flex items-center justify-center mb-5">
                      <span className="w-6 h-6 lg:w-[26px] lg:h-[26px] text-gold [&>svg]:w-full [&>svg]:h-full [&>svg]:stroke-current [&>svg]:fill-none [&>svg]:stroke-[1.8] [&>svg]:[stroke-linecap:round] [&>svg]:[stroke-linejoin:round]">
                        {getIcon(defaultServiceIcons[i])}
                      </span>
                    </div>

                    <h3 className="font-sans text-[17px] sm:text-lg lg:text-[19px] font-semibold text-navy mb-1.5">
                      {card.title}
                    </h3>

                    {card.tagline && (
                      <p className="text-sm text-gold font-semibold mb-2.5">
                        {card.tagline}
                      </p>
                    )}

                    <p className="text-sm lg:text-[15px] text-slate-light leading-relaxed mb-4 flex-1">
                      {card.body}
                    </p>

                    {card.cta && (
                      <Link
                        href={card.cta.href}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold transition-colors duration-300 hover:text-gold-light"
                      >
                        {card.cta.text}
                        <svg
                          viewBox="0 0 24 24"
                          className="w-3.5 h-3.5 stroke-current fill-none stroke-2 transition-transform duration-300 group-hover:translate-x-1"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </Link>
                    )}
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {/* Financial Planning Portal */}
      {content.portal && (
      <section className="bg-white py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6">
        <div className="mx-auto max-w-[1200px]">
          <SectionImage image={(content.portal as any).sectionImage}>
          <FadeUp>
            <div className="text-center mb-10 md:mb-12 lg:mb-14">
              <span className="eyebrow">Client Portal</span>
              <h2 className="section-headline">{content.portal.heading}</h2>
              <p className="section-sub mx-auto">
                {content.portal.body}
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={1}>
            <div className="max-w-[800px] mx-auto mb-10 md:mb-12">
              <h3 className="font-serif text-[22px] sm:text-[26px] md:text-[28px] font-semibold text-navy mb-4 text-center">
                {content.portal.accessHeading}
              </h3>
              <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] text-center mb-8 md:mb-10">
                {content.portal.accessBody}
              </p>
              <div className="relative rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(20,57,43,0.10)] border border-border max-w-[600px] mx-auto">
                <Image
                  src={content.portal?.image ?? "/images/Dashboard.JPG"}
                  alt="Financial planning dashboard showing portfolio analysis, projections, and asset allocation"
                  width={824}
                  height={871}
                  className="w-full h-auto"
                  sizes="(max-width: 600px) 100vw, 600px"
                />
              </div>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 lg:gap-7 max-w-[900px] mx-auto">
            {content.portal.features.map((feature: { title: string; body: string }, i: number) => {
              const delay = ((i % 2) + 1) as 1 | 2;
              return (
                <FadeUp key={feature.title} delay={delay}>
                  <div className="bg-cream p-6 sm:p-7 lg:p-8 rounded-lg border border-border flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(20,57,43,0.06)]">
                      <span className="w-[18px] h-[18px] text-gold [&>svg]:w-full [&>svg]:h-full [&>svg]:stroke-current [&>svg]:fill-none [&>svg]:stroke-[1.8] [&>svg]:[stroke-linecap:round] [&>svg]:[stroke-linejoin:round]">
                        {getIcon(defaultPortalIcons[i])}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-sans text-[15px] sm:text-base font-semibold text-navy mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-slate-light leading-relaxed">
                        {feature.body}
                      </p>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
          </SectionImage>
        </div>
      </section>
      )}

      <CtaBand pageSlug="planning" />
    </main>
  );
}

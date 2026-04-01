import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { InteriorHero } from "@/components/sections/InteriorHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { FadeUp } from "@/components/ui/FadeUp";
import { getPlanningContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPlanningContent();
  return {
    title: content.meta.title,
    description: content.meta.description,
    openGraph: {
      title: content.meta.ogTitle,
      description: content.meta.ogDescription,
    },
  };
}

const serviceIcons: React.ReactNode[] = [
  /* Retirement */
  <svg key="retirement" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>,
  /* Family */
  <svg key="family" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
  /* Personal */
  <svg key="personal" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
  /* Risk */
  <svg key="risk" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
  /* Tax */
  <svg key="tax" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>,
  /* Wealth */
  <svg key="wealth" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>,
];

const portalIcons: React.ReactNode[] = [
  <svg key="review" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
  <svg key="whatif" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
  <svg key="simulations" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>,
  <svg key="connected" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
];

export default async function PlanningPage() {
  const content = await getPlanningContent();
  return (
    <main>
      <InteriorHero
        eyebrow={content.hero.eyebrow}
        headline="Personal Prosperity Planning™"
        subtitle={content.hero.tagline}
        ctaText={content.hero.cta.text + " →"}
        backgroundImage="/images/Hero Image 2 -JPG.JPG"
      />

      {/* Intro body */}
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

      {/* Service Cards */}
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
                        {serviceIcons[i]}
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

      {/* Financial Planning Portal */}
      <section className="bg-white py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6">
        <div className="mx-auto max-w-[1200px]">
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
                  src="/images/Dashboard.JPG"
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
                        {portalIcons[i]}
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
        </div>
      </section>

      <CtaBand
        headline="Ready to Build Your Plan?"
        subtext="Schedule your complimentary financial planning review and take the first step toward financial independence."
      />
    </main>
  );
}

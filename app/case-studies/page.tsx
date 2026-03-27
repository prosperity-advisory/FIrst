import type { Metadata } from "next";
import { InteriorHero } from "@/components/sections/InteriorHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { FadeUp } from "@/components/ui/FadeUp";
import { getCaseStudiesContent } from "@/lib/content";

const content = getCaseStudiesContent();

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
  openGraph: {
    title: content.meta.ogTitle,
    description: content.meta.ogDescription,
  },
};

export default function CaseStudiesPage() {
  return (
    <main>
      <InteriorHero
        eyebrow={content.hero.eyebrow}
        headline={content.hero.headline}
        subtitle={content.hero.subheadline}
      />

      {/* Disclaimer */}
      <section className="bg-cream py-6 sm:py-8 px-4 sm:px-6">
        <div className="mx-auto max-w-[800px]">
          <p className="text-xs md:text-[13px] text-slate-light leading-relaxed italic text-center">
            {content.disclaimer}
          </p>
        </div>
      </section>

      {/* Case Studies */}
      {content.cases.map((caseStudy, i) => {
        const isEven = i % 2 === 0;
        return (
          <section
            key={caseStudy.id}
            className={`${isEven ? "bg-white" : "bg-cream"} py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6`}
          >
            <div className="mx-auto max-w-[1000px]">
              {/* Header */}
              <FadeUp>
                <div className="mb-8 md:mb-10">
                  <span className="eyebrow">Case Study {i + 1}</span>
                  <h2 className="font-serif text-[24px] xs:text-[26px] sm:text-[30px] md:text-[34px] lg:text-[38px] font-semibold text-navy mb-2">
                    {caseStudy.title}
                  </h2>
                  <p className="text-[15px] sm:text-base md:text-[17px] text-gold font-semibold">
                    {caseStudy.subtitle}
                  </p>
                </div>
              </FadeUp>

              {/* Profile */}
              <FadeUp delay={1}>
                <div className="bg-cream rounded-lg border border-border p-6 md:p-8 mb-8 md:mb-10">
                  <h3 className="font-sans text-sm md:text-[15px] font-semibold text-navy uppercase tracking-[0.1em] mb-3">
                    Client Profile
                  </h3>
                  <p className="text-[15px] md:text-base text-navy font-semibold mb-1.5">
                    {caseStudy.profile.description}
                  </p>
                  <p className="text-sm md:text-[15px] text-slate leading-relaxed">
                    {caseStudy.profile.situation}
                  </p>
                </div>
              </FadeUp>

              {/* Three columns: Challenges, Approach, Outcome */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-7 lg:gap-8">
                {/* Challenges */}
                <FadeUp delay={1}>
                  <div className="h-full">
                    <div className="flex items-center gap-2.5 mb-4">
                      <div className="w-8 h-8 rounded-full bg-navy/10 flex items-center justify-center">
                        <svg
                          viewBox="0 0 24 24"
                          className="w-4 h-4 text-navy stroke-current fill-none stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="12" />
                          <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                      </div>
                      <h3 className="font-sans text-base md:text-[17px] font-semibold text-navy">
                        Challenges
                      </h3>
                    </div>
                    <ul className="space-y-2.5">
                      {caseStudy.challenges.map((item, j) => (
                        <li key={j} className="flex items-start gap-2.5">
                          <span className="w-[6px] h-[6px] bg-navy/30 rounded-full shrink-0 mt-[8px]" />
                          <span className="text-sm md:text-[15px] text-slate leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeUp>

                {/* Approach */}
                <FadeUp delay={2}>
                  <div className="h-full">
                    <div className="flex items-center gap-2.5 mb-4">
                      <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
                        <svg
                          viewBox="0 0 24 24"
                          className="w-4 h-4 text-gold stroke-current fill-none stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
                        >
                          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                        </svg>
                      </div>
                      <h3 className="font-sans text-base md:text-[17px] font-semibold text-navy">
                        Our Approach
                      </h3>
                    </div>
                    <ul className="space-y-2.5">
                      {caseStudy.approach.map((item, j) => (
                        <li key={j} className="flex items-start gap-2.5">
                          <span className="w-[6px] h-[6px] bg-gold rounded-full shrink-0 mt-[8px]" />
                          <span className="text-sm md:text-[15px] text-slate leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeUp>

                {/* Outcome */}
                <FadeUp delay={3}>
                  <div className="h-full">
                    <div className="flex items-center gap-2.5 mb-4">
                      <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                        <svg
                          viewBox="0 0 24 24"
                          className="w-4 h-4 text-gold stroke-current fill-none stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                      </div>
                      <h3 className="font-sans text-base md:text-[17px] font-semibold text-navy">
                        Outcome
                      </h3>
                    </div>
                    <p className="text-sm md:text-[15px] text-slate leading-relaxed">
                      {caseStudy.outcome}
                    </p>
                  </div>
                </FadeUp>
              </div>
            </div>
          </section>
        );
      })}

      <CtaBand
        headline={content.ctaBand.heading}
        subtext={content.ctaBand.body}
      />
    </main>
  );
}

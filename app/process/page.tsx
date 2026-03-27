import type { Metadata } from "next";
import { InteriorHero } from "@/components/sections/InteriorHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { FadeUp } from "@/components/ui/FadeUp";
import { getProcessContent } from "@/lib/content";

const content = getProcessContent();

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
  openGraph: {
    title: content.meta.ogTitle,
    description: content.meta.ogDescription,
  },
};

export default function ProcessPage() {
  return (
    <main>
      <InteriorHero
        eyebrow={content.hero.eyebrow}
        headline={content.hero.headline}
        subtitle={content.hero.subheadline}
        ctaText={content.hero.cta.text + " →"}
      />

      {/* Intro */}
      <section className="bg-white py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-24 px-4 sm:px-6">
        <div className="mx-auto max-w-[800px] text-center">
          <FadeUp>
            <h2 className="section-headline">{content.intro.heading}</h2>
            <p className="text-base sm:text-[17px] md:text-lg text-slate leading-[1.8]">
              {content.intro.body}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Steps */}
      {content.steps.map((step, i) => {
        const isEven = i % 2 === 0;
        // Get the detail list — each step has a different key
        const detailItems =
          step.whatToExpect ??
          step.documentsNeeded ??
          step.whatWeAnalyze ??
          step.whatYouReceive ??
          step.whatWeHandle ??
          step.whatsCovered ??
          [];

        return (
          <section
            key={step.number}
            className={`${isEven ? "bg-cream" : "bg-white"} py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6`}
          >
            <div className="mx-auto max-w-[1000px] grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-10 lg:gap-14">
              {/* Step number */}
              <FadeUp>
                <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-2 md:pt-1">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white border-2 border-gold flex items-center justify-center shrink-0 shadow-[0_4px_16px_rgba(201,168,76,0.12)]">
                    <span className="font-serif text-2xl md:text-3xl font-bold text-gold">
                      {step.number}
                    </span>
                  </div>
                  <div className="md:hidden">
                    <h2 className="font-serif text-[22px] sm:text-[26px] font-semibold text-navy leading-tight">
                      {step.title}
                    </h2>
                    <p className="text-sm text-gold font-semibold">
                      {step.subtitle}
                    </p>
                  </div>
                </div>
              </FadeUp>

              {/* Step content */}
              <div>
                <FadeUp>
                  <div className="hidden md:block mb-4">
                    <h2 className="font-serif text-[26px] lg:text-[30px] font-semibold text-navy mb-1">
                      {step.title}
                    </h2>
                    <p className="text-sm md:text-[15px] text-gold font-semibold">
                      {step.subtitle}
                    </p>
                  </div>
                  <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mb-5 md:mb-6">
                    {step.body}
                  </p>
                </FadeUp>

                {detailItems.length > 0 && (
                  <FadeUp delay={1}>
                    <ul className="space-y-2.5 mb-5 md:mb-6">
                      {detailItems.map((item, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span className="w-[7px] h-[7px] bg-gold rounded-full shrink-0 mt-[9px]" />
                          <span className="text-[15px] md:text-base text-slate leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </FadeUp>
                )}

                <FadeUp delay={2}>
                  <div className="bg-white rounded-lg border border-border p-5 md:p-6">
                    <p className="text-sm md:text-[15px] text-slate-light leading-relaxed">
                      <span className="font-semibold text-navy">
                        Outcome:{" "}
                      </span>
                      {step.outcome}
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

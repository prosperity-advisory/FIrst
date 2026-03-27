import type { Metadata } from "next";
import { InteriorHero } from "@/components/sections/InteriorHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { FadeUp } from "@/components/ui/FadeUp";
import { getFeesContent } from "@/lib/content";

const content = getFeesContent();

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
  openGraph: {
    title: content.meta.ogTitle,
    description: content.meta.ogDescription,
  },
};

export default function FeesPage() {
  return (
    <main>
      <InteriorHero
        eyebrow={content.hero.eyebrow}
        headline={content.hero.headline}
        subtitle={content.hero.subheadline}
      />

      {/* Fiduciary Explanation */}
      <section className="bg-white py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6">
        <div className="mx-auto max-w-[800px]">
          <FadeUp>
            <div className="w-12 sm:w-14 h-[3px] bg-gold mb-4" />
            <span className="eyebrow">Our Commitment</span>
            <h2 className="section-headline">{content.fiduciary.heading}</h2>
            <p className="text-base sm:text-[17px] md:text-lg text-slate leading-[1.8] mb-8 md:mb-10">
              {content.fiduciary.body}
            </p>
          </FadeUp>

          <FadeUp delay={1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {content.fiduciary.points.map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-3 bg-cream rounded-lg p-4 md:p-5"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-gold shrink-0 mt-0.5 stroke-current fill-none stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <span className="text-sm md:text-[15px] text-navy font-medium leading-snug">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Fee Types */}
      <section className="bg-cream py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6">
        <div className="mx-auto max-w-[1000px]">
          <FadeUp>
            <div className="text-center mb-10 md:mb-12 lg:mb-14">
              <span className="eyebrow">Transparent Pricing</span>
              <h2 className="section-headline">{content.feeTypes.heading}</h2>
              <p className="section-sub mx-auto">{content.feeTypes.body}</p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 lg:gap-7">
            {content.feeTypes.types.map((feeType, i) => {
              const delay = (i + 1) as 1 | 2 | 3;
              return (
                <FadeUp key={feeType.title} delay={delay}>
                  <div className="bg-white p-7 sm:p-8 lg:p-9 rounded-lg border border-border border-t-[3px] border-t-gold h-full flex flex-col">
                    <h3 className="font-serif text-[19px] sm:text-[21px] font-semibold text-navy mb-3">
                      {feeType.title}
                    </h3>
                    <p className="text-[15px] md:text-base text-slate leading-relaxed mb-4 flex-1">
                      {feeType.description}
                    </p>
                    <p className="text-sm text-slate-light leading-relaxed">
                      {feeType.details}
                    </p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="bg-white py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6">
        <div className="mx-auto max-w-[800px]">
          <FadeUp>
            <span className="eyebrow">Your Investment</span>
            <h2 className="section-headline">{content.whatsIncluded.heading}</h2>
            <p className="text-base sm:text-[17px] md:text-lg text-slate leading-[1.8] mb-7 md:mb-9">
              {content.whatsIncluded.body}
            </p>
          </FadeUp>

          <FadeUp delay={1}>
            <ul className="space-y-3 md:space-y-4">
              {content.whatsIncluded.items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-[18px] h-[18px] text-gold shrink-0 mt-[3px] stroke-current fill-none stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-[15px] md:text-base text-slate leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </section>

      {/* Advisory vs Insurance */}
      <section className="relative bg-linear-[160deg] from-navy to-navy-deep py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6 overflow-hidden">
        <div className="absolute -top-[200px] -right-[200px] w-[500px] h-[500px] border border-gold/[0.06] rounded-full pointer-events-none" />

        <div className="relative z-[1] mx-auto max-w-[800px]">
          <FadeUp>
            <span className="eyebrow">Important Distinction</span>
            <h2 className="section-headline text-white">
              {content.advisoryVsInsurance.heading}
            </h2>
            <p className="text-base sm:text-[17px] md:text-lg text-cream/80 leading-[1.8] mb-6">
              {content.advisoryVsInsurance.body}
            </p>
          </FadeUp>

          <FadeUp delay={1}>
            <div className="bg-white/[0.06] border border-white/10 rounded-lg p-6 md:p-8 mb-5">
              <p className="text-[15px] md:text-base text-white/90 leading-relaxed">
                {content.advisoryVsInsurance.distinction}
              </p>
            </div>
            <p className="text-xs md:text-[13px] text-slate-light italic">
              {content.advisoryVsInsurance.disclaimer}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Fee FAQ */}
      <section className="bg-cream py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6">
        <div className="mx-auto max-w-[800px]">
          <FadeUp>
            <div className="text-center mb-8 md:mb-10">
              <span className="eyebrow">Common Questions</span>
              <h2 className="section-headline">Fee FAQs</h2>
            </div>
          </FadeUp>

          <div className="space-y-4 md:space-y-5">
            {content.faq.map((item, i) => (
              <FadeUp key={i} delay={Math.min(i + 1, 3) as 1 | 2 | 3}>
                <div className="bg-white rounded-lg border border-border p-6 md:p-7">
                  <h3 className="font-sans text-[15px] sm:text-base md:text-[17px] font-semibold text-navy mb-2">
                    {item.question}
                  </h3>
                  <p className="text-sm md:text-[15px] text-slate leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        headline={content.ctaBand.heading}
        subtext={content.ctaBand.body}
      />
    </main>
  );
}

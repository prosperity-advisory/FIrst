import type { Metadata } from "next";
import { InteriorHero } from "@/components/sections/InteriorHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Accordion } from "@/components/ui/Accordion";
import { FadeUp } from "@/components/ui/FadeUp";
import { getFaqsContent } from "@/lib/content";

const content = getFaqsContent();

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
  openGraph: {
    title: content.meta.ogTitle,
    description: content.meta.ogDescription,
  },
};

export default function FaqsPage() {
  return (
    <main>
      <InteriorHero
        eyebrow={content.hero.eyebrow}
        headline={content.hero.headline}
        subtitle={content.hero.subheadline}
        backgroundImage="/images/Hero Image- jpg.JPG"
      />

      {/* Intro */}
      <section className="bg-white py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6">
        <div className="mx-auto max-w-[800px]">
          {content.intro.paragraphs.map((p: string, i: number) => (
            <FadeUp key={i} delay={i as 0 | 1}>
              <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mb-6 md:mb-8 last:mb-0">
                {p}
              </p>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* FAQ Categories */}
      {content.categories.map((category: { heading: string; questions: { question: string; answer: string }[] }, catIdx: number) => (
        <section
          key={category.heading}
          className={`${catIdx % 2 === 0 ? "bg-cream" : "bg-white"} py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6`}
        >
          <div className="mx-auto max-w-[800px]">
            <FadeUp>
              <h2 className="font-serif text-[22px] xs:text-[24px] sm:text-[28px] md:text-[32px] font-semibold text-navy mb-6 md:mb-8">
                {category.heading}
              </h2>
            </FadeUp>
            <FadeUp delay={1}>
              <Accordion items={category.questions} />
            </FadeUp>
          </div>
        </section>
      ))}

      {/* Disclosures */}
      <section className="bg-white py-10 md:py-14 px-4 sm:px-6">
        <div className="mx-auto max-w-[800px]">
          <FadeUp>
            <p className="text-xs md:text-[13px] text-slate-light italic leading-relaxed">
              {content.disclosures}
            </p>
          </FadeUp>
        </div>
      </section>

      <CtaBand
        headline={content.ctaBand.heading}
        subtext={content.ctaBand.body}
      />
    </main>
  );
}

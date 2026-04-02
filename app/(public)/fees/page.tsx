import type { Metadata } from "next";
import { InteriorHero } from "@/components/sections/InteriorHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { FadeUp } from "@/components/ui/FadeUp";
import { getFeesContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getFeesContent();
  return {
    title: content.meta.title,
    description: content.meta.description,
    openGraph: {
      title: content.meta.ogTitle,
      description: content.meta.ogDescription,
    },
  };
}

interface FeeSection {
  id: string;
  heading: string;
  paragraphs: string[];
  listHeading?: string;
  items?: string[];
  footnotes?: string[];
}

export default async function FeesPage() {
  const content = await getFeesContent();

  return (
    <main>
      <InteriorHero
        eyebrow={content.hero.eyebrow}
        headline={content.hero.headline}
        subtitle={content.hero.subheadline}
        backgroundImage={content.hero.backgroundImage ?? "/images/tree jpg.JPG"}
      />

      {/* Content Sections */}
      {content.sections.map((section: FeeSection, sectionIdx: number) => (
        <section
          key={section.id}
          id={section.id}
          className={`${sectionIdx % 2 === 0 ? "bg-white" : "bg-cream"} py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6`}
        >
          <div className="mx-auto max-w-[800px]">
            <FadeUp>
              <h2 className="font-serif text-[22px] xs:text-[24px] sm:text-[28px] md:text-[32px] font-semibold text-navy mb-5 md:mb-6">
                {section.heading}
              </h2>
            </FadeUp>

            {section.paragraphs.map((p: string, i: number) => (
              <FadeUp key={i} delay={Math.min(i + 1, 2) as 1 | 2}>
                <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mb-5 md:mb-6">
                  {p}
                </p>
              </FadeUp>
            ))}

            {section.listHeading && (
              <FadeUp delay={2}>
                <p className="text-[15px] sm:text-base md:text-[17px] font-medium text-navy mb-4">
                  {section.listHeading}
                </p>
              </FadeUp>
            )}

            {section.items && section.items.length > 0 && (
              <FadeUp delay={2}>
                <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                  {section.items.map((item: string) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="w-[7px] h-[7px] bg-gold rounded-full shrink-0 mt-[9px]" />
                      <span className="text-[15px] md:text-base text-slate leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </FadeUp>
            )}

            {section.footnotes && section.footnotes.map((note: string, i: number) => (
              <FadeUp key={i} delay={3}>
                <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mb-4 last:mb-0">
                  {note}
                </p>
              </FadeUp>
            ))}
          </div>
        </section>
      ))}

      {/* Important Disclosure */}
      <section className="bg-white py-10 md:py-14 px-4 sm:px-6">
        <div className="mx-auto max-w-[800px]">
          <FadeUp>
            <h3 className="font-sans text-sm md:text-[15px] font-semibold text-navy mb-3">
              Important Disclosure
            </h3>
            <p className="text-xs md:text-[13px] text-slate-light italic leading-relaxed">
              {content.disclosure}
            </p>
          </FadeUp>
        </div>
      </section>

      <CtaBand pageSlug="fees" />
    </main>
  );
}

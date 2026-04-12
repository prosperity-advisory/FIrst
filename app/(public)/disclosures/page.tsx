import type { Metadata } from "next";
import { InteriorHero } from "@/components/sections/InteriorHero";
import { FadeUp } from "@/components/ui/FadeUp";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { getDisclosuresContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getDisclosuresContent();
  return {
    title: content.meta.title,
    description: content.meta.description,
    openGraph: {
      title: content.meta.ogTitle,
      description: content.meta.ogDescription,
    },
    alternates: { canonical: "https://prosperityadvisory.net/disclosures" },
  };
}

export default async function DisclosuresPage() {
  const content = await getDisclosuresContent();

  return (
    <main>
      <BreadcrumbJsonLd items={[{ name: "Disclosures", path: "/disclosures" }]} />

      {content.hero && (
        <InteriorHero
          eyebrow={content.hero.eyebrow}
          headline={content.hero.headline}
          subtitle={content.hero.subheadline}
          backgroundImage={content.hero.backgroundImage ?? undefined}
        />
      )}

      {/* Intro */}
      {content.intro && content.intro.paragraphs?.length > 0 && (
        <section className="bg-white py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-24 px-4 sm:px-6">
          <div className="mx-auto max-w-[800px]">
            {content.intro.paragraphs.map((p: string, i: number) => (
              <FadeUp key={i} delay={Math.min(i, 2) as 0 | 1 | 2}>
                <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mb-5 md:mb-6 last:mb-0">
                  {p}
                </p>
              </FadeUp>
            ))}
          </div>
        </section>
      )}

      {/* Sections */}
      {content.sections && content.sections.length > 0 && (
        <section className="bg-cream py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] px-4 sm:px-6">
          <div className="mx-auto max-w-[800px] space-y-10 md:space-y-12">
            {content.sections.map(
              (section: { heading: string; paragraphs: string[] }) => (
                <FadeUp key={section.heading}>
                  <div>
                    <h2 className="font-serif text-[22px] sm:text-[24px] md:text-[28px] font-semibold text-navy mb-4 md:mb-5">
                      {section.heading}
                    </h2>
                    <div className="space-y-4 md:space-y-5">
                      {section.paragraphs.map((p: string, i: number) => (
                        <p
                          key={i}
                          className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8]"
                        >
                          {p}
                        </p>
                      ))}
                    </div>
                  </div>
                </FadeUp>
              )
            )}
          </div>
        </section>
      )}
    </main>
  );
}

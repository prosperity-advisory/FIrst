import type { Metadata } from "next";
import Link from "next/link";
import { InteriorHero } from "@/components/sections/InteriorHero";
import { ServiceAccordion } from "@/components/sections/ServiceAccordion";
import { CtaBand } from "@/components/sections/CtaBand";
import { FadeUp } from "@/components/ui/FadeUp";
import { CtaButtonGroup } from "@/components/ui/CtaButtonGroup";
import { getServicesContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getServicesContent();
  return {
    title: content.meta.title,
    description: content.meta.description,
    openGraph: {
      title: content.meta.ogTitle,
      description: content.meta.ogDescription,
    },
  };
}

export default async function ServicesPage() {
  const content = await getServicesContent();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { intro, sections, approach, disclosures } = content as any;

  return (
    <main>
      {content.hero && (
        <InteriorHero
          eyebrow={content.hero.eyebrow}
          headline={content.hero.headline}
          subtitle={content.hero.body}
          backgroundImage={content.hero.backgroundImage ?? "/images/services 2.0.JPG"}
        />
      )}

      {/* Intro Section */}
      {intro && (
      <section className="bg-white py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6">
        <div className="mx-auto max-w-[800px]">
          {intro.paragraphs.map((p: string, i: number) => (
            <FadeUp key={i} delay={Math.min(i, 5) as 0 | 1 | 2 | 3 | 4 | 5}>
              <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mb-6 md:mb-8">
                {p}
              </p>
            </FadeUp>
          ))}

          <FadeUp delay={2}>
            <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mb-8 md:mb-10">
              <Link
                href={intro.cta.href}
                className="font-semibold text-gold hover:text-gold-light transition-colors"
              >
                {intro.cta.text}
              </Link>{" "}
              {intro.cta.prefix}
            </p>
          </FadeUp>

          <FadeUp delay={3}>
            <h2 className="font-serif text-[22px] xs:text-[24px] sm:text-[28px] md:text-[32px] font-semibold text-navy mb-4 md:mb-5">
              {intro.exploreHeading}
            </h2>
            <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mb-5">
              {intro.exploreBody}
            </p>
          </FadeUp>

          <FadeUp delay={4}>
            <ul className="space-y-3 mb-8">
              {intro.exploreLinks.map((link: { title: string; href: string }) => (
                <li key={link.href} className="flex items-start gap-3">
                  <span className="w-[7px] h-[7px] bg-gold rounded-full shrink-0 mt-[9px]" />
                  <a
                    href={link.href}
                    className="text-[15px] md:text-base text-gold hover:text-gold-light font-medium transition-colors"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </FadeUp>

          <FadeUp delay={5}>
            <p className="text-[15px] sm:text-base md:text-[17px] text-slate-light italic leading-[1.8] mb-8">
              {intro.exploreNote}
            </p>
            <CtaButtonGroup
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              buttons={(content as any).exploreButtons?.length
                ? (content as any).exploreButtons
                : [{ text: "Explore Planning Examples →", href: "/case-studies", style: "gold" as const }]}
            />
          </FadeUp>
        </div>
      </section>
      )}

      {/* Service Category Sections — Two-level accordion */}
      {sections && (
      <section className="bg-white py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6">
        <div className="mx-auto max-w-[900px]">
          <ServiceAccordion sections={sections as any} />
        </div>
      </section>
      )}

      {/* Our Planning Approach */}
      {approach && (
      <section className="bg-cream py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6">
        <div className="mx-auto max-w-[800px]">
          <FadeUp>
            <h2 className="font-serif text-[24px] xs:text-[26px] sm:text-[30px] md:text-[34px] lg:text-[38px] font-semibold text-navy mb-5 md:mb-6">
              {approach.heading}
            </h2>
          </FadeUp>

          {approach.paragraphs.map((p: string, i: number) => (
            <FadeUp key={i} delay={Math.min(i + 1, 5) as 0 | 1 | 2 | 3 | 4 | 5}>
              <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mb-6 md:mb-8">
                {p}
              </p>
            </FadeUp>
          ))}

          <FadeUp delay={3}>
            <h3 className="font-sans text-lg md:text-[19px] font-semibold text-navy mb-3">
              {approach.cta.heading}
            </h3>
            <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mb-6">
              {approach.cta.body}
            </p>
            <Link href={approach.cta.href} className="btn btn-gold">
              {approach.cta.text}
            </Link>
          </FadeUp>
        </div>
      </section>
      )}

      {/* Important Disclosures */}
      {disclosures && (
      <section className="bg-white py-10 md:py-14 px-4 sm:px-6">
        <div className="mx-auto max-w-[800px]">
          <FadeUp>
            <h3 className="font-sans text-sm md:text-[15px] font-semibold text-navy mb-3">
              Important Disclosures
            </h3>
            <p className="text-xs md:text-[13px] text-slate-light italic leading-relaxed">
              {disclosures}
            </p>
          </FadeUp>
        </div>
      </section>
      )}

      <CtaBand pageSlug="services" />
    </main>
  );
}

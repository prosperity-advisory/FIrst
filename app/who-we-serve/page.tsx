import type { Metadata } from "next";
import { InteriorHero } from "@/components/sections/InteriorHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { FadeUp } from "@/components/ui/FadeUp";
import { getWhoWeServeContent } from "@/lib/content";

const content = getWhoWeServeContent();

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
  openGraph: {
    title: content.meta.ogTitle,
    description: content.meta.ogDescription,
  },
};

const audienceIcons: Record<string, React.ReactNode> = {
  "pre-retirees": (
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  "business-owners": (
    <svg viewBox="0 0 24 24">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  professionals: (
    <svg viewBox="0 0 24 24">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  families: (
    <svg viewBox="0 0 24 24">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  "tax-legacy": (
    <svg viewBox="0 0 24 24">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  attorneys: (
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
};

export default function WhoWeServePage() {
  return (
    <main>
      <InteriorHero
        eyebrow={content.hero.eyebrow}
        headline={content.hero.headline}
        subtitle={content.hero.subheadline}
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

      {/* Audience Segments */}
      {content.audiences.map((audience, i) => {
        const isEven = i % 2 === 0;
        return (
          <section
            key={audience.id}
            className={`${isEven ? "bg-cream" : "bg-white"} py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6`}
          >
            <div className="mx-auto max-w-[1200px] grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-8 md:gap-12 lg:gap-16 items-start">
              {/* Left: icon + title */}
              <FadeUp>
                <div className="flex items-start gap-4 mb-4 md:mb-0">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-[12px] bg-linear-to-br from-gold/10 to-gold/5 flex items-center justify-center shrink-0">
                    <span className="w-7 h-7 md:w-8 md:h-8 text-gold [&>svg]:w-full [&>svg]:h-full [&>svg]:stroke-current [&>svg]:fill-none [&>svg]:stroke-[1.8] [&>svg]:[stroke-linecap:round] [&>svg]:[stroke-linejoin:round]">
                      {audienceIcons[audience.id]}
                    </span>
                  </div>
                  <div>
                    <h2 className="font-serif text-[22px] sm:text-[26px] md:text-[28px] lg:text-[32px] font-semibold text-navy leading-tight mb-1.5">
                      {audience.title}
                    </h2>
                    <p className="text-sm md:text-[15px] text-gold font-semibold">
                      {audience.subtitle}
                    </p>
                  </div>
                </div>
              </FadeUp>

              {/* Right: description + highlights */}
              <FadeUp delay={1}>
                <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mb-5 md:mb-6">
                  {audience.body}
                </p>
                <ul className="space-y-2.5">
                  {audience.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="w-[7px] h-[7px] bg-gold rounded-full shrink-0 mt-[9px]" />
                      <span className="text-[15px] md:text-base text-slate leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </FadeUp>
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

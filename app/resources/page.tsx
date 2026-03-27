import type { Metadata } from "next";
import { InteriorHero } from "@/components/sections/InteriorHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { FadeUp } from "@/components/ui/FadeUp";
import { getResourcesContent } from "@/lib/content";

const content = getResourcesContent();

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
  openGraph: {
    title: content.meta.ogTitle,
    description: content.meta.ogDescription,
  },
};

const categoryIcons: Record<string, React.ReactNode> = {
  articles: (
    <svg viewBox="0 0 24 24">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  guides: (
    <svg viewBox="0 0 24 24">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  videos: (
    <svg viewBox="0 0 24 24">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
  tools: (
    <svg viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  ),
};

export default function ResourcesPage() {
  return (
    <main>
      <InteriorHero
        eyebrow={content.hero.eyebrow}
        headline={content.hero.headline}
        subtitle={content.hero.subheadline}
      />

      {content.categories.map((category, catIdx) => {
        const isEven = catIdx % 2 === 0;
        return (
          <section
            key={category.id}
            className={`${isEven ? "bg-white" : "bg-cream"} py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6`}
          >
            <div className="mx-auto max-w-[1200px]">
              <FadeUp>
                <div className="flex items-center gap-3.5 mb-2">
                  <span className="w-8 h-8 text-gold [&>svg]:w-full [&>svg]:h-full [&>svg]:stroke-current [&>svg]:fill-none [&>svg]:stroke-[1.8] [&>svg]:[stroke-linecap:round] [&>svg]:[stroke-linejoin:round]">
                    {categoryIcons[category.id]}
                  </span>
                  <h2 className="font-serif text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] font-semibold text-navy">
                    {category.title}
                  </h2>
                </div>
                <p className="text-[15px] sm:text-base md:text-[17px] text-slate-light leading-relaxed mb-8 md:mb-10 max-w-[600px]">
                  {category.description}
                </p>
              </FadeUp>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-7">
                {category.items.map((item, i) => {
                  const delay = ((i % 3) + 1) as 1 | 2 | 3;
                  return (
                    <FadeUp key={item.title} delay={delay}>
                      <div className="bg-white p-6 sm:p-7 lg:p-8 rounded-lg border border-border border-t-[3px] border-t-transparent transition-all duration-[400ms] hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(20,57,43,0.08)] hover:border-t-gold h-full flex flex-col">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs font-semibold text-gold uppercase tracking-[0.12em]">
                            {item.category}
                          </span>
                          {item.comingSoon && (
                            <span className="text-[10px] font-semibold text-white bg-navy/70 rounded-full px-2.5 py-0.5 uppercase tracking-wider">
                              Coming Soon
                            </span>
                          )}
                        </div>

                        <h3 className="font-sans text-[16px] sm:text-[17px] font-semibold text-navy mb-2 leading-snug">
                          {item.title}
                        </h3>

                        <p className="text-sm text-slate-light leading-relaxed flex-1">
                          {item.summary}
                        </p>
                      </div>
                    </FadeUp>
                  );
                })}
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

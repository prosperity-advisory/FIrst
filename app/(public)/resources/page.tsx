import type { Metadata } from "next";
import Link from "next/link";
import { InteriorHero } from "@/components/sections/InteriorHero";
import { FadeUp } from "@/components/ui/FadeUp";
import { SectionImage, ImageBlockSection } from "@/components/ui/SectionImage";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { getResourcesContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getResourcesContent();
  return {
    title: content.meta.title,
    description: content.meta.description,
    openGraph: {
      title: content.meta.ogTitle,
      description: content.meta.ogDescription,
    },
    alternates: { canonical: 'https://prosperityadvisory.net/resources' },
  };
}

interface CalculatorTool {
  id?: string;
  title: string;
  href: string;
  helpsWith: string;
  whyMatters: string;
  usedWhen: string;
  note: string;
}

interface ToolGroup {
  id: string;
  heading: string;
  tools: CalculatorTool[];
}

interface ResourceTopic {
  title: string;
  description: string;
}

export default async function ResourcesPage() {
  const content = await getResourcesContent();
  return (
    <main>
      <BreadcrumbJsonLd items={[{ name: 'Resources & Learning Center', path: '/resources' }]} />
      {/* Hero */}
      {content.hero && (
        <InteriorHero
          eyebrow={content.hero.eyebrow}
          headline={content.hero.headline}
          backgroundImage={content.hero.backgroundImage ?? "/images/services google.jpg"}
        />
      )}

      {/* Hero extended body */}
      {content.hero && (
      <section className="bg-white py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-24 px-4 sm:px-6">
        <div className="mx-auto max-w-[800px]">
          {content.hero.body.map((p: string, i: number) => (
            <FadeUp key={i} delay={Math.min(i, 2) as 0 | 1 | 2}>
              <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mb-6 md:mb-8">
                {p}
              </p>
            </FadeUp>
          ))}
          <FadeUp delay={3}>
            <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8]">
              {content.hero.cta.prefix}{" "}
              <Link
                href={content.hero.cta.href}
                className="font-semibold text-gold hover:text-gold-light transition-colors"
              >
                {content.hero.cta.text}
              </Link>
            </p>
          </FadeUp>
        </div>
      </section>
      )}

      {/* Start Here */}
      {content.startHere && (
      <section className="bg-cream py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6">
        <div className="mx-auto max-w-[800px]">
          <SectionImage image={(content.startHere as any).sectionImage}>
          <FadeUp>
            <h2 className="section-headline">{content.startHere.heading}</h2>
            <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mb-6 md:mb-8">
              {content.startHere.intro}
            </p>
          </FadeUp>
          <FadeUp delay={1}>
            <ul className="space-y-3 md:space-y-4">
              {content.startHere.items.map((item: { trigger: string; action: string; href: string }) => (
                <li key={item.trigger} className="flex items-start gap-3">
                  <span className="w-[7px] h-[7px] bg-gold rounded-full shrink-0 mt-[9px]" />
                  <span className="text-[15px] md:text-base text-slate leading-relaxed">
                    <span className="font-semibold text-navy">{item.trigger}</span>{" "}
                    →{" "}
                    <a href={item.href} className="text-gold hover:text-gold-light font-medium transition-colors">
                      {item.action}
                    </a>
                  </span>
                </li>
              ))}
            </ul>
          </FadeUp>
          </SectionImage>
        </div>
      </section>
      )}

      {/* How to Use This Page */}
      {content.howToUse && (
      <section className="bg-white py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6">
        <div className="mx-auto max-w-[800px]">
          <SectionImage image={(content.howToUse as any).sectionImage}>
          <FadeUp>
            <h2 className="section-headline">{content.howToUse.heading}</h2>
            <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mb-6 md:mb-8">
              {content.howToUse.intro}
            </p>
          </FadeUp>
          <FadeUp delay={1}>
            <p className="text-[15px] sm:text-base md:text-[17px] font-medium text-navy mb-4">
              {content.howToUse.listHeading}
            </p>
            <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
              {content.howToUse.items.map((item: string) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-[7px] h-[7px] bg-gold rounded-full shrink-0 mt-[9px]" />
                  <span className="text-[15px] md:text-base text-slate leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </FadeUp>
          <FadeUp delay={2}>
            <p className="text-[15px] sm:text-base md:text-[17px] text-slate-light italic leading-[1.8]">
              {content.howToUse.footnote}
            </p>
          </FadeUp>
          </SectionImage>
        </div>
      </section>
      )}

      {/* Featured Financial Calculators & Planning Tools */}
      {content.calculators && (
      <section className="bg-cream py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6">
        <div className="mx-auto max-w-[1000px]">
          <FadeUp>
            <div className="text-center mb-10 md:mb-14">
              <h2 className="section-headline">{content.calculators.heading}</h2>
            </div>
          </FadeUp>

          {content.calculators.groups.map((group: ToolGroup, gIdx: number) => (
            <div key={group.id} id={group.id} className={gIdx > 0 ? "mt-14 md:mt-16 lg:mt-20" : ""}>
              <FadeUp>
                <h3 className="font-serif text-[20px] sm:text-[24px] md:text-[28px] font-semibold text-navy mb-8 md:mb-10">
                  {group.heading}
                </h3>
              </FadeUp>

              <div className="space-y-6 md:space-y-8">
                {group.tools.map((tool: CalculatorTool) => (
                  <FadeUp key={tool.title} delay={1}>
                    <div
                      id={tool.id}
                      className="bg-white p-6 sm:p-7 lg:p-8 rounded-lg border border-border"
                    >
                      <h4 className="font-sans text-[17px] sm:text-lg font-semibold text-navy mb-1.5">
                        {tool.title}
                      </h4>
                      <a
                        href={tool.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gold hover:text-gold-light font-medium transition-colors inline-flex items-center gap-1.5 mb-4"
                      >
                        Open Calculator
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-current fill-none stroke-2">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                        </svg>
                        <span className="text-slate-light text-xs">(Opens external website)</span>
                      </a>

                      <div className="space-y-2.5">
                        <p className="text-sm md:text-[15px] text-slate leading-relaxed">
                          <span className="font-semibold text-navy">What it helps with:</span>{" "}
                          {tool.helpsWith}
                        </p>
                        <p className="text-sm md:text-[15px] text-slate leading-relaxed">
                          <span className="font-semibold text-navy">Why it matters:</span>{" "}
                          {tool.whyMatters}
                        </p>
                        <p className="text-sm md:text-[15px] text-slate leading-relaxed">
                          <span className="font-semibold text-navy">Commonly used when:</span>{" "}
                          {tool.usedWhen}
                        </p>
                      </div>

                      <p className="text-xs md:text-[13px] text-slate-light italic leading-relaxed mt-4 pt-4 border-t border-border">
                        <span className="font-semibold not-italic">Important note:</span>{" "}
                        {tool.note}
                      </p>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      )}

      {/* Prosperity Insight */}
      {content.prosperityInsight && (
      <section className="relative bg-linear-[160deg] from-navy to-navy-deep py-14 xs:py-16 sm:py-[72px] md:py-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute -top-[200px] -right-[200px] w-[500px] h-[500px] border border-gold/[0.06] rounded-full pointer-events-none" />
        <div className="relative z-[1] mx-auto max-w-[800px] text-center">
          <FadeUp>
            <h2 className="section-headline text-white">{content.prosperityInsight.heading}</h2>
          </FadeUp>
          {content.prosperityInsight.paragraphs.map((p: string, i: number) => (
            <FadeUp key={i} delay={1}>
              <p className="text-[15px] sm:text-base md:text-[17px] text-cream/80 leading-[1.8] mb-5 last:mb-0">
                {p}
              </p>
            </FadeUp>
          ))}
        </div>
      </section>
      )}

      {/* How and Why to Use These Tools */}
      {content.howAndWhy && (
      <section className="bg-white py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6">
        <div className="mx-auto max-w-[800px]">
          <FadeUp>
            <h2 className="section-headline">{content.howAndWhy.heading}</h2>
          </FadeUp>
          {content.howAndWhy.paragraphs.map((p: string, i: number) => (
            <FadeUp key={i} delay={1}>
              <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mb-5 md:mb-6">
                {p}
              </p>
            </FadeUp>
          ))}
          <FadeUp delay={2}>
            <p className="text-[15px] sm:text-base md:text-[17px] font-medium text-navy mb-4">
              {content.howAndWhy.listHeading}
            </p>
            <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
              {content.howAndWhy.items.map((item: string) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-[7px] h-[7px] bg-gold rounded-full shrink-0 mt-[9px]" />
                  <span className="text-[15px] md:text-base text-slate leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </FadeUp>
          <FadeUp delay={3}>
            <p className="text-[15px] sm:text-base md:text-[17px] text-slate font-semibold leading-[1.8] mb-5">
              {content.howAndWhy.closing}
            </p>
            <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8]">
              {content.howAndWhy.cta.replace("schedule a Clarity Call", "")}{" "}
              <Link
                href="https://calendly.com/prosperityplanningandadvisory/clarity-session"
                className="font-semibold text-gold hover:text-gold-light transition-colors"
              >
                schedule a Clarity Call
              </Link>
              .
            </p>
          </FadeUp>
        </div>
      </section>
      )}

      {/* Resource Library by Planning Topic */}
      {content.resourceLibrary && (
      <section className="bg-cream py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6">
        <div className="mx-auto max-w-[1000px]">
          <FadeUp>
            <div className="text-center mb-10 md:mb-12">
              <h2 className="section-headline">{content.resourceLibrary.heading}</h2>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {content.resourceLibrary.topics.map((topic: ResourceTopic, i: number) => (
              <FadeUp key={topic.title} delay={Math.min((i % 3) + 1, 3) as 1 | 2 | 3}>
                <div className="bg-white p-6 sm:p-7 rounded-lg border border-border border-t-[3px] border-t-gold h-full">
                  <h3 className="font-sans text-[16px] sm:text-[17px] font-semibold text-navy mb-2">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-slate-light leading-relaxed">
                    {topic.description}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Featured Guides */}
      {content.downloadableGuides && (
      <section className="bg-white py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6">
        <div className="mx-auto max-w-[800px]">
          <FadeUp>
            <h2 className="section-headline">{content.downloadableGuides.heading}</h2>
          </FadeUp>
          <FadeUp delay={1}>
            <ul className="space-y-3 md:space-y-4">
              {content.downloadableGuides.items.map((item: { title: string; pdfUrl: string } | string, i: number) => {
                const title = typeof item === "string" ? item : item.title;
                const pdfUrl = typeof item === "string" ? "" : item.pdfUrl;
                const icon = (
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-gold shrink-0 stroke-current fill-none stroke-2 [stroke-linecap:round] [stroke-linejoin:round]">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                );
                return (
                  <li key={i}>
                    {pdfUrl ? (
                      <a
                        href={pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 group rounded-lg px-4 py-3 -mx-4 transition-colors hover:bg-cream"
                      >
                        {icon}
                        <span className="flex-1 text-[15px] md:text-base text-slate leading-relaxed group-hover:text-navy transition-colors">
                          {title}
                        </span>
                        <span className="text-xs font-semibold text-gold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                          {content.downloadableGuides?.cta || "View PDF"}
                        </span>
                      </a>
                    ) : (
                      <div className="flex items-center gap-3 px-4 py-3 -mx-4 opacity-60">
                        {icon}
                        <span className="flex-1 text-[15px] md:text-base text-slate leading-relaxed">
                          {title}
                        </span>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </FadeUp>
        </div>
      </section>
      )}

      {/* Short Educational Videos */}
      {content.videos && (
      <section className="bg-cream py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6">
        <div className="mx-auto max-w-[800px]">
          <FadeUp>
            <h2 className="section-headline">{content.videos.heading}</h2>
          </FadeUp>
          <FadeUp delay={1}>
            <ul className="space-y-3 md:space-y-4">
              {content.videos.items.map((item: { title: string; url: string } | string, i: number) => {
                const title = typeof item === "string" ? item : item.title;
                const url = typeof item === "string" ? "" : item.url;
                const icon = (
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-gold shrink-0 stroke-current fill-none stroke-2 [stroke-linecap:round] [stroke-linejoin:round]">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                );
                return (
                  <li key={i}>
                    {url ? (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 group rounded-lg px-4 py-3 -mx-4 transition-colors hover:bg-white/60"
                      >
                        {icon}
                        <span className="flex-1 text-[15px] md:text-base text-slate leading-relaxed group-hover:text-navy transition-colors">
                          {title}
                        </span>
                        <span className="text-xs font-semibold text-gold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                          Watch
                        </span>
                      </a>
                    ) : (
                      <div className="flex items-center gap-3 px-4 py-3 -mx-4 opacity-60">
                        {icon}
                        <span className="flex-1 text-[15px] md:text-base text-slate leading-relaxed">
                          {title}
                        </span>
                        <span className="text-xs text-slate-light italic shrink-0">Coming Soon</span>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </FadeUp>
        </div>
      </section>
      )}

      {/* Important Educational Note */}
      {content.educationalNote && (
      <section className="bg-white py-10 md:py-14 px-4 sm:px-6">
        <div className="mx-auto max-w-[800px]">
          <FadeUp>
            <h3 className="font-sans text-sm md:text-[15px] font-semibold text-navy mb-3">
              Important Educational Note
            </h3>
            {content.educationalNote.split("\n\n").map((p: string, i: number) => (
              <p key={i} className="text-xs md:text-[13px] text-slate-light italic leading-relaxed mb-3 last:mb-0">
                {p}
              </p>
            ))}
          </FadeUp>
        </div>
      </section>
      )}

      {/* Image blocks */}
      {(content as any).imageBlocks?.map((block: any, i: number) => (
        <ImageBlockSection
          key={i}
          image={{ url: block.image, alt: block.alt, caption: block.caption }}
          background={block.background}
        />
      ))}

      {/* Closing Call to Action */}
      {content.closing && (
      <section className="relative bg-linear-[160deg] from-navy to-navy-deep py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6 overflow-hidden">
        <div className="absolute -top-[200px] -right-[200px] w-[500px] h-[500px] border border-gold/[0.06] rounded-full pointer-events-none" />
        <div className="relative z-[1] mx-auto max-w-[800px] text-center">
          <SectionImage image={(content.closing as any).sectionImage}>
          <FadeUp>
            <h2 className="section-headline text-white">{content.closing.heading}</h2>
          </FadeUp>
          {content.closing.paragraphs.map((p: string, i: number) => (
            <FadeUp key={i} delay={1}>
              <p className="text-[15px] sm:text-base md:text-[17px] text-cream/80 leading-[1.8] mb-5 md:mb-6">
                {p}
              </p>
            </FadeUp>
          ))}
          <FadeUp delay={2}>
            <p className="text-[15px] sm:text-base md:text-[17px] text-cream/80 leading-[1.8] mb-6">
              {content.closing.cta.prefix}{" "}
              <Link
                href={content.closing.cta.href}
                className="btn btn-gold inline-block"
              >
                {content.closing.cta.text}
              </Link>
            </p>
          </FadeUp>
          </SectionImage>
        </div>
      </section>
      )}
    </main>
  );
}

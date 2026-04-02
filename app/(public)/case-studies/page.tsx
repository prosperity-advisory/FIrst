import type { Metadata } from "next";
import Link from "next/link";
import { InteriorHero } from "@/components/sections/InteriorHero";
import { ScenarioAccordion } from "@/components/ui/Accordion";
import { FadeUp } from "@/components/ui/FadeUp";
import { CalendlyButton } from "@/components/ui/CalendlyButton";
import { getCaseStudiesContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getCaseStudiesContent();
  return {
    title: content.meta.title,
    description: content.meta.description,
    openGraph: {
      title: content.meta.ogTitle,
      description: content.meta.ogDescription,
    },
  };
}

/* ── helpers ── */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyObj = Record<string, any>;

function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text.split("\n\n").map((p, i) => (
        <p
          key={i}
          className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mb-4 last:mb-0"
        >
          {p}
        </p>
      ))}
    </>
  );
}

function GoldBullet() {
  return (
    <span className="w-[7px] h-[7px] bg-gold rounded-full shrink-0 mt-[9px]" />
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <GoldBullet />
          <span className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8]">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

const sectionPad =
  "py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-24 px-4 sm:px-6";

/* ── Scenario expanded content (rendered inside accordion) ── */
function ScenarioContent({ s }: { s: AnyObj }) {
  return (
    <div className="space-y-8">
      {/* subtitle / subtitleExtra */}
      {(s.subtitle || s.subtitleExtra) && (
        <div className="space-y-2">
          {s.subtitle && (
            <p className="text-sm md:text-[15px] text-slate-light leading-relaxed italic">
              {s.subtitle}
            </p>
          )}
          {s.subtitleExtra && (
            <p className="text-sm md:text-[15px] text-slate-light leading-relaxed italic">
              {s.subtitleExtra}
            </p>
          )}
        </div>
      )}

      {/* introBody */}
      {s.introBody && s.introBody.length > 0 && (
        <div>
          <Paragraphs text={s.introBody} />
        </div>
      )}

      {/* Scenario text */}
      {s.scenario && (
        <div>
          <h4 className="font-serif text-[18px] sm:text-[20px] md:text-[22px] font-semibold text-navy mb-4">
            Scenario
          </h4>
          <Paragraphs text={s.scenario} />
        </div>
      )}

      {/* Concerns */}
      {s.concerns && (
        <div>
          <h4 className="font-serif text-[18px] sm:text-[20px] md:text-[22px] font-semibold text-navy mb-4">
            {s.concerns.heading}
          </h4>
          <BulletList items={s.concerns.items} />
          {s.concerns.footer && (
            <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mt-4 italic">
              {s.concerns.footer}
            </p>
          )}
        </div>
      )}

      {/* Why Complex */}
      {s.whyComplex && (
        <div>
          <h4 className="font-serif text-[18px] sm:text-[20px] md:text-[22px] font-semibold text-navy mb-4">
            {s.whyComplex.heading}
          </h4>
          {s.whyComplex.body && <Paragraphs text={s.whyComplex.body} />}
          {s.whyComplex.items && (
            <div className="mt-4">
              <BulletList items={s.whyComplex.items} />
            </div>
          )}
          {s.whyComplex.footer && (
            <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mt-4 italic">
              {s.whyComplex.footer}
            </p>
          )}
        </div>
      )}

      {/* What Can Go Wrong */}
      {s.whatCanGoWrong && (
        <div>
          <h4 className="font-serif text-[18px] sm:text-[20px] md:text-[22px] font-semibold text-navy mb-4">
            {s.whatCanGoWrong.heading}
          </h4>
          {s.whatCanGoWrong.body && (
            <Paragraphs text={s.whatCanGoWrong.body} />
          )}
          {s.whatCanGoWrong.items && (
            <div className="mt-4">
              <BulletList items={s.whatCanGoWrong.items} />
            </div>
          )}
        </div>
      )}

      {/* Clear Client Objectives */}
      <div>
        <h4 className="font-serif text-[18px] sm:text-[20px] md:text-[22px] font-semibold text-navy mb-4">
          Clear Client Objectives
        </h4>
        {s.objectivesIntro && (
          <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mb-4">
            {s.objectivesIntro}
          </p>
        )}
        {s.objectives && <BulletList items={s.objectives} />}
        {s.objectivesGroups &&
          (s.objectivesGroups as AnyObj[]).map(
            (group: AnyObj, gi: number) => (
              <div key={gi} className="mt-5">
                <h5 className="font-sans text-[15px] sm:text-base font-semibold text-navy mb-3">
                  {group.heading}
                </h5>
                <BulletList items={group.items} />
              </div>
            )
          )}
        {s.objectivesFooter && (
          <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mt-4 italic">
            {s.objectivesFooter}
          </p>
        )}
      </div>

      {/* Planning Considerations */}
      {s.planningConsiderations && (
        <div>
          <h4 className="font-serif text-[18px] sm:text-[20px] md:text-[22px] font-semibold text-navy mb-4">
            Planning Considerations
          </h4>
          <div className="space-y-6">
            {(s.planningConsiderations as AnyObj[]).map(
              (pc: AnyObj, pi: number) => (
                <div key={pi}>
                  {pc.heading && (
                    <h5 className="font-sans text-[15px] sm:text-base font-semibold text-navy mb-2">
                      {pc.heading}
                    </h5>
                  )}
                  {pc.body && <Paragraphs text={pc.body} />}
                  {pc.items && (
                    <div className="mt-3">
                      <BulletList items={pc.items} />
                    </div>
                  )}
                </div>
              )
            )}
          </div>
          {s.planningConsiderationsDisclaimer && (
            <p className="text-sm text-slate-light leading-relaxed mt-4 italic">
              {s.planningConsiderationsDisclaimer}
            </p>
          )}
        </div>
      )}

      {/* Strategies */}
      {s.strategies && (
        <div>
          <h4 className="font-serif text-[18px] sm:text-[20px] md:text-[22px] font-semibold text-navy mb-4">
            Strategies That May Be Evaluated
          </h4>
          <div className="space-y-6">
            {(s.strategies as AnyObj[]).map(
              (st: AnyObj, si: number) => (
                <div key={si}>
                  <h5 className="font-sans text-[15px] sm:text-base font-semibold text-navy mb-2">
                    {st.heading}
                  </h5>
                  {st.body && <Paragraphs text={st.body} />}
                  {st.items && (
                    <div className="mt-3">
                      <BulletList items={st.items} />
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* Phasing Example */}
      {s.phasingExample && (
        <div>
          <h4 className="font-serif text-[18px] sm:text-[20px] md:text-[22px] font-semibold text-navy mb-4">
            {s.phasingExample.heading}
          </h4>
          <BulletList items={s.phasingExample.items} />
        </div>
      )}

      {/* Key Tradeoffs / Important Tradeoffs */}
      {(s.keyTradeoffs || s.importantTradeoffs) && (() => {
        const t = s.keyTradeoffs || s.importantTradeoffs;
        return (
          <div>
            <h4 className="font-serif text-[18px] sm:text-[20px] md:text-[22px] font-semibold text-navy mb-4">
              {t.heading}
            </h4>
            {t.intro && (
              <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mb-4">
                {t.intro}
              </p>
            )}
            <BulletList items={t.items} />
            {t.footer && (
              <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mt-4 italic">
                {t.footer}
              </p>
            )}
          </div>
        );
      })()}

      {/* How We Help */}
      {s.howWeHelp && (
        <div>
          <h4 className="font-serif text-[18px] sm:text-[20px] md:text-[22px] font-semibold text-navy mb-4">
            How We Help
          </h4>
          {s.howWeHelp.intro && <Paragraphs text={s.howWeHelp.intro} />}
          {s.howWeHelp.body && (
            <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mt-4 mb-4">
              {s.howWeHelp.body}
            </p>
          )}
          {/* steps */}
          {s.howWeHelp.steps && (
            <div className="space-y-4 mt-4">
              {(s.howWeHelp.steps as AnyObj[]).map(
                (step: AnyObj, si: number) => (
                  <div key={si}>
                    <h5 className="font-sans text-[15px] sm:text-base font-semibold text-navy mb-1">
                      {step.title}
                    </h5>
                    <Paragraphs text={step.body} />
                  </div>
                )
              )}
            </div>
          )}
          {/* sections */}
          {s.howWeHelp.sections && (
            <div className="space-y-5 mt-4">
              {(s.howWeHelp.sections as AnyObj[]).map(
                (sec: AnyObj, si: number) => (
                  <div key={si}>
                    <h5 className="font-sans text-[15px] sm:text-base font-semibold text-navy mb-2">
                      {sec.heading}
                    </h5>
                    {sec.items && <BulletList items={sec.items} />}
                  </div>
                )
              )}
            </div>
          )}
          {/* items */}
          {s.howWeHelp.items && (
            <div className="mt-4">
              <BulletList items={s.howWeHelp.items} />
            </div>
          )}
          {s.howWeHelp.footer && (
            <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mt-4 italic">
              {s.howWeHelp.footer}
            </p>
          )}
        </div>
      )}

      {/* Key Takeaways */}
      {s.keyTakeaways && (
        <div>
          <h4 className="font-serif text-[18px] sm:text-[20px] md:text-[22px] font-semibold text-navy mb-4">
            Key Takeaways
          </h4>
          <BulletList items={s.keyTakeaways} />
          {s.keyTakeawaysFooter && (
            <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mt-4 italic">
              {s.keyTakeawaysFooter}
            </p>
          )}
        </div>
      )}

      {/* Disclosure */}
      {s.disclosure && (
        <div className="mt-8 pt-6 border-t border-border">
          <h4 className="font-sans text-sm font-semibold text-navy uppercase tracking-[0.1em] mb-3">
            Disclosure
          </h4>
          <Paragraphs text={s.disclosure} />
        </div>
      )}
    </div>
  );
}

/* ── Page ── */
export default async function CaseStudiesPage() {
  const content = await getCaseStudiesContent();
  let sectionIdx = 0;
  const bg = () => (sectionIdx++ % 2 === 0 ? "bg-white" : "bg-cream");

  return (
    <main>
      {/* Hero */}
      <InteriorHero
        eyebrow={content.hero.eyebrow}
        headline={content.hero.headline}
        subtitle={content.hero.subheadline}
        backgroundImage={content.hero.backgroundImage ?? "/images/Planning Scenarios-JPG.JPG"}
      />
      {/* Hero CTA buttons */}
      <section className="relative bg-linear-[160deg] from-navy to-navy-deep text-center px-4 pb-10 sm:pb-12 -mt-1">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <CalendlyButton className="btn btn-gold">
            Schedule Your Free 15-Minute Clarity Session
          </CalendlyButton>
          <Link
            href="#scenarios"
            className="btn btn-outline text-white border-gold hover:bg-gold/10 transition-colors"
          >
            Explore Example Scenarios Below
          </Link>
        </div>
      </section>

      {/* Hero Intro */}
      <section className={`${bg()} ${sectionPad}`}>
        <div className="mx-auto max-w-[900px]">
          {content.heroIntro.paragraphs.map((p: string, i: number) => (
            <FadeUp key={i} delay={(i % 5) as 0 | 1 | 2 | 3 | 4}>
              <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mb-6 last:mb-0">
                {p}
              </p>
            </FadeUp>
          ))}
          <FadeUp delay={2}>
            <p className="text-[17px] sm:text-lg md:text-[19px] text-gold italic font-serif mt-6">
              {content.heroIntro.tagline}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* What You'll See */}
      <section className={`${bg()} ${sectionPad}`}>
        <div className="mx-auto max-w-[900px]">
          <FadeUp>
            <h2 className="font-serif text-[22px] xs:text-[24px] sm:text-[28px] md:text-[32px] font-semibold text-navy mb-6 md:mb-8">
              {content.whatYoullSee.heading}
            </h2>
          </FadeUp>
          <FadeUp delay={1}>
            <BulletList items={content.whatYoullSee.items} />
          </FadeUp>
        </div>
      </section>

      {/* Intro Section */}
      <section className={`${bg()} ${sectionPad}`}>
        <div className="mx-auto max-w-[900px]">
          <FadeUp>
            <h2 className="font-serif text-[22px] xs:text-[24px] sm:text-[28px] md:text-[32px] font-semibold text-navy mb-6 md:mb-8">
              {content.introSection.heading}
            </h2>
          </FadeUp>
          {content.introSection.paragraphs.map((p: string, i: number) => (
            <FadeUp key={i} delay={((i + 1) % 5) as 0 | 1 | 2 | 3 | 4}>
              <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mb-6 last:mb-0">
                {p}
              </p>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* What Designed to Show */}
      <section className={`${bg()} ${sectionPad}`}>
        <div className="mx-auto max-w-[900px]">
          <FadeUp>
            <h2 className="font-serif text-[22px] xs:text-[24px] sm:text-[28px] md:text-[32px] font-semibold text-navy mb-8 md:mb-10">
              {content.whatDesignedToShow.heading}
            </h2>
          </FadeUp>
          <div className="space-y-6 md:space-y-8">
            {content.whatDesignedToShow.items.map(
              (item: { title: string; body: string }, i: number) => (
                <FadeUp
                  key={i}
                  delay={((i + 1) % 5) as 0 | 1 | 2 | 3 | 4}
                >
                  <div>
                    <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8]">
                      <span className="font-semibold text-navy">
                        {item.title}:
                      </span>{" "}
                      {item.body}
                    </p>
                  </div>
                </FadeUp>
              )
            )}
          </div>
        </div>
      </section>

      {/* Planning Process */}
      <section className={`${bg()} ${sectionPad}`}>
        <div className="mx-auto max-w-[900px]">
          <FadeUp>
            <h2 className="font-serif text-[22px] xs:text-[24px] sm:text-[28px] md:text-[32px] font-semibold text-navy mb-2">
              {content.planningProcess.heading}
            </h2>
            <p className="text-[15px] sm:text-base md:text-[17px] text-gold font-medium mb-6 md:mb-8">
              {content.planningProcess.subtitle}
            </p>
          </FadeUp>
          {content.planningProcess.paragraphs.map(
            (p: string, i: number) => (
              <FadeUp key={i} delay={1}>
                <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mb-6 last:mb-0">
                  {p}
                </p>
              </FadeUp>
            )
          )}
          {/* Steps grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-10">
            {content.planningProcess.steps.map(
              (
                step: { number: number; title: string; body: string },
                i: number
              ) => (
                <FadeUp
                  key={i}
                  delay={((i % 3) + 1) as 0 | 1 | 2 | 3 | 4}
                >
                  <div className="text-center sm:text-left">
                    <div className="w-12 h-12 rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center mx-auto sm:mx-0 mb-4">
                      <span className="font-serif text-lg font-bold text-gold">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="font-sans text-base md:text-[17px] font-semibold text-navy mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-[15px] text-slate leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                </FadeUp>
              )
            )}
          </div>
        </div>
      </section>

      {/* Scenarios Intro */}
      <section id="scenarios" className={`${bg()} ${sectionPad}`}>
        <div className="mx-auto max-w-[900px]">
          <FadeUp>
            <h2 className="font-serif text-[22px] xs:text-[24px] sm:text-[28px] md:text-[32px] font-semibold text-navy mb-6 md:mb-8">
              {content.scenariosIntro.heading}
            </h2>
          </FadeUp>
          {content.scenariosIntro.paragraphs.map(
            (p: string, i: number) => (
              <FadeUp key={i} delay={1}>
                <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mb-6 last:mb-0">
                  {p}
                </p>
              </FadeUp>
            )
          )}

          <FadeUp delay={2}>
            <h3 className="font-serif text-[20px] sm:text-[24px] md:text-[28px] font-semibold text-navy mt-10 mb-4">
              {content.scenariosIntro.illustrativeHeading}
            </h3>
          </FadeUp>
          {content.scenariosIntro.illustrativeParagraphs.map(
            (p: string, i: number) => (
              <FadeUp key={i} delay={3}>
                <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mb-6 last:mb-0">
                  {p}
                </p>
              </FadeUp>
            )
          )}

          {/* How to Use */}
          <FadeUp delay={4}>
            <div className="bg-cream rounded-lg border border-border p-6 md:p-8 mt-8">
              <h4 className="font-sans text-base md:text-[17px] font-semibold text-navy mb-4">
                {content.scenariosIntro.howToUse.heading}
              </h4>
              <BulletList items={content.scenariosIntro.howToUse.items} />
              <p className="text-sm text-slate-light leading-relaxed mt-4 italic">
                {content.scenariosIntro.howToUse.disclaimer}
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Quick Links */}
      <section className={`${bg()} ${sectionPad}`}>
        <div className="mx-auto max-w-[900px]">
          <FadeUp>
            <div className="flex flex-wrap gap-3 md:gap-4">
              {content.quickLinks.map(
                (link: { label: string; href: string }, i: number) => (
                  <Link
                    key={i}
                    href={link.href}
                    className="inline-flex items-center gap-2 text-gold font-sans text-[15px] md:text-base font-semibold hover:text-gold-light transition-colors underline underline-offset-4 decoration-gold/40 hover:decoration-gold"
                  >
                    {link.label}
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4 stroke-current fill-none stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
                    >
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </Link>
                )
              )}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Categories & Scenarios */}
      {content.categories.map((category: AnyObj, catIdx: number) => (
        <section
          key={category.id}
          id={category.id}
          className={`${bg()} ${sectionPad}`}
        >
          <div className="mx-auto max-w-[900px]">
            {/* Category header */}
            <FadeUp>
              <h2 className="font-serif text-[22px] xs:text-[24px] sm:text-[28px] md:text-[32px] font-semibold text-navy mb-4 md:mb-6">
                {category.title}
              </h2>
            </FadeUp>
            <FadeUp delay={1}>
              <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mb-4">
                {category.intro}
              </p>
              {category.introExtra && (
                <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mb-8">
                  {category.introExtra}
                </p>
              )}
            </FadeUp>

            {/* Scenarios as accordions */}
            <div className="space-y-4 md:space-y-5">
              {(category.scenarios as AnyObj[]).map(
                (scenario: AnyObj) => (
                  <FadeUp key={scenario.number} delay={1}>
                    <ScenarioAccordion
                      title={`Scenario ${scenario.number}: ${scenario.title}`}
                    >
                      <ScenarioContent s={scenario} />
                    </ScenarioAccordion>
                  </FadeUp>
                )
              )}
            </div>

            {/* Category CTA */}
            <FadeUp delay={2}>
              <div className="mt-10 md:mt-12 bg-cream rounded-lg border border-border p-6 md:p-8">
                <h3 className="font-serif text-[18px] sm:text-[20px] md:text-[22px] font-semibold text-navy mb-3">
                  {category.ctaHeading}
                </h3>
                <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mb-4">
                  {category.ctaBody}
                </p>
                <p className="text-[15px] sm:text-base md:text-[17px] text-navy font-medium mb-5">
                  {category.ctaPrompt}
                </p>
                <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mb-6">
                  {category.ctaText}
                </p>
                <CalendlyButton className="btn btn-gold">
                  Schedule Your Free 15-Minute Clarity Session
                </CalendlyButton>
              </div>
            </FadeUp>
          </div>
        </section>
      ))}

      {/* Who This Is For */}
      <section className={`${bg()} ${sectionPad}`}>
        <div className="mx-auto max-w-[900px]">
          <FadeUp>
            <h2 className="font-serif text-[22px] xs:text-[24px] sm:text-[28px] md:text-[32px] font-semibold text-navy mb-4 md:mb-6">
              {content.whoThisIsFor.heading}
            </h2>
          </FadeUp>
          <FadeUp delay={1}>
            <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mb-6">
              {content.whoThisIsFor.body}
            </p>
            <BulletList items={content.whoThisIsFor.items} />
          </FadeUp>
        </div>
      </section>

      {/* Why Hypothetical */}
      <section className={`${bg()} ${sectionPad}`}>
        <div className="mx-auto max-w-[900px]">
          <FadeUp>
            <h2 className="font-serif text-[22px] xs:text-[24px] sm:text-[28px] md:text-[32px] font-semibold text-navy mb-6 md:mb-8">
              {content.whyHypothetical.heading}
            </h2>
          </FadeUp>
          {content.whyHypothetical.paragraphs.map(
            (p: string, i: number) => (
              <FadeUp
                key={i}
                delay={((i % 4) + 1) as 0 | 1 | 2 | 3 | 4}
              >
                <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mb-6 last:mb-0">
                  {p}
                </p>
              </FadeUp>
            )
          )}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-linear-[160deg] from-navy to-navy-deep py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-24 px-4 sm:px-6">
        <div className="mx-auto max-w-[800px] text-center">
          <FadeUp>
            <div className="space-y-4 md:space-y-5 mb-8 md:mb-10">
              {content.closingCta.paragraphs.map(
                (p: string, i: number) => (
                  <p
                    key={i}
                    className="text-[15px] sm:text-base md:text-[17px] text-cream/90 leading-[1.8]"
                  >
                    {p}
                  </p>
                )
              )}
            </div>
          </FadeUp>
          <FadeUp delay={1}>
            <CalendlyButton className="btn btn-gold">
              {content.closingCta.cta.text}
            </CalendlyButton>
          </FadeUp>
        </div>
      </section>

      {/* Compliance */}
      <section className="bg-cream py-10 sm:py-12 px-4 sm:px-6">
        <div className="mx-auto max-w-[800px]">
          <h3 className="font-sans text-sm font-semibold text-navy uppercase tracking-[0.1em] mb-4">
            {content.compliance.heading}
          </h3>
          {content.compliance.paragraphs.map((p: string, i: number) => (
            <p
              key={i}
              className="text-xs md:text-[13px] text-slate-light leading-relaxed mb-3 last:mb-0"
            >
              {p}
            </p>
          ))}
        </div>
      </section>
    </main>
  );
}

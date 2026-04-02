import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { InteriorHero } from "@/components/sections/InteriorHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Accordion } from "@/components/ui/Accordion";
import { FadeUp } from "@/components/ui/FadeUp";
import { getProcessContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getProcessContent();
  return {
    title: content.meta.title,
    description: content.meta.description,
    openGraph: {
      title: content.meta.ogTitle,
      description: content.meta.ogDescription,
    },
  };
}

interface StepData {
  number: number;
  title: string;
  subtitle: string;
  body: string[];
  listHeading?: string;
  items?: string[];
  whyMatters: string;
  whatYouLeaveWith: string[];
  cta?: string;
}

interface ExpectItem {
  title: string;
  body: string;
}

export default async function ProcessPage() {
  const content = await getProcessContent();

  return (
    <main>
      {/* Hero */}
      <InteriorHero
        eyebrow={content.hero.eyebrow}
        headline={content.hero.headline}
        subtitle={content.hero.subheadline}
        ctaText={content.hero.cta.text}
        backgroundImage={content.hero.backgroundImage ?? "/images/OUR Process replacement- JPG.JPG"}
      />

      {/* Hero extended body */}
      <section className="bg-white py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-24 px-4 sm:px-6">
        <div className="mx-auto max-w-[800px]">
          {content.hero.body.map((p: string, i: number) => (
            <FadeUp key={i} delay={i as 0 | 1}>
              <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mb-6 md:mb-8 last:mb-0">
                {p}
              </p>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Why Our Process Matters */}
      <section className="bg-cream py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6">
        <div className="mx-auto max-w-[800px]">
          <FadeUp>
            <h2 className="section-headline">{content.whyItMatters.heading}</h2>
            <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mb-6 md:mb-8">
              {content.whyItMatters.body}
            </p>
          </FadeUp>

          <FadeUp delay={1}>
            <p className="text-[15px] sm:text-base md:text-[17px] font-medium text-navy mb-4">
              {content.whyItMatters.listHeading}
            </p>
            <ul className="space-y-3 md:space-y-4 mb-8 md:mb-10">
              {content.whyItMatters.items.map((item: string) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-[7px] h-[7px] bg-gold rounded-full shrink-0 mt-[9px]" />
                  <span className="text-[15px] md:text-base text-slate leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </FadeUp>

          {content.whyItMatters.paragraphs.map((p: string, i: number) => (
            <FadeUp key={i} delay={2}>
              <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mb-5 last:mb-0">
                {p}
              </p>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* The Six-Step Roadmap */}
      <section className="bg-white py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6">
        <div className="mx-auto max-w-[800px] text-center">
          <FadeUp>
            <h2 className="section-headline">{content.roadmap.heading}</h2>
            <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mb-3">
              {content.roadmap.subheading}
            </p>
          </FadeUp>

          <FadeUp delay={1}>
            <p className="text-[15px] sm:text-base md:text-[17px] font-semibold text-navy mb-8 md:mb-10">
              A Process Built Around You
            </p>
            <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mb-10 md:mb-12">
              {content.roadmap.intro}
            </p>
          </FadeUp>

          {/* Banner image */}
          <FadeUp delay={2}>
            <div className="relative rounded-xl overflow-hidden shadow-[0_16px_48px_rgba(20,57,43,0.10)] mb-10 md:mb-12">
              <Image
                src={content.roadmap?.image ?? "/images/road to prosperity wide 2.jpg"}
                alt="The road to prosperity — a glowing golden path leading toward a bright horizon"
                width={1200}
                height={480}
                className="w-full h-auto object-cover"
                sizes="(max-width: 800px) 100vw, 800px"
              />
            </div>
          </FadeUp>

          {/* Summary grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5 text-left">
            {content.roadmap.summary.map((step: { number: number; title: string; description: string }, i: number) => (
              <FadeUp key={step.number} delay={Math.min(i % 3 + 1, 3) as 1 | 2 | 3}>
                <div className="bg-cream rounded-lg p-4 md:p-5 h-full">
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-gold flex items-center justify-center mb-3">
                    <span className="font-serif text-lg font-bold text-gold">{step.number}</span>
                  </div>
                  <h3 className="font-sans text-sm md:text-[15px] font-semibold text-navy mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-xs md:text-[13px] text-slate-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Steps */}
      {content.steps.map((step: StepData, i: number) => {
        const isEven = i % 2 === 0;
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
                      Step {step.number}: {step.title}
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
                      Step {step.number}: {step.title}
                    </h2>
                    <p className="text-sm md:text-[15px] text-gold font-semibold">
                      {step.subtitle}
                    </p>
                  </div>
                  {step.body.map((p: string, j: number) => (
                    <p key={j} className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mb-5 md:mb-6">
                      {p}
                    </p>
                  ))}
                </FadeUp>

                {step.listHeading && step.items && step.items.length > 0 && (
                  <FadeUp delay={1}>
                    <p className="text-[15px] sm:text-base md:text-[17px] font-medium text-navy mb-4">
                      {step.listHeading}
                    </p>
                    <ul className="space-y-2.5 mb-5 md:mb-6">
                      {step.items.map((item: string, j: number) => (
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
                  <div className="bg-white rounded-lg border border-border p-5 md:p-6 mb-4">
                    <p className="text-sm md:text-[15px] text-slate-light leading-relaxed">
                      <span className="font-semibold text-navy">Why this matters: </span>
                      {step.whyMatters}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg border border-border p-5 md:p-6">
                    <p className="text-sm md:text-[15px] font-semibold text-navy mb-2">What you leave with:</p>
                    <ul className="space-y-2">
                      {step.whatYouLeaveWith.map((item: string, j: number) => (
                        <li key={j} className="flex items-start gap-3">
                          <span className="w-[6px] h-[6px] bg-gold rounded-full shrink-0 mt-[7px]" />
                          <span className="text-sm md:text-[15px] text-slate leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeUp>

                {step.cta && (
                  <FadeUp delay={3}>
                    <p className="text-[15px] sm:text-base md:text-[17px] text-slate italic leading-[1.8] mt-5">
                      {step.cta}
                    </p>
                  </FadeUp>
                )}
              </div>
            </div>
          </section>
        );
      })}

      {/* Who This Process Is For */}
      <section className="bg-white py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6">
        <div className="mx-auto max-w-[800px]">
          <FadeUp>
            <h2 className="section-headline">{content.whoIsFor.heading}</h2>
            <p className="text-[15px] sm:text-base md:text-[17px] font-medium text-navy mb-4">
              {content.whoIsFor.listHeading}
            </p>
          </FadeUp>
          <FadeUp delay={1}>
            <ul className="space-y-3 md:space-y-4">
              {content.whoIsFor.items.map((item: string) => (
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

      {/* What This Process Can Help You Address */}
      <section className="bg-cream py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6">
        <div className="mx-auto max-w-[800px]">
          <FadeUp>
            <h2 className="section-headline">{content.whatItAddresses.heading}</h2>
            <p className="text-[15px] sm:text-base md:text-[17px] font-medium text-navy mb-4">
              {content.whatItAddresses.listHeading}
            </p>
          </FadeUp>
          <FadeUp delay={1}>
            <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
              {content.whatItAddresses.items.map((item: string) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-[7px] h-[7px] bg-gold rounded-full shrink-0 mt-[9px]" />
                  <span className="text-[15px] md:text-base text-slate leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-[15px] sm:text-base md:text-[17px] text-slate-light italic leading-[1.8]">
              {content.whatItAddresses.footnote}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* What You Can Expect as a Client */}
      <section className="bg-white py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6">
        <div className="mx-auto max-w-[800px]">
          <FadeUp>
            <h2 className="section-headline">{content.whatToExpect.heading}</h2>
          </FadeUp>
          <FadeUp delay={1}>
            <div className="space-y-5 md:space-y-6">
              {content.whatToExpect.items.map((item: ExpectItem) => (
                <div key={item.title} className="bg-cream rounded-lg p-5 md:p-6">
                  <h3 className="font-sans text-[15px] md:text-base font-semibold text-navy mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-[15px] text-slate leading-relaxed">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Your Planning Experience */}
      <section className="bg-cream py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6">
        <div className="mx-auto max-w-[800px]">
          <FadeUp>
            <h2 className="section-headline">{content.planningExperience.heading}</h2>
          </FadeUp>
          {content.planningExperience.paragraphs.map((p: string, i: number) => (
            <FadeUp key={i} delay={1}>
              <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mb-5 last:mb-0">
                {p}
              </p>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6">
        <div className="mx-auto max-w-[800px]">
          <FadeUp>
            <h2 className="section-headline">{content.faq.heading}</h2>
          </FadeUp>
          <FadeUp delay={1}>
            <Accordion items={content.faq.questions} />
          </FadeUp>
        </div>
      </section>

      {/* Closing */}
      <section className="relative bg-linear-[160deg] from-navy to-navy-deep py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6 overflow-hidden">
        <div className="absolute -top-[200px] -right-[200px] w-[500px] h-[500px] border border-gold/[0.06] rounded-full pointer-events-none" />
        <div className="relative z-[1] mx-auto max-w-[800px] text-center">
          <FadeUp>
            <h2 className="section-headline text-white">{content.closing.heading}</h2>
          </FadeUp>
          {content.closing.paragraphs.map((p: string, i: number) => (
            <FadeUp key={i} delay={Math.min(i + 1, 2) as 1 | 2}>
              <p className="text-[15px] sm:text-base md:text-[17px] text-cream/80 leading-[1.8] mb-5 md:mb-6">
                {p}
              </p>
            </FadeUp>
          ))}
          <FadeUp delay={3}>
            <Link href={content.closing.cta.href} className="btn btn-gold">
              {content.closing.cta.text}
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* Compliance */}
      <section className="bg-white py-10 md:py-14 px-4 sm:px-6">
        <div className="mx-auto max-w-[800px]">
          <FadeUp>
            <p className="text-xs md:text-[13px] text-slate-light italic leading-relaxed">
              {content.compliance}
            </p>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}

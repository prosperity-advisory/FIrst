import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/ui/ChatWidget";
import { CalendlyButton } from "@/components/ui/CalendlyButton";
import { IllustrationPreview } from "@/components/affordable-planning/IllustrationPreview";
import { getAffordablePlanningPageContent } from "@/lib/affordable-planning-content";

// Resolve the CMS publication gate per request, not at build time.
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const copy = await getAffordablePlanningPageContent();
  if (!copy) notFound();
  return {
    title: copy.meta.title,
    description: copy.meta.description,
    robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  };
}

function BookingButton({ children, className = "", url }: { children: React.ReactNode; className?: string; url: string }) {
  return (
    <CalendlyButton url={url} className={`btn btn-gold ${className}`}>
      {children}
    </CalendlyButton>
  );
}

export default async function AffordablePlanningPage() {
  const copy = await getAffordablePlanningPageContent();
  if (!copy) notFound();

  return (
    <>
      <Header ctaText="Schedule Clarity Session" ctaMobileText="Schedule Clarity Session" />
      <main className="bg-white text-[#202720]">
        <section id="hero" className="relative overflow-hidden bg-[radial-gradient(ellipse_at_78%_38%,rgba(201,168,76,.14),transparent_34%),radial-gradient(ellipse_at_8%_94%,rgba(31,93,67,.5),transparent_42%),linear-gradient(135deg,#0b2a1e_0%,#0f3d2e_52%,#14392b_100%)] px-4 pb-16 pt-24 text-white sm:px-6 sm:pb-20 sm:pt-28 md:pb-24 md:pt-32 lg:pt-36">
          <div className="mx-auto grid max-w-[1200px] items-center gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
            <div className="order-1">
              <p className="mb-5 max-w-[600px] border-l-4 border-[#F4C050] bg-[#fff7df] px-3 py-2 text-[10px] font-bold uppercase leading-5 tracking-[.11em] text-[#57471e] sm:text-xs">
                {copy.internalNotice}
              </p>
              <p className="mb-5 font-sans text-xs font-semibold uppercase tracking-[.25em] text-[#F4C050] md:text-[13px]">{copy.hero.eyebrow}</p>
              <h1 className="mb-5 max-w-[680px] font-serif text-[32px] font-bold leading-[1.1] text-white xs:text-[38px] sm:text-[44px] md:text-[52px] lg:text-[56px] xl:text-[64px]">
                {copy.hero.title}
              </h1>
              <p className="mb-8 mt-0 max-w-[560px] font-sans text-[15px] font-light leading-relaxed text-[#f5e7bf] xs:text-base sm:text-[17px] md:text-lg">
                {copy.hero.subtitle}
              </p>
              <p className="mb-5 mt-0 max-w-[610px] text-[15px] font-light leading-relaxed text-white/80 xs:text-base sm:text-[17px] md:text-lg">{copy.hero.body}</p>
              <p className="mb-5 mt-0 max-w-[610px] text-[12px] font-light leading-relaxed text-white/65 md:text-[13px]">{copy.hero.firm}</p>
              <div className="mb-4">
                <BookingButton url={copy.hero.ctaHref} className="w-full max-w-[18rem] sm:w-auto sm:max-w-none">{copy.hero.cta}</BookingButton>
              </div>
              <p className="mb-5 mt-0 max-w-[520px] text-[12px] font-light italic leading-relaxed text-white/60 md:text-[13px]">{copy.hero.reassurance}</p>
              <a href="#packages" className="inline-flex min-h-10 items-center text-sm font-medium text-[#F4C050] underline decoration-[#F4C050]/50 underline-offset-4 hover:decoration-[#F4C050]">
                Explore the planning options <span className="ml-2" aria-hidden="true">↓</span>
              </a>
            </div>
            <div className="order-2 lg:pl-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/15 shadow-[0_22px_60px_rgba(0,0,0,.24)] sm:aspect-[16/10]">
                <Image
                  src={copy.hero.image.src}
                  alt={copy.hero.image.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 48vw, (min-width: 640px) 90vw, 100vw"
                  className="object-cover object-center"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0b2a1e]/25 via-transparent to-white/[.04]" />
              </div>
            </div>
          </div>
        </section>

        <section id="why-planning" className="px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
          <div className="mx-auto grid max-w-[1100px] gap-8 md:grid-cols-[.8fr_1.2fr] md:gap-16">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-[#84691c]">Why comprehensive planning</p>
              <h2 className="font-serif text-3xl font-semibold leading-tight text-[#0F3D2E] sm:text-4xl">{copy.why.title}</h2>
            </div>
            <div className="space-y-5 text-base leading-7 text-[#46534b] sm:text-lg sm:leading-8">
              {copy.why.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
        </section>

        <section id="coverage" className="bg-[#f3f6f2] px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-[1120px]">
            <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
              <p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-[#84691c]">{copy.coverage.intro}</p>
              <h2 className="font-serif text-3xl font-semibold text-[#0F3D2E] sm:text-4xl">{copy.coverage.title}</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {copy.coverage.items.map((item, index) => (
                <article key={item.title} className="rounded-xl border border-[#dce3dc] bg-white p-6 sm:p-7">
                  <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#eaf0e9] font-serif text-lg font-semibold text-[#0F3D2E]">0{index + 1}</span>
                  <h3 className="font-serif text-xl font-semibold text-[#0F3D2E]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#536057]">{item.text}</p>
                </article>
              ))}
            </div>
            <p className="mx-auto mt-7 max-w-4xl text-center text-sm leading-6 text-[#68746c]">{copy.coverage.note}</p>
          </div>
        </section>

        <section id="packages" className="px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-[1050px]">
            <div className="mx-auto max-w-2xl text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-[#84691c]">{copy.packages.eyebrow}</p>
              <h2 className="font-serif text-3xl font-semibold leading-tight text-[#0F3D2E] sm:text-4xl">{copy.packages.title}</h2>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 md:gap-6">
              {copy.packages.options.map((option) => (
                <article key={option.name} className="overflow-hidden rounded-2xl border border-[#d9dfda] bg-white p-6 shadow-[0_12px_35px_rgba(15,61,46,.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(15,61,46,.12)] sm:p-8">
                  {option.image && (
                    <div className="relative -mx-6 -mt-6 mb-6 aspect-[16/9] overflow-hidden sm:-mx-8 sm:-mt-8">
                      <Image
                        src={option.image.src}
                        alt={option.image.alt}
                        fill
                        sizes="(min-width: 1024px) 45vw, (min-width: 768px) 48vw, 100vw"
                        className="object-cover object-center"
                      />
                    </div>
                  )}
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <h3 className="max-w-[260px] font-serif text-2xl font-semibold leading-tight text-[#0F3D2E]">{option.name}</h3>
                    <p className="text-right"><span className="block font-serif text-3xl font-bold text-[#0F3D2E]">{option.price}</span><span className="text-xs text-[#66736a]">{option.fee}</span></p>
                  </div>
                  <p className="mt-6 text-sm leading-7 text-[#4d5a51] sm:text-base">{option.text}</p>
                  <p className="mt-4 border-t border-[#e5e9e5] pt-4 text-sm leading-6 text-[#4d5a51]">{option.includes}</p>
                  <p className="mt-6 rounded-md bg-[#fff5d8] px-3 py-2 text-[11px] font-bold uppercase tracking-[.1em] text-[#57471e]">{copy.packages.status}</p>
                </article>
              ))}
            </div>
            <div className="mt-6 rounded-xl border-l-4 border-[#F4C050] bg-[#f7f8f5] px-5 py-5 sm:px-7">
              <h3 className="font-serif text-xl font-semibold text-[#0F3D2E]">{copy.packages.scopeTitle}</h3>
              <p className="mt-2 text-sm leading-6 text-[#536057]">{copy.packages.scopeText}</p>
            </div>
          </div>
        </section>

        <section id="deliverables" className="bg-[#0F3D2E] px-4 py-16 text-white sm:px-6 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-[1120px]">
            <div className="max-w-[900px]">
              <p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-[#F4C050]">What you receive</p>
              <h2 className="font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl">{copy.deliverables.title}</h2>
              <div className="mt-6 space-y-4 text-sm leading-7 text-white/80 sm:text-base max-lg:pr-16">
                {copy.deliverables.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <p className="mt-5 border-l-2 border-[#F4C050] pl-4 text-sm leading-6 text-white/70 max-lg:pr-16">{copy.deliverables.note}</p>
              <div className="mt-5 rounded-lg border border-white/15 bg-white/[.06] px-4 py-4 max-lg:pr-20">
                <p className="text-sm font-semibold text-white">{copy.deliverables.clarification.title}</p>
                <p className="mt-2 text-sm leading-6 text-white/75">{copy.deliverables.clarification.text}</p>
                <p className="mt-3 text-[10px] font-bold uppercase tracking-[.12em] text-[#F4C050]">{copy.deliverables.clarification.approval}</p>
              </div>
            </div>
            <IllustrationPreview illustrations={copy.illustrations} />
          </div>
        </section>

        <section id="process" className="px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-[1100px]">
            <div className="mx-auto max-w-2xl text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-[#84691c]">How the process works</p>
              <h2 className="font-serif text-3xl font-semibold text-[#0F3D2E] sm:text-4xl">{copy.process.title}</h2>
            </div>
            <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {copy.process.steps.map((step, index) => (
                <li key={step.title} className="relative rounded-xl border border-[#dce3dc] bg-white p-5">
                  <span className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#0F3D2E] font-serif text-sm font-bold text-white">{index + 1}</span>
                  <h3 className="font-serif text-lg font-semibold leading-snug text-[#0F3D2E]">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#536057]">{step.text}</p>
                </li>
              ))}
            </ol>
            <p className="mx-auto mt-7 max-w-4xl rounded-lg bg-[#f3f6f2] px-5 py-4 text-center text-sm leading-6 text-[#47564c]">{copy.process.note}</p>
          </div>
        </section>

        <section id="why-prosperity" className="bg-[#f3f6f2] px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
          <div className="mx-auto grid max-w-[1080px] items-center gap-9 md:grid-cols-[.82fr_1.18fr] md:gap-14">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[360px] overflow-hidden rounded-xl border border-[#d9dfda] shadow-[0_18px_45px_rgba(15,61,46,.14)] md:mx-0">
              <Image
                src={copy.prosperity.image}
                alt={copy.prosperity.imageAlt}
                fill
                sizes="(min-width: 768px) 34vw, 90vw"
                className="object-cover object-[50%_35%]"
              />
            </div>
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-[#84691c]">Why Prosperity?</p>
              <h2 className="font-serif text-3xl font-semibold leading-tight text-[#0F3D2E] sm:text-4xl">{copy.prosperity.title}</h2>
              <div className="mt-6 space-y-4 text-base leading-7 text-[#4d5a51]">
                {copy.prosperity.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <p className="mt-5 font-serif text-xl font-semibold text-[#0F3D2E]">{copy.prosperity.closing}</p>
            </div>
          </div>
        </section>

        <section id="faqs" className="px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-[850px]">
            <p className="mb-3 text-center text-xs font-bold uppercase tracking-[.18em] text-[#84691c]">Questions, answered</p>
            <h2 className="text-center font-serif text-3xl font-semibold text-[#0F3D2E] sm:text-4xl">{copy.faqs.title}</h2>
            <div className="mt-8 divide-y divide-[#dce3dc] border-y border-[#dce3dc]">
              {copy.faqs.items.map((item) => (
                <details key={item.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-5 font-semibold text-[#183f31] marker:content-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a88726]">
                    <span>{item.question}</span>
                    <span aria-hidden="true" className="shrink-0 text-xl text-[#84691c] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="max-w-[760px] pt-4 pr-8 text-sm leading-7 text-[#536057] sm:text-base">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="next-step" className="bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,168,76,.16),transparent_48%),linear-gradient(135deg,#0b2a1e_0%,#0f3d2e_58%,#14392b_100%)] px-4 py-16 text-center text-white sm:px-6 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-[760px]">
            <p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-[#F4C050]">Your next step</p>
            <h2 className="font-serif text-3xl font-semibold sm:text-4xl">{copy.finalCta.title}</h2>
            <div className="mx-auto mt-5 max-w-[640px] space-y-3 text-sm leading-7 text-white/80 sm:text-base">
              {copy.finalCta.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="mt-8"><BookingButton url={copy.finalCta.ctaHref} className="w-full sm:w-auto">{copy.finalCta.cta}</BookingButton></div>
            <p className="mt-4 text-sm text-white/65">{copy.finalCta.note}</p>
          </div>
        </section>
      </main>
      <Footer
        disclosures={[copy.disclosures.firm, copy.disclosures.advisory]}
        insuranceDisclaimer={copy.disclosures.insurance}
        linkGroups={copy.disclosures.footer.map((group) => ({ heading: group.heading, links: group.links.map((link) => ({ label: link.label, href: link.href })) }))}
      />
      <ChatWidget tooltipClassName="hidden" />
    </>
  );
}

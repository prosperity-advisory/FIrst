import Link from "next/link";
import { FadeUp } from "@/components/ui/FadeUp";
import { CalendlyButton } from "@/components/ui/CalendlyButton";

interface SecondaryLink {
  text: string;
  href: string;
}

interface Props {
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryLinks?: SecondaryLink[];
  subtext?: string;
  noObligationNote?: string;
  urgencyNote?: string;
}

export function ClarityFinalCta({
  eyebrow,
  headline,
  subheadline,
  ctaText,
  ctaHref,
  secondaryLinks,
  subtext,
  noObligationNote,
  urgencyNote,
}: Props) {
  return (
    <section className="relative bg-linear-[160deg] from-navy to-navy-deep overflow-hidden py-20 md:py-24 lg:py-28 px-4 sm:px-6">
      <div className="hidden lg:block absolute -top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] border border-gold/[0.06] rounded-full pointer-events-none" />
      <div className="hidden lg:block absolute top-[30%] right-[10%] w-2 h-2 border border-gold/30 rotate-45" />
      <div className="hidden lg:block absolute bottom-[20%] left-[12%] w-3 h-3 border border-gold/25 rounded-full" />

      <div className="relative z-[2] mx-auto max-w-[800px] text-center">
        <FadeUp>
          {eyebrow && (
            <p className="font-sans text-xs md:text-[13px] font-semibold tracking-[0.25em] uppercase text-gold mb-5">
              {eyebrow}
            </p>
          )}
          <h2 className="font-serif text-[30px] sm:text-[36px] md:text-[44px] lg:text-[52px] font-bold text-white leading-tight mb-5">
            {headline}
          </h2>
          {subheadline && (
            <p className="text-[15px] md:text-[17px] lg:text-lg font-light text-cream/85 leading-relaxed max-w-[640px] mx-auto mb-9">
              {subheadline}
            </p>
          )}

          {ctaText && (
            <div className="mb-6">
              <CalendlyButton
                url={ctaHref || undefined}
                className="btn btn-gold px-8 py-4 text-base md:text-lg"
              >
                {ctaText}
              </CalendlyButton>
            </div>
          )}

          {secondaryLinks && secondaryLinks.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-8">
              {secondaryLinks.map((l, i) => (
                <Link
                  key={i}
                  href={l.href}
                  className="text-sm font-semibold text-cream/80 hover:text-gold transition-colors underline-offset-4 hover:underline"
                >
                  {l.text}
                </Link>
              ))}
            </div>
          )}

          {subtext && (
            <p className="text-[13px] md:text-[14px] text-cream/65 leading-relaxed max-w-[620px] mx-auto mb-5">
              {subtext}
            </p>
          )}

          {(noObligationNote || urgencyNote) && (
            <div className="pt-5 border-t border-white/10 max-w-[580px] mx-auto space-y-1.5">
              {noObligationNote && (
                <p className="text-[12px] md:text-[13px] text-cream/55">
                  {noObligationNote}
                </p>
              )}
              {urgencyNote && (
                <p className="text-[12px] md:text-[13px] text-cream/50 italic">
                  {urgencyNote}
                </p>
              )}
            </div>
          )}
        </FadeUp>
      </div>
    </section>
  );
}

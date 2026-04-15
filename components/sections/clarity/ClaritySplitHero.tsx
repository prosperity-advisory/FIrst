import Image from "next/image";
import { CalendlyButton } from "@/components/ui/CalendlyButton";

interface Props {
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  ctaText?: string;
  ctaHref?: string;
  ctaMicrocopy?: string;
  qualificationLine?: string;
  secondaryLinkText?: string;
  secondaryLinkHref?: string;
  image: string;
  imageAlt?: string;
  trustItems?: { text: string }[];
}

export function ClaritySplitHero({
  eyebrow,
  headline,
  subheadline,
  ctaText,
  ctaHref,
  ctaMicrocopy,
  qualificationLine,
  secondaryLinkText,
  secondaryLinkHref,
  image,
  imageAlt,
  trustItems,
}: Props) {
  return (
    <section className="relative bg-linear-[160deg] from-navy to-navy-deep overflow-hidden px-4 pt-[112px] pb-14 sm:px-6 sm:pt-[132px] sm:pb-16 md:pt-[140px] md:pb-20 lg:pt-[160px] lg:pb-24">
      {/* Decorative rings */}
      <div className="hidden lg:block absolute -top-[15%] -right-[10%] w-[600px] h-[600px] border border-gold/[0.07] rounded-full pointer-events-none" />
      <div className="hidden lg:block absolute -bottom-[20%] -left-[8%] w-[500px] h-[500px] border border-gold/[0.05] rounded-full pointer-events-none" />
      <div className="hidden lg:block absolute top-[18%] left-[45%] w-2 h-2 border border-gold/30 rotate-45" />

      <div className="relative z-[2] mx-auto max-w-[1200px] grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-center">
        {/* Text */}
        <div className="order-2 lg:order-1 animate-[heroFadeIn_0.8s_ease_0.2s_both] opacity-0">
          {eyebrow && (
            <p className="font-sans text-xs md:text-[13px] font-semibold tracking-[0.25em] uppercase text-gold mb-5">
              {eyebrow}
            </p>
          )}
          <h1 className="font-serif text-[32px] xs:text-[38px] sm:text-[44px] md:text-[52px] lg:text-[56px] xl:text-[64px] font-bold text-white leading-[1.1] mb-5">
            {headline}
          </h1>
          {subheadline && (
            <p className="text-[15px] xs:text-base sm:text-[17px] md:text-lg font-light text-cream/85 leading-relaxed max-w-[560px] mb-8">
              {subheadline}
            </p>
          )}

          {ctaText && (
            <div className="mb-4">
              <CalendlyButton
                url={ctaHref || undefined}
                className="btn btn-gold"
              >
                {ctaText}
              </CalendlyButton>
            </div>
          )}

          {ctaMicrocopy && (
            <p className="text-[12px] md:text-[13px] text-cream/60 leading-relaxed max-w-[520px] mb-3 italic">
              {ctaMicrocopy}
            </p>
          )}

          {qualificationLine && (
            <p className="text-[12px] md:text-[13px] text-cream/55 leading-relaxed max-w-[520px] mb-5">
              {qualificationLine}
            </p>
          )}

          {secondaryLinkText && secondaryLinkHref && (
            <a
              href={secondaryLinkHref}
              className="inline-flex items-center gap-1.5 text-sm text-gold hover:text-gold-light transition-colors font-medium"
            >
              {secondaryLinkText}
              <span aria-hidden>→</span>
            </a>
          )}

          {trustItems && trustItems.length > 0 && (
            <div className="mt-10 pt-6 border-t border-white/10">
              <ul className="flex flex-wrap gap-x-5 gap-y-2.5 text-[12px] md:text-[13px] text-cream/70">
                {trustItems.map((t, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold/70" />
                    {t.text}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Image */}
        <div className="order-1 lg:order-2 relative animate-[heroFadeIn_0.8s_ease_0.4s_both] opacity-0">
          <div className="relative aspect-[5/4] sm:aspect-[4/3] lg:aspect-[4/5] max-w-[520px] mx-auto">
            {/* Gold frame accent */}
            <div className="hidden sm:block absolute -top-4 -right-4 w-full h-full border-2 border-gold/40 rounded-lg pointer-events-none" />
            <div className="relative w-full h-full rounded-lg overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
              <Image
                src={image}
                alt={imageAlt || ""}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 520px, 100vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


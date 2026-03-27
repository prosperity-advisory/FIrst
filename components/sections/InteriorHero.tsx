interface InteriorHeroProps {
  eyebrow?: string;
  headline: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
}

export function InteriorHero({
  eyebrow,
  headline,
  subtitle,
  ctaText,
  ctaHref = "https://calendly.com/prosperityplanningandadvisory/clarity-session",
}: InteriorHeroProps) {
  return (
    <section className="relative bg-linear-[160deg] from-navy to-navy-deep overflow-hidden text-center px-4 pt-[120px] pb-12 sm:px-6 sm:pt-[140px] sm:pb-14 md:pt-[150px] md:pb-16 lg:pt-[160px] lg:pb-20">
      {/* Decorative circle — desktop only */}
      <div className="hidden lg:block absolute -top-[15%] -right-[8%] w-[450px] h-[450px] border border-gold/[0.07] rounded-full pointer-events-none" />

      <div className="relative z-[2] mx-auto max-w-[800px]">
        {eyebrow && (
          <p className="font-sans text-xs md:text-[13px] font-semibold tracking-[0.25em] uppercase text-gold mb-4 animate-[heroFadeIn_0.8s_ease_0.2s_both] opacity-0">
            {eyebrow}
          </p>
        )}
        <h1
          className="font-serif text-[30px] xs:text-[34px] sm:text-[40px] md:text-[clamp(40px,5vw,50px)] lg:text-[clamp(44px,4.5vw,56px)] font-bold text-white leading-[1.15] animate-[heroFadeIn_0.8s_ease_0.35s_both] opacity-0"
          dangerouslySetInnerHTML={{ __html: headline }}
        />
        {subtitle && (
          <p className="text-[15px] xs:text-base sm:text-[17px] md:text-lg font-light text-cream/85 leading-relaxed max-w-[640px] mx-auto mt-4 sm:mt-5 animate-[heroFadeIn_0.8s_ease_0.5s_both] opacity-0">
            {subtitle}
          </p>
        )}
        {ctaText && (
          <a
            href={ctaHref}
            className="btn btn-gold mt-7 sm:mt-8 animate-[heroFadeIn_0.8s_ease_0.65s_both] opacity-0"
          >
            {ctaText}
          </a>
        )}
      </div>
    </section>
  );
}

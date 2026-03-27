interface HeroSectionProps {
  eyebrow: string;
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaHref?: string;
}

export function HeroSection({
  eyebrow,
  headline,
  subheadline,
  ctaText,
  ctaHref = "https://calendly.com/prosperityplanningandadvisory/clarity-session",
}: HeroSectionProps) {
  return (
    <section className="relative min-h-dvh flex items-center justify-center bg-linear-[160deg] from-navy to-navy-deep overflow-hidden text-center px-4 pt-[88px] pb-14 sm:px-6 sm:pt-[100px] sm:pb-16 md:pt-[100px] md:pb-[72px] lg:pt-[120px] lg:pb-20">
      {/* Decorative circles — desktop only */}
      <div className="hidden lg:block absolute -top-[10%] -right-[5%] w-[500px] h-[500px] xl:w-[600px] xl:h-[600px] border border-gold/[0.08] rounded-full pointer-events-none" />
      <div className="hidden lg:block absolute -bottom-[15%] -left-[8%] w-[650px] h-[650px] xl:w-[800px] xl:h-[800px] border border-gold/[0.06] rounded-full pointer-events-none" />

      {/* Decorative lines — desktop only */}
      <div className="hidden lg:block absolute top-[20%] right-[12%] w-[180px] xl:w-[200px] h-px bg-linear-to-r from-transparent via-gold/20 to-transparent -rotate-[30deg]" />
      <div className="hidden lg:block absolute bottom-[25%] left-[8%] w-[140px] xl:w-[150px] h-px bg-linear-to-r from-transparent via-gold/15 to-transparent rotate-[20deg]" />

      {/* Decorative shapes — desktop only */}
      <div className="hidden lg:block absolute top-[15%] left-[20%] w-2 h-2 border border-gold/20 rotate-45" />
      <div className="hidden lg:block absolute bottom-[30%] right-[20%] w-3 h-3 border border-gold/15 rounded-full" />

      <div className="relative z-[2] max-w-[800px] 2xl:max-w-[860px]">
        <p className="font-sans text-xs md:text-[13px] font-semibold tracking-[0.25em] uppercase text-gold mb-5 xl:mb-7 animate-[heroFadeIn_0.8s_ease_0.3s_both] opacity-0">
          {eyebrow}
        </p>
        <h1
          className="font-serif text-[32px] xs:text-[38px] sm:text-[44px] md:text-[clamp(44px,6vw,56px)] lg:text-[clamp(48px,5.5vw,64px)] xl:text-[clamp(56px,5vw,72px)] font-bold text-white mb-5 xl:mb-6 leading-[1.12] animate-[heroFadeIn_0.8s_ease_0.5s_both] opacity-0"
          dangerouslySetInnerHTML={{ __html: headline }}
        />
        <p className="text-[15px] xs:text-base sm:text-[17px] md:text-lg lg:text-[19px] xl:text-xl font-light text-cream leading-relaxed max-w-[640px] mx-auto mb-9 sm:mb-10 xl:mb-11 animate-[heroFadeIn_0.8s_ease_0.7s_both] opacity-0">
          {subheadline}
        </p>
        <a
          href={ctaHref}
          className="btn btn-gold animate-[heroFadeIn_0.8s_ease_0.9s_both] opacity-0"
        >
          {ctaText}
        </a>
      </div>

      {/* Scroll indicator — tablet+ */}
      <div className="hidden md:block absolute bottom-9 left-1/2 -translate-x-1/2 animate-[heroFadeIn_0.8s_ease_1.2s_both] opacity-0">
        <div className="w-px h-12 bg-linear-to-b from-gold/50 to-transparent mx-auto" />
      </div>
    </section>
  );
}

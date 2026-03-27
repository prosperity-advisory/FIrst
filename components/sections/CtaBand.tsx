interface CtaBandProps {
  headline?: string;
  subtext?: string;
  ctaText?: string;
  ctaHref?: string;
}

export function CtaBand({
  headline = "Create Your Financial Plan With Us",
  subtext = "No question is too small when it comes to your future. Talk to an adviser today and make confident financial decisions.",
  ctaText = "Schedule Your Complimentary Strategy Review \u2192",
  ctaHref = "https://calendly.com/prosperityplanningandadvisory/clarity-session",
}: CtaBandProps) {
  return (
    <section className="bg-linear-to-br from-gold to-gold-light py-12 md:py-16 lg:py-[clamp(56px,6vw,88px)] px-4 md:px-6 text-center">
      <div className="mx-auto max-w-[680px]">
        <h2 className="font-serif text-[24px] xs:text-[26px] sm:text-[30px] md:text-[34px] lg:text-[38px] xl:text-[42px] text-navy mb-3.5">
          {headline}
        </h2>
        <p className="text-[15px] md:text-base lg:text-[17px] text-navy/80 mb-7 md:mb-9 leading-relaxed">
          {subtext}
        </p>
        <a href={ctaHref} className="btn btn-navy">
          {ctaText}
        </a>
      </div>
    </section>
  );
}

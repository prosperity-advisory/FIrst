import { FadeUp } from "@/components/ui/FadeUp";
import { CalendlyButton } from "@/components/ui/CalendlyButton";

interface AdvancedStrategiesProps {
  eyebrow: string;
  headline: string;
  subtitle: string;
  strategies: [string[], string[]];
  disclaimer: string;
  ctaText: string;
  ctaHref?: string;
}

export function AdvancedStrategies({
  eyebrow,
  headline,
  subtitle,
  strategies,
  disclaimer,
  ctaText,
  ctaHref = "https://calendly.com/prosperityplanningandadvisory/clarity-session",
}: AdvancedStrategiesProps) {
  return (
    <section className="relative bg-linear-[160deg] from-navy to-navy-deep py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6 overflow-hidden">
      {/* Decorative circle */}
      <div className="absolute -top-[200px] -right-[200px] w-[500px] h-[500px] border border-gold/[0.06] rounded-full pointer-events-none" />

      <div className="relative z-[1] mx-auto max-w-[1200px]">
        <FadeUp>
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="section-headline text-white">{headline}</h2>
          <p className="text-base sm:text-[17px] lg:text-lg text-cream/80 max-w-[600px] mb-9 md:mb-12 leading-relaxed">
            {subtitle}
          </p>
        </FadeUp>

        <FadeUp delay={1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-6 lg:gap-10 xl:gap-14 mb-8 md:mb-8">
            {strategies.map((column, colIdx) => (
              <div key={colIdx}>
                {column.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3.5 py-3.5 md:py-4 border-b border-white/[0.08]"
                  >
                    <span className="w-[7px] h-[7px] bg-gold rounded-full shrink-0" />
                    <span className="text-[15px] md:text-base text-white/90">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={2}>
          <p className="text-xs md:text-[13px] text-slate-light leading-relaxed max-w-[720px] mb-7 italic">
            {disclaimer}
          </p>
          <CalendlyButton url={ctaHref} className="btn btn-gold">
            {ctaText}
          </CalendlyButton>
        </FadeUp>
      </div>
    </section>
  );
}

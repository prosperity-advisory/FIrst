import Image from "next/image";
import Link from "next/link";
import { FadeUp } from "@/components/ui/FadeUp";
import { CalendlyButton } from "@/components/ui/CalendlyButton";

interface ProcessStep {
  title: string;
  description: string;
}

interface ProcessSectionProps {
  eyebrow: string;
  headline: string;
  subtitle: string;
  steps: ProcessStep[];
  ctaText: string;
  ctaHref?: string;
  bannerImage?: string;
  bannerAlt?: string;
}

export function ProcessSection({
  eyebrow,
  headline,
  subtitle,
  steps,
  ctaText,
  ctaHref = "https://calendly.com/prosperityplanningandadvisory/clarity-session",
  bannerImage,
  bannerAlt = "The six-step financial planning process",
}: ProcessSectionProps) {
  return (
    <section className="bg-white py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6">
      <div className="mx-auto max-w-[1200px] text-center">
        <FadeUp>
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="section-headline">{headline}</h2>
          <p className="section-sub mx-auto mb-10 sm:mb-12 lg:mb-14">
            {subtitle}
          </p>
        </FadeUp>

        {bannerImage && (
          <FadeUp delay={1}>
            <div className="relative rounded-xl overflow-hidden shadow-[0_16px_48px_rgba(20,57,43,0.10)] mb-10 sm:mb-12 lg:mb-14 max-w-[900px] mx-auto max-h-[180px] xs:max-h-[220px] sm:max-h-[280px] md:max-h-[340px] lg:max-h-none">
              <Image
                src={bannerImage}
                alt={bannerAlt}
                width={1024}
                height={377}
                className="w-full h-full object-cover"
                sizes="(max-width: 768px) 100vw, 900px"
              />
            </div>
          </FadeUp>
        )}

        {/* Process grid with connector line */}
        <div className="relative grid grid-cols-2 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 xs:gap-5 md:gap-7 lg:gap-5 xl:gap-6 mb-10 md:mb-12 lg:mb-14">
          {/* Connector line — desktop only */}
          <div className="hidden lg:block absolute top-[30px] left-[8%] right-[8%] h-px bg-border z-0" />

          {steps.map((step, i) => {
            const delayGroup = Math.floor(i / 2) + 1;
            return (
              <FadeUp
                key={step.title}
                delay={delayGroup as 1 | 2 | 3}
                className="relative z-[1] text-center group"
              >
                {/* Numbered circle */}
                <div className="w-12 h-12 xs:w-14 xs:h-14 md:w-[60px] md:h-[60px] xl:w-16 xl:h-16 rounded-full bg-white border-2 border-gold flex items-center justify-center mx-auto mb-3.5 md:mb-[18px] xl:mb-5 transition-all duration-300 group-hover:bg-gold group-hover:text-white">
                  <span className="font-serif text-xl md:text-[21px] xl:text-[22px] font-bold text-gold group-hover:text-white transition-colors duration-300">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-sans text-[15px] xl:text-base font-semibold text-navy mb-1.5">
                  {step.title}
                </h3>
                <p className="text-[13px] xl:text-sm text-slate-light leading-relaxed">
                  {step.description}
                </p>
              </FadeUp>
            );
          })}
        </div>

        <FadeUp>
          {ctaHref.includes("calendly.com") ? (
            <CalendlyButton url={ctaHref} className="btn btn-gold">
              {ctaText}
            </CalendlyButton>
          ) : (
            <Link href={ctaHref} className="btn btn-gold">
              {ctaText}
            </Link>
          )}
        </FadeUp>
      </div>
    </section>
  );
}

import Link from "next/link";
import { FadeUp } from "@/components/ui/FadeUp";

interface ServiceCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

interface ServicesGridProps {
  eyebrow: string;
  headline: string;
  services: ServiceCard[];
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-3.5 h-3.5 stroke-current fill-none stroke-2 transition-transform duration-300 group-hover:translate-x-1"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

export function ServicesGrid({
  eyebrow,
  headline,
  services,
}: ServicesGridProps) {
  return (
    <section className="bg-cream py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6">
      <div className="mx-auto max-w-[1200px] text-center">
        <FadeUp>
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="section-headline">{headline}</h2>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-7 text-left mt-10 sm:mt-10 md:mt-10">
          {services.map((service, i) => {
            const delayGroup = ((i % 3) + 1) as 1 | 2 | 3;
            return (
              <FadeUp key={service.title} delay={delayGroup} className="group">
                <div className="bg-white p-5 xs:p-6 sm:p-7 lg:p-10 2xl:p-11 rounded-lg border border-border border-t-[3px] border-t-transparent transition-all duration-[400ms] hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(20,57,43,0.1)] hover:border-t-gold">
                  {/* Icon */}
                  <div className="w-12 h-12 lg:w-[52px] lg:h-[52px] rounded-[10px] bg-linear-to-br from-gold/10 to-gold/5 flex items-center justify-center mb-[18px] lg:mb-6">
                    <span className="w-6 h-6 lg:w-[26px] lg:h-[26px] text-gold [&>svg]:w-full [&>svg]:h-full [&>svg]:stroke-current [&>svg]:fill-none [&>svg]:stroke-[1.8] [&>svg]:[stroke-linecap:round] [&>svg]:[stroke-linejoin:round]">
                      {service.icon}
                    </span>
                  </div>

                  <h3 className="font-sans text-[17px] sm:text-lg lg:text-[19px] font-semibold text-navy mb-2.5">
                    {service.title}
                  </h3>
                  <p className="text-sm lg:text-[15px] text-slate-light leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold transition-colors duration-300 hover:text-gold-light"
                  >
                    Learn More
                    <ArrowIcon />
                  </Link>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}

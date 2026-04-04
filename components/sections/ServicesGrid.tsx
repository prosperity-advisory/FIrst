import Link from "next/link";
import { FadeUp } from "@/components/ui/FadeUp";
import { CtaButtonGroup, type CtaButton } from "@/components/ui/CtaButtonGroup";

interface ServiceItem {
  title: string;
  description: string;
}

interface ServiceCategory {
  title: string;
  description: string;
  href: string;
  items: ServiceItem[];
}

interface ServicesGridProps {
  eyebrow: string;
  headline: string;
  body: string;
  categories: ServiceCategory[];
  nextSteps?: string;
  ctaButtons?: CtaButton[];
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

const DEFAULT_CTA_BUTTONS: CtaButton[] = [
  { text: "Explore Planning Examples →", href: "/case-studies", style: "gold" },
];

export function ServicesGrid({
  eyebrow,
  headline,
  body,
  categories,
  nextSteps,
  ctaButtons,
}: ServicesGridProps) {
  const buttons = ctaButtons?.length ? ctaButtons : DEFAULT_CTA_BUTTONS;
  return (
    <section className="bg-cream py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6">
      <div className="mx-auto max-w-[1200px] text-center">
        <FadeUp>
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="section-headline">{headline}</h2>
          <p className="text-base sm:text-[17px] lg:text-lg text-slate max-w-[700px] mx-auto leading-[1.8] mb-10 md:mb-12">
            {body}
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 lg:gap-7 text-left">
          {categories.map((category, i) => {
            const delayGroup = ((i % 2) + 1) as 1 | 2;
            return (
              <FadeUp key={category.title} delay={delayGroup} className="group">
                <div className="bg-white p-6 sm:p-7 lg:p-9 rounded-lg border border-border border-t-[3px] border-t-transparent transition-all duration-[400ms] hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(20,57,43,0.1)] hover:border-t-gold h-full flex flex-col">
                  <h3 className="font-serif text-[19px] sm:text-[21px] lg:text-[23px] font-semibold text-navy mb-2.5">
                    {category.title}
                  </h3>
                  <p className="text-sm lg:text-[15px] text-slate leading-relaxed mb-5 lg:mb-6">
                    {category.description}
                  </p>

                  <div className="space-y-3 mb-5 lg:mb-6 flex-1">
                    {category.items.map((item) => (
                      <div key={item.title} className="flex items-start gap-3">
                        <span className="w-[6px] h-[6px] bg-gold rounded-full shrink-0 mt-[7px]" />
                        <div>
                          <span className="text-[14px] lg:text-[15px] font-semibold text-navy">
                            {item.title}
                          </span>
                          <p className="text-[13px] lg:text-sm text-slate-light leading-relaxed mt-0.5">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={category.href}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold transition-colors duration-300 hover:text-gold-light mt-auto"
                  >
                    Learn More
                    <ArrowIcon />
                  </Link>
                </div>
              </FadeUp>
            );
          })}
        </div>

        {nextSteps && (
          <FadeUp delay={3}>
            <p className="text-base sm:text-[17px] text-slate leading-[1.8] mt-10 md:mt-12 max-w-[700px] mx-auto">
              {nextSteps}
            </p>
          </FadeUp>
        )}

        <FadeUp delay={4}>
          <CtaButtonGroup buttons={buttons} className="justify-center mt-8 md:mt-10" />
        </FadeUp>
      </div>
    </section>
  );
}

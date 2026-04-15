import Link from "next/link";
import { FadeUp } from "@/components/ui/FadeUp";

interface Service {
  title: string;
  body?: string;
}

interface Props {
  eyebrow?: string;
  headline: string;
  services?: Service[];
  linkText?: string;
  linkHref?: string;
}

export function ClarityServicesOverview({ eyebrow, headline, services, linkText, linkHref }: Props) {
  return (
    <section className="bg-white py-16 md:py-20 lg:py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-[1200px]">
        <FadeUp>
          <div className="text-center max-w-[780px] mx-auto mb-10 md:mb-14">
            {eyebrow && (
              <p className="font-sans text-xs md:text-[13px] font-semibold tracking-[0.25em] uppercase text-gold mb-3">
                {eyebrow}
              </p>
            )}
            <h2 className="font-serif text-[28px] sm:text-[32px] md:text-[38px] lg:text-[42px] font-bold text-navy leading-tight">
              {headline}
            </h2>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {services?.map((s, i) => (
            <FadeUp key={i} delay={(Math.min(i % 3, 2) as 0 | 1 | 2)}>
              <div className="h-full bg-cream rounded-xl p-6 md:p-7 border border-transparent hover:border-gold/40 transition-colors duration-300">
                <div className="w-10 h-0.5 bg-gold mb-4" />
                <h3 className="font-serif text-[18px] md:text-[20px] font-bold text-navy mb-2 leading-snug">
                  {s.title}
                </h3>
                {s.body && (
                  <p className="text-[14px] md:text-[15px] text-slate leading-relaxed">
                    {s.body}
                  </p>
                )}
              </div>
            </FadeUp>
          ))}
        </div>

        {linkText && linkHref && (
          <div className="text-center mt-10">
            <Link
              href={linkHref}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-light transition-colors"
            >
              {linkText}
              <span aria-hidden>→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

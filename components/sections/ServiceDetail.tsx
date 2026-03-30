import Link from "next/link";
import { FadeUp } from "@/components/ui/FadeUp";

interface Subsection {
  heading: string;
  body?: string;
  bodyExtra?: string;
  bodyExtra2?: string;
  items?: string[];
  disclaimer?: string;
  ctaText?: string;
  ctaHref?: string;
}

interface ServiceDetailProps {
  id?: string;
  heading: string;
  body: string;
  bodyExtra?: string;
  items?: string[];
  outro?: string;
  disclaimers?: string[];
  ctaText?: string;
  ctaHref?: string;
  subsections?: Subsection[];
  planningAreasHeading?: string;
  planningAreas?: string[];
  transition?: string;
  variant?: "white" | "cream";
}

export function ServiceDetail({
  id,
  heading,
  body,
  bodyExtra,
  items,
  outro,
  disclaimers,
  ctaText,
  ctaHref,
  subsections,
  planningAreasHeading,
  planningAreas,
  transition,
  variant = "white",
}: ServiceDetailProps) {
  const bg = variant === "cream" ? "bg-cream" : "bg-white";

  return (
    <section
      id={id}
      className={`${bg} py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6`}
    >
      <div className="mx-auto max-w-[800px]">
        <FadeUp>
          <h2 className="font-serif text-[24px] xs:text-[26px] sm:text-[30px] md:text-[34px] lg:text-[38px] font-semibold text-navy mb-5 md:mb-6">
            {heading}
          </h2>
        </FadeUp>

        <FadeUp delay={1}>
          <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mb-6 md:mb-8">
            {body}
          </p>
        </FadeUp>

        {bodyExtra && (
          <FadeUp delay={1}>
            <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mb-6 md:mb-8">
              {bodyExtra}
            </p>
          </FadeUp>
        )}

        {items && items.length > 0 && (
          <FadeUp delay={2}>
            <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-[7px] h-[7px] bg-gold rounded-full shrink-0 mt-[9px]" />
                  <span className="text-[15px] md:text-base text-slate leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </FadeUp>
        )}

        {subsections && subsections.length > 0 && (
          <div className="space-y-10 md:space-y-12 mb-8 md:mb-10">
            {subsections.map((sub, idx) => (
              <FadeUp key={sub.heading} delay={idx < 4 ? 2 : 0}>
                <div>
                  <h3 className="font-sans text-lg md:text-[19px] font-semibold text-navy mb-3">
                    {sub.heading}
                  </h3>
                  {sub.body && (
                    <p className="text-[15px] md:text-base text-slate leading-[1.8] mb-3">
                      {sub.body}
                    </p>
                  )}
                  {sub.bodyExtra && (
                    <p className="text-[15px] md:text-base text-slate leading-[1.8] mb-3">
                      {sub.bodyExtra}
                    </p>
                  )}
                  {sub.bodyExtra2 && (
                    <p className="text-[15px] md:text-base text-slate leading-[1.8] mb-3">
                      {sub.bodyExtra2}
                    </p>
                  )}
                  {sub.items && (
                    <ul className="space-y-2.5">
                      {sub.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="w-[6px] h-[6px] bg-gold rounded-full shrink-0 mt-[9px]" />
                          <span className="text-[15px] md:text-base text-slate leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {sub.ctaText && sub.ctaHref && (
                    <Link
                      href={sub.ctaHref}
                      className="inline-flex items-center text-gold font-semibold text-[15px] md:text-base hover:text-gold-light transition-colors mt-3"
                    >
                      → {sub.ctaText}
                    </Link>
                  )}
                  {sub.disclaimer && (
                    <p className="text-xs md:text-[13px] text-slate-light italic leading-relaxed mt-3">
                      Note: {sub.disclaimer}
                    </p>
                  )}
                </div>
              </FadeUp>
            ))}
          </div>
        )}

        {planningAreasHeading && planningAreas && planningAreas.length > 0 && (
          <FadeUp delay={3}>
            <div className="mb-6 md:mb-8">
              <p className="text-[15px] sm:text-base md:text-[17px] font-semibold text-navy mb-4">
                {planningAreasHeading}
              </p>
              <ul className="space-y-3 md:space-y-4">
                {planningAreas.map((area, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-[7px] h-[7px] bg-gold rounded-full shrink-0 mt-[9px]" />
                    <span className="text-[15px] md:text-base text-slate leading-relaxed">
                      {area}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        )}

        {outro && (
          <FadeUp delay={3}>
            <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mb-6 md:mb-8">
              {outro}
            </p>
          </FadeUp>
        )}

        {disclaimers && disclaimers.length > 0 && (
          <div className="space-y-2 mb-6 md:mb-8">
            {disclaimers.map((d, i) => (
              <p
                key={i}
                className="text-xs md:text-[13px] text-slate-light italic leading-relaxed"
              >
                {d}
              </p>
            ))}
          </div>
        )}

        {transition && (
          <FadeUp>
            <p className="text-[15px] sm:text-base md:text-[17px] text-slate-light italic leading-[1.8] mt-6">
              {transition}
            </p>
          </FadeUp>
        )}

        {ctaText && ctaHref && (
          <FadeUp>
            <Link href={ctaHref} className="btn btn-gold">
              {ctaText}
            </Link>
          </FadeUp>
        )}
      </div>
    </section>
  );
}

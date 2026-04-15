import Image from "next/image";
import Link from "next/link";
import { FadeUp } from "@/components/ui/FadeUp";

interface Scenario {
  title: string;
  body?: string;
}

interface Props {
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  body?: string;
  scenarios?: Scenario[];
  footnote?: string;
  disclaimer?: string;
  ctaText?: string;
  ctaHref?: string;
  image?: string;
  imageAlt?: string;
}

export function ClarityScenariosGrid({
  eyebrow,
  headline,
  subheadline,
  body,
  scenarios,
  footnote,
  disclaimer,
  ctaText,
  ctaHref,
  image,
  imageAlt,
}: Props) {
  return (
    <section
      id="scenarios"
      className="relative bg-navy-deep overflow-hidden py-16 md:py-20 lg:py-28 px-4 sm:px-6 scroll-mt-24"
    >
      {image && (
        <Image
          src={image}
          alt={imageAlt || ""}
          fill
          className="object-cover opacity-[0.08]"
          sizes="100vw"
        />
      )}
      <div className="hidden lg:block absolute top-[10%] right-[5%] w-[400px] h-[400px] border border-gold/[0.06] rounded-full pointer-events-none" />
      <div className="hidden lg:block absolute bottom-[5%] left-[3%] w-[300px] h-[300px] border border-gold/[0.05] rounded-full pointer-events-none" />

      <div className="relative z-[2] mx-auto max-w-[1200px]">
        <FadeUp>
          <div className="text-center max-w-[780px] mx-auto mb-10 md:mb-14">
            {eyebrow && (
              <p className="font-sans text-xs md:text-[13px] font-semibold tracking-[0.25em] uppercase text-gold mb-3">
                {eyebrow}
              </p>
            )}
            <h2 className="font-serif text-[28px] sm:text-[32px] md:text-[38px] lg:text-[42px] font-bold text-white leading-tight">
              {headline}
            </h2>
            {subheadline && (
              <p className="mt-4 text-[15px] md:text-[17px] text-cream/80 leading-relaxed">
                {subheadline}
              </p>
            )}
            {body && (
              <p className="mt-3 text-[14px] md:text-[15px] text-cream/65 leading-relaxed">
                {body}
              </p>
            )}
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {scenarios?.map((s, i) => (
            <FadeUp key={i} delay={(Math.min(i % 3, 2) as 0 | 1 | 2)}>
              <div className="group relative h-full bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-7 hover:bg-white/[0.07] hover:border-gold/40 transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 w-0 h-[2px] bg-gold group-hover:w-full transition-[width] duration-500" />
                <p className="font-serif text-gold/80 text-sm font-semibold mb-3">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-serif text-[17px] md:text-[19px] font-bold text-white leading-snug mb-3">
                  {s.title}
                </h3>
                {s.body && (
                  <p className="text-[13px] md:text-[14px] text-cream/65 leading-relaxed">
                    {s.body}
                  </p>
                )}
              </div>
            </FadeUp>
          ))}
        </div>

        {(footnote || disclaimer) && (
          <div className="mt-10 md:mt-12 max-w-[780px] mx-auto text-center space-y-2">
            {footnote && (
              <p className="text-[13px] md:text-[14px] text-cream/70 italic">
                {footnote}
              </p>
            )}
            {disclaimer && (
              <p className="text-[11px] md:text-[12px] text-cream/45">
                {disclaimer}
              </p>
            )}
          </div>
        )}

        {ctaText && ctaHref && (
          <div className="mt-10 text-center">
            <Link
              href={ctaHref}
              className="btn btn-outline"
            >
              {ctaText}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

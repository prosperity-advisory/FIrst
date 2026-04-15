import { FadeUp } from "@/components/ui/FadeUp";

interface Item {
  title: string;
  body?: string;
}

interface Props {
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  items?: Item[];
}

export function ClarityWhyList({ eyebrow, headline, subheadline, items }: Props) {
  return (
    <section className="bg-cream py-16 md:py-20 lg:py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-[1100px]">
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
            {subheadline && (
              <p className="mt-4 text-[15px] md:text-[17px] text-slate leading-relaxed">
                {subheadline}
              </p>
            )}
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {items?.map((item, i) => (
            <FadeUp key={i} delay={(Math.min(i % 3, 2) as 0 | 1 | 2)}>
              <div className="h-full bg-white border border-border rounded-xl p-6 md:p-7 hover:shadow-[0_12px_36px_rgba(20,57,43,0.07)] transition-all duration-300">
                <div className="flex items-center justify-center w-11 h-11 rounded-full bg-gold/15 text-gold font-serif text-lg font-bold mb-4">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-serif text-[18px] md:text-[20px] font-bold text-navy mb-2 leading-snug">
                  {item.title}
                </h3>
                {item.body && (
                  <p className="text-[14px] md:text-[15px] text-slate leading-relaxed">
                    {item.body}
                  </p>
                )}
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

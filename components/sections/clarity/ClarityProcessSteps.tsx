import { FadeUp } from "@/components/ui/FadeUp";

interface Step {
  title: string;
  body?: string;
}

interface Props {
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  steps?: Step[];
  note?: string;
  filterNote?: string;
  scopeNote?: string;
}

export function ClarityProcessSteps({
  eyebrow,
  headline,
  subheadline,
  steps,
  note,
  filterNote,
  scopeNote,
}: Props) {
  return (
    <section className="bg-cream py-16 md:py-20 lg:py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-[1100px]">
        <FadeUp>
          <div className="text-center max-w-[780px] mx-auto mb-12 md:mb-16">
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

        <div className="relative">
          {/* Vertical connecting line on desktop */}
          <div className="hidden md:block absolute left-[22px] top-4 bottom-4 w-px bg-linear-to-b from-gold/60 via-gold/30 to-transparent" />

          <ol className="space-y-6 md:space-y-8">
            {steps?.map((step, i) => (
              <FadeUp key={i} delay={(Math.min(i % 3, 2) as 0 | 1 | 2)}>
                <li className="relative flex gap-4 md:gap-6 items-start bg-white rounded-xl border border-border p-5 md:p-6 lg:p-7 shadow-[0_1px_0_rgba(20,57,43,0.03)]">
                  <div className="shrink-0 relative z-[1] flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full bg-navy text-gold font-serif text-lg md:text-xl font-bold ring-4 ring-cream">
                    {i + 1}
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="font-serif text-[18px] md:text-[20px] font-bold text-navy leading-snug mb-1">
                      {step.title}
                    </h3>
                    {step.body && (
                      <p className="text-[14px] md:text-[15px] text-slate leading-relaxed">
                        {step.body}
                      </p>
                    )}
                  </div>
                </li>
              </FadeUp>
            ))}
          </ol>
        </div>

        {(note || filterNote || scopeNote) && (
          <div className="mt-10 md:mt-12 max-w-[780px] mx-auto text-center space-y-3">
            {note && (
              <p className="text-[14px] md:text-[15px] font-semibold text-navy">
                {note}
              </p>
            )}
            {filterNote && (
              <p className="text-[13px] md:text-[14px] text-slate-light">
                {filterNote}
              </p>
            )}
            {scopeNote && (
              <p className="text-[12px] md:text-[13px] text-slate-light italic">
                {scopeNote}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

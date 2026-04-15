"use client";

import { FadeUp } from "@/components/ui/FadeUp";

interface Card {
  label?: string;
  title: string;
  body?: string;
  bullets?: { text: string }[];
  anchorId: string;
  linkText?: string;
}

interface Props {
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  cards?: Card[];
}

function scrollToAnchor(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function ClarityAudienceCards({ eyebrow, headline, subheadline, cards }: Props) {
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
            {subheadline && (
              <p className="mt-4 text-[15px] md:text-[17px] text-slate leading-relaxed">
                {subheadline}
              </p>
            )}
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7">
          {cards?.map((card, i) => (
            <FadeUp key={card.anchorId} delay={(Math.min(i, 2) as 0 | 1 | 2)}>
              <button
                type="button"
                onClick={() => scrollToAnchor(card.anchorId)}
                className="group w-full text-left bg-white border border-border rounded-2xl p-7 md:p-9 lg:p-10 hover:shadow-[0_20px_50px_rgba(20,57,43,0.09)] hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden"
              >
                {/* Accent corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-bl from-gold/15 to-transparent pointer-events-none" />

                {card.label && (
                  <p className="font-sans text-[11px] font-semibold tracking-[0.25em] uppercase text-gold mb-3">
                    {card.label}
                  </p>
                )}
                <h3 className="font-serif text-[22px] sm:text-[24px] md:text-[26px] font-bold text-navy leading-snug mb-3">
                  {card.title}
                </h3>
                {card.body && (
                  <p className="text-[14px] md:text-[15px] text-slate leading-relaxed mb-4">
                    {card.body}
                  </p>
                )}
                {card.bullets && card.bullets.length > 0 && (
                  <ul className="space-y-2 mb-5">
                    {card.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-[14px] md:text-[15px] text-slate leading-relaxed">
                        <span className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-gold" />
                        <span>{b.text}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {card.linkText && (
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold group-hover:text-gold-light transition-colors">
                    {card.linkText}
                    <span aria-hidden className="transition-transform group-hover:translate-x-0.5">↓</span>
                  </span>
                )}
              </button>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

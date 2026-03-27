"use client";

import { useState } from "react";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3 md:space-y-4">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className="bg-white rounded-lg border border-border overflow-hidden transition-shadow duration-300 hover:shadow-[0_4px_16px_rgba(20,57,43,0.06)]"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 p-5 md:p-6 lg:p-7 text-left cursor-pointer"
              aria-expanded={isOpen}
            >
              <span className="font-sans text-[15px] sm:text-base md:text-[17px] font-semibold text-navy leading-snug pr-2">
                {item.question}
              </span>
              <span
                className={`w-10 h-10 md:w-9 md:h-9 rounded-full border-2 border-gold flex items-center justify-center shrink-0 transition-all duration-300 ${
                  isOpen ? "bg-gold" : "bg-transparent"
                }`}
              >
                <svg
                  viewBox="0 0 24 24"
                  className={`w-4 h-4 md:w-[18px] md:h-[18px] stroke-current fill-none stroke-2 [stroke-linecap:round] [stroke-linejoin:round] transition-transform duration-300 ${
                    isOpen ? "text-white rotate-180" : "text-gold rotate-0"
                  }`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </button>

            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-5 md:px-6 md:pb-6 lg:px-7 lg:pb-7 pt-0">
                  <div className="w-full h-px bg-border mb-4 md:mb-5" />
                  <p className="text-sm md:text-[15px] text-slate leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

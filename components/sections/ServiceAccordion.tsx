"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

/* ── Types ── */
interface Subsection {
  heading: string;
  body?: string;
  bodyExtra?: string;
  bodyExtra2?: string;
  items?: string[];
  itemsHeading?: string;
  disclaimer?: string;
  ctaText?: string;
  ctaHref?: string;
  subsections?: Subsection[];
}

interface ServiceSection {
  id: string;
  heading: string;
  body: string;
  bodyExtra?: string;
  bodyExtra2?: string;
  relevanceHeading?: string;
  relevanceIntro?: string;
  relevanceItems?: string[];
  whyHeading?: string;
  whyIntro?: string;
  whyItems?: string[];
  subsections?: Subsection[];
  disclaimers?: string[];
  planningAreasHeading?: string;
  planningAreas?: string[];
  transition?: string;
}

interface ServiceAccordionProps {
  sections: ServiceSection[];
}

/* ── Chevron icon ── */
function ChevronIcon({ open, size = "md" }: { open: boolean; size?: "sm" | "md" }) {
  const dim = size === "sm" ? "w-8 h-8 md:w-7 md:h-7" : "w-10 h-10 md:w-9 md:h-9";
  const icon = size === "sm" ? "w-3.5 h-3.5 md:w-4 md:h-4" : "w-4 h-4 md:w-[18px] md:h-[18px]";

  return (
    <span
      className={`${dim} rounded-full border-2 border-gold flex items-center justify-center shrink-0 transition-all duration-300 ${
        open ? "bg-gold" : "bg-transparent"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        className={`${icon} stroke-current fill-none stroke-2 [stroke-linecap:round] [stroke-linejoin:round] transition-transform duration-300 ${
          open ? "text-white rotate-180" : "text-gold rotate-0"
        }`}
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </span>
  );
}

/* ── Animated collapse wrapper ── */
function Collapse({ open, children }: { open: boolean; children: React.ReactNode }) {
  return (
    <div
      className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      }`}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}

/* ── Subsection accordion item ── */
function SubsectionItem({ sub, nested = false }: { sub: Subsection; nested?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`border border-border rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-[0_2px_12px_rgba(20,57,43,0.05)] ${nested ? "bg-cream/40" : ""}`}>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between gap-3 ${nested ? "px-3.5 py-2.5 md:px-4 md:py-3" : "px-4 py-3.5 md:px-5 md:py-4"} text-left cursor-pointer group`}
        aria-expanded={open}
      >
        <span className={`font-sans ${nested ? "text-[14px] md:text-[15px]" : "text-[15px] md:text-base"} font-semibold text-navy leading-snug pr-2 group-hover:text-gold transition-colors duration-200`}>
          {sub.heading}
        </span>
        <ChevronIcon open={open} size="sm" />
      </button>

      <Collapse open={open}>
        <div className={`${nested ? "px-3.5 pb-3.5 md:px-4 md:pb-4" : "px-4 pb-4 md:px-5 md:pb-5"} pt-0`}>
          <div className="w-full h-px bg-border mb-3 md:mb-4" />

          {sub.body && (
            <p className="text-[14px] md:text-[15px] text-slate leading-[1.8] mb-3">
              {sub.body}
            </p>
          )}
          {sub.bodyExtra && (
            <p className="text-[14px] md:text-[15px] text-slate leading-[1.8] mb-3">
              {sub.bodyExtra}
            </p>
          )}
          {sub.bodyExtra2 && (
            <p className="text-[14px] md:text-[15px] text-slate leading-[1.8] mb-3">
              {sub.bodyExtra2}
            </p>
          )}

          {sub.itemsHeading && (
            <p className="text-[14px] md:text-[15px] font-semibold text-navy mb-2">
              {sub.itemsHeading}
            </p>
          )}

          {sub.items && (
            <ul className="space-y-2 mb-3">
              {sub.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-[6px] h-[6px] bg-gold rounded-full shrink-0 mt-[8px]" />
                  <span className="text-[14px] md:text-[15px] text-slate leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* Nested sub-subsections */}
          {sub.subsections && sub.subsections.length > 0 && (
            <div className="space-y-2 mt-3">
              {sub.subsections.map((nested) => (
                <SubsectionItem key={nested.heading} sub={nested} nested />
              ))}
            </div>
          )}

          {sub.ctaText && sub.ctaHref && (
            <Link
              href={sub.ctaHref}
              className="inline-flex items-center text-gold font-semibold text-[14px] md:text-[15px] hover:text-gold-light transition-colors mt-1"
            >
              &rarr; {sub.ctaText}
            </Link>
          )}

          {sub.disclaimer && (
            <p className="text-xs md:text-[13px] text-slate-light italic leading-relaxed mt-3">
              Note: {sub.disclaimer}
            </p>
          )}
        </div>
      </Collapse>
    </div>
  );
}

/* ── Main service category accordion ── */
export function ServiceAccordion({ sections }: ServiceAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* Listen for hash changes to auto-expand the right section */
  useEffect(() => {
    function openFromHash() {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;
      const idx = sections.findIndex((s) => s.id === hash);
      if (idx !== -1) {
        setOpenIndex(idx);
        /* Scroll into view after a brief delay for the accordion to expand */
        setTimeout(() => {
          sectionRefs.current[idx]?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [sections]);

  return (
    <div className="space-y-4 md:space-y-5">
      {sections.map((section, i) => {
        const isOpen = openIndex === i;
        const bg = i % 2 === 0 ? "bg-cream" : "bg-white";

        return (
          <div
            key={section.id}
            id={section.id}
            ref={(el) => { sectionRefs.current[i] = el; }}
            className={`${bg} rounded-xl border border-border overflow-hidden transition-shadow duration-300 ${
              isOpen ? "shadow-[0_6px_24px_rgba(20,57,43,0.08)]" : "hover:shadow-[0_4px_16px_rgba(20,57,43,0.06)]"
            }`}
          >
            {/* Category heading button */}
            <button
              onClick={() => {
                setOpenIndex(isOpen ? null : i);
              }}
              className="w-full flex items-center justify-between gap-4 p-5 md:p-7 lg:p-8 text-left cursor-pointer group"
              aria-expanded={isOpen}
            >
              <div className="min-w-0">
                <h2 className="font-serif text-[20px] xs:text-[22px] sm:text-[26px] md:text-[30px] lg:text-[34px] font-semibold text-navy leading-snug group-hover:text-gold transition-colors duration-200">
                  {section.heading}
                </h2>
                {/* Brief description visible when collapsed */}
                {!isOpen && (
                  <p className="text-[13px] sm:text-[14px] md:text-[15px] text-slate-light leading-relaxed mt-1.5 line-clamp-2">
                    {section.body}
                  </p>
                )}
              </div>
              <ChevronIcon open={isOpen} />
            </button>

            {/* Expanded content */}
            <Collapse open={isOpen}>
              <div className="px-5 pb-6 md:px-7 md:pb-8 lg:px-8 lg:pb-10 pt-0">
                <div className="w-full h-px bg-border mb-5 md:mb-6" />

                {/* Intro paragraphs */}
                <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mb-5 md:mb-6">
                  {section.body}
                </p>
                {section.bodyExtra && (
                  <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mb-5 md:mb-6">
                    {section.bodyExtra}
                  </p>
                )}
                {section.bodyExtra2 && (
                  <p className="text-[15px] sm:text-base md:text-[17px] text-slate-light italic leading-[1.8] mb-5 md:mb-6">
                    {section.bodyExtra2}
                  </p>
                )}

                {/* Relevance items */}
                {section.relevanceHeading && section.relevanceItems && section.relevanceItems.length > 0 && (
                  <div className="mb-6 md:mb-8">
                    <p className="text-[15px] sm:text-base md:text-[17px] font-semibold text-navy mb-3">
                      {section.relevanceHeading}
                    </p>
                    {section.relevanceIntro && (
                      <p className="text-[15px] md:text-base text-slate leading-[1.8] mb-3">
                        {section.relevanceIntro}
                      </p>
                    )}
                    <ul className="space-y-2.5">
                      {section.relevanceItems.map((item, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span className="w-[7px] h-[7px] bg-gold rounded-full shrink-0 mt-[9px]" />
                          <span className="text-[15px] md:text-base text-slate leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Why clients seek this planning */}
                {section.whyHeading && section.whyItems && section.whyItems.length > 0 && (
                  <div className="mb-6 md:mb-8">
                    <p className="text-[15px] sm:text-base md:text-[17px] font-semibold text-navy mb-3">
                      {section.whyHeading}
                    </p>
                    {section.whyIntro && (
                      <p className="text-[15px] md:text-base text-slate leading-[1.8] mb-3">
                        {section.whyIntro}
                      </p>
                    )}
                    <ul className="space-y-2.5">
                      {section.whyItems.map((item, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span className="w-[7px] h-[7px] bg-gold rounded-full shrink-0 mt-[9px]" />
                          <span className="text-[15px] md:text-base text-slate leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Subsection accordions (level 2) */}
                {section.subsections && section.subsections.length > 0 && (
                  <div className="space-y-3 md:space-y-3.5 mb-6 md:mb-8">
                    {section.subsections.map((sub) => (
                      <SubsectionItem key={sub.heading} sub={sub} />
                    ))}
                  </div>
                )}

                {/* Planning areas */}
                {section.planningAreasHeading && section.planningAreas && section.planningAreas.length > 0 && (
                  <div className="mb-5 md:mb-6">
                    <p className="text-[15px] sm:text-base md:text-[17px] font-semibold text-navy mb-3">
                      {section.planningAreasHeading}
                    </p>
                    <ul className="space-y-2.5 md:space-y-3">
                      {section.planningAreas.map((area, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span className="w-[7px] h-[7px] bg-gold rounded-full shrink-0 mt-[9px]" />
                          <span className="text-[15px] md:text-base text-slate leading-relaxed">
                            {area}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Disclaimers */}
                {section.disclaimers && section.disclaimers.length > 0 && (
                  <div className="space-y-2 mb-5 md:mb-6">
                    {section.disclaimers.map((d, j) => (
                      <p
                        key={j}
                        className="text-xs md:text-[13px] text-slate-light italic leading-relaxed"
                      >
                        {d}
                      </p>
                    ))}
                  </div>
                )}

                {/* Transition text */}
                {section.transition && (
                  <p className="text-[15px] sm:text-base md:text-[17px] text-slate-light italic leading-[1.8]">
                    {section.transition}
                  </p>
                )}
              </div>
            </Collapse>
          </div>
        );
      })}
    </div>
  );
}

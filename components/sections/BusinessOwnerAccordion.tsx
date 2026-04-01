"use client";

import { useState } from "react";
import Link from "next/link";
import { FadeUp } from "@/components/ui/FadeUp";

/* ── Types ── */
interface SubItem {
  heading: string;
  body: string;
  items?: string[];
  subsections?: SubItem[];
}

interface AccordionSection {
  heading: string;
  body: string;
  itemsHeading?: string;
  items?: string[];
  disclaimer?: string;
  subsections?: SubItem[];
}

/* ── Animated collapse ── */
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

/* ── Chevron icon ── */
function ChevronIcon({ open, size = "md" }: { open: boolean; size?: "sm" | "md" | "xs" }) {
  const dim =
    size === "xs"
      ? "w-6 h-6 md:w-7 md:h-7"
      : size === "sm"
        ? "w-8 h-8 md:w-7 md:h-7"
        : "w-10 h-10 md:w-9 md:h-9";
  const icon =
    size === "xs"
      ? "w-3 h-3 md:w-3.5 md:h-3.5"
      : size === "sm"
        ? "w-3.5 h-3.5 md:w-4 md:h-4"
        : "w-4 h-4 md:w-[18px] md:h-[18px]";

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

/* ── Nested sub-item (level 3) ── */
function NestedItem({ item }: { item: SubItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-border rounded-md overflow-hidden transition-shadow duration-300 hover:shadow-[0_2px_8px_rgba(20,57,43,0.04)] bg-cream/40">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-2.5 px-3.5 py-2.5 md:px-4 md:py-3 text-left cursor-pointer group"
        aria-expanded={open}
      >
        <span className="font-sans text-[13px] md:text-[14px] font-semibold text-navy leading-snug pr-1 group-hover:text-gold transition-colors duration-200">
          {item.heading}
        </span>
        <ChevronIcon open={open} size="xs" />
      </button>
      <Collapse open={open}>
        <div className="px-3.5 pb-3 md:px-4 md:pb-3.5 pt-0">
          <div className="w-full h-px bg-border mb-2.5" />
          <p className="text-[13px] md:text-[14px] text-slate leading-[1.75]">{item.body}</p>
          {item.items && (
            <ul className="space-y-1.5 mt-2">
              {item.items.map((itm, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-[5px] h-[5px] bg-gold rounded-full shrink-0 mt-[7px]" />
                  <span className="text-[13px] md:text-[14px] text-slate leading-relaxed">{itm}</span>
                </li>
              ))}
            </ul>
          )}
          {item.subsections && item.subsections.length > 0 && (
            <div className="space-y-1.5 mt-2.5">
              {item.subsections.map((nested) => (
                <NestedItem key={nested.heading} item={nested} />
              ))}
            </div>
          )}
        </div>
      </Collapse>
    </div>
  );
}

/* ── Main accordion item (level 2) ── */
function AccordionItem({ section }: { section: AccordionSection }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-border rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-[0_4px_16px_rgba(20,57,43,0.06)] bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3.5 md:px-6 md:py-4.5 text-left cursor-pointer group"
        aria-expanded={open}
      >
        <span className="font-sans text-[15px] md:text-[17px] font-semibold text-navy leading-snug pr-2 group-hover:text-gold transition-colors duration-200">
          {section.heading}
        </span>
        <ChevronIcon open={open} size="sm" />
      </button>
      <Collapse open={open}>
        <div className="px-4 pb-5 md:px-6 md:pb-6 pt-0">
          <div className="w-full h-px bg-border mb-3 md:mb-4" />
          <p className="text-[14px] md:text-[15px] text-slate leading-[1.8] mb-3">
            {section.body}
          </p>

          {section.itemsHeading && (
            <p className="text-[14px] md:text-[15px] font-semibold text-navy mb-2 mt-4">
              {section.itemsHeading}
            </p>
          )}

          {section.items && (
            <ul className="space-y-2 mb-3">
              {section.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-[6px] h-[6px] bg-gold rounded-full shrink-0 mt-[8px]" />
                  <span className="text-[14px] md:text-[15px] text-slate leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          )}

          {section.subsections && section.subsections.length > 0 && (
            <div className="space-y-2 mt-3">
              {section.subsections.map((sub) => (
                <NestedItem key={sub.heading} item={sub} />
              ))}
            </div>
          )}

          {section.disclaimer && (
            <p className="text-xs md:text-[13px] text-slate-light italic leading-relaxed mt-4">
              Note: {section.disclaimer}
            </p>
          )}
        </div>
      </Collapse>
    </div>
  );
}

/* ── Exported section ── */
export function BusinessOwnerAccordion() {
  const relevanceItems = [
    "Preparing for a business sale, liquidity event, or other major transition",
    "Experiencing a significant increase in income or business profitability",
    "Looking for ways to improve tax efficiency while protecting cash flow",
    "Exploring strategies to retain and reward key employees",
    "Planning for succession, continuity, or ownership changes",
    "Coordinating business decisions with personal retirement and legacy goals",
  ];

  const sections: AccordionSection[] = [
    {
      heading: "Business Planning",
      body: "Coordinating personal and business financial decisions into a unified strategy that supports day-to-day operations and long-term goals.",
    },
    {
      heading: "Executive Retention & Reward Strategies",
      body: "Helping business owners evaluate strategies designed to attract, retain, and reward key leadership while aligning incentives with long-term business success.",
      subsections: [
        {
          heading: "Retaining and Rewarding Key Executives",
          body: "Exploring approaches that go beyond salary and standard benefits to help support retention and align incentives.",
        },
        {
          heading: "Qualified Retirement Plans",
          body: "Reviewing retirement plan designs that may support tax efficiency, long-term savings, and employee retention.",
        },
        {
          heading: "Non-Qualified Deferred Compensation",
          body: "Evaluating flexible compensation strategies for key executives that extend beyond qualified plan contribution limits.",
        },
        {
          heading: "Defined Benefit & Pension Plans",
          body: "Reviewing advanced retirement plan strategies designed to maximize tax-deferred savings for eligible business owners and professionals.",
        },
        {
          heading: "Executive Bonus Arrangements",
          body: "Exploring bonus-based strategies that may help reward and retain key employees in a tax-aware manner.",
        },
        {
          heading: "Business Retirement Plan Strategies",
          body: "Reviewing retirement plan options for business owners and key employees as part of a broader planning strategy.",
        },
      ],
    },
    {
      heading: "Tax-Efficient Business & Exit Planning",
      body: "Planning ahead for major financial decisions, liquidity events, and ownership transitions with an emphasis on tax awareness, cash-flow preservation, and long-term value.",
      subsections: [
        {
          heading: "Reducing Taxes on Income or Exit",
          body: "Coordinating planning strategies in advance of major transactions or liquidity events to help evaluate ways to reduce tax friction and improve overall tax efficiency over time.",
        },
        {
          heading: "Planning Approaches That May Be Evaluated",
          body: "Depending on your situation, more advanced strategies may be explored in coordination with your tax and legal professionals. These approaches are not appropriate for all clients and may involve varying levels of risk, complexity, cost, and liquidity constraints.",
          items: [
            "Structured Installment Sales \u2014 may help spread recognition of gains over time and convert proceeds into installment-based income",
            "Charitable Remainder Trusts \u2014 may be evaluated as part of charitable, income, and tax-aware planning",
            "Cost Segregation Planning (Coordination) \u2014 may help accelerate depreciation for certain real estate holdings when appropriate",
            "Deferred Sales Trusts (DST) \u2014 may be evaluated in certain cases involving highly appreciated assets or business sale planning",
          ],
        },
        {
          heading: "Succession & Business Continuity Planning",
          body: "Preparing for ownership changes, unexpected events, and long-term business continuity through structured planning.",
          subsections: [
            {
              heading: "Planning Ownership Transition",
              body: "Helping evaluate succession and continuity strategies that support more intentional ownership changes over time.",
            },
            {
              heading: "Business Continuation Planning",
              body: "Planning for unexpected events and ownership transitions with the goal of helping protect business value and operational continuity.",
            },
            {
              heading: "Buy-Sell Agreements",
              body: "Coordinating planning discussions around funded agreements that may help structure ownership transitions and protect business partners.",
            },
          ],
        },
      ],
    },
    {
      heading: "Advanced Planning Coordination",
      body: "Bringing together complex planning elements \u2014 such as concentrated wealth, liquidity events, insurance planning, tax-sensitive decisions, and long-term income considerations \u2014 into a coordinated strategy aligned with your overall financial plan.",
      itemsHeading: "How We Approach Advanced Planning",
      items: [
        "Understand your broader financial and business picture",
        "Identify planning areas where taxes, cash flow, and long-term goals may intersect",
        "Coordinate with your CPA, attorney, and other professionals where appropriate",
        "Evaluate multiple planning approaches based on your goals, timeline, and risk considerations",
        "Help implement selected strategies through the appropriate professionals and service providers",
        "Monitor and adjust the planning approach as circumstances evolve",
      ],
      disclaimer:
        "If implemented, insurance-based products or annuities would be offered only through a separate licensed insurance capacity outside of the advisory relationship, and clients are under no obligation to purchase any such product.",
    },
  ];

  return (
    <section
      id="business-owner-detail"
      className="bg-navy-deep py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6"
    >
      <div className="mx-auto max-w-[900px]">
        <FadeUp>
          <span className="eyebrow !text-gold">Business Owner & Advanced Planning</span>
          <h2 className="font-serif text-[24px] xs:text-[26px] sm:text-[30px] md:text-[34px] lg:text-[38px] font-semibold text-white mb-4 md:mb-5 leading-snug">
            Business Owner &amp; Advanced Planning
          </h2>
          <p className="text-[15px] sm:text-base md:text-[17px] text-white/80 leading-[1.8] mb-5 md:mb-6 max-w-[750px]">
            Supporting business owners, professionals, and high-income households navigating
            complex financial decisions, competing priorities, and major financial transitions.
          </p>
          <p className="text-[15px] sm:text-base md:text-[17px] text-white/70 leading-[1.8] mb-6 md:mb-8 max-w-[750px]">
            Many business owners reach a point where traditional planning is no longer enough. As
            income grows, business value increases, and future transition decisions become more
            significant, planning often requires a more coordinated approach across cash flow, tax
            awareness, key-person retention, and long-term ownership strategy.
          </p>
        </FadeUp>

        <FadeUp delay={1}>
          <p className="text-[14px] sm:text-[15px] md:text-base text-white/60 italic leading-[1.8] mb-5 md:mb-6">
            This area is typically most relevant for business owners, professionals, and households
            with more complex financial structures or upcoming financial transitions.
          </p>
          <p className="text-[15px] sm:text-base md:text-[17px] font-semibold text-gold mb-3">
            When This Type of Planning Becomes Important
          </p>
          <ul className="space-y-2.5 mb-8 md:mb-10">
            {relevanceItems.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-[7px] h-[7px] bg-gold rounded-full shrink-0 mt-[9px]" />
                <span className="text-[14px] sm:text-[15px] md:text-base text-white/80 leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </FadeUp>

        <FadeUp delay={2}>
          <div className="space-y-3 md:space-y-3.5 mb-8 md:mb-10">
            {sections.map((section) => (
              <AccordionItem key={section.heading} section={section} />
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={3}>
          <p className="text-xs md:text-[13px] text-white/50 italic leading-relaxed mb-8 md:mb-10">
            All advanced planning strategies are evaluated in coordination with appropriate tax and
            legal professionals. Prosperity Planning &amp; Advisory does not provide tax or legal
            advice. Insurance or other non-advisory products, where applicable, are offered
            separately outside the advisory relationship. Clients are under no obligation to
            implement any recommendation or purchase any product through any affiliated or separate
            capacity.
          </p>

          <div className="text-center">
            <p className="font-serif text-[18px] sm:text-[20px] md:text-[22px] font-semibold text-white mb-3">
              Start Your Financial Journey
            </p>
            <p className="text-[14px] sm:text-[15px] text-white/70 leading-[1.8] mb-5 max-w-[500px] mx-auto">
              Explore how these strategies may apply to your situation and long-term goals.
            </p>
            <Link
              href="https://calendly.com/prosperityplanningandadvisory/clarity-session"
              className="btn btn-gold"
            >
              Schedule Your Complimentary Strategy Review
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

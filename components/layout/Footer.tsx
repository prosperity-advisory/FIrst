"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const FOOTER_GROUPS = [
  {
    heading: "Services",
    links: [
      { href: "/services", label: "All Services" },
      { href: "/portfolios", label: "Prosperity Pathways™" },
      { href: "/planning", label: "Personal Planning™" },
    ],
  },
  {
    heading: "About",
    links: [
      { href: "/about", label: "Our Mission" },
      { href: "/who-we-serve", label: "Who We Serve" },
      { href: "/process", label: "Our Process" },
      { href: "/fees", label: "Fees" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { href: "/faqs", label: "FAQs" },
      { href: "/resources", label: "Learning Center" },
      { href: "/case-studies", label: "Planning Scenarios & Examples" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
];

export function Footer() {
  const pathname = usePathname();

  return (
    <footer className="bg-navy-deep pt-12 md:pt-14 lg:pt-16 px-4 md:px-6">
      <div className="mx-auto max-w-[1200px]">
        {/* Top row: brand + link groups */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr] gap-8 md:gap-10 lg:gap-12 pb-8 md:pb-10 lg:pb-12 border-b border-white/[0.08]">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="block font-serif text-sm sm:text-base md:text-[17px] lg:text-lg font-bold text-white mb-2.5 md:mb-3"
            >
              Prosperity
              <span className="text-gold"> | </span>
              Planning &amp; Advisory
            </Link>
            <p className="text-[13px] md:text-sm text-white/50 max-w-[280px] leading-relaxed mb-4">
              A fiduciary financial planning firm proudly serving individuals and
              small business owners.
            </p>
            <p className="text-xs text-white/35 leading-relaxed">
              21255 Burbank Boulevard, Suite 120
              <br />
              Woodland Hills, CA 91367
            </p>
          </div>

          {/* Link groups */}
          {FOOTER_GROUPS.map((group) => (
            <div key={group.heading}>
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-white/40 mb-3 md:mb-4">
                {group.heading}
              </h3>
              <div className="flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm transition-colors duration-300 hover:text-gold ${
                      pathname === link.href
                        ? "text-gold"
                        : "text-white/60"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Legal disclaimer */}
        <div className="py-6 md:py-7 lg:py-8 text-xs md:text-[13px] leading-[1.8] text-white/35 max-w-[900px] space-y-3">
          <p>
            Prosperity Planning &amp; Advisory, LLC is a California state-registered
            investment adviser. Registration does not imply a certain level of skill
            or training. Advisory services are provided by a registered investment
            adviser representative of the Firm and are offered only after entering
            into a written advisory agreement and receiving all required disclosures.
          </p>
          <p>
            Information on this website is for general informational and educational
            purposes only and does not constitute individualized investment advice,
            a recommendation, or an offer to buy or sell any security or financial
            product. All investments involve risk, including the possible loss of
            principal. Past performance is not indicative of future results.
          </p>
          <p>
            Prosperity Planning and Advisory, LLC is a fee-only registered
            investment adviser and does not sell insurance products or receive
            insurance commissions. Prosperity Planning &amp; Advisory does not
            provide tax or legal advice. Clients should consult their tax
            professional and attorney regarding their specific situation.
          </p>
          <p>
            Where insurance or annuity strategies are referenced, such discussion is
            for educational or planning-context purposes only unless otherwise
            stated. Separately, Marcus Mann, in his individual capacity as a
            licensed insurance agent, may offer certain fixed insurance or annuity
            products outside the advisory relationship. Clients are under no
            obligation to purchase any such product through him, and any such
            transaction would be separate from the firm&apos;s advisory services.
          </p>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row sm:justify-between text-center sm:text-left py-4 border-t border-white/[0.06] gap-2">
          <span className="text-xs md:text-[13px] text-white/40">
            &copy; 2026 Prosperity Planning &amp; Advisory
          </span>
          <Link
            href="/privacy"
            className="text-xs md:text-[13px] text-white/40 transition-colors duration-300 hover:text-gold"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}

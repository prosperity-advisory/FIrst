import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolios", label: "Prosperity Pathways\u2122" },
  { href: "/planning", label: "Personal Prosperity Planning\u2122" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="bg-navy-deep pt-12 md:pt-14 lg:pt-16 px-4 md:px-6">
      <div className="mx-auto max-w-[1200px]">
        {/* Top row: brand + links */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-7 md:gap-10 lg:gap-12 pb-8 md:pb-10 lg:pb-12 border-b border-white/[0.08]">
          <div>
            <span className="block font-serif text-base md:text-[17px] lg:text-lg font-bold text-white mb-2.5 md:mb-3">
              Prosperity
              <span className="text-gold"> | </span>
              Planning &amp; Advisory
            </span>
            <p className="text-[13px] md:text-sm text-white/50 max-w-[300px] leading-relaxed">
              A fiduciary financial planning firm proudly serving individuals and
              small business owners.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3.5 sm:gap-5 md:gap-7 lg:gap-8">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/60 transition-colors duration-300 hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Legal disclaimer */}
        <p className="py-6 md:py-7 lg:py-8 text-[11px] md:text-xs leading-[1.8] text-white/35 max-w-[900px]">
          Prosperity Planning &amp; Advisory, LLC is a California state-registered
          investment adviser. Registration does not imply a certain level of skill
          or training. Advisory services are provided by a registered investment
          adviser representative of the Firm. Information on this website is for
          general informational and educational purposes only and does not
          constitute individualized investment advice. Past performance is not
          indicative of future results. Prosperity Planning and Advisory, LLC is a
          fee-only registered investment adviser and does not sell insurance
          products or receive insurance commissions.
        </p>

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

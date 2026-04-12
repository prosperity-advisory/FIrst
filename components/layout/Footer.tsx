"use client";

import Link from "next/link";
import Image from "next/image";
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
      { href: "/disclosures", label: "Disclosures" },
      { href: "/documents/privacy-notice.pdf", label: "Privacy Policy" },
    ],
  },
];

interface FooterDocument {
  label: string;
  fileUrl: string;
}

interface FooterProps {
  linkGroups?: { heading: string; links: { href: string; label: string }[] }[];
  disclosures?: ({ text: string } | string)[];
  insuranceDisclaimer?: string;
  privacyPolicyHref?: string;
  documents?: FooterDocument[];
}

const DEFAULT_DISCLOSURES: { text: string }[] = [
  { text: "Prosperity Planning & Advisory, LLC is a California state-registered investment adviser. Registration does not imply a certain level of skill or training. Advisory services are provided by a registered investment adviser representative of the Firm and are offered only after entering into a written advisory agreement and receiving all required disclosures." },
  { text: "Prosperity Planning and Advisory, LLC is a fee-only registered investment adviser and does not sell insurance products or receive insurance commissions. Insurance products, if discussed, are offered outside of the advisory relationship through a separate, non-advisory business. Clients are under no obligation to purchase any insurance products." },
  { text: "Website Disclaimer" },
  { text: "Information on this website is for general informational and educational purposes only and does not constitute individualized investment advice, a recommendation, or an offer to buy or sell any security. Past performance is not indicative of future results. Any planning strategies discussed are based on general principles and may not be suitable for all individuals. Investment strategies involve risk, including the potential loss of principal." },
  { text: "Prosperity Planning and Advisory, LLC is a registered investment adviser in the State of California. Registration does not imply a certain level of skill or training. Services may not be available to persons in jurisdictions where we are not appropriately licensed or exempt." },
  { text: "We do not provide tax or legal advice. Hyperlinks to third-party content are provided for convenience and do not imply endorsement; we are not responsible for the accuracy or content of third-party sites. For our current Form ADV or additional information, please contact us at help@prosperityadvisory.net or 888-427-5240." },
  { text: "Where insurance or annuity strategies are referenced, such discussion is for educational or planning-context purposes only unless otherwise stated. Separately, Marcus Mann, in his individual capacity as a licensed insurance agent, may offer certain fixed insurance or annuity products outside the advisory relationship. Clients are under no obligation to purchase any such product through him, and any such transaction would be separate from the firm\u2019s advisory services." },
];

export function Footer({ linkGroups, disclosures, insuranceDisclaimer, privacyPolicyHref, documents }: FooterProps = {}) {
  const groups = linkGroups ?? FOOTER_GROUPS;
  // Normalize: DB may have plain strings or {text} objects
  const raw = disclosures && disclosures.length > 0 ? disclosures : DEFAULT_DISCLOSURES;
  const disclaimerParagraphs = raw.map((item: { text: string } | string) =>
    typeof item === "string" ? { text: item } : item
  );
  const policyHref = privacyPolicyHref || "/documents/privacy-notice.pdf";
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
              className="inline-flex items-center gap-2 sm:gap-2.5 font-serif text-sm sm:text-base md:text-[17px] lg:text-lg font-bold text-white mb-2.5 md:mb-3"
            >
              <Image
                src="/images/single-logo-trimmed.png"
                alt="Prosperity Planning & Advisory"
                width={429}
                height={464}
                className="h-[1.4em] w-auto object-contain"
              />
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
          {groups.map((group) => (
            <div key={group.heading}>
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-white/40 mb-3 md:mb-4">
                {group.heading}
              </h3>
              <div className="flex flex-col gap-2.5">
                {group.links.map((link) => {
                  const isExternal = /^https?:\/\//.test(link.href) || link.href.endsWith(".pdf");
                  const className = `text-sm transition-colors duration-300 hover:text-gold ${
                    pathname === link.href ? "text-gold" : "text-white/60"
                  }`;
                  return isExternal ? (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={className}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link key={link.href} href={link.href} className={className}>
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Legal disclaimers */}
        <div className="py-6 md:py-7 lg:py-8 text-xs md:text-[13px] leading-[1.8] text-white/35 max-w-[900px] space-y-3">
          {disclaimerParagraphs.map((item, i) => {
            const isHeading = item.text.length < 60 && !item.text.includes(".");
            return isHeading ? (
              <p key={i} className="font-semibold text-white/45 mt-4">
                {item.text}
              </p>
            ) : (
              <p key={i}>{item.text}</p>
            );
          })}
          {insuranceDisclaimer && (
            <p>{insuranceDisclaimer}</p>
          )}
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row sm:justify-between text-center sm:text-left py-4 border-t border-white/[0.06] gap-2">
          <span className="text-xs md:text-[13px] text-white/40">
            &copy; 2026 Prosperity Planning &amp; Advisory
          </span>
          <div className="flex flex-wrap justify-center sm:justify-end gap-x-4 gap-y-1">
            <a
              href={policyHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs md:text-[13px] text-white/40 transition-colors duration-300 hover:text-gold"
            >
              Privacy Policy
            </a>
            <Link
              href="/disclosures"
              className="text-xs md:text-[13px] text-white/40 transition-colors duration-300 hover:text-gold"
            >
              Disclosures
            </Link>
            {documents?.map((doc, i) =>
              doc.fileUrl ? (
                <a
                  key={i}
                  href={doc.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs md:text-[13px] text-white/40 transition-colors duration-300 hover:text-gold"
                >
                  {doc.label}
                </a>
              ) : null
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

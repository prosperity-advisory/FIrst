import type { Metadata } from "next";
import Link from "next/link";
import { InteriorHero } from "@/components/sections/InteriorHero";
import { FadeUp } from "@/components/ui/FadeUp";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Disclosures - Prosperity Planning & Advisory",
  description:
    "Important disclosures regarding Prosperity Planning & Advisory, LLC's advisory services, website content, investment risk, insurance activities, and conflicts of interest.",
  openGraph: {
    title: "Disclosures | Prosperity Planning & Advisory",
    description:
      "Important disclosures regarding the Firm's advisory services, website content, investment risk, and conflicts of interest.",
  },
  alternates: { canonical: "https://prosperityadvisory.net/disclosures" },
};

interface Section {
  heading: string;
  paragraphs: (string | React.ReactNode)[];
}

const SECTIONS: Section[] = [
  {
    heading: "Website Content and No Client Relationship",
    paragraphs: [
      "The content on this website is provided for general informational and educational purposes only. Nothing on this website is intended as, or should be construed as, individualized investment, legal, tax, or insurance advice.",
      "Viewing this website, using its tools or resources, or contacting the Firm through this website does not create an advisory relationship with the Firm. Advisory services are provided only after the Firm and client enter into a written advisory agreement.",
      "Communications sent through this website or via email should not be used to request, authorize, or effect securities transactions or account changes.",
    ],
  },
  {
    heading: "Advisory Services",
    paragraphs: [
      "The Firm offers investment advisory and financial planning services, which may include portfolio management, retirement planning, education planning, budgeting and cash flow planning, and other financial planning services as described in the Firm's Form ADV.",
      "All services are subject to the terms of the applicable written agreement, suitability review, and regulatory requirements.",
    ],
  },
  {
    heading: "Investment Risk Disclosure",
    paragraphs: [
      "All investing involves risk, including the possible loss of principal. Different types of investments involve varying degrees of risk. Past performance is not indicative of future results. No representation is being made that any strategy, recommendation, or investment will be profitable or will not result in loss.",
      "Any references to asset allocations, model portfolios, planning concepts, investment strategies, or financial outcomes are for illustrative and educational purposes only and may not be appropriate for every individual.",
    ],
  },
  {
    heading: "No Guarantee of Accuracy or Completeness",
    paragraphs: [
      "The Firm believes the information on this website is from reliable sources; however, the Firm does not warrant that any information is accurate, complete, current, or suitable for any particular purpose, including any forward-looking statements. Information on this website may change at any time without notice.",
    ],
  },
  {
    heading: "Separate Insurance Activities",
    paragraphs: [
      "The Firm does not sell insurance products through the advisory relationship and does not receive insurance commissions as part of its advisory services.",
      "Insurance products, if offered, are offered through a separate, non-advisory business. Separate compensation, including commissions, may be earned in that separate capacity. Any such activity is outside the scope of the Firm's advisory relationship.",
      "Advisory recommendations are made without regard to whether a client elects to purchase any insurance product.",
      "Clients and prospective clients are under no obligation to purchase any insurance product. Any decision to purchase insurance is entirely voluntary and is not required in order to receive advisory or planning services from the Firm.",
    ],
  },
  {
    heading: "Conflicts of Interest and Freedom of Choice",
    paragraphs: [
      "The Firm is committed to acting in the best interests of its clients and to providing full and fair disclosure of material facts and conflicts of interest. Material conflicts are disclosed in the Firm's Form ADV.",
      "Clients and prospective clients are under no obligation to act on any recommendation made by the Firm. If a person elects to act on a recommendation, that person is under no obligation to do so through the Firm or through any separate provider.",
      "Clients are free to choose their own custodian, broker-dealer, insurance provider, attorney, accountant, tax professional, or other service provider, subject to the Firm's service model and any applicable account requirements.",
    ],
  },
  {
    heading: "Form ADV Availability",
    paragraphs: [
      "The Firm's Form ADV Part 2A brochure and any applicable brochure supplements contain important information about the Firm's services, fees, business practices, and conflicts of interest.",
      "These disclosure documents are provided to clients at or before the time of entering into an advisory relationship and are offered annually thereafter in accordance with regulatory requirements. They are also available promptly upon request by contacting the Firm directly.",
    ],
  },
  {
    heading: "Third-Party Links",
    paragraphs: [
      "This website may contain links to third-party websites or resources. Such links are provided for convenience only. The Firm does not control, endorse, or guarantee the accuracy, completeness, security, or privacy practices of third-party websites.",
      "Third-party websites have their own terms and privacy policies, which users should review independently. Accessing a third-party website is at the user's own risk.",
    ],
  },
  {
    heading: "No Tax or Legal Advice",
    paragraphs: [
      "The Firm does not provide legal advice or tax advice, including tax-efficient investing guidance. Visitors and clients should consult their own qualified legal and tax professionals regarding their specific circumstances.",
    ],
  },
  {
    heading: "Jurisdictional Notice",
    paragraphs: [
      "This website is intended only to provide general information regarding the Firm and its services. Nothing on this website should be interpreted as a solicitation or offer to provide advisory services in any jurisdiction where doing so would be unlawful or where the Firm is not properly registered or otherwise exempt from registration.",
    ],
  },
];

export default function DisclosuresPage() {
  return (
    <main>
      <BreadcrumbJsonLd items={[{ name: "Disclosures", path: "/disclosures" }]} />
      <InteriorHero
        eyebrow="Important Disclosures"
        headline="Disclosures"
        subtitle="Regulatory and legal disclosures regarding our services and this website."
        backgroundImage="/images/services google.jpg"
      />

      {/* Intro */}
      <section className="bg-white py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-24 px-4 sm:px-6">
        <div className="mx-auto max-w-[800px]">
          <FadeUp>
            <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8] mb-5 md:mb-6">
              Prosperity Planning &amp; Advisory, LLC (the &ldquo;Firm&rdquo;) is a California
              state-registered investment adviser. Registration as an investment adviser in the
              State of California does not imply a certain level of skill or training.
            </p>
            <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8]">
              This page provides a summary of important information regarding the Firm&apos;s
              services and the limitations of this website. For more detailed information, please
              refer to the Firm&apos;s Form ADV, which is available upon request.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Sections */}
      <section className="bg-cream py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] px-4 sm:px-6">
        <div className="mx-auto max-w-[800px] space-y-10 md:space-y-12">
          {SECTIONS.map((section) => (
            <FadeUp key={section.heading}>
              <div>
                <h2 className="font-serif text-[22px] sm:text-[24px] md:text-[28px] font-semibold text-navy mb-4 md:mb-5">
                  {section.heading}
                </h2>
                <div className="space-y-4 md:space-y-5">
                  {section.paragraphs.map((p, i) => (
                    <p
                      key={i}
                      className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8]"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}

          {/* Privacy + Contact */}
          <FadeUp>
            <div>
              <h2 className="font-serif text-[22px] sm:text-[24px] md:text-[28px] font-semibold text-navy mb-4 md:mb-5">
                Privacy
              </h2>
              <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8]">
                Please review the Firm&apos;s{" "}
                <a
                  href="/documents/privacy-notice.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-gold hover:text-gold-light transition-colors"
                >
                  Privacy Policy
                </a>{" "}
                for information about how personal information is collected, used, and protected.
              </p>
            </div>
          </FadeUp>

          <FadeUp>
            <div>
              <h2 className="font-serif text-[22px] sm:text-[24px] md:text-[28px] font-semibold text-navy mb-4 md:mb-5">
                Contact Information
              </h2>
              <p className="text-[15px] sm:text-base md:text-[17px] text-slate leading-[1.8]">
                For questions regarding these disclosures or to request a copy of the Firm&apos;s
                current Form ADV brochure materials, please{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-gold hover:text-gold-light transition-colors"
                >
                  contact the Firm
                </Link>{" "}
                using the contact information provided on this website. Requests will be fulfilled
                promptly.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}

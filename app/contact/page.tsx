import type { Metadata } from "next";
import Link from "next/link";
import { InteriorHero } from "@/components/sections/InteriorHero";
import { ContactSection } from "@/components/sections/ContactSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { FadeUp } from "@/components/ui/FadeUp";
import { getContactContent } from "@/lib/content";

const content = getContactContent();

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
  openGraph: {
    title: content.meta.ogTitle,
    description: content.meta.ogDescription,
  },
};

const cardIcons: React.ReactNode[] = [
  /* Investment */
  <svg key="investment" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>,
  /* Retirement */
  <svg key="retirement" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>,
  /* Estate */
  <svg key="estate" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
];

export default function ContactPage() {
  return (
    <main>
      <InteriorHero
        headline={content.hero.headline}
        subtitle="We&rsquo;re here to help you take the next step toward financial confidence."
        ctaText={content.hero.cta.text + " →"}
      />

      {/* Contact details + map */}
      <ContactSection
        eyebrow="Get In Touch"
        headline={content.location.heading}
        details={[
          {
            label: "Address",
            icon: (
              <svg viewBox="0 0 24 24">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            ),
            value: (
              <>
                {content.location.name}
                <br />
                {content.location.address}
                <br />
                {content.location.city}, {content.location.state}{" "}
                {content.location.zip}
              </>
            ),
          },
          {
            label: "Phone",
            icon: (
              <svg viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            ),
            value: (
              <a
                href={`tel:${content.location.phone.replace(/[^\d]/g, "")}`}
                className="text-gold hover:text-gold-light transition-colors"
              >
                {content.location.phone}
              </a>
            ),
          },
          {
            label: "Email",
            icon: (
              <svg viewBox="0 0 24 24">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            ),
            value: (
              <a
                href={`mailto:${content.location.email}`}
                className="text-gold hover:text-gold-light transition-colors"
              >
                {content.location.email}
              </a>
            ),
          },
        ]}
        ctaText="Schedule a Consultation →"
        mapLabel={`${content.location.city}, ${content.location.state}`}
        mapSublabel={content.location.address}
      />

      {/* Service Cards */}
      <section className="bg-cream py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6">
        <div className="mx-auto max-w-[1200px]">
          <FadeUp>
            <div className="text-center mb-10 md:mb-12">
              <span className="eyebrow">Our Services</span>
              <h2 className="section-headline">
                Comprehensive Financial Planning Solutions
              </h2>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6 lg:gap-7">
            {content.serviceCards.map((card, i) => {
              const delay = (i + 1) as 1 | 2 | 3;
              return (
                <FadeUp key={card.title} delay={delay}>
                  <div className="bg-white p-7 sm:p-8 lg:p-10 rounded-lg border border-border border-t-[3px] border-t-transparent transition-all duration-[400ms] hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(20,57,43,0.1)] hover:border-t-gold h-full flex flex-col">
                    <div className="w-12 h-12 lg:w-[52px] lg:h-[52px] rounded-[10px] bg-linear-to-br from-gold/10 to-gold/5 flex items-center justify-center mb-5">
                      <span className="w-6 h-6 lg:w-[26px] lg:h-[26px] text-gold [&>svg]:w-full [&>svg]:h-full [&>svg]:stroke-current [&>svg]:fill-none [&>svg]:stroke-[1.8] [&>svg]:[stroke-linecap:round] [&>svg]:[stroke-linejoin:round]">
                        {cardIcons[i]}
                      </span>
                    </div>

                    <h3 className="font-sans text-[17px] sm:text-lg lg:text-[19px] font-semibold text-navy mb-2.5">
                      {card.title}
                    </h3>
                    <p className="text-sm lg:text-[15px] text-slate-light leading-relaxed mb-4 flex-1">
                      {card.body}
                    </p>
                    {card.cta && (
                      <Link
                        href={card.cta.href}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold transition-colors duration-300 hover:text-gold-light"
                      >
                        {card.cta.text}
                        <svg
                          viewBox="0 0 24 24"
                          className="w-3.5 h-3.5 stroke-current fill-none stroke-2 transition-transform duration-300 group-hover:translate-x-1"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </Link>
                    )}
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* Disclosures */}
      <section className="bg-white py-6 sm:py-8 px-4 sm:px-6">
        <div className="mx-auto max-w-[800px]">
          {content.location.disclosures.map((d, i) => (
            <p
              key={i}
              className="text-xs text-slate-light leading-relaxed mb-1 last:mb-0"
            >
              {d}
            </p>
          ))}
        </div>
      </section>

      <CtaBand
        headline="Ready to Take the Next Step?"
        subtext="Schedule your complimentary strategy review and start building your financial plan with confidence."
      />
    </main>
  );
}

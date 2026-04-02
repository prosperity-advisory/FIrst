import type { Metadata } from "next";
import Link from "next/link";
import { InteriorHero } from "@/components/sections/InteriorHero";
import { ContactSection } from "@/components/sections/ContactSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { FadeUp } from "@/components/ui/FadeUp";
import { getContactContent } from "@/lib/content";
import { getIcon } from "@/lib/icons";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContactContent();
  return {
    title: content.meta.title,
    description: content.meta.description,
    openGraph: {
      title: content.meta.ogTitle,
      description: content.meta.ogDescription,
    },
  };
}

const defaultCardIcons = ["bar-chart", "target", "heart"];

export default async function ContactPage() {
  const content = await getContactContent();
  return (
    <main>
      <InteriorHero
        headline={content.hero.headline}
        subtitle={content.hero.subtitle ?? "We\u2019re here to help you take the next step toward financial confidence."}
        ctaText={content.hero.cta.text}
        backgroundImage={content.hero.backgroundImage ?? "/images/Front building.jpg"}
      />

      {/* Contact details + map */}
      <ContactSection
        eyebrow={content.contactSection?.eyebrow ?? "Get In Touch"}
        headline={content.contactSection?.headline ?? content.location.heading}
        details={content.contactSection?.details?.length ? content.contactSection.details : [
          {
            label: "Address",
            icon: "map-pin",
            value: `${content.location.name}\n${content.location.address}\n${content.location.city}, ${content.location.state} ${content.location.zip}`,
          },
          {
            label: "Phone",
            icon: "phone",
            value: content.location.phone,
            href: `tel:${content.location.phone.replace(/[^\d]/g, "")}`,
          },
          {
            label: "Email",
            icon: "mail",
            value: content.location.email,
            href: `mailto:${content.location.email}`,
          },
        ]}
        ctaText={content.contactSection?.ctaText ?? "Schedule a Consultation →"}
        ctaHref={content.contactSection?.ctaHref}
        mapLabel={content.contactSection?.mapLabel ?? `${content.location.city}, ${content.location.state}`}
        mapSublabel={content.contactSection?.mapSublabel ?? content.location.address}
        image={content.contactSection?.image ?? content.hero.backgroundImage ?? "/images/Front building.jpg"}
        imageAlt={content.contactSection?.imageAlt ?? "Prosperity Planning & Advisory office building in Woodland Hills, CA"}
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
            {content.serviceCards.map((card: { title: string; body: string; cta?: { text: string; href: string } }, i: number) => {
              const delay = (i + 1) as 1 | 2 | 3;
              return (
                <FadeUp key={card.title} delay={delay}>
                  <div className="bg-white p-5 xs:p-6 sm:p-7 lg:p-10 rounded-lg border border-border border-t-[3px] border-t-transparent transition-all duration-[400ms] hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(20,57,43,0.1)] hover:border-t-gold h-full flex flex-col">
                    <div className="w-12 h-12 lg:w-[52px] lg:h-[52px] rounded-[10px] bg-linear-to-br from-gold/10 to-gold/5 flex items-center justify-center mb-5">
                      <span className="w-6 h-6 lg:w-[26px] lg:h-[26px] text-gold [&>svg]:w-full [&>svg]:h-full [&>svg]:stroke-current [&>svg]:fill-none [&>svg]:stroke-[1.8] [&>svg]:[stroke-linecap:round] [&>svg]:[stroke-linejoin:round]">
                        {getIcon(defaultCardIcons[i])}
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

      <CtaBand pageSlug="contact" />
    </main>
  );
}

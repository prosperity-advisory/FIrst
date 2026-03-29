import type { Metadata } from "next";
import Image from "next/image";
import { InteriorHero } from "@/components/sections/InteriorHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { FadeUp } from "@/components/ui/FadeUp";
import { getAboutContent } from "@/lib/content";

const content = getAboutContent();

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
  openGraph: {
    title: content.meta.ogTitle,
    description: content.meta.ogDescription,
  },
};

const featureIcons: React.ReactNode[] = [
  /* Fiduciary Duty */
  <svg key="fiduciary" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
  /* Professional Guidance */
  <svg key="guidance" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
  /* Comprehensive */
  <svg key="comprehensive" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>,
  /* Personalized */
  <svg key="personalized" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
  /* Ongoing Support */
  <svg key="support" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>,
  /* Goal-Based */
  <svg key="goals" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>,
];

export default function AboutPage() {
  return (
    <main>
      <InteriorHero
        eyebrow="Our Mission & Who We Are"
        headline={content.hero.headline}
        backgroundImage="/images/Hero Image- jpg.JPG"
      />

      {/* Mission */}
      <section className="bg-white py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6">
        <div className="mx-auto max-w-[1200px] grid grid-cols-1 md:grid-cols-[1fr_0.9fr] gap-8 md:gap-10 lg:gap-14 xl:gap-16 items-center">
          <div className="text-center md:text-left">
            <FadeUp>
              <div className="w-12 sm:w-14 lg:w-[60px] h-[3px] bg-gold mx-auto md:mx-0 mb-4" />
              <span className="eyebrow">Our Mission</span>
              <h2 className="section-headline">{content.mission.heading}</h2>
            </FadeUp>
            <FadeUp delay={1}>
              <p className="text-base sm:text-[17px] md:text-lg text-slate leading-[1.8]">
                {content.mission.body}
              </p>
            </FadeUp>
          </div>
          <FadeUp delay={2}>
            <div className="relative rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(20,57,43,0.12)] max-h-[280px] xs:max-h-[320px] sm:max-h-[360px] md:max-h-none">
              <Image
                src="/images/Our Mission 2.0 JPG.JPG"
                alt="We help you see the bigger picture — and walk with you toward it"
                width={600}
                height={400}
                className="w-full h-full object-cover rounded-xl"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 45vw"
              />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Services List */}
      <section className="bg-cream py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6">
        <div className="mx-auto max-w-[900px]">
          <FadeUp>
            <div className="text-center mb-8 md:mb-10">
              <span className="eyebrow">What We Offer</span>
              <h2 className="section-headline">{content.ourServices.heading}</h2>
              <p className="section-sub mx-auto">
                {content.ourServices.body}
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 max-w-[700px] mx-auto mb-8 md:mb-10">
              {content.ourServices.items.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="w-[7px] h-[7px] bg-gold rounded-full shrink-0" />
                  <span className="text-[15px] md:text-base text-slate">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={2}>
            <p className="text-center text-[15px] md:text-base text-slate-light leading-relaxed max-w-[700px] mx-auto">
              {content.ourServices.outro}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Trusted Partner */}
      <section className="bg-white py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6">
        <div className="mx-auto max-w-[800px] text-center">
          <FadeUp>
            <h2 className="section-headline">{content.trustedPartner.heading}</h2>
            <p className="text-base sm:text-[17px] md:text-lg text-slate leading-[1.8] mb-10 md:mb-14">
              {content.trustedPartner.body}
            </p>
          </FadeUp>

          {/* Feature badges */}
          <FadeUp delay={1}>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-8">
              {content.features.map((feature, i) => (
                <div key={feature} className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-cream flex items-center justify-center shadow-[0_2px_12px_rgba(20,57,43,0.06)]">
                    <span className="w-6 h-6 md:w-7 md:h-7 text-gold [&>svg]:w-full [&>svg]:h-full [&>svg]:stroke-current [&>svg]:fill-none [&>svg]:stroke-[1.8] [&>svg]:[stroke-linecap:round] [&>svg]:[stroke-linejoin:round]">
                      {featureIcons[i]}
                    </span>
                  </div>
                  <span className="font-semibold text-sm md:text-[15px] text-navy text-center">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Tailored Solutions */}
      <section className="bg-cream py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6">
        <div className="mx-auto max-w-[800px] text-center">
          <FadeUp>
            <h2 className="section-headline">{content.tailored.heading}</h2>
            <p className="text-base sm:text-[17px] md:text-lg text-slate leading-[1.8]">
              {content.tailored.body}
            </p>
          </FadeUp>
        </div>
      </section>

      <CtaBand
        headline={content.ctaBand.heading}
        subtext={content.ctaBand.body}
      />
    </main>
  );
}

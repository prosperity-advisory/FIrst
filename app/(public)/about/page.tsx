import type { Metadata } from "next";
import Image from "next/image";
import { InteriorHero } from "@/components/sections/InteriorHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { FadeUp } from "@/components/ui/FadeUp";
import { getAboutContent } from "@/lib/content";
import { getIcon } from "@/lib/icons";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getAboutContent();
  return {
    title: content.meta.title,
    description: content.meta.description,
    openGraph: {
      title: content.meta.ogTitle,
      description: content.meta.ogDescription,
    },
  };
}

const defaultFeatureIcons = ["shield", "star", "target", "users", "bar-chart", "target"];

export default async function AboutPage() {
  const content = await getAboutContent();
  return (
    <main>
      {content.hero && (
        <InteriorHero
          eyebrow={content.hero.eyebrow ?? "Our Mission & Who We Are"}
          headline={content.hero.headline}
          backgroundImage={content.hero.backgroundImage ?? "/images/Main Heading Image for about us-Our Mission page -JPG.JPG"}
        />
      )}

      {/* Mission */}
      {content.mission && (
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
                src={content.mission.image ?? "/images/Our Mission 2.0 JPG.JPG"}
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
      )}

      {/* Services List */}
      {content.ourServices && (
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
      )}

      {/* Trusted Partner */}
      {content.trustedPartner && (
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
              {content.features.map((feature: string, i: number) => (
                <div key={feature} className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-cream flex items-center justify-center shadow-[0_2px_12px_rgba(20,57,43,0.06)]">
                    <span className="w-6 h-6 md:w-7 md:h-7 text-gold [&>svg]:w-full [&>svg]:h-full [&>svg]:stroke-current [&>svg]:fill-none [&>svg]:stroke-[1.8] [&>svg]:[stroke-linecap:round] [&>svg]:[stroke-linejoin:round]">
                      {getIcon(defaultFeatureIcons[i])}
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
      )}

      {/* Tailored Solutions */}
      {content.tailored && (
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
      )}

      <CtaBand pageSlug="about" />
    </main>
  );
}

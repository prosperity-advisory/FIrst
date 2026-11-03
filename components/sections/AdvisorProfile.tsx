import Image from "next/image";
import { FadeUp } from "@/components/ui/FadeUp";

export interface AdviserProfileContent {
  heading: string;
  subtitle: string;
  tagline: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
}

export function AdvisorProfile({ profile }: { profile: AdviserProfileContent }) {
  return (
    <section
      id="meet-marcus"
      aria-labelledby="meet-marcus-heading"
      className="bg-white py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6 border-t border-border"
    >
      <div className="mx-auto max-w-[1200px] grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-10 md:gap-12 lg:gap-16 xl:gap-20 items-start">
        <FadeUp>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[360px] md:max-w-none overflow-hidden rounded-xl border border-border shadow-[0_18px_45px_rgba(15,61,46,0.14)]">
            <Image
              src={profile.image}
              alt={profile.imageAlt}
              fill
              sizes="(min-width: 1200px) 440px, (min-width: 768px) 38vw, 90vw"
              className="object-cover object-[50%_35%]"
            />
          </div>
          <div className="relative z-10 -mt-5 mr-3 flex justify-end">
            <div className="rounded-lg border border-border bg-white px-2.5 py-1.5 shadow-md">
              <Image
                src="/images/chfc-official-purple-shield.png"
                alt="Chartered Financial Consultant (ChFC) designation shield"
                width={132}
                height={106}
                className="h-auto w-[112px] sm:w-[124px]"
                sizes="124px"
              />
            </div>
          </div>
        </FadeUp>

        <div>
          <FadeUp delay={1}>
            <div className="w-12 sm:w-14 lg:w-[60px] h-[3px] bg-[#F4C050] mb-5" />
            <h2 id="meet-marcus-heading" className="section-headline text-[#0F3D2E] !mb-3">
              {profile.heading}
            </h2>
            <p className="font-sans text-[13px] sm:text-sm font-semibold uppercase tracking-[0.14em] text-[#0F3D2E]">
              {profile.subtitle}
            </p>
            <p className="mt-4 font-serif italic text-lg sm:text-xl text-slate leading-snug">
              {profile.tagline}
            </p>
          </FadeUp>

          <FadeUp delay={2}>
            <div className="mt-8 space-y-5 md:space-y-6">
              {profile.paragraphs.map((paragraph, index) => (
                <p key={`${index}-${paragraph.slice(0, 32)}`} className="text-base sm:text-[17px] md:text-lg text-slate leading-[1.8]">
                  {paragraph}
                </p>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

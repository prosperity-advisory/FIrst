import Image from "next/image";
import { FadeUp } from "@/components/ui/FadeUp";
import { getIcon } from "@/lib/icons";

interface TrustBadge {
  icon: React.ReactNode | string;
  label: string;
}

interface MissionSectionProps {
  eyebrow: string;
  headline: string;
  body: string;
  badges: TrustBadge[];
  image?: string;
  imageAlt?: string;
}

export function MissionSection({
  eyebrow,
  headline,
  body,
  badges,
  image,
  imageAlt = "Prosperity Planning & Advisory",
}: MissionSectionProps) {
  return (
    <section className="bg-cream py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6">
      <div className="mx-auto max-w-[1200px]">
        <div className={`grid grid-cols-1 ${image ? "md:grid-cols-[1fr_0.85fr] gap-8 md:gap-10 lg:gap-14 xl:gap-16 items-center" : ""}`}>
          <div className={image ? "text-center md:text-left" : "text-center"}>
            <FadeUp>
              <div className={`w-12 sm:w-14 lg:w-[60px] h-[3px] bg-gold ${image ? "mx-auto md:mx-0" : "mx-auto"} mb-4`} />
              <span className="eyebrow">{eyebrow}</span>
              <h2 className="section-headline">{headline}</h2>
            </FadeUp>

            <FadeUp delay={1}>
              <p className={`text-base sm:text-[17px] md:text-lg leading-[1.8] md:leading-[1.85] text-slate ${image ? "" : "max-w-[780px] mx-auto"} mb-10 md:mb-12 lg:mb-14`}>
                {body}
              </p>
            </FadeUp>

            <FadeUp delay={2}>
              <div className={`flex flex-col xs:flex-row xs:flex-wrap ${image ? "justify-center md:justify-start" : "justify-center"} items-start xs:items-center gap-5 xs:gap-6 md:gap-9 pl-6 xs:pl-0`}>
                {badges.map((badge) => (
                  <div key={badge.label} className="flex items-center gap-3.5 w-full xs:w-auto">
                    <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-[0_2px_12px_rgba(20,57,43,0.06)]">
                      <span className="w-5 h-5 md:w-[22px] md:h-[22px] text-gold [&>svg]:w-full [&>svg]:h-full [&>svg]:stroke-current [&>svg]:fill-none [&>svg]:stroke-[1.8] [&>svg]:[stroke-linecap:round] [&>svg]:[stroke-linejoin:round]">
                        {typeof badge.icon === "string" ? getIcon(badge.icon) : badge.icon}
                      </span>
                    </div>
                    <span className="font-semibold text-sm md:text-[15px] text-navy">
                      {badge.label}
                    </span>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>

          {image && (
            <FadeUp delay={2}>
              <div className="relative rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(20,57,43,0.12)] max-h-[280px] xs:max-h-[320px] sm:max-h-[360px] md:max-h-none">
                <Image
                  src={image}
                  alt={imageAlt}
                  width={560}
                  height={400}
                  className="w-full h-full object-cover rounded-xl"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 45vw"
                />
              </div>
            </FadeUp>
          )}
        </div>
      </div>
    </section>
  );
}

import { FadeUp } from "@/components/ui/FadeUp";

interface TrustBadge {
  icon: React.ReactNode;
  label: string;
}

interface MissionSectionProps {
  eyebrow: string;
  headline: string;
  body: string;
  badges: TrustBadge[];
}

export function MissionSection({
  eyebrow,
  headline,
  body,
  badges,
}: MissionSectionProps) {
  return (
    <section className="bg-cream py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6">
      <div className="mx-auto max-w-[1200px] text-center">
        <FadeUp>
          {/* Gold divider */}
          <div className="w-12 sm:w-14 lg:w-[60px] h-[3px] bg-gold mx-auto mb-4" />
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="section-headline">{headline}</h2>
        </FadeUp>

        <FadeUp delay={1}>
          <p className="text-base sm:text-[17px] md:text-lg leading-[1.8] md:leading-[1.85] text-slate max-w-[780px] mx-auto mb-10 md:mb-12 lg:mb-14">
            {body}
          </p>
        </FadeUp>

        <FadeUp delay={2}>
          <div className="flex flex-col xs:flex-row xs:flex-wrap justify-center items-center gap-5 xs:gap-6 md:gap-9">
            {badges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-3.5">
                <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-[0_2px_12px_rgba(20,57,43,0.06)]">
                  <span className="w-5 h-5 md:w-[22px] md:h-[22px] text-gold [&>svg]:w-full [&>svg]:h-full [&>svg]:stroke-current [&>svg]:fill-none [&>svg]:stroke-[1.8] [&>svg]:[stroke-linecap:round] [&>svg]:[stroke-linejoin:round]">
                    {badge.icon}
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
    </section>
  );
}

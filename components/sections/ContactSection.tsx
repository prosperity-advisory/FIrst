import { FadeUp } from "@/components/ui/FadeUp";

interface ContactDetail {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}

interface ContactSectionProps {
  eyebrow: string;
  headline: string;
  details: ContactDetail[];
  ctaText: string;
  ctaHref?: string;
  mapLabel: string;
  mapSublabel: string;
}

export function ContactSection({
  eyebrow,
  headline,
  details,
  ctaText,
  ctaHref = "/contact",
  mapLabel,
  mapSublabel,
}: ContactSectionProps) {
  return (
    <section className="bg-white py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6">
      <div className="mx-auto max-w-[1200px] grid grid-cols-1 md:grid-cols-2 gap-9 sm:gap-12 lg:gap-14 xl:gap-16 items-center">
        {/* Contact info */}
        <FadeUp>
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="font-serif text-[28px] sm:text-[32px] md:text-[36px] lg:text-[clamp(32px,3.5vw,40px)] font-semibold text-navy mb-6 lg:mb-7">
            {headline}
          </h2>

          <div className="flex flex-col gap-[18px] lg:gap-5 mb-7 lg:mb-9">
            {details.map((detail) => (
              <div key={detail.label} className="flex items-start gap-3.5">
                <div className="w-[38px] h-[38px] lg:w-10 lg:h-10 bg-cream rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <span className="w-[17px] h-[17px] lg:w-[18px] lg:h-[18px] text-gold [&>svg]:w-full [&>svg]:h-full [&>svg]:stroke-current [&>svg]:fill-none [&>svg]:stroke-2 [&>svg]:[stroke-linecap:round] [&>svg]:[stroke-linejoin:round]">
                    {detail.icon}
                  </span>
                </div>
                <div className="text-sm lg:text-[15px] text-slate leading-relaxed">
                  <strong className="block font-semibold text-navy text-[13px] lg:text-sm mb-0.5">
                    {detail.label}
                  </strong>
                  {detail.value}
                </div>
              </div>
            ))}
          </div>

          <a href={ctaHref} className="btn btn-gold">
            {ctaText}
          </a>
        </FadeUp>

        {/* Map placeholder */}
        <FadeUp delay={1}>
          <div className="relative bg-cream rounded-xl border border-border h-60 xs:h-[280px] sm:h-[320px] md:h-[360px] lg:h-[400px] flex flex-col items-center justify-center gap-3 overflow-hidden">
            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, transparent calc(100% - 1px), var(--color-border) calc(100% - 1px)), linear-gradient(0deg, transparent calc(100% - 1px), var(--color-border) calc(100% - 1px))",
                backgroundSize: "60px 60px",
              }}
            />

            {/* Pin */}
            <div className="relative z-[1]">
              <svg
                viewBox="0 0 24 24"
                className="w-10 h-10 md:w-12 md:h-12 fill-gold drop-shadow-[0_4px_8px_rgba(201,168,76,0.3)]"
              >
                <path d="M12 0C7.03 0 3 4.03 3 9c0 7.5 9 15 9 15s9-7.5 9-15c0-4.97-4.03-9-9-9zm0 12.75a3.75 3.75 0 1 1 0-7.5 3.75 3.75 0 0 1 0 7.5z" />
              </svg>
            </div>
            <span className="relative z-[1] font-semibold text-navy text-[15px] lg:text-base">
              {mapLabel}
            </span>
            <span className="relative z-[1] text-xs lg:text-[13px] text-slate-light">
              {mapSublabel}
            </span>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

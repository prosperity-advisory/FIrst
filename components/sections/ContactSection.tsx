import Image from "next/image";
import { FadeUp } from "@/components/ui/FadeUp";
import { CalendlyButton } from "@/components/ui/CalendlyButton";
import { getIcon } from "@/lib/icons";

interface ContactDetail {
  icon: React.ReactNode | string;
  label: string;
  value: React.ReactNode | string;
  href?: string | null;
}

interface ContactSectionProps {
  eyebrow: string;
  headline: string;
  details: ContactDetail[];
  ctaText: string;
  ctaHref?: string;
  mapLabel: string;
  mapSublabel: string;
  image?: string;
  imageAlt?: string;
}

function renderDetailValue(detail: ContactDetail): React.ReactNode {
  if (typeof detail.value !== "string") return detail.value;
  // If there's an href, wrap in a link
  if (detail.href) {
    return (
      <a href={detail.href} className="text-gold hover:text-gold-light transition-colors">
        {detail.value}
      </a>
    );
  }
  // Multi-line values (address) — split on newlines
  const val = detail.value as string;
  if (val.includes("\n")) {
    const lines = val.split("\n");
    return lines.map((line, i) => (
      <span key={i}>
        {line}
        {i < lines.length - 1 && <br />}
      </span>
    ));
  }
  return detail.value;
}

function renderIcon(icon: React.ReactNode | string): React.ReactNode {
  if (typeof icon === "string") return getIcon(icon) ?? icon;
  return icon;
}

export function ContactSection({
  eyebrow,
  headline,
  details,
  ctaText,
  ctaHref = "/contact",
  mapLabel,
  mapSublabel,
  image,
  imageAlt = "Prosperity Planning & Advisory office",
}: ContactSectionProps) {
  return (
    <section className="bg-white py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6">
      <div className="mx-auto max-w-[1200px] grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-9 lg:gap-14 xl:gap-16 items-center">
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
                    {renderIcon(detail.icon)}
                  </span>
                </div>
                <div className="text-sm lg:text-[15px] text-slate leading-relaxed">
                  <strong className="block font-semibold text-navy text-[13px] lg:text-sm mb-0.5">
                    {detail.label}
                  </strong>
                  {renderDetailValue(detail)}
                </div>
              </div>
            ))}
          </div>

          {ctaHref.includes("calendly.com") ? (
            <CalendlyButton url={ctaHref} className="btn btn-gold">
              {ctaText}
            </CalendlyButton>
          ) : (
            <a href={ctaHref} className="btn btn-gold">
              {ctaText}
            </a>
          )}
        </FadeUp>

        {/* Office image or map placeholder */}
        <FadeUp delay={1}>
          {image ? (
            <div className="relative rounded-xl overflow-hidden shadow-[0_16px_48px_rgba(20,57,43,0.10)] max-h-[240px] xs:max-h-[280px] sm:max-h-[320px] md:max-h-none">
              <Image
                src={image}
                alt={imageAlt}
                width={680}
                height={453}
                className="w-full h-full object-cover rounded-xl"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute bottom-0 inset-x-0 bg-linear-to-t from-navy/60 to-transparent p-4 sm:p-5">
                <span className="font-semibold text-white text-sm sm:text-[15px]">
                  {mapLabel}
                </span>
                <span className="block text-xs text-white/80 mt-0.5">
                  {mapSublabel}
                </span>
              </div>
            </div>
          ) : (
            <div className="relative bg-cream rounded-xl border border-border h-56 xs:h-[260px] sm:h-[300px] md:h-[360px] lg:h-[400px] flex flex-col items-center justify-center gap-3 overflow-hidden">
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, transparent calc(100% - 1px), var(--color-border) calc(100% - 1px)), linear-gradient(0deg, transparent calc(100% - 1px), var(--color-border) calc(100% - 1px))",
                  backgroundSize: "60px 60px",
                }}
              />
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
          )}
        </FadeUp>
      </div>
    </section>
  );
}

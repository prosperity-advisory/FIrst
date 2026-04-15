import Image from "next/image";
import { FadeUp } from "@/components/ui/FadeUp";
import { CalendlyButton } from "@/components/ui/CalendlyButton";

interface BulletGroup {
  heading?: string;
  bullets?: { text: string }[];
}

interface Props {
  anchorId: string;
  eyebrow?: string;
  headline: string;
  intro?: string;
  groups?: BulletGroup[];
  closing?: string;
  notes?: { text: string }[];
  ctaText?: string;
  ctaHref?: string;
  image?: string;
  imageAlt?: string;
  imageSide?: "left" | "right";
  background?: "white" | "cream";
}

export function ClarityDetailBlock({
  anchorId,
  eyebrow,
  headline,
  intro,
  groups,
  closing,
  notes,
  ctaText,
  ctaHref,
  image,
  imageAlt,
  imageSide = "right",
  background = "white",
}: Props) {
  const bg = background === "cream" ? "bg-cream" : "bg-white";
  const textOrder = imageSide === "left" ? "lg:order-2" : "lg:order-1";
  const imageOrder = imageSide === "left" ? "lg:order-1" : "lg:order-2";

  return (
    <section
      id={anchorId}
      className={`${bg} py-16 md:py-20 lg:py-28 px-4 sm:px-6 scroll-mt-24`}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-start">
          <div className={`order-2 ${textOrder}`}>
            <FadeUp>
              {eyebrow && (
                <p className="font-sans text-xs md:text-[13px] font-semibold tracking-[0.25em] uppercase text-gold mb-3">
                  {eyebrow}
                </p>
              )}
              <h2 className="font-serif text-[26px] sm:text-[30px] md:text-[36px] lg:text-[40px] font-bold text-navy leading-tight mb-5">
                {headline}
              </h2>
              {intro && (
                <p className="text-[15px] md:text-[17px] text-slate leading-relaxed mb-7">
                  {intro}
                </p>
              )}

              {groups && groups.length > 0 && (
                <div className="space-y-6">
                  {groups.map((g, i) => (
                    <div key={i}>
                      {g.heading && (
                        <h3 className="font-serif text-[18px] md:text-[20px] font-bold text-navy mb-3">
                          {g.heading}
                        </h3>
                      )}
                      {g.bullets && g.bullets.length > 0 && (
                        <ul className="space-y-2.5">
                          {g.bullets.map((b, j) => (
                            <li key={j} className="flex items-start gap-3 text-[14px] md:text-[15px] text-slate leading-relaxed">
                              <span className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-gold" />
                              <span>{b.text}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {closing && (
                <p className="mt-7 text-[15px] md:text-[17px] text-slate leading-relaxed">
                  {closing}
                </p>
              )}

              {notes && notes.length > 0 && (
                <div className="mt-6 pt-5 border-t border-border space-y-2">
                  {notes.map((n, i) => (
                    <p key={i} className="text-[12px] md:text-[13px] text-slate-light italic leading-relaxed">
                      {n.text}
                    </p>
                  ))}
                </div>
              )}

              {ctaText && (
                <div className="mt-8">
                  <CalendlyButton url={ctaHref || undefined} className="btn btn-gold">
                    {ctaText}
                  </CalendlyButton>
                </div>
              )}
            </FadeUp>
          </div>

          {image && (
            <div className={`order-1 ${imageOrder}`}>
              <FadeUp delay={1}>
                <div className="relative aspect-[5/4] sm:aspect-[4/3] lg:aspect-[4/5] max-w-[500px] mx-auto">
                  <div className="hidden sm:block absolute -bottom-4 -left-4 w-full h-full border-2 border-gold/50 rounded-lg pointer-events-none" />
                  <div className="relative w-full h-full rounded-lg overflow-hidden shadow-[0_16px_48px_rgba(20,57,43,0.15)]">
                    <Image
                      src={image}
                      alt={imageAlt || ""}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 500px, 100vw"
                    />
                  </div>
                </div>
              </FadeUp>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

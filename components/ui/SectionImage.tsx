import Image from "next/image";
import { FadeUp } from "@/components/ui/FadeUp";

export interface SectionImageData {
  url: string;
  alt?: string;
  caption?: string;
  layout?: "inline-left" | "inline-right" | "featured-above" | "featured-below";
}

/**
 * Renders an optional section image in one of four layouts:
 * - inline-left: Image floats left, content wraps right (article style)
 * - inline-right: Image floats right, content wraps left (article style)
 * - featured-above: Full-width centered image above children
 * - featured-below: Full-width centered image below children
 *
 * When no image is provided, renders children only.
 */
export function SectionImage({
  image,
  children,
}: {
  image?: SectionImageData | null;
  children: React.ReactNode;
}) {
  if (!image?.url) return <>{children}</>;

  const layout = image.layout || "featured-below";

  const imageBlock = (
    <FadeUp>
      <figure className="my-0">
        <div className="relative overflow-hidden rounded-lg">
          <Image
            src={image.url}
            alt={image.alt || ""}
            width={1200}
            height={800}
            className={`w-full h-auto object-cover ${
              layout.startsWith("inline")
                ? "max-h-[360px] md:max-h-[420px]"
                : "max-h-[480px]"
            }`}
            sizes={
              layout.startsWith("inline")
                ? "(max-width: 768px) 100vw, 45vw"
                : "(max-width: 1200px) 100vw, 1200px"
            }
          />
        </div>
        {image.caption && (
          <figcaption className="text-xs text-slate-light italic mt-2.5 text-center">
            {image.caption}
          </figcaption>
        )}
      </figure>
    </FadeUp>
  );

  // Featured layouts — image stacked above or below content
  if (layout === "featured-above") {
    return (
      <div className="space-y-8 md:space-y-10">
        {imageBlock}
        {children}
      </div>
    );
  }

  if (layout === "featured-below") {
    return (
      <div className="space-y-8 md:space-y-10">
        {children}
        {imageBlock}
      </div>
    );
  }

  // Inline layouts — image alongside content, article style
  const isLeft = layout === "inline-left";

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-8 md:gap-10 lg:gap-12 items-start">
      <div className={isLeft ? "order-2 md:order-1" : "order-2"}>
        {imageBlock}
      </div>
      <div className={isLeft ? "order-1 md:order-2" : "order-1"}>
        {children}
      </div>
    </div>
  );
}

/**
 * Standalone image block section — used between other sections.
 */
export function ImageBlockSection({
  image,
  background = "white",
}: {
  image: SectionImageData;
  background?: "white" | "cream";
}) {
  if (!image?.url) return null;

  return (
    <section className={`${background === "cream" ? "bg-cream" : "bg-white"} py-10 xs:py-12 sm:py-14 md:py-16 lg:py-20 px-4 sm:px-6`}>
      <div className="mx-auto max-w-[1000px]">
        <FadeUp>
          <figure>
            <div className="relative overflow-hidden rounded-xl shadow-[0_4px_24px_rgba(20,57,43,0.08)]">
              <Image
                src={image.url}
                alt={image.alt || ""}
                width={1200}
                height={800}
                className="w-full h-auto object-cover"
                sizes="(max-width: 1200px) 100vw, 1000px"
              />
            </div>
            {image.caption && (
              <figcaption className="text-xs md:text-[13px] text-slate-light italic mt-3 text-center max-w-[600px] mx-auto">
                {image.caption}
              </figcaption>
            )}
          </figure>
        </FadeUp>
      </div>
    </section>
  );
}

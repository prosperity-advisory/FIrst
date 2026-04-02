import { CalendlyButton } from "@/components/ui/CalendlyButton";
import { getPage, getSiteSettings } from "@/lib/content-db";

interface CtaBandProps {
  /** Page slug — used to look up a page-level cta_band section override */
  pageSlug?: string;
  /** Direct overrides (take priority over DB values) */
  headline?: string;
  subtext?: string;
  ctaText?: string;
  ctaHref?: string;
}

const DEFAULTS = {
  headline: "Create Your Financial Plan With Us",
  subtext:
    "No question is too small when it comes to your future. Talk to an adviser today and make confident financial decisions.",
  ctaText: "Schedule Your Complimentary Strategy Review \u2192",
  ctaHref: "https://calendly.com/prosperityplanningandadvisory/clarity-session",
};

export async function CtaBand({
  pageSlug,
  headline,
  subtext,
  ctaText,
  ctaHref,
}: CtaBandProps = {}) {
  // 1. Try page-specific cta_band section from DB
  let dbBand: Record<string, string> | null = null;
  if (pageSlug !== undefined) {
    const page = await getPage(pageSlug);
    const section = page?.section("cta_band");
    if (section && Object.keys(section).length > 0) {
      dbBand = section as Record<string, string>;
    }
  }

  // 2. Try site-wide cta_band_defaults from settings
  let siteDefaults: Record<string, string> | null = null;
  const settings = await getSiteSettings();
  if (settings?.cta_band_defaults) {
    siteDefaults = settings.cta_band_defaults as Record<string, string>;
  }

  // 3. Resolve: prop override > page section > site defaults > hardcoded
  const h = headline ?? dbBand?.headline ?? siteDefaults?.headline ?? DEFAULTS.headline;
  const s = subtext ?? dbBand?.subtext ?? siteDefaults?.subtext ?? DEFAULTS.subtext;
  const ct = ctaText ?? dbBand?.ctaText ?? siteDefaults?.ctaText ?? DEFAULTS.ctaText;
  const ch = ctaHref ?? dbBand?.ctaHref ?? siteDefaults?.ctaHref ?? DEFAULTS.ctaHref;

  return (
    <section className="bg-linear-to-br from-gold to-gold-light py-12 md:py-16 lg:py-[clamp(56px,6vw,88px)] px-4 md:px-6 text-center">
      <div className="mx-auto max-w-[680px]">
        <h2 className="font-serif text-[24px] xs:text-[26px] sm:text-[30px] md:text-[34px] lg:text-[38px] xl:text-[42px] text-navy mb-3.5">
          {h}
        </h2>
        <p className="text-[15px] md:text-base lg:text-[17px] text-navy/80 mb-7 md:mb-9 leading-relaxed">
          {s}
        </p>
        <CalendlyButton url={ch} className="btn btn-navy">
          {ct}
        </CalendlyButton>
      </div>
    </section>
  );
}

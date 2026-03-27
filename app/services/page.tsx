import type { Metadata } from "next";
import { InteriorHero } from "@/components/sections/InteriorHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { CtaBand } from "@/components/sections/CtaBand";
import { getServicesContent } from "@/lib/content";

const content = getServicesContent();

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
  openGraph: {
    title: content.meta.ogTitle,
    description: content.meta.ogDescription,
  },
};

export default function ServicesPage() {
  const sections = content.sections;

  return (
    <main>
      <InteriorHero
        eyebrow={content.hero.subheadline}
        headline={content.hero.headline}
        subtitle={content.hero.body}
      />

      {/* Retirement Planning */}
      <ServiceDetail
        id="retirement"
        heading={sections[0].heading}
        body={sections[0].body}
        items={sections[0].items as string[] | undefined}
        outro={sections[0].outro as string | undefined}
        ctaText="Learn More →"
        ctaHref="/planning"
        variant="white"
      />

      {/* Comprehensive Financial Planning */}
      <ServiceDetail
        heading={sections[1].heading}
        body={sections[1].body}
        variant="cream"
      />

      {/* Business & Retirement Strategy */}
      <ServiceDetail
        id="business"
        heading={sections[2].heading}
        body={sections[2].body}
        subsections={sections[2].subsections}
        disclaimers={sections[2].disclaimer ? [sections[2].disclaimer] : undefined}
        variant="white"
      />

      {/* Investment & Portfolio Strategies */}
      <ServiceDetail
        heading={sections[3].heading}
        body={`${sections[3].body} ${sections[3].detail ?? ""} ${sections[3].detail2 ?? ""} ${sections[3].detail3 ?? ""}`}
        ctaText="See Portfolios →"
        ctaHref="/portfolios"
        variant="cream"
      />

      {/* Tax-Efficient Strategies */}
      <ServiceDetail
        heading={sections[4].heading}
        body={sections[4].body}
        variant="white"
      />

      {/* Insurance & Retirement Education */}
      <ServiceDetail
        heading={sections[5].heading}
        body={`${sections[5].body} ${sections[5].detail ?? ""} ${sections[5].detail2 ?? ""} ${sections[5].detail3 ?? ""}`}
        disclaimers={sections[5].disclaimer ? [sections[5].disclaimer] : undefined}
        variant="cream"
      />

      {/* Advanced Tax & Legacy Planning */}
      <ServiceDetail
        id="legacy"
        heading={sections[6].heading}
        body={`${sections[6].body} ${sections[6].intro ?? ""}`}
        items={(sections[6].items as { title: string; body: string }[] | undefined)?.map(
          (item) => `${item.title}: ${item.body}`
        )}
        disclaimers={sections[6].disclaimers as string[] | undefined}
        variant="white"
      />

      {/* Spending Strategy */}
      <ServiceDetail
        heading={sections[7].heading}
        body={sections[7].body}
        ctaText="Learn More →"
        ctaHref="/planning"
        variant="cream"
      />

      <CtaBand
        headline={content.ctaBand.heading}
        subtext={content.ctaBand.body}
      />
    </main>
  );
}

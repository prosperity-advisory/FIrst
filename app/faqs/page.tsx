import type { Metadata } from "next";
import { InteriorHero } from "@/components/sections/InteriorHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Accordion } from "@/components/ui/Accordion";
import { FadeUp } from "@/components/ui/FadeUp";
import { getFaqsContent } from "@/lib/content";

const content = getFaqsContent();

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
  openGraph: {
    title: content.meta.ogTitle,
    description: content.meta.ogDescription,
  },
};

export default function FaqsPage() {
  return (
    <main>
      <InteriorHero
        eyebrow={content.hero.eyebrow}
        headline={content.hero.headline}
        subtitle={content.hero.subheadline}
      />

      <section className="bg-cream py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6">
        <div className="mx-auto max-w-[800px]">
          <FadeUp>
            <Accordion items={content.questions} />
          </FadeUp>
        </div>
      </section>

      <CtaBand
        headline={content.ctaBand.heading}
        subtext={content.ctaBand.body}
      />
    </main>
  );
}

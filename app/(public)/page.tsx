import { HeroSection } from "@/components/sections/HeroSection";
import { MissionSection } from "@/components/sections/MissionSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { BusinessOwnerAccordion } from "@/components/sections/BusinessOwnerAccordion";
import { ContactSection } from "@/components/sections/ContactSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { getHomeContent } from "@/lib/content";

export default async function Home() {
  const content = await getHomeContent();
  return (
    <main>
      <HeroSection
        eyebrow={content.hero.eyebrow ?? "Your Fiduciary Partner"}
        headline={content.hero.headline ?? "Your Financial Plan<br/>Starts Here."}
        subheadline={content.hero.subheadline ?? "Clarity. Confidence. Control. — A Financial Planner & Adviser proudly serving with integrity, where your best interest isn't just a commitment, it's our standard."}
        ctaText={content.hero.ctaText ?? "Schedule Your Complimentary Strategy Review →"}
        ctaHref={content.hero.ctaHref}
        backgroundImage={content.hero.backgroundImage ?? "/images/Hero 3 blank.jpg"}
      />

      <MissionSection
        eyebrow={content.mission.eyebrow ?? "Our Mission"}
        headline={content.mission.headline ?? "Welcome to Prosperity Planning"}
        body={content.mission.body ?? "At Prosperity Planning & Advisory, we partner with individuals and small business owners to work toward their financial goals with achievable strategies. As a fiduciary firm, we are legally and ethically committed to putting your best interests first in every recommendation we make. Whether you're preparing for retirement, building wealth, or strengthening your business, we deliver professional guidance and ongoing support."}
        badges={content.mission.badges?.length > 0 ? content.mission.badges : [
          { label: "Fiduciary Standard", icon: "shield" },
          { label: "Clear & Transparent Pricing", icon: "dollar" },
          { label: "Personalized Strategies", icon: "users" },
        ]}
        image={content.mission.image ?? "/images/Replacement for lady on home page 2 jpg.JPG"}
        imageAlt={content.mission.imageAlt ?? "Financial advisor walking a path toward the future at sunrise"}
      />

      <ProcessSection
        eyebrow={content.process.eyebrow ?? "The Road to Prosperity"}
        headline={content.process.headline ?? "Your Journey to Financial Clarity"}
        subtitle={content.process.subtitle ?? "We guide every client through a structured six-step process designed to build confidence and keep every decision intentional."}
        steps={content.process.steps?.length > 0 ? content.process.steps : [
          { title: "Initial Meeting", description: "Understanding your goals and priorities" },
          { title: "Discovery", description: "Uncovering your full financial picture" },
          { title: "Design", description: "Crafting tailored strategies for your situation" },
          { title: "Recommend", description: "Presenting a clear path forward" },
          { title: "Implement", description: "Putting strategies into action with care" },
          { title: "Follow-Up", description: "Ongoing support as life evolves" },
        ]}
        ctaText={content.process.ctaText ?? "Discover Our Six Step Process →"}
        ctaHref={content.process.ctaHref ?? "/process"}
        bannerImage={content.process.bannerImage ?? "/images/Process google final.jpg"}
        bannerAlt={content.process.bannerAlt ?? "The six-step road to prosperity financial planning process"}
      />

      <ServicesGrid
        eyebrow={content.services.eyebrow}
        headline={content.services.heading}
        body={content.services.body}
        categories={content.services.categories}
        nextSteps={content.services.nextSteps}
      />

      <BusinessOwnerAccordion
        heading={content.businessOwner?.heading}
        body={content.businessOwner?.body}
        ctaText={content.businessOwner?.ctaText}
        ctaHref={content.businessOwner?.ctaHref}
        learnMoreText={content.businessOwner?.learnMoreText}
        learnMoreHref={content.businessOwner?.learnMoreHref}
        relevanceItemsOverride={content.businessOwner?.relevanceItems?.length ? content.businessOwner.relevanceItems : undefined}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        sectionsOverride={content.businessOwner?.sections?.length ? content.businessOwner.sections as any : undefined}
      />

      <ContactSection
        eyebrow={content.contact.eyebrow ?? "Get In Touch"}
        headline={content.contact.headline ?? "Woodland Hills Office Visits by Appointment"}
        details={content.contact.details?.length > 0 ? content.contact.details : [
          { label: "Address", icon: "map-pin", value: "21255 Burbank Boulevard, Suite 120\nWoodland Hills, CA 91367" },
          { label: "Phone", icon: "phone", value: "888-427-5240", href: "tel:888-427-5240" },
          { label: "Email", icon: "mail", value: "help@prosperityadvisory.net", href: "mailto:help@prosperityadvisory.net" },
        ]}
        ctaText={content.contact.ctaText ?? "Contact Us →"}
        ctaHref={content.contact.ctaHref}
        mapLabel={content.contact.mapLabel ?? "Woodland Hills, CA"}
        mapSublabel={content.contact.mapSublabel ?? "21255 Burbank Blvd, Suite 120"}
        image={content.contact.image ?? "/images/Front building.jpg"}
        imageAlt={content.contact.imageAlt ?? "Prosperity Planning & Advisory office in Woodland Hills, CA"}
      />

      <CtaBand />
    </main>
  );
}

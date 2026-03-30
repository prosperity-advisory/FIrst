import { HeroSection } from "@/components/sections/HeroSection";
import { MissionSection } from "@/components/sections/MissionSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ContactSection } from "@/components/sections/ContactSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { getHomeContent } from "@/lib/content";

const content = getHomeContent();

export default function Home() {
  return (
    <main>
      <HeroSection
        eyebrow="Your Fiduciary Partner"
        headline="Your Financial Plan<br/>Starts Here."
        subheadline="Clarity. Confidence. Control. — A Financial Planner & Adviser proudly serving with integrity, where your best interest isn't just a commitment, it's our standard."
        ctaText="Schedule Your Complimentary Strategy Review →"
        backgroundImage="/images/Hero 3 blank.jpg"
      />

      <MissionSection
        eyebrow="Our Mission"
        headline="Welcome to Prosperity Planning"
        body="At Prosperity Planning & Advisory, we partner with individuals and small business owners to work toward their financial goals with achievable strategies. As a fiduciary firm, we are legally and ethically committed to putting your best interests first in every recommendation we make. Whether you're preparing for retirement, building wealth, or strengthening your business, we deliver professional guidance and ongoing support."
        badges={[
          {
            label: "Fiduciary Standard",
            icon: (
              <svg viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            ),
          },
          {
            label: "Fee-Based Planning",
            icon: (
              <svg viewBox="0 0 24 24">
                <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            ),
          },
          {
            label: "Personalized Strategies",
            icon: (
              <svg viewBox="0 0 24 24">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            ),
          },
        ]}
        image="/images/Replacement for lady on home page 2 jpg.JPG"
        imageAlt="Financial advisor walking a path toward the future at sunrise"
      />

      <ProcessSection
        eyebrow="The Road to Prosperity"
        headline="Your Journey to Financial Clarity"
        subtitle="We guide every client through a structured six-step process designed to build confidence and keep every decision intentional."
        steps={[
          {
            title: "Initial Meeting",
            description: "Understanding your goals and priorities",
          },
          {
            title: "Discovery",
            description: "Uncovering your full financial picture",
          },
          {
            title: "Design",
            description: "Crafting tailored strategies for your situation",
          },
          {
            title: "Recommend",
            description: "Presenting a clear path forward",
          },
          {
            title: "Implement",
            description: "Putting strategies into action with care",
          },
          {
            title: "Follow-Up",
            description: "Ongoing support as life evolves",
          },
        ]}
        ctaText="Discover Our Six Step Process →"
        ctaHref="/process"
        bannerImage="/images/Process google final.jpg"
        bannerAlt="The six-step road to prosperity financial planning process"
      />

      <ServicesGrid
        eyebrow={content.services.eyebrow}
        headline={content.services.heading}
        body={content.services.body}
        categories={content.services.categories}
        nextSteps={content.services.nextSteps}
      />

      <ContactSection
        eyebrow="Get In Touch"
        headline="Woodland Hills Office Visits by Appointment"
        details={[
          {
            label: "Address",
            icon: (
              <svg viewBox="0 0 24 24">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            ),
            value: (
              <>
                21255 Burbank Boulevard, Suite 120
                <br />
                Woodland Hills, CA 91367
              </>
            ),
          },
          {
            label: "Phone",
            icon: (
              <svg viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            ),
            value: "888-427-5240",
          },
          {
            label: "Email",
            icon: (
              <svg viewBox="0 0 24 24">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            ),
            value: (
              <a
                href="mailto:help@prosperityadvisory.net"
                className="text-gold hover:text-gold-light transition-colors"
              >
                help@prosperityadvisory.net
              </a>
            ),
          },
        ]}
        ctaText="Contact Us →"
        mapLabel="Woodland Hills, CA"
        mapSublabel="21255 Burbank Blvd, Suite 120"
        image="/images/Front building.jpg"
        imageAlt="Prosperity Planning & Advisory office in Woodland Hills, CA"
      />

      <CtaBand />
    </main>
  );
}

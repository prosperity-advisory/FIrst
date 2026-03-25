import { HeroSection } from "@/components/sections/HeroSection";
import { MissionSection } from "@/components/sections/MissionSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { AdvancedStrategies } from "@/components/sections/AdvancedStrategies";
import { ContactSection } from "@/components/sections/ContactSection";
import { CtaBand } from "@/components/sections/CtaBand";

export default function Home() {
  return (
    <main>
      <HeroSection
        eyebrow="Your Fiduciary Partner"
        headline="Your Financial Plan<br/>Starts Here."
        subheadline="Clarity. Confidence. Control. — A Financial Planner & Adviser proudly serving with integrity, where your best interest isn't just a commitment, it's our standard."
        ctaText="Schedule Your Complimentary Strategy Review →"
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
        ctaText="Start Your Journey →"
      />

      <ServicesGrid
        eyebrow="Professional Financial Services"
        headline="Comprehensive Financial Planning Solutions"
        services={[
          {
            icon: (
              <svg viewBox="0 0 24 24">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            ),
            title: "Comprehensive Financial Planning",
            description:
              "Full-spectrum planning covering investment, retirement, tax-efficient strategies, and estate planning — all tailored to your unique situation.",
            href: "/services",
          },
          {
            icon: (
              <svg viewBox="0 0 24 24">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            ),
            title: "Investment Management",
            description:
              "Strategies aimed at growing your wealth while managing risk, keeping your portfolio aligned with your long-term financial goals.",
            href: "/portfolios",
          },
          {
            icon: (
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            ),
            title: "Strategic Retirement Planning",
            description:
              "More than saving — confident decisions around income, risk, and long-term flexibility so your retirement adapts as life evolves.",
            href: "/planning",
          },
          {
            icon: (
              <svg viewBox="0 0 24 24">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            ),
            title: "Estate & Legacy Planning",
            description:
              "Protect your wealth and align it with your wishes. We work alongside you and your trusted professionals to design strategies that reflect your values.",
            href: "/services",
          },
          {
            icon: (
              <svg viewBox="0 0 24 24">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            ),
            title: "Small Business Planning",
            description:
              "Strategies that strengthen both business and personal financial health — cash flow, retirement plans, tax-efficient structures, and growth planning.",
            href: "/services",
          },
          {
            icon: (
              <svg viewBox="0 0 24 24">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            ),
            title: "Spending Strategy & Budgeting",
            description:
              "Take control of your cash flow with a clear, personalized spending strategy using our zero-based budgeting approach.",
            href: "/planning",
          },
        ]}
      />

      <AdvancedStrategies
        eyebrow="Advanced Capabilities"
        headline="Strategic Planning for Business Owners & Investors"
        subtitle="Education for complex decisions, designed to support long-term clarity and flexibility."
        strategies={[
          [
            "Tax-aware income & exit planning",
            "Ownership transition & succession",
            "Executive retention strategies",
            "Structured Installment Sales",
          ],
          [
            "Charitable Remainder Trusts (CRTs)",
            "DST 1031 Exchange Strategies",
            "Qualified retirement & benefit plans",
            "Non-qualified deferred compensation",
          ],
        ]}
        disclaimer="Our role is to help you understand your options, trade-offs, and planning considerations as part of a comprehensive financial plan. We do not provide legal or tax advice."
        ctaText="Explore Advanced Strategies →"
      />

      <ContactSection
        eyebrow="Get In Touch"
        headline="Visit Our Office"
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
                href="mailto:info@prosperityadvisory.net"
                className="text-gold hover:text-gold-light transition-colors"
              >
                info@prosperityadvisory.net
              </a>
            ),
          },
        ]}
        ctaText="Contact Us →"
        mapLabel="Woodland Hills, CA"
        mapSublabel="21255 Burbank Blvd, Suite 120"
      />

      <CtaBand />
    </main>
  );
}

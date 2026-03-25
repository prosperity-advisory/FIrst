import { CtaBand } from "@/components/sections/CtaBand";

export default function Home() {
  return (
    <main>
      <section className="relative min-h-dvh flex items-center justify-center bg-linear-to-br from-hero-from to-hero-to overflow-hidden text-center px-4 pt-[88px] pb-14 md:px-6 md:pt-[100px] md:pb-[72px] lg:pt-[120px] lg:pb-20">
        {/* Decorative elements — desktop only */}
        <div className="hidden lg:block absolute -top-[10%] -right-[5%] w-[500px] h-[500px] xl:w-[600px] xl:h-[600px] border border-gold/[0.08] rounded-full pointer-events-none" />
        <div className="hidden lg:block absolute -bottom-[15%] -left-[8%] w-[650px] h-[650px] xl:w-[800px] xl:h-[800px] border border-gold/[0.06] rounded-full pointer-events-none" />

        <div className="relative z-[2] max-w-[800px] xl:max-w-[860px]">
          <p className="font-sans text-[11px] xs:text-xs md:text-[13px] font-semibold tracking-[0.25em] uppercase text-gold mb-5 xl:mb-7 animate-[heroFadeIn_0.8s_ease_0.3s_forwards] opacity-0">
            Your Fiduciary Partner
          </p>
          <h1 className="font-serif text-[32px] xs:text-[38px] sm:text-[44px] md:text-[clamp(44px,6vw,56px)] lg:text-[clamp(48px,5.5vw,64px)] xl:text-[clamp(56px,5vw,72px)] font-bold text-white mb-5 xl:mb-6 leading-[1.12] animate-[heroFadeIn_0.8s_ease_0.5s_forwards] opacity-0">
            Your Financial Plan
            <br />
            Starts Here.
          </h1>
          <p className="text-[15px] xs:text-base sm:text-[17px] md:text-lg lg:text-[19px] xl:text-xl font-light text-cream leading-relaxed max-w-[640px] mx-auto mb-9 md:mb-10 xl:mb-11 animate-[heroFadeIn_0.8s_ease_0.7s_forwards] opacity-0">
            Clarity. Confidence. Control. &mdash; A Financial Planner &amp;
            Adviser proudly serving with integrity, where your best interest
            isn&rsquo;t just a commitment, it&rsquo;s our standard.
          </p>
          <a
            href="https://calendly.com/prosperityplanningandadvisory/clarity-session"
            className="btn btn-gold animate-[heroFadeIn_0.8s_ease_0.9s_forwards] opacity-0"
          >
            Schedule Your Complimentary Strategy Review &rarr;
          </a>
        </div>

        {/* Scroll indicator — tablet+ */}
        <div className="hidden md:block absolute bottom-9 left-1/2 -translate-x-1/2 animate-[heroFadeIn_0.8s_ease_1.2s_forwards] opacity-0">
          <div className="w-px h-12 bg-linear-to-b from-gold/50 to-transparent mx-auto" />
        </div>
      </section>

      <CtaBand />
    </main>
  );
}

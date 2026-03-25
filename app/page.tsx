export default function Home() {
  return (
    <main>
      <section className="min-h-screen flex items-center justify-center bg-linear-to-br from-navy to-navy-deep text-center px-4">
        <div className="max-w-[800px]">
          <span className="eyebrow">Fiduciary Financial Planning</span>
          <h1 className="font-serif text-[32px] sm:text-[38px] md:text-[44px] lg:text-[56px] xl:text-[72px] font-bold text-white mb-5 leading-[1.12]">
            Your Path to Financial Prosperity Starts Here
          </h1>
          <p className="text-[15px] sm:text-base md:text-lg text-cream/80 font-light max-w-[640px] mx-auto mb-9 leading-relaxed">
            Comprehensive financial planning and investment management from a
            trusted fiduciary advisor in Woodland Hills, California.
          </p>
          <a
            href="https://calendly.com/prosperityplanningandadvisory/clarity-session"
            className="btn btn-gold"
          >
            Schedule Your Clarity Session
          </a>
        </div>
      </section>
    </main>
  );
}

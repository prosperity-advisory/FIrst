import Image from "next/image";
import { FadeUp } from "@/components/ui/FadeUp";

/**
 * Static, approved principal-adviser profile for the About page.
 * Intentionally code-only (not CMS-backed) so it does not read or write page data.
 * Portrait reuses the existing approved repository asset (no copy or edit).
 */
const PORTRAIT_SRC = "/images/affordable/adviser.webp";
const PORTRAIT_ALT = "Marcus, principal adviser at Prosperity Planning & Advisory.";

const paragraphs = [
  "At Prosperity Planning & Advisory, you work directly with Marcus, ChFC®, from your first conversation through the development of your financial plan and any agreed follow-up reviews. As Principal Adviser, Marcus personally guides your financial planning and investment decisions, helping ensure that the person who understands your goals is the same person developing and explaining your recommendations.",
  "Marcus brings a strong educational foundation to that relationship. He earned the Chartered Financial Consultant® (ChFC®) designation from The American College of Financial Services, completing a comprehensive professional curriculum covering investments, retirement planning, taxation, insurance, estate planning, and other essential areas of personal finance.",
  "He also earned a bachelor's degree in Small Business Management with a focus on Finance from Southern New Hampshire University, completing his degree in under two years while earning recognition on the President's List. His accelerated academic achievement reflects the discipline, determination, and commitment to continued learning that he brings to his professional work. Marcus has also passed the Securities Industry Essentials (SIE), Series 63, and Series 65 examinations and is registered as an Investment Adviser Representative in California.",
  "Beyond his formal education, Marcus brings extensive firsthand experience in business ownership, entrepreneurship, real estate investing, personal portfolio management, and financial coaching. Before focusing on professional financial advisory services, he spent years operating businesses, making investment decisions, managing financial responsibilities, and helping others better understand their finances.",
  "Marcus also brings nearly two decades of personal investing and trading experience in equity and futures markets, developing an analytical perspective on financial markets and risk. He's met payroll, weighed property decisions, and learned from his own investing wins and mistakes. These experiences shape his practical approach to helping clients connect retirement, investments, tax-aware strategies, insurance needs, and estate planning.",
  "As a fiduciary, Marcus is committed to putting his advisory clients' interests first. Prosperity provides non-discretionary financial planning and investment guidance, meaning clients remain in control of their financial decisions. Marcus explains his recommendations and the reasoning behind them, allowing clients to decide how to move forward.",
  "For Marcus, good financial advice begins with listening. He believes effective planning goes beyond numbers and projections to understanding each client's priorities, responsibilities, and aspirations. His approach combines professional education, real-world experience, and clear communication to help clients make informed financial decisions.",
  "Interested in discussing your financial goals? Connect with Marcus to learn more about Prosperity's planning approach and explore whether its services are right for you—without pressure or obligation.",
];

export function AdvisorProfile() {
  return (
    <section
      id="meet-marcus"
      aria-labelledby="meet-marcus-heading"
      className="bg-white py-14 xs:py-16 sm:py-[72px] md:py-20 lg:py-[100px] xl:py-[120px] px-4 sm:px-6 border-t border-border"
    >
      <div className="mx-auto max-w-[1200px] grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-10 md:gap-12 lg:gap-16 xl:gap-20 items-start">
        <FadeUp>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[360px] md:max-w-none overflow-hidden rounded-xl border border-border shadow-[0_18px_45px_rgba(15,61,46,0.14)]">
            <Image
              src={PORTRAIT_SRC}
              alt={PORTRAIT_ALT}
              fill
              sizes="(min-width: 1200px) 440px, (min-width: 768px) 38vw, 90vw"
              className="object-cover object-[50%_35%]"
            />
          </div>
        </FadeUp>

        <div>
          <FadeUp delay={1}>
            <div className="w-12 sm:w-14 lg:w-[60px] h-[3px] bg-[#F4C050] mb-5" />
            <h2 id="meet-marcus-heading" className="section-headline text-[#0F3D2E] !mb-3">
              Meet Marcus, ChFC®
            </h2>
            <p className="font-sans text-[13px] sm:text-sm font-semibold uppercase tracking-[0.14em] text-[#0F3D2E]">
              Principal Adviser | Investment Adviser Representative
            </p>
            <p className="mt-4 font-serif italic text-lg sm:text-xl text-slate leading-snug">
              Professional Education. Real-World Experience. Personalized Guidance.
            </p>
          </FadeUp>
          <FadeUp delay={2}>
            <div className="mt-8 space-y-5 md:space-y-6">
              {paragraphs.map((text) => (
                <p key={text} className="text-base sm:text-[17px] md:text-lg text-slate leading-[1.8]">
                  {text}
                </p>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

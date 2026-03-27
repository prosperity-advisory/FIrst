import { FadeUp } from "@/components/ui/FadeUp";

interface Portfolio {
  id: string;
  name: string;
  summary: string;
  goal: string;
  purpose: string;
  description: string;
  tagline: string;
}

interface PortfolioCardProps {
  portfolio: Portfolio;
  index: number;
}

const pathIcons: Record<string, React.ReactNode> = {
  stability: (
    <svg viewBox="0 0 24 24">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  momentum: (
    <svg viewBox="0 0 24 24">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  prosperity: (
    <svg viewBox="0 0 24 24">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  freedom: (
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  ),
  legacy: (
    <svg viewBox="0 0 24 24">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  purpose: (
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <line x1="2" y1="12" x2="22" y2="12" />
    </svg>
  ),
};

export function PortfolioCard({ portfolio, index }: PortfolioCardProps) {
  const delay = ((index % 3) + 1) as 1 | 2 | 3;

  return (
    <FadeUp delay={delay} className="group">
      <div className="bg-white p-5 xs:p-6 sm:p-7 lg:p-10 rounded-lg border border-border border-t-[3px] border-t-transparent transition-all duration-[400ms] hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(20,57,43,0.1)] hover:border-t-gold h-full flex flex-col">
        {/* Icon */}
        <div className="w-12 h-12 lg:w-[52px] lg:h-[52px] rounded-[10px] bg-linear-to-br from-gold/10 to-gold/5 flex items-center justify-center mb-5">
          <span className="w-6 h-6 lg:w-[26px] lg:h-[26px] text-gold [&>svg]:w-full [&>svg]:h-full [&>svg]:stroke-current [&>svg]:fill-none [&>svg]:stroke-[1.8] [&>svg]:[stroke-linecap:round] [&>svg]:[stroke-linejoin:round]">
            {pathIcons[portfolio.id] ?? pathIcons.prosperity}
          </span>
        </div>

        <h3 className="font-serif text-[19px] sm:text-[21px] lg:text-[22px] font-semibold text-navy mb-2">
          {portfolio.name}
        </h3>

        <p className="text-sm text-gold font-semibold mb-3">
          {portfolio.goal}
        </p>

        <p className="text-[15px] md:text-base text-slate leading-relaxed mb-4 flex-1">
          {portfolio.description}
        </p>

        <p className="text-sm text-slate-light italic">
          &ldquo;{portfolio.tagline}&rdquo;
        </p>
      </div>
    </FadeUp>
  );
}

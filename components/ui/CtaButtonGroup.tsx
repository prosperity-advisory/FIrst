"use client";

import Link from "next/link";
import { CalendlyButton } from "@/components/ui/CalendlyButton";

export interface CtaButton {
  text: string;
  href: string;
  style?: "gold" | "navy" | "outline";
}

interface CtaButtonGroupProps {
  buttons: CtaButton[];
  className?: string;
}

export function CtaButtonGroup({ buttons, className = "" }: CtaButtonGroupProps) {
  if (!buttons || buttons.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-3 sm:gap-4 ${className}`}>
      {buttons.map((btn, i) => {
        const styleClass =
          btn.style === "navy"
            ? "btn btn-navy"
            : btn.style === "outline"
              ? "btn btn-outline"
              : "btn btn-gold";

        // Calendly links open the popup
        if (btn.href?.includes("calendly.com")) {
          return (
            <CalendlyButton key={i} url={btn.href} className={styleClass}>
              {btn.text}
            </CalendlyButton>
          );
        }

        // Internal links use Next.js Link
        if (btn.href?.startsWith("/") || btn.href?.startsWith("#")) {
          return (
            <Link key={i} href={btn.href} className={styleClass}>
              {btn.text}
            </Link>
          );
        }

        // External links
        return (
          <a
            key={i}
            href={btn.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styleClass}
          >
            {btn.text}
          </a>
        );
      })}
    </div>
  );
}

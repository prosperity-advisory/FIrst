"use client";

import { useEffect, useRef } from "react";

interface FadeUpProps {
  children: React.ReactNode;
  delay?: 0 | 1 | 2 | 3 | 4 | 5;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export function FadeUp({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const delayClass = delay > 0 ? `fade-up-delay-${delay}` : "";

  return (
    // @ts-expect-error — dynamic tag with ref
    <Tag ref={ref} className={`fade-up ${delayClass} ${className}`.trim()}>
      {children}
    </Tag>
  );
}

"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services", short: "Services" },
  { href: "/portfolios", label: "Prosperity Pathways\u2122 Portfolios", short: "Pathways\u2122" },
  { href: "/planning", label: "Personal Prosperity Planning\u2122", short: "Planning\u2122" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const CTA_HREF =
  "https://calendly.com/prosperityplanningandadvisory/clarity-session";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    document.body.style.overflow = "";
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => {
      const next = !prev;
      document.body.style.overflow = next ? "hidden" : "";
      return next;
    });
  }, []);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && menuOpen) closeMenu();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen, closeMenu]);

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-[1000] px-4 transition-all duration-[350ms] ease-in-out ${
          scrolled
            ? "bg-[rgba(244,246,240,0.97)] backdrop-blur-[12px] shadow-[0_1px_20px_rgba(0,0,0,0.08)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1200px] items-center justify-between h-16 sm:h-[72px] md:h-[76px] lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className={`font-serif text-base sm:text-lg lg:text-[19px] xl:text-lg font-bold whitespace-nowrap transition-colors duration-[350ms] ${
              scrolled ? "text-navy" : "text-white"
            }`}
          >
            Prosperity
            <span className="text-gold"> | </span>
            Planning &amp; Advisory
          </Link>

          {/* Desktop nav links — visible at 1200px+ */}
          <div className="hidden xl:flex items-center gap-4 2xl:gap-7">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-sans text-[13px] 2xl:text-[13.5px] font-medium whitespace-nowrap transition-colors duration-300 hover:text-gold ${
                  scrolled ? "text-slate" : "text-white/85"
                }`}
              >
                {/* Short label at xl, full at 2xl */}
                <span className="hidden 2xl:inline">{link.label}</span>
                <span className="2xl:hidden">{link.short ?? link.label}</span>
              </Link>
            ))}
            <a
              href={CTA_HREF}
              className="font-sans text-[12px] 2xl:text-[13px] font-semibold px-4 2xl:px-6 py-2.5 rounded-[5px] bg-gold text-navy whitespace-nowrap transition-all duration-300 hover:bg-gold-light hover:-translate-y-px"
            >
              Schedule Your Strategy Review
            </a>
          </div>

          {/* Hamburger — visible below 1200px */}
          <button
            className="flex xl:hidden flex-col gap-[5px] bg-transparent border-none cursor-pointer p-2 z-[1001]"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-6 h-0.5 rounded-sm transition-all duration-300 ${
                scrolled && !menuOpen ? "bg-navy" : "bg-white"
              } ${menuOpen ? "rotate-45 translate-x-[5px] translate-y-[5px]" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 rounded-sm transition-all duration-300 ${
                scrolled && !menuOpen ? "bg-navy" : "bg-white"
              } ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 rounded-sm transition-all duration-300 ${
                scrolled && !menuOpen ? "bg-navy" : "bg-white"
              } ${menuOpen ? "-rotate-45 translate-x-[5px] -translate-y-[5px]" : ""}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-[998] bg-[rgba(11,42,30,0.5)] transition-opacity duration-[350ms] ${
          menuOpen ? "block opacity-100" : "hidden opacity-0"
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile slide-out menu */}
      <div
        role="navigation"
        aria-label="Mobile navigation"
        className={`fixed top-0 z-[999] flex flex-col w-[min(300px,80vw)] h-dvh bg-footer-bg pt-[88px] px-8 pb-10 transition-[right] duration-[350ms] ease-in-out overflow-y-auto ${
          menuOpen ? "right-0" : "-right-full"
        }`}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={closeMenu}
            className="block font-sans text-base font-medium text-white/85 py-3.5 border-b border-white/[0.08] transition-colors duration-300 hover:text-gold"
          >
            {link.label}
          </Link>
        ))}
        <a
          href={CTA_HREF}
          onClick={closeMenu}
          className="mt-6 inline-block px-7 py-3.5 bg-gold text-navy rounded-[5px] font-semibold text-center"
        >
          Schedule Your Strategy Review
        </a>
      </div>
    </>
  );
}

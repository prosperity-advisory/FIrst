"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendlyButton } from "@/components/ui/CalendlyButton";

interface NavItem {
  href: string;
  label: string;
  short?: string;
  children?: { href: string; label: string }[];
}

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home" },
  {
    href: "/services",
    label: "Services",
    children: [
      { href: "/services", label: "All Services" },
      { href: "/portfolios", label: "Prosperity Pathways™ Portfolios" },
      { href: "/planning", label: "Personal Prosperity Planning™" },
    ],
  },
  {
    href: "/resources",
    label: "Learn",
    children: [
      { href: "/case-studies", label: "Planning Scenarios & Examples" },
      { href: "/resources", label: "Resources & Learning Center" },
      { href: "/faqs", label: "FAQs" },
      { href: "/fees", label: "Fees & How We're Paid" },
    ],
  },
  { href: "/process", label: "Our Process", short: "Process" },
  { href: "/who-we-serve", label: "Who We Serve", short: "Who We Serve" },
  { href: "/about", label: "Our Mission & Who We Are", short: "About" },
  { href: "/contact", label: "Contact" },
];

const CTA_HREF =
  "https://calendly.com/prosperityplanningandadvisory/clarity-session";

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`w-3 h-3 stroke-current fill-none stroke-2 [stroke-linecap:round] [stroke-linejoin:round] ${className ?? ""}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout>>(null);

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
    setMobileExpanded(null);
    document.body.style.overflow = "";
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => {
      const next = !prev;
      document.body.style.overflow = next ? "hidden" : "";
      if (!next) setMobileExpanded(null);
      return next;
    });
  }, []);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (menuOpen) closeMenu();
        if (openDropdown) setOpenDropdown(null);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen, openDropdown, closeMenu]);

  // Close mobile menu on route change
  useEffect(() => {
    closeMenu();
    setOpenDropdown(null);
  }, [pathname, closeMenu]);

  function isActive(item: NavItem): boolean {
    if (pathname === item.href) return true;
    if (item.children) {
      return item.children.some((child) => pathname === child.href);
    }
    return false;
  }

  function handleDropdownEnter(label: string) {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setOpenDropdown(label);
  }

  function handleDropdownLeave() {
    dropdownTimeout.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  }

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
            className={`font-serif text-sm xs:text-base sm:text-lg lg:text-[19px] xl:text-lg font-bold whitespace-nowrap transition-colors duration-[350ms] ${
              scrolled ? "text-navy" : "text-white"
            }`}
          >
            Prosperity
            <span className="text-gold"> | </span>
            Planning &amp; Advisory
          </Link>

          {/* Desktop nav — visible at xl+ */}
          <div className="hidden xl:flex items-center gap-1 2xl:gap-1.5">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item);
              const hasChildren = !!item.children;

              if (hasChildren) {
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => handleDropdownEnter(item.label)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <button
                      className={`flex items-center gap-1 font-sans text-[13px] 2xl:text-[13.5px] font-medium whitespace-nowrap px-3 2xl:px-3.5 py-2 rounded-md transition-colors duration-300 cursor-pointer ${
                        active
                          ? "text-gold"
                          : scrolled
                            ? "text-slate hover:text-gold"
                            : "text-white/85 hover:text-gold"
                      }`}
                      aria-expanded={openDropdown === item.label}
                      aria-haspopup="true"
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === item.label ? null : item.label
                        )
                      }
                    >
                      {item.label}
                      <ChevronDown
                        className={`transition-transform duration-200 ${
                          openDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown */}
                    <div
                      className={`absolute top-full left-0 pt-2 transition-all duration-200 ${
                        openDropdown === item.label
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-1"
                      }`}
                    >
                      <div className="bg-white rounded-lg shadow-[0_8px_32px_rgba(20,57,43,0.12)] border border-border py-2 min-w-[260px]">
                        {item.children!.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block px-5 py-2.5 text-[13px] 2xl:text-sm font-medium transition-colors duration-200 ${
                              pathname === child.href
                                ? "text-gold bg-cream"
                                : "text-slate hover:text-gold hover:bg-cream/60"
                            }`}
                            onClick={() => setOpenDropdown(null)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-sans text-[13px] 2xl:text-[13.5px] font-medium whitespace-nowrap px-3 2xl:px-3.5 py-2 rounded-md transition-colors duration-300 ${
                    active
                      ? "text-gold"
                      : scrolled
                        ? "text-slate hover:text-gold"
                        : "text-white/85 hover:text-gold"
                  }`}
                >
                  {item.short ?? item.label}
                </Link>
              );
            })}

            <CalendlyButton
              url={CTA_HREF}
              className="font-sans text-[12px] 2xl:text-[13px] font-semibold px-4 2xl:px-5 py-2.5 rounded-[5px] bg-gold text-navy whitespace-nowrap transition-all duration-300 hover:bg-gold-light hover:-translate-y-px ml-2"
            >
              Schedule Review
            </CalendlyButton>
          </div>

          {/* Hamburger — visible below xl */}
          <button
            className="relative xl:hidden bg-transparent border-none cursor-pointer w-11 h-11 z-[1001]"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span
              className={`absolute left-[10px] w-6 h-0.5 rounded-sm origin-center transition-all duration-300 ${
                scrolled && !menuOpen ? "bg-navy" : "bg-white"
              } ${menuOpen ? "top-[21px] rotate-45" : "top-[14px]"}`}
            />
            <span
              className={`absolute left-[10px] top-[21px] w-6 h-0.5 rounded-sm transition-all duration-300 ${
                scrolled && !menuOpen ? "bg-navy" : "bg-white"
              } ${menuOpen ? "opacity-0 scale-x-0" : ""}`}
            />
            <span
              className={`absolute left-[10px] w-6 h-0.5 rounded-sm origin-center transition-all duration-300 ${
                scrolled && !menuOpen ? "bg-navy" : "bg-white"
              } ${menuOpen ? "top-[21px] -rotate-45" : "top-[28px]"}`}
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
        className={`fixed top-0 z-[999] flex flex-col w-[min(320px,85vw)] h-dvh bg-navy-deep pt-[88px] px-7 pb-10 transition-[right] duration-[350ms] ease-in-out overflow-y-auto ${
          menuOpen ? "right-0" : "-right-full"
        }`}
      >
        {NAV_ITEMS.map((item) => {
          const active = isActive(item);
          const hasChildren = !!item.children;
          const isExpanded = mobileExpanded === item.label;

          if (hasChildren) {
            return (
              <div key={item.label} className="border-b border-white/[0.08]">
                <button
                  onClick={() =>
                    setMobileExpanded(isExpanded ? null : item.label)
                  }
                  className={`flex items-center justify-between w-full font-sans text-base font-medium py-3.5 transition-colors duration-300 cursor-pointer ${
                    active ? "text-gold" : "text-white/85 hover:text-gold"
                  }`}
                >
                  {item.label}
                  <ChevronDown
                    className={`transition-transform duration-200 ${
                      isExpanded ? "rotate-180" : ""
                    } ${active ? "text-gold" : "text-white/50"}`}
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pl-4 pb-2">
                      {item.children!.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={closeMenu}
                          className={`block font-sans text-sm font-medium py-2.5 transition-colors duration-300 ${
                            pathname === child.href
                              ? "text-gold"
                              : "text-white/60 hover:text-gold"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className={`block font-sans text-base font-medium py-3.5 border-b border-white/[0.08] transition-colors duration-300 ${
                active ? "text-gold" : "text-white/85 hover:text-gold"
              }`}
            >
              {item.label}
            </Link>
          );
        })}

        <CalendlyButton
          url={CTA_HREF}
          className="mt-6 inline-block px-7 py-3.5 bg-gold text-navy rounded-[5px] font-semibold text-center text-sm"
        >
          Schedule Your Strategy Review
        </CalendlyButton>
      </div>
    </>
  );
}

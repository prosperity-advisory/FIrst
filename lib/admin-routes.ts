// All known site routes for the admin URL picker dropdown.

export interface RouteOption {
  label: string;
  value: string;
  group: string;
}

export const SITE_ROUTES: RouteOption[] = [
  // Pages
  { label: "Home", value: "/", group: "Pages" },
  { label: "Services", value: "/services", group: "Pages" },
  { label: "Prosperity Pathways™ Portfolios", value: "/portfolios", group: "Pages" },
  { label: "Personal Prosperity Planning™", value: "/planning", group: "Pages" },
  { label: "Our Process", value: "/process", group: "Pages" },
  { label: "Who We Serve", value: "/who-we-serve", group: "Pages" },
  { label: "About / Our Mission", value: "/about", group: "Pages" },
  { label: "Fees & How We're Paid", value: "/fees", group: "Pages" },
  { label: "FAQs", value: "/faqs", group: "Pages" },
  { label: "Resources & Learning Center", value: "/resources", group: "Pages" },
  { label: "Planning Scenarios & Examples", value: "/case-studies", group: "Pages" },
  { label: "Contact", value: "/contact", group: "Pages" },

  // Page anchors
  { label: "Home — Services Grid", value: "/#services", group: "Page Anchors" },
  { label: "Home — Process", value: "/#process", group: "Page Anchors" },
  { label: "Home — Contact", value: "/#contact", group: "Page Anchors" },
  { label: "Case Studies — Scenarios", value: "/case-studies#scenarios", group: "Page Anchors" },
  { label: "Services — Retirement", value: "/services#retirement-income", group: "Page Anchors" },
  { label: "Services — Tax", value: "/services#tax-planning", group: "Page Anchors" },
  { label: "Services — Estate", value: "/services#estate-planning", group: "Page Anchors" },
  { label: "Services — Business", value: "/services#business-planning", group: "Page Anchors" },
  { label: "Who We Serve — Retirees", value: "/who-we-serve#retirees", group: "Page Anchors" },
  { label: "Who We Serve — Business Owners", value: "/who-we-serve#business-owners", group: "Page Anchors" },
  { label: "Who We Serve — Professionals", value: "/who-we-serve#professionals", group: "Page Anchors" },
  { label: "Who We Serve — Families", value: "/who-we-serve#families", group: "Page Anchors" },
  { label: "Who We Serve — Attorneys", value: "/who-we-serve#attorneys", group: "Page Anchors" },

  // External
  { label: "Calendly — Clarity Session", value: "https://calendly.com/prosperityplanningandadvisory/clarity-session", group: "External" },
];

/** Group route options by their group field */
export function getGroupedRoutes(): { group: string; options: RouteOption[] }[] {
  const groups: { group: string; options: RouteOption[] }[] = [];
  for (const route of SITE_ROUTES) {
    const existing = groups.find((g) => g.group === route.group);
    if (existing) existing.options.push(route);
    else groups.push({ group: route.group, options: [route] });
  }
  return groups;
}

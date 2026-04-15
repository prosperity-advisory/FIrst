import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://prosperityadvisory.net";

  const pages = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
    {
      path: "/portfolios",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    { path: "/planning", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
    {
      path: "/who-we-serve",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    { path: "/process", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/fees", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/faqs", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/clarity-session", priority: 0.95, changeFrequency: "monthly" as const },
    { path: "/resources", priority: 0.6, changeFrequency: "weekly" as const },
    {
      path: "/case-studies",
      priority: 0.6,
      changeFrequency: "monthly" as const,
    },
    { path: "/disclosures", priority: 0.4, changeFrequency: "yearly" as const },
  ];

  return pages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}

import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://prosperityadvisory.net"),
  title: {
    default:
      "Prosperity Planning & Advisory — Fiduciary Financial Planner in Woodland Hills, CA",
    template: "%s | Prosperity Planning & Advisory",
  },
  description:
    "Prosperity Planning & Advisory is a fee-only fiduciary financial planning firm in Woodland Hills, CA serving individuals and business owners with investment management, retirement planning, and comprehensive financial strategies.",
  keywords: [
    "fiduciary financial planner",
    "Woodland Hills financial advisor",
    "fee-only financial planner",
    "retirement planning",
    "investment management",
    "financial planning Woodland Hills CA",
    "Prosperity Planning Advisory",
  ],
  authors: [{ name: "Prosperity Planning & Advisory, LLC" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Prosperity Planning & Advisory",
    title:
      "Prosperity Planning & Advisory — Fiduciary Financial Planner in Woodland Hills, CA",
    description:
      "Fee-only fiduciary financial planning firm in Woodland Hills, CA. Comprehensive financial planning, investment management, and retirement strategies for individuals and business owners.",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Prosperity Planning & Advisory — Fiduciary Financial Planner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prosperity Planning & Advisory — Fiduciary Financial Planner in Woodland Hills, CA",
    description: "Fee-only fiduciary financial planning firm in Woodland Hills, CA.",
    images: ["/images/og-default.jpg"],
  },
  alternates: {
    canonical: "https://prosperityadvisory.net",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  verification: {},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="min-h-screen antialiased">
        <OrganizationJsonLd />
        {children}
      </body>
    </html>
  );
}

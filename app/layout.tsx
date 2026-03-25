import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
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
  title: {
    default: "Prosperity Planning & Advisory — Your Fiduciary Financial Partner",
    template: "%s | Prosperity Planning & Advisory",
  },
  description:
    "Prosperity Planning & Advisory is a fiduciary financial planning firm in Woodland Hills, CA. Comprehensive financial planning, investment management, and retirement strategies.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Prosperity Planning & Advisory",
    title: "Prosperity Planning & Advisory — Your Fiduciary Financial Partner",
    description:
      "Fiduciary financial planning firm in Woodland Hills, CA. Comprehensive financial planning, investment management, and retirement strategies.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="min-h-screen antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

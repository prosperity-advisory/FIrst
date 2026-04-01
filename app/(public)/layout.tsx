import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getSiteSettings } from "@/lib/content-db";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <>
      <Header
        navItems={settings?.header?.navItems}
        ctaText={settings?.header?.ctaText}
        ctaMobileText={settings?.header?.ctaMobileText}
      />
      {children}
      <Footer linkGroups={settings?.footer?.linkGroups} />
    </>
  );
}

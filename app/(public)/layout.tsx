import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/ui/ChatWidget";
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
        logoUrl={settings?.company?.logoUrl}
      />
      {children}
      <Footer
        linkGroups={settings?.footer?.linkGroups}
        disclosures={settings?.footer?.disclosures}
        insuranceDisclaimer={settings?.footer?.insuranceDisclaimer}
        privacyPolicyHref={settings?.footer?.privacyPolicyHref}
        documents={settings?.footer?.documents}
      />
      <ChatWidget />
    </>
  );
}

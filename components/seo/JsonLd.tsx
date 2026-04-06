/**
 * JSON-LD structured data components for SEO.
 * Outputs <script type="application/ld+json"> tags.
 */

const BASE_URL = 'https://prosperityadvisory.net';

const ORGANIZATION = {
  '@type': 'Organization',
  '@id': `${BASE_URL}/#organization`,
  name: 'Prosperity Planning & Advisory, LLC',
  url: BASE_URL,
  logo: `${BASE_URL}/images/single-logo-trimmed.png`,
  description:
    'Fee-only fiduciary financial planning firm in Woodland Hills, CA serving individuals and business owners.',
  telephone: '888-427-5240',
  email: 'help@prosperityadvisory.net',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '21255 Burbank Boulevard, Suite 120',
    addressLocality: 'Woodland Hills',
    addressRegion: 'CA',
    postalCode: '91367',
    addressCountry: 'US',
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function LdJson({ data }: { data: Record<string, any> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Organization + LocalBusiness + FinancialService — injected in root layout */
export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        ...ORGANIZATION,
        '@type': ['Organization', 'FinancialService'],
        foundingDate: '2024',
        areaServed: [
          { '@type': 'City', name: 'Woodland Hills' },
          { '@type': 'State', name: 'California' },
        ],
        priceRange: 'Fee-Only',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Financial Planning Services',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Comprehensive Financial Planning' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Investment Management' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Retirement Planning' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Tax-Efficient Strategies' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Estate & Legacy Planning' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Small Business Financial Planning' } },
          ],
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${BASE_URL}/#website`,
        url: BASE_URL,
        name: 'Prosperity Planning & Advisory',
        publisher: { '@id': `${BASE_URL}/#organization` },
      },
    ],
  };

  return <LdJson data={data} />;
}

/** Breadcrumb list for inner pages */
export function BreadcrumbJsonLd({ items }: { items: { name: string; path: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      ...items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: item.name,
        item: `${BASE_URL}${item.path}`,
      })),
    ],
  };

  return <LdJson data={data} />;
}

/** FAQ page structured data — enables rich results in Google */
export function FaqPageJsonLd({
  questions,
}: {
  questions: { question: string; answer: string }[];
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };

  return <LdJson data={data} />;
}

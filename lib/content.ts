import homeContent from '@/content/home.json';
import servicesContent from '@/content/services.json';
import portfoliosContent from '@/content/portfolios.json';
import planningContent from '@/content/planning.json';
import aboutContent from '@/content/about.json';
import contactContent from '@/content/contact.json';
import whoWeServeContent from '@/content/who-we-serve.json';
import processContent from '@/content/process.json';
import feesContent from '@/content/fees.json';
import faqsContent from '@/content/faqs.json';
import resourcesContent from '@/content/resources.json';
import caseStudiesContent from '@/content/case-studies.json';
import sharedContent from '@/content/shared.json';

// Page content loaders — thin wrappers around JSON imports.
// When we migrate to Supabase (Milestone 3), swap these to async fetches.

export function getHomeContent() {
  return homeContent;
}

export function getServicesContent() {
  return servicesContent;
}

export function getPortfoliosContent() {
  return portfoliosContent;
}

export function getPlanningContent() {
  return planningContent;
}

export function getAboutContent() {
  return aboutContent;
}

export function getContactContent() {
  return contactContent;
}

export function getWhoWeServeContent() {
  return whoWeServeContent;
}

export function getProcessContent() {
  return processContent;
}

export function getFeesContent() {
  return feesContent;
}

export function getFaqsContent() {
  return faqsContent;
}

export function getResourcesContent() {
  return resourcesContent;
}

export function getCaseStudiesContent() {
  return caseStudiesContent;
}

export function getSharedContent() {
  return sharedContent;
}

// Convenience: get meta tags for any page
type PageKey =
  | 'home'
  | 'services'
  | 'portfolios'
  | 'planning'
  | 'about'
  | 'contact'
  | 'who-we-serve'
  | 'process'
  | 'fees'
  | 'faqs'
  | 'resources'
  | 'case-studies';

const contentMap: Record<PageKey, { meta: { title: string; description: string; ogTitle: string; ogDescription: string } }> = {
  home: homeContent,
  services: servicesContent,
  portfolios: portfoliosContent,
  planning: planningContent,
  about: aboutContent,
  contact: contactContent,
  'who-we-serve': whoWeServeContent,
  process: processContent,
  fees: feesContent,
  faqs: faqsContent,
  resources: resourcesContent,
  'case-studies': caseStudiesContent,
};

export function getPageMeta(page: PageKey) {
  return contentMap[page].meta;
}

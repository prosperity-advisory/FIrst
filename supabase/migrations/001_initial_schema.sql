-- ============================================================================
-- Prosperity Planning & Advisory — CMS Database Schema
-- Migration 001: Initial schema for pages, sections, site settings, and media
-- ============================================================================

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- ============================================================================
-- PAGES
-- ============================================================================

create table pages (
  id          uuid primary key default uuid_generate_v4(),
  slug        text unique not null,
  title       text not null,
  meta_description text,
  og_title    text,
  og_description text,
  og_image    text,
  is_published boolean not null default true,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

comment on table pages is 'Each row represents one page on the site (/, /services, /about, etc.)';
comment on column pages.slug is 'URL path segment, e.g. "services", "about". Home page uses empty string.';
comment on column pages.og_title is 'Open Graph title — falls back to title if null';
comment on column pages.og_description is 'Open Graph description — falls back to meta_description if null';

create index idx_pages_slug on pages (slug);
create index idx_pages_sort_order on pages (sort_order);
create index idx_pages_is_published on pages (is_published) where is_published = true;

-- ============================================================================
-- SECTIONS
-- ============================================================================

create table sections (
  id             uuid primary key default uuid_generate_v4(),
  page_id        uuid not null references pages(id) on delete cascade,
  component_type text not null,
  sort_order     int not null default 0,
  is_visible     boolean not null default true,
  content        jsonb not null default '{}',
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

comment on table sections is 'Each row is one section on a page, rendered by the component identified by component_type.';
comment on column sections.component_type is 'Maps to a key in the component registry (e.g. "hero", "services_grid", "faq_categories")';
comment on column sections.content is 'JSONB blob whose shape is defined by the component registry for this component_type';

create index idx_sections_page_id on sections (page_id);
create index idx_sections_page_sort on sections (page_id, sort_order);
create index idx_sections_component_type on sections (component_type);
create index idx_sections_is_visible on sections (is_visible) where is_visible = true;

-- GIN index for querying inside JSONB content
create index idx_sections_content on sections using gin (content);

-- ============================================================================
-- SITE SETTINGS
-- ============================================================================

create table site_settings (
  id         uuid primary key default uuid_generate_v4(),
  key        text unique not null,
  value      jsonb not null default '{}',
  updated_at timestamptz not null default now()
);

comment on table site_settings is 'Global settings: header nav, footer content, CTA defaults, company info, Calendly URL, etc.';
comment on column site_settings.key is 'Lookup key, e.g. "header", "footer", "cta_band_defaults", "company"';

create index idx_site_settings_key on site_settings (key);

-- ============================================================================
-- MEDIA
-- ============================================================================

create table media (
  id          uuid primary key default uuid_generate_v4(),
  filename    text not null,
  url         text not null,
  alt_text    text,
  mime_type   text,
  file_size   int,
  uploaded_at timestamptz not null default now()
);

comment on table media is 'Uploaded images and documents referenced by pages, sections, and site settings.';

create index idx_media_uploaded_at on media (uploaded_at desc);

-- ============================================================================
-- AUTO-UPDATE updated_at TRIGGER
-- ============================================================================

create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_pages_updated_at
  before update on pages
  for each row execute function update_updated_at();

create trigger trg_sections_updated_at
  before update on sections
  for each row execute function update_updated_at();

create trigger trg_site_settings_updated_at
  before update on site_settings
  for each row execute function update_updated_at();

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

alter table pages enable row level security;
alter table sections enable row level security;
alter table site_settings enable row level security;
alter table media enable row level security;

-- Public read access (anon role)

create policy "Public can read published pages"
  on pages for select
  using (is_published = true);

create policy "Public can read visible sections"
  on sections for select
  using (
    is_visible = true
    and exists (
      select 1 from pages where pages.id = sections.page_id and pages.is_published = true
    )
  );

create policy "Public can read site settings"
  on site_settings for select
  using (true);

create policy "Public can read media"
  on media for select
  using (true);

-- Authenticated user full access (admin CMS)

create policy "Authenticated users can read all pages"
  on pages for select to authenticated
  using (true);

create policy "Authenticated users can insert pages"
  on pages for insert to authenticated
  with check (true);

create policy "Authenticated users can update pages"
  on pages for update to authenticated
  using (true) with check (true);

create policy "Authenticated users can delete pages"
  on pages for delete to authenticated
  using (true);

create policy "Authenticated users can read all sections"
  on sections for select to authenticated
  using (true);

create policy "Authenticated users can insert sections"
  on sections for insert to authenticated
  with check (true);

create policy "Authenticated users can update sections"
  on sections for update to authenticated
  using (true) with check (true);

create policy "Authenticated users can delete sections"
  on sections for delete to authenticated
  using (true);

create policy "Authenticated users can insert site settings"
  on site_settings for insert to authenticated
  with check (true);

create policy "Authenticated users can update site settings"
  on site_settings for update to authenticated
  using (true) with check (true);

create policy "Authenticated users can delete site settings"
  on site_settings for delete to authenticated
  using (true);

create policy "Authenticated users can insert media"
  on media for insert to authenticated
  with check (true);

create policy "Authenticated users can update media"
  on media for update to authenticated
  using (true) with check (true);

create policy "Authenticated users can delete media"
  on media for delete to authenticated
  using (true);

-- ============================================================================
-- SEED DATA: Site Settings
-- ============================================================================
-- Pre-populate the global settings keys so the admin UI has something to load.

insert into site_settings (key, value) values
(
  'company',
  '{
    "name": "Prosperity Planning & Advisory, LLC",
    "phone": "(888) 427-5240",
    "email": "Help@prosperityadvisory.net",
    "address": {
      "street": "21255 Burbank Boulevard, Suite 120",
      "city": "Woodland Hills",
      "state": "CA",
      "zip": "91367",
      "country": "USA"
    },
    "calendlyUrl": "https://calendly.com/prosperityplanningandadvisory/clarity-session",
    "logoUrl": "/images/logo.webp"
  }'::jsonb
),
(
  'header',
  '{
    "navItems": [
      { "label": "Home", "href": "/" },
      {
        "label": "Services", "href": "/services",
        "children": [
          { "label": "All Services", "href": "/services" },
          { "label": "Prosperity Pathways\u2122 Portfolios", "href": "/portfolios" },
          { "label": "Personal Prosperity Planning\u2122", "href": "/planning" }
        ]
      },
      {
        "label": "Learn", "href": "#",
        "children": [
          { "label": "Planning Scenarios & Examples", "href": "/case-studies" },
          { "label": "Resources & Learning Center", "href": "/resources" },
          { "label": "FAQs", "href": "/faqs" },
          { "label": "Fees & How We\u2019re Paid", "href": "/fees" }
        ]
      },
      { "label": "Our Process", "href": "/process" },
      { "label": "Who We Serve", "href": "/who-we-serve" },
      { "label": "About", "href": "/about" },
      { "label": "Contact", "href": "/contact" }
    ],
    "ctaText": "Schedule Review",
    "ctaMobileText": "Schedule Your Strategy Review"
  }'::jsonb
),
(
  'footer',
  '{
    "companyName": "Prosperity | Planning & Advisory",
    "description": "A fiduciary financial planning firm proudly serving individuals and small business owners.",
    "linkGroups": [
      {
        "heading": "Services",
        "links": [
          { "label": "All Services", "href": "/services" },
          { "label": "Prosperity Pathways\u2122 Portfolios", "href": "/portfolios" },
          { "label": "Personal Prosperity Planning\u2122", "href": "/planning" }
        ]
      },
      {
        "heading": "About",
        "links": [
          { "label": "Our Mission", "href": "/about" },
          { "label": "Our Process", "href": "/process" },
          { "label": "Who We Serve", "href": "/who-we-serve" },
          { "label": "Fees & How We\u2019re Paid", "href": "/fees" }
        ]
      },
      {
        "heading": "Resources",
        "links": [
          { "label": "FAQs", "href": "/faqs" },
          { "label": "Resources & Learning Center", "href": "/resources" },
          { "label": "Planning Scenarios", "href": "/case-studies" },
          { "label": "Contact Us", "href": "/contact" }
        ]
      }
    ],
    "disclosures": [
      "Prosperity Planning and Advisory, LLC is a registered investment adviser in the State of California. Registration does not imply a certain level of skill or training.",
      "Advisory services are provided by a registered investment adviser representative of the Firm. Investment strategies involve risk, including the potential loss of principal.",
      "Information on this website is for general informational and educational purposes only and does not constitute individualized investment advice, a recommendation, or an offer to buy or sell any security.",
      "Past performance is not indicative of future results. Any planning strategies discussed are based on general principles and may not be suitable for all individuals.",
      "We do not provide tax or legal advice. Hyperlinks to third-party content are provided for convenience and do not imply endorsement."
    ],
    "insuranceDisclaimer": "Prosperity Planning and Advisory, LLC is a fee-only registered investment adviser and does not sell insurance products or receive insurance commissions.",
    "privacyPolicyHref": "/documents/privacy-notice.pdf"
  }'::jsonb
),
(
  'cta_band_defaults',
  '{
    "headline": "Create Your Financial Plan With Us",
    "subtext": "No question is too small when it comes to your future. Talk to an adviser today and make confident financial decisions.",
    "ctaText": "Schedule Your Complimentary Strategy Review \u2192",
    "ctaHref": "https://calendly.com/prosperityplanningandadvisory/clarity-session"
  }'::jsonb
);

# Component & Content Inventory — CMS Audit

**Generated:** 2026-04-01
**Purpose:** Complete inventory of all editable content for Milestone 3 (Supabase CMS migration)

---

## Summary

| Metric | Count |
|--------|-------|
| Total pages | 12 |
| Total unique section component types | 12 |
| Total UI component types | 3 |
| Total layout component types | 2 |
| Total content JSON files | 13 (12 page-level + 1 shared) |
| Components with array/nested content | 11 |
| Components with hardcoded content | 5 |

---

## Pages & Routes

| # | Route | Page File | Content JSON |
|---|-------|-----------|--------------|
| 1 | `/` | `app/page.tsx` | `home.json` |
| 2 | `/services` | `app/services/page.tsx` | `services.json` |
| 3 | `/portfolios` | `app/portfolios/page.tsx` | `portfolios.json` |
| 4 | `/planning` | `app/planning/page.tsx` | `planning.json` |
| 5 | `/about` | `app/about/page.tsx` | `about.json` |
| 6 | `/contact` | `app/contact/page.tsx` | `contact.json` |
| 7 | `/who-we-serve` | `app/who-we-serve/page.tsx` | `who-we-serve.json` |
| 8 | `/process` | `app/process/page.tsx` | `process.json` |
| 9 | `/fees` | `app/fees/page.tsx` | `fees.json` |
| 10 | `/faqs` | `app/faqs/page.tsx` | `faqs.json` |
| 11 | `/resources` | `app/resources/page.tsx` | `resources.json` |
| 12 | `/case-studies` | `app/case-studies/page.tsx` | `case-studies.json` |

---

## Per-Page Component Breakdown

### 1. Home (`/`)

| Component | Props / Editable Fields | Data Source |
|-----------|------------------------|-------------|
| `HeroSection` | `eyebrow`, `headline`, `subheadline`, `ctaText`, `backgroundImage` | `home.json → hero` (partially); eyebrow/subheadline hardcoded in page |
| `MissionSection` | `eyebrow`, `headline`, `body`, `badges[]` (icon + label), `image`, `imageAlt` | Hardcoded in page (eyebrow, headline, body, badges with inline SVGs) |
| `ProcessSection` | `eyebrow`, `headline`, `subtitle`, `steps[]` (title, description), `ctaText`, `ctaHref`, `bannerImage`, `bannerAlt` | `home.json → process.steps`, `roadToProsperity`; some hardcoded |
| `ServicesGrid` | `eyebrow`, `headline`, `body`, `categories[]` (title, description, href, items[]), `nextSteps` | `home.json → services` |
| `BusinessOwnerAccordion` | None (all hardcoded internally) | **Fully hardcoded** in component |
| `ContactSection` | `eyebrow`, `headline`, `details[]` (icon, label, value), `ctaText`, `mapLabel`, `mapSublabel`, `image`, `imageAlt` | Hardcoded in page (contact details with inline SVGs) |
| `CtaBand` | `headline`, `subtext`, `ctaText`, `ctaHref` | Uses defaults (hardcoded in component) |

### 2. Services (`/services`)

| Component | Props / Editable Fields | Data Source |
|-----------|------------------------|-------------|
| `InteriorHero` | `eyebrow`, `headline`, `subtitle`, `backgroundImage` | `services.json → hero` |
| `ServiceAccordion` | `sections[]` — complex nested structure (see Complex Components section) | `services.json → sections` |
| `CtaBand` | `headline`, `subtext` | `services.json → approach.cta` |

**Inline rendered content (no dedicated component):**
- Intro paragraphs: `services.json → intro.paragraphs`
- Explore links: `services.json → intro.exploreLinks[]`
- Explore heading/body/note: `services.json → intro.exploreHeading/Body/Note`
- Approach section: `services.json → approach.heading`, `approach.paragraphs[]`
- Disclosures: `services.json → disclosures`

### 3. Portfolios (`/portfolios`)

| Component | Props / Editable Fields | Data Source |
|-----------|------------------------|-------------|
| `InteriorHero` | `eyebrow`, `headline`, `subtitle`, `backgroundImage` | `portfolios.json → hero` |
| `PortfolioCard` (×6) | `portfolio` (id, name, summary, goal, purpose, description, tagline), `index` | `portfolios.json → portfolios[]` |
| `CtaBand` | `headline`, `subtext` | Hardcoded in page |

**Inline rendered content:**
- Hero body/intro: `portfolios.json → hero.body`, `hero.intro`
- Management section: `portfolios.json → management` (heading, body, detail)
- Fiduciary section: `portfolios.json → fiduciary` (heading, body, detail)
- Foundation section: `portfolios.json → foundation` (heading, intro, items[], body, cta)
- Disclosures: `portfolios.json → disclosures[]`

### 4. Planning (`/planning`)

| Component | Props / Editable Fields | Data Source |
|-----------|------------------------|-------------|
| `InteriorHero` | `eyebrow`, `headline`, `subtitle`, `ctaText`, `backgroundImage` | `planning.json → hero` |
| `CtaBand` | `headline`, `subtext` | Hardcoded in page |

**Inline rendered content:**
- Hero body/detail/tagline: `planning.json → hero`
- Service cards grid (×6): `planning.json → serviceCards[]` (title, body, tagline, cta)
- Portal section: `planning.json → portal` (heading, body, accessHeading, accessBody, features[])
- 6 inline SVG icons for service cards: **Hardcoded** in page
- 4 inline SVG icons for portal features: **Hardcoded** in page

### 5. About (`/about`)

| Component | Props / Editable Fields | Data Source |
|-----------|------------------------|-------------|
| `InteriorHero` | `eyebrow`, `headline`, `backgroundImage` | `about.json → hero` |
| `CtaBand` | `headline`, `subtext` | `about.json → ctaBand` |

**Inline rendered content:**
- Mission: `about.json → mission` (heading, body)
- Our Services: `about.json → ourServices` (heading, body, items[], outro)
- Trusted Partner: `about.json → trustedPartner` (heading, body)
- Features (×6): `about.json → features[]`
- Tailored: `about.json → tailored` (heading, body)
- 6 inline SVG feature icons: **Hardcoded** in page

### 6. Contact (`/contact`)

| Component | Props / Editable Fields | Data Source |
|-----------|------------------------|-------------|
| `InteriorHero` | `headline`, `subtitle`, `ctaText`, `backgroundImage` | `contact.json → hero` |
| `ContactSection` | `eyebrow`, `headline`, `details[]`, `ctaText`, `mapLabel`, `mapSublabel`, `image`, `imageAlt` | `contact.json → location` (partially); inline SVG icons hardcoded in page |
| `CtaBand` | `headline`, `subtext` | Hardcoded in page |

**Inline rendered content:**
- Service cards (×3): `contact.json → serviceCards[]` (title, body, cta)
- Location disclosures: `contact.json → location.disclosures[]`

### 7. Who We Serve (`/who-we-serve`)

| Component | Props / Editable Fields | Data Source |
|-----------|------------------------|-------------|
| `InteriorHero` | `eyebrow`, `headline`, `subtitle`, `ctaText`, `ctaHref`, `backgroundImage` | `who-we-serve.json → hero` |

**Inline rendered content (all from `who-we-serve.json`):**
- Hero body: `hero.heroBody`
- Built Around You: `builtAroundYou` (heading, body)
- Quick Overview items: `quickOverview.items[]` (label, desc)
- Audience profiles (×6): `audiences[]` (id, title, intro, focusedOn[], howWeHelp, planningAreas[], ctaText, ctaHref)
- Tax-Aware section: `taxAware` (heading, body1, body2)
- No One Category: `noOneCategory` (heading, body1, body2)
- Connects Everything: `connectsEverything` (heading, body, subheading, items[], footer)
- Closing CTA: `closingCta` (heading, body, body2, cta)

### 8. Process (`/process`)

| Component | Props / Editable Fields | Data Source |
|-----------|------------------------|-------------|
| `InteriorHero` | `eyebrow`, `headline`, `subtitle`, `ctaText`, `backgroundImage` | `process.json → hero` |
| `Accordion` | `items[]` (question, answer) | `process.json → faq.questions` |

**Inline rendered content (all from `process.json`):**
- Hero body paragraphs: `hero.body[]`
- Why It Matters: `whyItMatters` (heading, body, listHeading, items[], paragraphs[])
- Roadmap summary (×6): `roadmap.summary[]` (number, title, description)
- Detailed steps (×6): `steps[]` (number, title, subtitle, body[], listHeading, items[], whyMatters, whatYouLeaveWith[], cta)
- Who Is For: `whoIsFor` (heading, listHeading, items[])
- What It Addresses: `whatItAddresses` (heading, listHeading, items[], footnote)
- What To Expect: `whatToExpect` (heading, items[] with title/body)
- Planning Experience: `planningExperience` (heading, paragraphs[])
- FAQ heading: `faq.heading`
- Closing: `closing` (heading, paragraphs[], cta)
- Compliance: `compliance`

### 9. Fees (`/fees`)

| Component | Props / Editable Fields | Data Source |
|-----------|------------------------|-------------|
| `InteriorHero` | `eyebrow`, `headline`, `subtitle`, `backgroundImage` | `fees.json → hero` |
| `CtaBand` | `headline`, `subtext` | `fees.json → ctaBand` |

**Inline rendered content (all from `fees.json`):**
- Fee sections (×9): `sections[]` (id, heading, paragraphs[], listHeading, items[], footnotes[])
- Disclosure: `disclosure`

### 10. FAQs (`/faqs`)

| Component | Props / Editable Fields | Data Source |
|-----------|------------------------|-------------|
| `InteriorHero` | `eyebrow`, `headline`, `subtitle`, `backgroundImage` | `faqs.json → hero` |
| `Accordion` (×6 instances) | `items[]` (question, answer) | `faqs.json → categories[].questions` |
| `CtaBand` | `headline`, `subtext` | `faqs.json → ctaBand` |

**Inline rendered content:**
- Intro paragraphs: `faqs.json → intro.paragraphs[]`
- Category headings: `faqs.json → categories[].heading`
- Disclosures: `faqs.json → disclosures`

### 11. Resources (`/resources`)

| Component | Props / Editable Fields | Data Source |
|-----------|------------------------|-------------|
| `InteriorHero` | `eyebrow`, `headline`, `backgroundImage` | `resources.json → hero` |

**Inline rendered content (all from `resources.json`):**
- Hero body paragraphs: `hero.body[]`
- Hero CTA: `hero.cta` (text, prefix, href)
- Start Here: `startHere` (heading, intro, items[] with trigger/action/href)
- How To Use: `howToUse` (heading, intro, listHeading, items[], footnote)
- Calculator groups (×3): `calculators.groups[]` (id, heading, tools[] with title/href/helpsWith/whyMatters/usedWhen/note)
- Prosperity Insight: `prosperityInsight` (heading, paragraphs[])
- How And Why: `howAndWhy` (heading, paragraphs[], listHeading, items[], closing, cta)
- Resource Library topics (×7): `resourceLibrary.topics[]` (title, description)
- Downloadable Guides: `downloadableGuides` (heading, items[], cta)
- Videos: `videos` (heading, items[])
- Educational Note: `educationalNote`
- Closing: `closing` (heading, paragraphs[], cta)

### 12. Case Studies (`/case-studies`)

| Component | Props / Editable Fields | Data Source |
|-----------|------------------------|-------------|
| `InteriorHero` | `eyebrow`, `headline`, `subtitle`, `backgroundImage` | `case-studies.json → hero` |
| `ScenarioAccordion` (per scenario) | `title`, `children` (rendered content) | `case-studies.json → categories[].scenarios[]` |

**Inline rendered content (all from `case-studies.json`):**
- Hero intro: `heroIntro` (paragraphs[], tagline)
- What You'll See: `whatYoullSee` (heading, items[])
- Intro section: `introSection` (heading, paragraphs[])
- What Designed To Show: `whatDesignedToShow` (heading, items[] with title/body)
- Planning Process: `planningProcess` (heading, subtitle, paragraphs[], steps[] with number/title/body)
- Scenarios Intro: `scenariosIntro` (heading, paragraphs[], illustrativeHeading, illustrativeParagraphs[], howToUse with heading/items[]/disclaimer)
- Quick Links: `quickLinks[]` (label, href)
- Categories with scenarios — deeply nested (see Complex Components section)
- Per-scenario: title, subtitle, introBody, scenario, objectives[], planningConsiderations[], howWeHelp, keyTakeaways[], strategies[], disclosure

---

## Complex Components with Array/Nested Content

These components render arrays of items and require special CMS handling (repeatable fields, nested editors, etc.).

### 1. `ServicesGrid`
**Used on:** Home
**Array structure:**
```
categories[] → {
  title: string
  description: string
  href: string
  items[] → { title: string, description: string }
}
```
**Nesting depth:** 2 levels

### 2. `ProcessSection`
**Used on:** Home
**Array structure:**
```
steps[] → { title: string, description: string }
```
**Nesting depth:** 1 level (flat array of 6 items)

### 3. `MissionSection`
**Used on:** Home
**Array structure:**
```
badges[] → { icon: ReactNode, label: string }
```
**Note:** Icons are currently inline SVG React nodes — CMS will need an icon picker or predefined icon set.

### 4. `ContactSection`
**Used on:** Home, Contact
**Array structure:**
```
details[] → { icon: ReactNode, label: string, value: ReactNode }
```
**Note:** Icons and values are React nodes (SVGs, `<a>` tags). CMS will need to map icon names to SVGs and handle link rendering.

### 5. `ServiceAccordion`
**Used on:** Services
**Array structure (deepest nesting in the site):**
```
sections[] → {
  id, heading, body, bodyExtra?, bodyExtra2?
  relevanceHeading?, relevanceIntro?, relevanceItems[]?
  whyHeading?, whyIntro?, whyItems[]?
  subsections[]? → {
    heading, body?, bodyExtra?, bodyExtra2?
    items[]?
    disclaimer?
    ctaText?, ctaHref?
    subsections[]? → {
      heading, body?, items[]?
      subsections[]? → { heading, body?, items[]? }
    }
  }
  disclaimers[]?
  planningAreasHeading?, planningAreas[]?
  transition?
}
```
**Nesting depth:** 4 levels (sections → subsections → subsections → subsections)

### 6. `BusinessOwnerAccordion`
**Used on:** Home
**Currently fully hardcoded — no props at all.**
**Internal structure:**
```
relevanceItems[] → string (6 items)
sections[] → {
  heading, body
  subsections[] → {
    heading, body
    items[]? → string
    subsections[]? → { heading, body, items[]? }
  }
}
```
**Nesting depth:** 3 levels
**CMS action required:** Must be refactored to accept props from JSON/database before it can be CMS-managed.

### 7. `PortfolioCard`
**Used on:** Portfolios
**Array structure (parent maps over portfolios):**
```
portfolios[] → {
  id, name, summary, goal, purpose, description, tagline
}
```
**Note:** Component has hardcoded `pathIcons` SVG map keyed by portfolio id. CMS will need to either use a fixed icon set or store icon references.

### 8. `Accordion`
**Used on:** Process, FAQs
**Array structure:**
```
items[] → { question: string, answer: string }
```
**Nesting depth:** 1 level (flat Q&A pairs)

### 9. `ScenarioAccordion` + Scenario Content
**Used on:** Case Studies
**Array structure (most complex content on the site):**
```
categories[] → {
  id, title, intro, introExtra
  ctaHeading, ctaBody, ctaPrompt, ctaText
  scenarios[] → {
    number, title, subtitle, subtitleExtra?
    introBody, scenario (long text)
    objectives[]? → string
    objectivesGroups[]? → { heading, items[] }
    planningConsiderations[] → { heading, body, items[]? }
    howWeHelp → { intro, steps[]?, sections[]?, items[]?, body?, footer? }
    keyTakeaways[]? → string
    keyTakeawaysFooter?
    whyComplex? → { heading, body, items[], footer }
    whatCanGoWrong? → { heading, body, items[] }
    strategies[]? → { heading, body, items[]? }
    phasingExample? → { heading, items[] }
    keyTradeoffs? → { heading, items[] }
    disclosure
  }
}
```
**Nesting depth:** 4+ levels
**Note:** Scenarios have many optional fields with varying structures. CMS needs flexible schema per scenario.

### 10. Fee Sections
**Used on:** Fees (inline, no dedicated component)
**Array structure:**
```
sections[] → {
  id, heading
  paragraphs[] → string
  listHeading? → string
  items[]? → string
  footnotes[]? → string
}
```
**Nesting depth:** 2 levels

### 11. FAQ Categories
**Used on:** FAQs (feeds into Accordion component)
**Array structure:**
```
categories[] → {
  heading: string
  questions[] → { question: string, answer: string }
}
```
**Nesting depth:** 2 levels

### 12. Resource Calculator Groups
**Used on:** Resources (inline)
**Array structure:**
```
calculators.groups[] → {
  id, heading
  tools[] → { title, href, helpsWith, whyMatters, usedWhen, note }
}
```
**Nesting depth:** 2 levels

### 13. Audience Profiles
**Used on:** Who We Serve (inline)
**Array structure:**
```
audiences[] → {
  id, title, intro
  focusedOn[] → string
  howWeHelp
  planningAreas[] → string
  ctaText, ctaHref
}
```
**Nesting depth:** 2 levels

### 14. Process Steps (detailed)
**Used on:** Process (inline)
**Array structure:**
```
steps[] → {
  number, title, subtitle
  body[] → string
  listHeading
  items[] → string
  whyMatters
  whatYouLeaveWith[] → string
  cta?
}
```
**Nesting depth:** 2 levels

---

## Hardcoded Layout Content That Must Move to Database

### Header (`components/layout/Header.tsx`)

| Content | Current Value | Notes |
|---------|--------------|-------|
| Navigation items | 7 top-level items with 2 dropdown submenus | `NAV_ITEMS` array hardcoded; `shared.json` has `nav.links` but Header doesn't use it |
| Services submenu | "All Services", "Prosperity Pathways Portfolios", "Personal Prosperity Planning" | Nested children array |
| Learn submenu | "Planning Scenarios & Examples", "Resources & Learning Center", "FAQs", "Fees & How We're Paid" | Nested children array |
| CTA button text | "Schedule Review" (desktop) / "Schedule Your Strategy Review" (mobile) | Two variants |
| Calendly URL | `https://calendly.com/prosperityplanningandadvisory/clarity-session` | Repeated across components |

### Footer (`components/layout/Footer.tsx`)

| Content | Current Value | Notes |
|---------|--------------|-------|
| Company name | "Prosperity \| Planning & Advisory" | |
| Company description | "A fiduciary financial planning firm..." | |
| Address | "21255 Burbank Boulevard, Suite 120, Woodland Hills, CA 91367" | |
| Email | `help@prosperityadvisory.net` | |
| Phone | `888-427-5240` | |
| Footer link groups | 3 groups (Services, About, Resources) with 11 total links | `FOOTER_GROUPS` array hardcoded; `shared.json` has `footer.links` but Footer doesn't use it |
| Legal disclaimers | 5 paragraphs of regulatory/compliance text | |
| Insurance disclaimer | Separate paragraph | |
| Privacy Policy link | `/documents/privacy-notice.pdf` | |
| Copyright year | 2026 | Should auto-generate but is hardcoded |

### CtaBand (`components/sections/CtaBand.tsx`)

| Content | Current Value | Notes |
|---------|--------------|-------|
| Default headline | "Create Your Financial Plan With Us" | Used when no prop passed |
| Default subtext | "No question is too small..." | Used when no prop passed |
| Default CTA text | "Schedule Your Complimentary Strategy Review" | Used when no prop passed |
| Default Calendly URL | `https://calendly.com/prosperityplanningandadvisory/clarity-session` | |

### BusinessOwnerAccordion (`components/sections/BusinessOwnerAccordion.tsx`)

| Content | Current Value | Notes |
|---------|--------------|-------|
| Section heading | "Business Owner & Advanced Planning" | |
| All relevance items | 6 bullet points | Fully hardcoded |
| All accordion sections | 4 major sections with nested subsections and items | ~200+ lines of hardcoded content |
| CTA link | `/services#business-advanced` | |
| CTA text | "Schedule Your Complimentary Strategy Review" | |

### CalendlyButton (`components/ui/CalendlyButton.tsx`)

| Content | Current Value | Notes |
|---------|--------------|-------|
| Default Calendly URL | `https://calendly.com/prosperityplanningandadvisory/clarity-session` | |
| Theme colors | primaryColor, textColor, backgroundColor | Tied to design system |

### PortfolioCard (`components/sections/PortfolioCard.tsx`)

| Content | Current Value | Notes |
|---------|--------------|-------|
| Portfolio icons | 6 SVG path definitions keyed by portfolio id | Need icon management strategy |

### Inline SVG Icons (various pages)

| Page | Icons | Notes |
|------|-------|-------|
| Home (`page.tsx`) | Trust badges (3 icons), Contact details (3 icons) | Passed as React nodes |
| About (`about/page.tsx`) | Feature icons (6 icons) | Hardcoded SVG array |
| Planning (`planning/page.tsx`) | Service card icons (6), Portal feature icons (4) | Hardcoded SVG arrays |
| Contact (`contact/page.tsx`) | Contact method icons (3) | Inline SVGs |

---

## shared.json — Unused But Available

`content/shared.json` contains structured data for nav links, footer links, company info, and disclosures, but **no component currently imports it**. Only `lib/content.ts` imports it via `getSharedContent()`, but no page or component calls that function.

**Recommendation:** Wire Header and Footer to read from `shared.json` (or its database equivalent) as a first step before full CMS migration.

---

## Page Metadata

All 12 content JSON files include a `meta` object with:
- `title` — page title
- `description` — meta description
- `ogTitle` — Open Graph title
- `ogDescription` — Open Graph description

These are consumed via `getPageMeta()` in `lib/content.ts` and used in each page's `metadata` export.

---

## Calendly URL Duplication

The Calendly URL `https://calendly.com/prosperityplanningandadvisory/clarity-session` appears as a default in:
1. `HeroSection` (default prop)
2. `InteriorHero` (default prop)
3. `ProcessSection` (default prop)
4. `AdvancedStrategies` (default prop)
5. `CtaBand` (default prop)
6. `CalendlyButton` (default prop)
7. `Header` (hardcoded)
8. Multiple content JSON files (in CTA href fields)

**Recommendation:** Single source of truth in database config, consumed by all components.

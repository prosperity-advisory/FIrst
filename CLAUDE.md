# Prosperity Planning & Advisory — Website Rebuild

## Project
Full redesign and rebuild of prosperityadvisory.net for a fiduciary financial advisory firm based in Woodland Hills, CA. This is a paid client project built by PolymadLabs.

## Stack
- **Framework**: Next.js (App Router, TypeScript)
- **Styling**: Tailwind CSS
- **Fonts**: Playfair Display (headings/serif), DM Sans (body/sans)
- **Hosting**: Netlify (free tier)
- **Database**: Supabase (Milestone 3 only — not yet)
- **Scheduling**: Calendly API (Milestone 2 only — not yet)
- **Icons**: Inline SVGs (no icon library)

## Design System

### Color Palette (Forest Green Theme — this is the ONLY theme)
```
--navy: #14392B          /* Primary dark green — hero, nav, headings */
--navy-deep: #0B2A1E     /* Deepest green — gradients, footer */
--gold: #C9A84C          /* Accent gold — CTAs, eyebrows, highlights */
--gold-light: #DBBF6A    /* Gold hover state */
--cream: #F4F6F0         /* Alt section backgrounds */
--white: #FFFFFF          /* Card backgrounds, main bg */
--slate: #4B5B52          /* Body text */
--slate-light: #6B7E72    /* Secondary text */
--border: #D5DDD8         /* Borders, dividers */
```

### Typography
- Headings: Playfair Display (serif), weights 400/600/700
- Body: DM Sans (sans-serif), weights 300/400/500/600
- Eyebrow labels: DM Sans, 12px, uppercase, letter-spacing 0.18em, gold color
- Section headlines: Playfair Display, responsive sizing (28px mobile → 40px desktop)

### Component Patterns
- **Buttons**: `.btn-gold` (gold bg, navy text), `.btn-navy` (navy bg, white text), `.btn-outline` (transparent, gold border)
- **Cards**: White background, subtle border, rounded corners, hover lift with shadow
- **Sections**: Alternate between white and cream backgrounds. Dark sections use navy gradient.
- **Animations**: Fade-up on scroll using Intersection Observer. Staggered delays (0.1s increments).
- **Nav**: Sticky, transparent on hero, solid on scroll with backdrop blur. Mobile: slide-out drawer from right.

### Layout
- Container max-width: 1200px
- Section padding: 56px mobile, scales up on desktop
- Mobile-first responsive design
- Breakpoints: 480px, 768px, 1024px, 1280px

## Content Architecture
All page content lives in `/content/*.json` files. Components read from these files. This makes it easy to swap to Supabase in Milestone 3 — just change the data source.

Each JSON file should export an object with sections as keys. Example:
```json
{
  "hero": { "eyebrow": "...", "headline": "...", "subheadline": "...", "cta": { "text": "...", "href": "..." } },
  "sections": [ { "type": "mission", "content": {...} }, ... ]
}
```

## Pages (12 total)

### Existing (rebuild from current site)
1. Home — Hero, mission, 6-step process, services grid, advanced strategies, contact/location, CTA band
2. Services — Full service breakdown
3. Prosperity Pathways™ Portfolios — Investment management
4. Personal Prosperity Planning™ — Personal financial planning
5. Our Mission & Who We Are — About page
6. Contact — Contact info, location, scheduling

### New Pages
7. Who We Serve — Audience segmentation (retirees, business owners, professionals, families, attorneys)
8. Process — Expanded 6-step process detail
9. Fees / How We're Paid — Compensation transparency
10. FAQs — Common questions
11. Resources / Learning Center — Articles, guides, tools
12. Case Studies — Anonymized planning scenarios

## Project Structure
```
prosperity-advisory/
├── app/
│   ├── layout.tsx              # Root layout (header, footer)
│   ├── page.tsx                # Home
│   ├── services/page.tsx
│   ├── portfolios/page.tsx
│   ├── planning/page.tsx
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── who-we-serve/page.tsx
│   ├── process/page.tsx
│   ├── fees/page.tsx
│   ├── faqs/page.tsx
│   ├── resources/page.tsx
│   └── case-studies/page.tsx
├── components/
│   ├── layout/                 # Header, Footer, Nav, MobileMenu
│   ├── ui/                     # Button, Card, Badge, etc.
│   └── sections/               # Hero, Mission, Process, Services, etc.
├── content/                    # JSON content files per page
├── lib/                        # Utilities, content loaders
├── public/                     # Images, favicon, logo
├── CLAUDE.md
├── tailwind.config.ts
└── next.config.ts
```

## Code Conventions
- Server Components by default. Client Components only when needed (interactivity, hooks).
- Named exports for components (no default exports).
- Use Tailwind utility classes. No CSS modules unless absolutely necessary.
- Semantic HTML (section, article, nav, main, footer).
- All images use next/image with proper alt text.
- Each component in its own file.
- Keep components small — if a section component exceeds ~150 lines, break it into sub-components.

## SEO Requirements
- Every page needs: title, meta description, Open Graph tags
- Firm is in Woodland Hills, CA — include local SEO signals
- Semantic heading hierarchy (one h1 per page)
- All Calendly links point to: https://calendly.com/prosperityplanningandadvisory/clarity-session

## Important Notes
- NO theme switcher. Forest green is the only theme.
- The mockup HTML file (index.html) is the design reference — replicate its look and feel in React/Tailwind.
- The client's existing logo is at: https://prosperityadvisory.net/wp-content/uploads/2025/09/cropped-Logo-JPG.webp
- Footer must include the full legal disclaimer from the current site.
- Insurance disclaimer: "Prosperity Planning and Advisory, LLC is a fee-only registered investment adviser and does not sell insurance products or receive insurance commissions."

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — ESLint
- `npx netlify deploy --prod` — Deploy to Netlify

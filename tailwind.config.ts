import type { Config } from "tailwindcss";

/**
 * Prosperity Planning & Advisory — Tailwind Configuration
 *
 * Primary design tokens are defined in app/globals.css via @theme inline.
 * This file exists for any plugin or preset configuration that can't be
 * expressed in CSS. The color palette and font stacks live in globals.css
 * to take advantage of Tailwind v4's CSS-first configuration.
 *
 * Color Palette (Forest Green — the ONLY theme):
 *   navy:        #14392B   — Primary dark green (hero, nav, headings)
 *   navy-deep:   #0B2A1E   — Deepest green (gradients, footer)
 *   gold:        #C9A84C   — Accent gold (CTAs, eyebrows, highlights)
 *   gold-light:  #DBBF6A   — Gold hover state
 *   cream:       #F4F6F0   — Alt section backgrounds
 *   white:       #FFFFFF   — Card backgrounds, main bg
 *   slate:       #4B5B52   — Body text
 *   slate-light: #6B7E72   — Secondary text
 *   border:      #D5DDD8   — Borders, dividers
 *
 * Typography:
 *   serif: Playfair Display (headings) — 400/600/700
 *   sans:  DM Sans (body)             — 300/400/500/600
 *
 * Layout:
 *   Container max-width: 1200px
 *   Section padding: 56px mobile, scales up on desktop
 *   Breakpoints: 480px, 640px, 768px, 1024px, 1280px
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
};

export default config;

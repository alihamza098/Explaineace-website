# CLAUDE.md — ExplainerAce Portfolio Project Guide

This file provides Claude (Claude Code, Claude Projects, or web interface) with full context, operational rules, architecture, and commands to manage this repository seamlessly.

---

## 1. Project Overview & Identity
- **Website**: [explainerace.com](https://explainerace.com) (production canonical on Vercel)
- **Brand**: **EXPLAINERACE** (Founded by **Ali**)
- **Core Business**: Dedicated software video production specialist
  - **SaaS Walkthroughs & Demos**: $220 / 60 seconds (dynamic 3D zooms, cursor smoothing, UI spotlight framing)
  - **Simple Screencast Tutorials**: $120 / 60 seconds (pure instructional clarity, help desks, SOPs)
  - **AI UGC & Product Video Ads**: $200 – $300 / ad (hyper-realistic AI creators, 3s hook testing, kinetic captions)
  - **Custom UI Motion Graphics Explainers**: $800 – $1,200 (bespoke 2D/3D vector UI reconstruction)
- **Primary Contact**:
  - Email: `ali@explainerace.com` (do NOT use old gmail)
  - WhatsApp: `+92 313 9110721` (`wa.me/923139110721`)
  - YouTube: `https://www.youtube.com/@Explainerace` (@Explainerace)
  - Fiverr: two profiles, @video_supermacy (Level 2, 4.8★, 157 reviews) and @explainerace (5.0★, 18 reviews) · combined 4.8★ / 175+ reviews
  - Upwork: Direct Contract (0% client marketplace fee escrow)

---

## 2. Tech Stack & Architecture
- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS + Custom CSS motion system in `src/app/globals.css`
- **Package Manager / Runtime**: Bun (or Node / npm)
- **Icons**: `lucide-react`
- **Deployment**: Vercel (auto-deploys on push to `main`)

### Key Directories & Files
- `src/app/layout.tsx`: Root HTML, font smoothing, `ProfessionalService` JSON-LD schema, `ScrollProgress` bar
- `src/app/globals.css`: Full motion system, keyframes (`lineRise`, `kenBurns`, `scrub`, `cursorPath`, `aurora`, `shimmer`, `beamSpin`), scroll reveals
- `src/components/motion/`: Motion components:
  - `CountUp.tsx`: Intersection-triggered animated counter
  - `Marquee.tsx`: Infinite ticker with pause-on-hover
  - `Reveal.tsx`: Scroll-triggered easing entrance
  - `ScrollProgress.tsx`: Top gradient viewport scroll progress bar
  - `Spotlight.tsx`: Pointer-following radial card glow
- `src/data/siteConfig.ts`: Global brand info, social URLs, profiles, stats, phone, email
- `src/data/projects.ts`: All 27 portfolio videos, YouTube IDs, case studies, specs, testimonials
- `src/data/blog.ts`: 5 comprehensive SEO & conversion blog guides with schema and video embeds
- `src/data/pricing.ts`: Tier structures, features, and pricing FAQs
- `src/data/services.ts`: Category definitions, deliverables, and value-add feature blocks

---

## 3. Essential Commands
```bash
# Install dependencies
bun install   # (or: npm install)

# Local development server (port 3000)
bun run dev   # (or: npm run dev)

# Production build verification (MANDATORY before pushing)
bun run build # (or: npm run build)

# Production start
bun run start # (or: npm run start)
```

---

## 4. Git & Deployment Workflow
There are two Git remotes configured for redundancy:
1. `origin`: `https://github.com/Explainerace/Explaineace-website.git`
2. `alihamza`: `https://github.com/alihamza098/Explaineace-website.git`

### Standard Push Protocol
Whenever making changes, always:
1. Run `bun run build` to verify all 51+ static pages compile with 0 TypeScript/lint errors.
2. Commit changes with a conventional commit message:
   ```bash
   git add -A
   git commit -m "feat(scope): descriptive message"
   ```
3. Push to both remotes:
   ```bash
   git push origin main && git push alihamza main
   ```
4. Vercel automatically deploys within 60–90 seconds.

---

## 5. Strict SEO & Content Rules (DO NOT BREAK)
1. **Never Add `AggregateRating` Schema**:
   - The user explicitly requested: keep the combined 4.8/5 (175 reviews across 2 profiles) as plain text linking to Fiverr. Update these numbers when profile counts change (see siteConfig.ts).
   - Do NOT mark up reviews with Google schema to prevent rich-snippet review penalties.
2. **Contact Email Sitewide**:
   - Always use `ali@explainerace.com`. Never re-introduce `explaineracepro@gmail.com`.
3. **Contact Details Initial HTML**:
   - `/contact` must render phone `+923139110721`, email, WhatsApp, Upwork, and Fiverr in the initial server HTML (no client-only loading placeholders).
4. **4 Dedicated Service Pages**:
   - `/services/saas-walkthrough-video` (SaaS product demo & walkthroughs)
   - `/services/screencast-tutorials` (Screencast video production service)
   - `/services/app-demo-video` (Mobile app promo & demo service)
   - `/services/ai-ugc-ads` (AI UGC & product video ads)
5. **No Sideways Scrolling**:
   - Keep `overflow-x: hidden` and `max-width: 100vw` on `html, body, main` to ensure flawless mobile display.
6. **Self-Referencing Canonicals**:
   - Every page must have `alternates: { canonical: "https://explainerace.com/..." }`.

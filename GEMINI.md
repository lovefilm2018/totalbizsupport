# GEMINI.md — TotalBiz Support Website Specification

## 1. Project Overview & Core Domain
- **Project Name:** TotalBiz Support Website
- **Business Identity:** TotalBiz Support (`totalbiz.co.uk` / `totalbizsupport.co.uk`)
- **Location & Reach:** Based in Heathfield, East Sussex. Providing hands-on local support across East Sussex and nationwide remote consultancy via Google Meet.
- **Value Proposition:** *"Enterprise-Grade Support. Small Business Prices."* Delivering 20+ years of global corporate IT and business strategy experience (HSBC, eBay, AXA) directly to local sole traders, small businesses, property owners, and short-term rental (Airbnb) hosts.
- **Core Strategy:** Eliminate operational chaos without agency bloat or jargon. A single, reliable partner handling digital presence, hardware/network tech, admin/bookkeeping, and high-level strategy.

---

## 2. Technical Architecture & Tech Stack
- **Architecture:** Single-Page Application (SPA) powered by React 19 & TypeScript.
- **Framework & Build:** Vite 7 with `@tailwindcss/vite` (Tailwind CSS v4).
- **Routing:** `wouter` lightweight client-side router.
- **UI Components & Styling:** Radix UI primitives, Lucide React icons, Framer Motion animations, and Tailwind CSS.
- **Backend/Express Proxy:** Optional Node.js Express server in `server/index.ts` serving `dist/public`.
- **Hosting & Deployment:** Deployed directly to GitHub Pages (`totalbiz.co.uk`) via GitHub Actions workflow (`.github/workflows/deploy.yml`) running `pnpm build`.

---

## 3. Core File Structure & Directory Schema
```text
TotalBizSupport/
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Actions automated build & GitHub Pages deploy
├── client/
│   ├── index.html            # Main HTML entry point & SEO metadata
│   ├── public/               # Static assets & sitemap.xml
│   └── src/
│       ├── App.tsx           # Route mapping & main layout provider
│       ├── main.tsx          # React application root mount
│       ├── index.css         # Tailwind styles & theme custom properties
│       ├── pages/            # Home, Services, PersonalSupport, HowWeWork, About, Contact, NotFound
│       ├── components/       # Navigation, Footer, WhatsAppButton, Map, ErrorBoundary, ui/
│       └── assets/           # WebP/AVIF images & brand media
├── server/
│   └── index.ts              # Express static server entry point
├── shared/                   # Shared TypeScript schemas & types
├── package.json              # Dependencies & npm scripts (`dev`, `build`, `check`)
├── vite.config.ts            # Vite build, aliases (@ -> client/src), & plugins
├── GEMINI.md                 # Technical specification & domain truth (this file)
└── AGENTS.md                 # Operational rules & AI partnership protocol
```

---

## 4. Brand & UI/UX Guidelines
- **Color Palette:**
  - Primary Blue: `#1a3a52` / `#003366` (Deep corporate navy from logo emblem)
  - Accent Blue: `#00509E` / `#0284c7` (Vibrant interactive blue)
  - Slate Grey: `#4A5568` (Technical grey from logo gear)
  - Background: `#F8FAFC` (Clean background tint for alternating sections)
  - Text Main: `#1E293B`
  - Text Muted: `#64748B`
- **Typography:** Inter & Poppins (Google Fonts), weight range 400–700.
- **Navigation:** Fixed glassmorphism header (`backdrop-blur-md bg-white/90`) with responsive mobile slide-out menu.
- **Animations:** Micro-interactions and subtle fade/slide transitions via Framer Motion and Tailwind animation utilities.

---

## 5. Key Business Services & Page Structure
- **Home (`/`):** Hero section, value highlights, services preview, credentials, testimonial proof, CTA.
- **Services (`/services`):** Detailed breakdowns for Getting You Online, Tech & Equipment Fixes, Admin & Bookkeeping, Strategy & Advice.
- **Personal & Business Support (`/personal-support`):** Tailored technical and administrative support for individuals, sole traders, and property owners.
- **How We Work (`/how-we-work`):** Transparent step-by-step process, pricing clarity (hourly, project, retainer), local vs remote options.
- **About (`/about`):** Alex Poxon's 20+ years enterprise corporate IT background (HSBC, eBay, AXA) applied to local businesses.
- **Contact (`/contact`):** Direct contact options, embedded map, inquiry channels.

---

## 6. Endpoints, Contact & External Integrations
- **Primary Email:** `contact@totalbiz.co.uk`
- **Mailto Trigger:** `<a href="mailto:contact@totalbiz.co.uk">`
- **WhatsApp Direct Chat:** `https://wa.me/447799538311` (`+44 7799 538311`)
- **WhatsApp Floating CTA:** Fixed floating button at `bottom: 30px; right: 30px;` with brand green (`#25D366`) and hover scaling.
- **Google Tag Manager / Analytics:** `G-DXSNWTFQQ3`

---

## 7. Current Audit & Active Preview Status (August 2026)
- **Active Audit Report:** [`WEBSITE_AUDIT_RECOMMENDATIONS.md`](WEBSITE_AUDIT_RECOMMENDATIONS.md)
- **Canonical Preview Branch:** `preview-updates`
- **Completed Audit & Performance Upgrades:**
  1. **Google Business Reviews:** Integrated Bijou Coastal Stays & HS Garden Maintenance 5-star reviews into a new "What Clients Say" section on `Home.tsx`.
  2. **Hero Subheadline:** Shortened to ≤25 words on `Home.tsx`.
  3. **Engagement Icons:** Replaced emoji with Lucide icons on `Home.tsx`.
  4. **Navigation & Hydration Fix:** Added `Services` text link to desktop and mobile navs; eliminated all nested `<a>` inside `wouter` `<Link>` tags across `Navigation.tsx`, `Footer.tsx`, `About.tsx`, `Home.tsx`, `Services.tsx`, `HowWeWork.tsx`, and `PersonalSupport.tsx` (fixes React hydration errors).
  5. **Form Touch Targets:** Added `text-base` to inputs in `Contact.tsx` (fixes iOS auto-zoom).
  6. **Footer Links:** Connected service list items in `Footer.tsx` directly to `/services`.
  7. **Pricing Card:** Updated featured card on `HowWeWork.tsx` with a "Most Popular" badge pill.
  8. **About Page Roster Ready:** Preserved founder profile card with handwriting badge (*"Contact me directly..."*) and clean corporate background lists; ready for multi-team bio grid addition.
  9. **Interactive FAQ Accordion:** Converted static FAQ list on `HowWeWork.tsx` into an interactive Radix UI collapsible accordion dropdown.
  10. **Scroll Micro-Animations:** Integrated smooth scroll entrance fade-up animations on `Home.tsx` via `framer-motion`.
  11. **PageSpeed Asset Optimization:** Compressed `websites-apps.jpg` graphic from **569 KB to 95 KB** (83% size reduction).
  12. **Production Deployment & Domain Locking:** Fixed production Vite config and added `CNAME` for `totalbiz.co.uk` on GitHub Pages.
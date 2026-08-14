# GEMINI.md — TotalBiz Support Website Specification

## 1. Project Overview & Core Domain
- **Project Name:** TotalBiz Support Website
- **Business Identity:** TotalBiz Support (`totalbiz.co.uk`)
- **Location & Reach:** Based in Heathfield, East Sussex. Providing hands-on local support across East Sussex, West Sussex, and Kent, plus UK-wide remote consultancy via Google Meet.
- **Value Proposition:** *"Enterprise-Grade Support. Small Business Prices."* Delivering 20+ years of global corporate IT and business strategy experience (HSBC, eBay, Schroders, Gumtree) directly to local sole traders, small businesses, property owners, and short-term rental (Airbnb) hosts.
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
- **About (`/about`):** Alex Poxon's 20+ years enterprise corporate IT background (HSBC, eBay, Schroders, Gumtree) applied to local businesses.
- **Contact (`/contact`):** Direct contact options, embedded map, inquiry channels.

---

## 6. Endpoints, Contact & External Integrations
- **Primary Emails:** `contact@totalbiz.co.uk`, `alex@totalbiz.co.uk` (Main Gmail account: `totalbizsupport@gmail.com`)
- **Mailto Trigger:** `<a href="mailto:contact@totalbiz.co.uk">` / `<a href="mailto:alex@totalbiz.co.uk">`
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
  13. **Marketing Command Centre & API Engine:** Deployed 6 strategy ledgers in `marketing/`, authenticated Google Search Console API (`siteOwner`), GA4 API, Facebook Page Graph API (Day 1 post live: `1207871262402389_122127780927360282`), and LinkedIn REST API (Day 1 post live: `urn:li:share:7492362707782881280`).
  14. **Website Tier Separation & Regional Reach (Day 2 Task 1):** Added visual reach badges (`📍 On-Site (Sussex & Kent)`, `🌐 UK-Wide Remote`, `⚡ On-Site & Remote`) across `Home.tsx` and `Services.tsx`; fixed navigation CTA button to `Get Support` (`/contact`); expanded Schema JSON-LD `areaServed` and meta tags to cover East Sussex, West Sussex, Kent, and United Kingdom.
  15. **Brand Favicon & Address Bar Logo (Day 3):** Linked `/profile_picture.png` directly in `index.html` for standard favicon, Apple Touch icon, and search snippet branding.
  16. **High-Margin Service Promotion & Social API Automation (Day 4):** Published Day 4 Facebook post (`1207871262402389_122129279307360282`) and LinkedIn post (`urn:li:share:7493602320744689664`) live via REST APIs; confirmed #1 GSC search rank for 10 high-intent queries.
  17. **AI Life Hacks Video Production Engine (Day 4):** Onboarded Manus AI programmatic video compositing framework (`marketing/03-content/life-hacks/`) and installed system Gyan.FFmpeg 9.0 build (`C:\Users\TotalBiz\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0-full_build\bin\ffmpeg.exe`) for 1-click automated short-form video rendering and publishing.
  18. **Serverless Cloud Scheduler & Poster Engine (Day 4):** Deployed dedicated Google Cloud Run microservice `totalbiz-social-poster` in `europe-west2` (London) with exact-second Cloud Schedulers (`totalbiz-morning-linkedin` at 07:45 BST Sharp & `totalbiz-evening-meta` at 19:30 BST Sharp) for 100% automated offline multi-channel posting.
  19. **Instagram Brand Carousel Launch (Day 4):** Onboarded `@totalbiz_support`, generated 1080×1350 HD 3-slide brand overview with tight two-tone logo color transformation (Electric Cyan & White), and published live to Instagram via Graph API (Media ID: `17925715092167780`).
  20. **Serverless LinkedIn Video Engine & Lunch Scheduler (Day 5):** Integrated full streaming binary LinkedIn digital media video pipeline into Cloud Run microservice (`/publish/lunch-linkedin`), fixed asset recipe polling, provisioned Google Cloud Scheduler `totalbiz-lunch-linkedin` for 12:30 BST sharp, and published live AI Life Hack #1 post (`urn:li:ugcPost:7493998521759522816`).
  21. **Permanent Meta Page Token & Multi-Channel Pipeline (Day 5):** Upgraded Cloud Run microservice (`totalbiz-social-poster`) with non-expiring Page Access Token and 2.5s container rendering delay; published Day 5 Small Business Proof live to Facebook (`1207871262402389_122129866749360282`) and Instagram (`18088281983446321`).



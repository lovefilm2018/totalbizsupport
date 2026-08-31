# GEMINI.md — TotalBiz Support Website Specification
> **Operational Partnership Rules:** All AI agents operating in this workspace (Antigravity CLI or Gemini CLI) must strictly adhere to the operational rules, pre-deployment summaries, and instant audit logging defined in [AGENTS.md](AGENTS.md).


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
  22. **Contextual Branded Social Visuals Protocol (Day 6):** Codified strict mandate in `AGENTS.md` ensuring all future Instagram, Facebook, and LinkedIn posts generate topic-specific graphics (website mockups, hardware/network diagrams, automation flows, review quote cards) with TotalBiz branding, Cyan/Navy styling, and 1080×1350 formatting.
  23. **Zero-Fallback Scheduler Engine & Free Contact Wednesday (Day 8):** Deployed live Cloud Run revision `totalbiz-social-poster-00009-7gc` eliminating stale/duplicate fallback reposts, requiring strict explicit queue entries per London date; published Free Advice Wednesday photo post live to Facebook Page (`1207871262402389_122131828485360282`).
  24. **Telegram Operations Hub Live Tool Module & GSC Live Sync (Day 9):** Developed and deployed `tools/totalbiz.py` to `/storage/services/telegram_gateway/tools/totalbiz.py` on the GigaRapid seedbox. Integrated live Google Search Console OAuth2 service account queries, live HTTP route health audits, Cloud Run queue management, and Meta/LinkedIn publishing into the 24/7 mobile Telegram daemon. Protected repository with `.gitignore` and fully synchronized codebase with `origin/main`.
  25. **Meta Token Refresh, LinkedIn Text Publishing & Multi-Channel Schedulers (Day 10):** Verified and re-authenticated fresh Meta Graph API tokens across Facebook (`1207871262402389`) and Instagram (`17841437512971881`); integrated native LinkedIn text publishing into Cloud Run microservice (`totalbiz-social-poster-00012-kq8`); created Google Cloud Scheduler `totalbiz-morning-linkedin` (07:45 BST Mon–Fri).
  26. **GA4 Service Account Admin Access & Friday Multi-Channel Queue (Day 10):** Granted full Administrator access to Google Analytics 4 (`G-DXSNWTFQQ3`) via the service account (`agy-search-console-agent@totalbiz-marketing-automation.iam.gserviceaccount.com`); queued Friday Morning LinkedIn post (07:45 BST) and Friday Evening Meta post (19:30 BST); generated bespoke 1080×1350 Instagram visual (`zombie_saas_audit_visual.jpg`) and synced with Telegram bot mockup engine.
  27. **Persistent Cloud Run Schedule Engine & Live LinkedIn Publication:** Published Friday morning LinkedIn thought leadership post live via UGC Posts API (`urn:li:share:7499036395513229312`); upgraded Cloud Run microservice (`totalbiz-social-poster-00016-gct`) with persistent disk caching + default seed schedule to withstand scale-to-zero cold starts; enhanced notification dispatcher to alert on Published, Failed, and Skipped dispatches.
  28. **Tuesday Multi-Channel Dispatches & Hardware/Wi-Fi Visual:** Rendered bespoke 1080×1350 artwork (`hardware_wifi_visual.jpg`) and queued Tuesday dispatches across Morning LinkedIn (07:45 BST — "The Hiring Trap") and Evening Meta (19:30 BST — "Eliminate Tech Gremlins: Hardware & Wi-Fi") on Google Cloud Run persistent queue; verified via Telegram Operations Hub `/queue` endpoint.





---

## Dual Launcher & Workspace Script Architecture
- **In-Workspace Storage:** All .bat launcher scripts are stored directly within this repository root folder (AGY_TotalBiz.bat, CLI_TotalBiz.bat).
- **Desktop Shortcut Model:** Desktop icons are Windows Shortcuts (.lnk) pointing directly to these in-workspace .bat files. This safeguards scripts against accidental desktop deletion and automatically includes them in daily Google Drive workspace backups.
- **Dual Launcher Suites:**
  - **AGY_TotalBiz.bat (Antigravity CLI):** Launches the full agentic AI coding assistant with --effort medium and multi-dir audit access.
  - **CLI_TotalBiz.bat (Gemini CLI):** Launches Gemini CLI (gemini-3.5-flash-lite) using project-isolated Google AI Studio API keys (GEMINI_API_KEY) for unlimited free-tier daily turns when AGY quota is on cooldown.
- **Standardized Pre-Launch Protocol:**
  1. UTF-8 code page enforcement (chcp 65001 > nul).
  2. Automatic upstream git synchronization (git pull --rebase --autostash).
  3. Operational audit logging to C:\Users\TotalBiz\Documents\AI_Usage_Audit\global_usage_audit.csv.
- **Launcher Modification Protocol:** When modifying launcher parameters, edit the .bat files located in the project's root folder; desktop shortcuts will immediately reflect the changes.

---

## 🛰️ GigaRapid Dedicated Seedbox & High-Compute Cluster Specification

### 1. Hardware & Network Profile (Enterprise Compute Node)
* **Compute Power:** 6+ dedicated vCores (3.35GHz base / up to 4.9GHz Turbo).
* **Network Throughput:** Shared **25 Gbps pipe** with **14TB monthly egress** (currently using <10%).
* **Storage Capacity:** ~3.9TB high-speed personal NVMe/SSD pool mounted on `/storage`.
* **Cost / Allocation:** Zero marginal cost (£0.00). Use as the primary compute offload destination.

### 2. Architectural Offload & Design Suggestion Rule
> **Rule for AI Agents:** When architecting, proposing, or implementing new features that require:
> 1. Continuous 24/7 background execution or high-frequency cron daemons
> 2. Heavy parallel web scraping (e.g. MealMind supermarket pricing, competitor analysis)
> 3. Large data processing, video/image transcoding, or bulk file ingestion
> 4. Multi-terabyte automated backups (`rclone` to Google Drive)
> 
> **Always proactively suggest utilizing the GigaRapid Seedbox Compute Cluster** rather than burning billable GCP Cloud Run / Lambda quotas or running heavy loads on Alex's local PC.

### 3. SSH Connectivity & Remote Execution
* **SSH Command:** `ssh -i ~/.ssh/gigarapid_key -p 34004 lovefilm2018@openssh-ubuntu-lovefilm2018.elektra.mygiga.cloud`
* **SSH Host Alias (Windows/PowerShell):** `ssh lovefilm-seedbox`
* **Authentication:** ED25519 Private Key (`~/.ssh/gigarapid_key` on local Windows machine).

### 4. Standard Seedbox Directory Schema
```text
/storage/
├── services/
│   └── telegram_gateway/               # 24/7 Telegram Operations Hub Daemon (@TotalBizAgyBot)
│       ├── bot.py                      # Main polling supervisor daemon
│       ├── topic_mappings.json         # Thread-to-project persistent mappings
│       ├── service_account.json        # Google Cloud IAM credentials (all projects)
│       ├── context/                    # Project context engines (*.md)
│       └── tools/                      # Project live tool scripts (*.py)
├── workspaces/                         # Mirrored Git repositories across all 7 projects
│   ├── DogField/
│   ├── TotalBizSupport/
│   ├── MealMind/
│   └── ...
└── .appdata/                           # Persistent app configurations & SQLite databases
    ├── homarr/
    ├── sonarr/
    └── radarr/
```

### 5. Telegram Daemon Supervisor & Reload Protocol
Whenever updating project tools (`tools/<project>.py`) or context (`context/<project>.md`):
```bash
ssh -i ~/.ssh/gigarapid_key -p 34004 lovefilm2018@openssh-ubuntu-lovefilm2018.elektra.mygiga.cloud "pkill -f '[b]ot.py'; nohup python3 /storage/services/telegram_gateway/bot.py >/storage/services/telegram_gateway/bot.log 2>&1 </dev/null & disown"
```
Verify running PID with: `ssh lovefilm-seedbox "pgrep -a -f 'bot.py'"`

---

## 9. Automated Social Media Schedulers & Real-Time Discord Alerts

### Google Cloud Run Microservice (`totalbiz-social-poster`)
* **Project ID:** `totalbiz-marketing-automation`
* **Region:** `europe-west2` (London)
* **Service URL:** `https://totalbiz-social-poster-682815206557.europe-west2.run.app`
* **Automated Publishing Schedules:**
  * **07:45 BST:** Morning LinkedIn Thought Leadership (`/publish/daily-morning`)
  * **12:30 BST:** Lunch LinkedIn Native Video (`/publish/lunch-linkedin`)
  * **19:30 BST:** Evening Meta Facebook Page (`1207871262402389`) + Instagram Business (`@totalbiz_support`, `17841437512971881`) (`/publish/daily-evening`)
* **Real-Time Discord Webhook Alerts:** Every publication dispatch triggers an instant rich embed notification to Discord (with visual artwork, execution status, and error logs).
* **CLI Inspection Tool:** `python tools/totalbiz.py queue` (Inspect in-memory schedule) & `python tools/totalbiz.py analytics` (Live Meta, Instagram, and LinkedIn metrics).

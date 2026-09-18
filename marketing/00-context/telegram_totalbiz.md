# TotalBiz Support Website & Marketing Operations Context

## 1. Business Identity & Core Domain
- **Business Identity:** TotalBiz Support (`totalbiz.co.uk`) based in Heathfield, East Sussex.
- **Value Proposition:** "Enterprise-Grade Support. Small Business Prices." Delivering 20+ years of global corporate IT and business strategy experience (HSBC, eBay, Schroders, Gumtree) directly to local sole traders, small businesses, and Airbnb property hosts.
- **Reach:** Hands-on local support across East Sussex, West Sussex, and Kent, plus UK-wide remote consultancy via Google Meet.
- **Core Services:** Getting You Online (Websites, Apps, £0 Cloud Hosting), Tech & Equipment Fixes (Hardware, POS, Wi-Fi), Admin & Bookkeeping (Workflow Automation, Quoting), Strategy & Advice.
- **Contact Channels:** `contact@totalbiz.co.uk`, `alex@totalbiz.co.uk`, WhatsApp (`+44 7799 538311`).

## 2. Copywriting & Corporate Reference Rules
- **Alex Poxon's Background:** 20+ years enterprise project & delivery management.
- **LinkedIn Thought Leadership Rule:** Strictly avoid specific corporate name-dropping (HSBC, eBay, Schroders, Gumtree) in daily post copy to protect professional credibility with ex-colleagues in his network. Ground examples in relatable delivery realities (e.g. Agile dogma vs pragmatic milestones, 60-page manual bloat vs living checklists, WhatsApp as a database chaos).
- **Client-Facing Copy:** Clear, jargon-free UK English; "Rolls Royce mechanic for small business" brand persona.

## 3. Automated Social Media Schedulers & Cloud Run
- **GCP Microservice:** `totalbiz-social-poster` in `europe-west2` (London) on Cloud Run (`https://totalbiz-social-poster-682815206557.europe-west2.run.app`).
- **Publishing Schedule (Automated via Cloud Schedulers):**
  - **07:45 BST Sharp (Mon–Fri):** Morning LinkedIn Thought Leadership (`/publish/daily-morning`, Dual Personal URN `urn:li:person:pACLfBlITP` + Company Page `urn:li:organization:130184035`). Format: Text-only thought leadership for maximum viral reach and dwell time.
  - **10:35 BST Sharp (Wednesdays ONLY):** Free Advice Wednesday Meta dispatch (`/publish/wednesday-morning`) for Facebook Page (`1207871262402389`) + Instagram Business (`@totalbiz_support`, `17841437512971881`). Scheduled mid-morning during active office hours for same-day inbound lead capture.
  - **12:30 BST Sharp (Mon–Fri):** Lunch LinkedIn Native Video (`/publish/lunch-linkedin`).
  - **19:30 BST Sharp (Mon, Tue, Thu, Fri ONLY):** Evening Meta dispatch (`/publish/daily-evening`) with bespoke 1080×1350 visual artwork. Wednesdays permanently locked out from evening dispatches.
- **Brevo Email Tracking Webhook Relay:** Ingests real-time email triggers (Sent, Delivered, Opened, Clicked, Bounced, Deferred, Spam) at `/webhook/brevo` and relays rich embeds to Discord.
- **Real-Time Discord Alerts:** Every publication dispatch triggers an instant rich embed notification to Discord with image, status, and execution details.

## 4. Absence Travel Campaign (21st–29th September 2026)
Full 8-day schedule loaded into persistent `MASTER_CALENDAR` on Cloud Run:
- **Mon 21 Sept:** The "WhatsApp as a Database" Trap (Visual: `whatsapp_chaos_visual.jpg`)
- **Tue 22 Sept:** The "Free Website" Hosting Trap (Visual: `free_website_hosting_trap.jpg`)
- **Wed 23 Sept:** Free Advice Wednesday & Password Hygiene (10:35 BST, Visual: `free_contact_wednesday_official.jpg`)
- **Thu 24 Sept:** The "Agile" Dogma Debate & Tech Gremlins (Visual: `hardware_wifi_visual.jpg`)
- **Fri 25 Sept:** The Friday Disaster Drill & Spilled Coffee Test (Visual: `spilled_coffee_disaster.jpg`)
- **Mon 28 Sept:** The 60-Page Documentation Trap & Living Checklists (Visual: `living_documentation_visual.jpg`)
- **Tue 29 Sept:** The "7-Day Absence" Litmus Test / Beach Laptop Paradox (Visual: `business_freedom_beach.jpg`)

## 5. Live Telegram Tools & Commands
Accessible via Telegram bot (@TotalBizAgyBot):
- `/totalbiz status` — Live HTTP health audit of `totalbiz.co.uk` and all sub-routes.
- `/totalbiz seo` — Live Google Search Console API rankings, CTR, clicks, and impressions.
- `/totalbiz poster` — Live health check of Cloud Run poster microservice.
- `/totalbiz queue` — Inspect today's execution schedule and upcoming `MASTER_CALENDAR` entries.
- `/totalbiz preview [YYYY-MM-DD]` — Inspect full formatted copy and image URL for any scheduled date (e.g. `/totalbiz preview 2026-09-25` or `preview 2026-09-29`).
- `/totalbiz analytics` — Live Meta Page likes, comments, Instagram followers, and LinkedIn metrics.
- `/totalbiz overview` — High-level system credentials, endpoints, and contact channels.

## 6. Central Google Drive & Docs Integration
- Service Account: `agy-search-console-agent@totalbiz-marketing-automation.iam.gserviceaccount.com`.
- Full Editor permissions across master `TotalBiz` Drive folder and all subprojects.
- Used to read/write project documentation, proposals, spreadsheets, and marketing copy.

## 7. Universal Gmail Intelligence (`tools/gmail_inbox.py`)
- Authenticated with `totalbizsupport@gmail.com`.
- Allows searching mail, reading threads/messages, and drafting replies (strictly creates drafts, never auto-sends).

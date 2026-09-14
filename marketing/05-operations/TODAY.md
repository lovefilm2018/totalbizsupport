# Daily Marketing Execution Blueprint — Day 14 (2026-09-14)

**Date:** Monday, 14 September 2026  
**Lead:** Antigravity CLI (Marketing Operations Lead & Senior Developer)  
**Assistant / Executor:** Alex Poxon (Project Director)  

---

## 🎯 DAY 14 OBJECTIVES & REST-OF-WEEK CAMPAIGN: Full Weekly Schedule Loaded

1. **Rest-of-Week Strategy & Multi-Channel Editorial Calendar (15th–18th September 2026):**
   - **Tuesday (15/09):**
     - **Morning LinkedIn (07:45 BST Sharp):** *The "Invisible 20%": How Small Business Owners Lose 1 Working Day a Week to Low-Value Admin* (Dual Personal + Company Page).
     - **Evening Meta (19:30 BST Sharp):** *Stop Losing Sunday Evenings to Invoicing & Paperwork* (Facebook Page + Instagram Business with bespoke 1080×1350 artwork `admin_invoicing_visual.jpg`).
   - **Wednesday (16/09):**
     - **Morning LinkedIn (07:45 BST Sharp):** *The "Contact Form Graveyard": Why 70% of High-Intent Website Inquiries Never Convert* (Dual Personal + Company Page).
     - **Mid-Morning Meta (10:35 BST Sharp):** *Free Advice Wednesday: Got a Tech, Website or Admin Headache?* (Facebook Page + Instagram Business with official canonical badge `free_contact_wednesday_official.jpg`).
     - **Evening Meta (19:30 BST):** Safely skipped automatically via zero-duplicate protection once morning is published.
   - **Thursday (17/09):**
     - **Morning LinkedIn (07:45 BST Sharp):** *The £5,000 Agency Quote Myth: Why Most Small Businesses Overpay for Underperforming Websites* (Dual Personal + Company Page).
     - **Evening Meta (19:30 BST Sharp):** *Does Your Business Show Up When Local Customers Search for Your Services?* (Facebook Page + Instagram Business with bespoke 1080×1350 artwork `local_seo_website_visual.jpg`).
   - **Friday (18/09):**
     - **Morning LinkedIn (07:45 BST Sharp):** *The "Spilled Coffee" Litmus Test: Could Your Business Survive a Hardware Disaster on Monday Morning?* (Dual Personal + Company Page).
     - **Evening Meta (19:30 BST Sharp):** *The Spilled Coffee Test: Is Your Business Data Safe If Hardware Fails Today?* (Facebook Page + Instagram Business with bespoke 1080×1350 artwork `disaster_recovery_backup_visual.jpg`).

2. **Bespoke Visual Asset Production (1080×1350):**
   - Generated using headless Edge pipeline (`scripts/render-week-visuals.js`) with official TotalBiz Electric Cyan & Navy branding, Poppins typography, and topic-specific highlight cards.
   - Staged in both `client/public/` and `marketing/03-content/` for GitHub Pages raw URL serving.

3. **Cloud Run Auto-Pilot Microservice & Schedulers:**
   - Loaded complete 4-day editorial schedule into `MASTER_CALENDAR` in `server.js`.
   - Updated `deploy.ps1` to include dedicated Wednesday Mid-Morning Meta job (`totalbiz-wednesday-morning-meta` at 10:35 BST) alongside morning LinkedIn (07:45 BST) and evening Meta (19:30 BST).

---

## 📊 Status Tracker
- [x] **Weekly Strategy Blueprint Formulated & Approved:** 🟢 **DONE**
- [x] **3 Bespoke 1080×1350 Visuals Rendered:** 🟢 **GENERATED & STAGED** (`admin_invoicing_visual.jpg`, `local_seo_website_visual.jpg`, `disaster_recovery_backup_visual.jpg`)
- [x] **Master Calendar Updated (server.js):** 🟢 **LOADED** (2026-09-15 through 2026-09-18)
- [x] **Cloud Scheduler Configuration Updated (deploy.ps1):** 🟢 **CONFIGURED**
- [ ] **Cloud Run Deployment to London (`europe-west2`):** 🟡 **PENDING EXECUTION**
- [ ] **Upstream GitHub Synchronization:** 🟡 **PENDING COMMIT & PUSH**

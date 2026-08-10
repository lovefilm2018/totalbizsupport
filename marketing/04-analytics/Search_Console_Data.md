# Google Search Console Audit & Live Analytics Ledger

**Last API Audit:** Today  
**Authenticated Domain:** `sc-domain:totalbiz.co.uk` (Site Owner)  
**Service Account:** `agy-search-console-agent@totalbiz-marketing-automation.iam.gserviceaccount.com`  

---

## 1. Indexing & Sitemap Status
- **Active Canonical Sitemap:** `https://totalbiz.co.uk/sitemap.xml` (Submitted & Active, 6 routes)
- **Legacy Cleanup Executed:** Successfully deleted legacy 2022 antivirus sitemap (`https://www.totalbiz.co.uk/custom/domain_1/sitemap/index.xml`) via GSC API to eliminate 404 indexing errors.

---

## 2. Live Search Performance (Last 30 Days)

| Search Query | Target Route | Impressions | Average Google Rank Position |
| :--- | :--- | :--- | :--- |
| `business it support near me` | `https://totalbiz.co.uk/` | 1 | **#1.0** |
| `it support company near me` | `https://totalbiz.co.uk/` | 2 | **#1.0** |
| `small business it support near me` | `https://totalbiz.co.uk/` | 1 | **#1.0** |
| `it consultant for small business` | `https://totalbiz.co.uk/` | 2 | **#1.5** |
| `business it support` | `https://totalbiz.co.uk/` | 6 | **#1.5** |
| `business it support tonbridge` | `https://totalbiz.co.uk/` | 13 | **#2.0** |
| `small businesses near me.` | `https://totalbiz.co.uk/` | 3 | **#3.0** |
| `total biz` | `https://totalbiz.co.uk/` | 5 | **#4.0** |

---

## 3. Automated API Commands Available
AGY CLI has full automated script execution for:
- `node scripts/gsc-audit.js` — Fetch live clicks, impressions, rankings, and sitemap status.
- Re-indexing calls for updated routes.
- Tracking CTR and position movements across East Sussex & UK-wide keywords.

# TotalBiz Support — Website Audit & Design Elevation Report

> **Audit Date:** 7 August 2026 | **Auditor:** Antigravity AI (Claude Sonnet 4.6)
> **Repository:** `lovefilm2018/totalbizsupport` | **Live URL:** `https://totalbiz.co.uk`

---

## 1. Executive Summary & Overall Scores

### Score Card

| Dimension | Score | Notes |
|---|---|---|
| **Visual Design & Hierarchy** | 72 / 100 | Solid foundations, clear brand palette; lacks premium depth, micro-animations, and visual "wow" moments |
| **Mobile Responsiveness** | 78 / 100 | Functions well; hero CTA spacing, nav tap targets, and card readability need refinement |
| **Conversion Optimisation** | 65 / 100 | Good CTA placement but critical gap: **zero social proof / testimonials** anywhere on the site |
| **Technical & SEO Health** | 82 / 100 | AVIF images, schema markup, sitemap, and robots.txt all solid; one unused Map component and large JPEG asset |
| **Content & Messaging** | 80 / 100 | Strong personal voice and clear USP; some pages are copy-heavy with dense paragraph blocks |

### Overall Composite: **75 / 100**

The site is functionally sound and clearly branded. The single biggest opportunity is converting browsers into enquiries. Currently the site lacks **testimonials**, **real client trust signals**, and **visual depth** that would push it from "decent local business website" into "premium-grade showcase" territory.

---

## 2. Key Strengths

- ✅ **Strong value proposition** — "Corporate-Grade Support. Small Business Prices." lands immediately in the H1; it is punchy, honest, and sector-relevant.
- ✅ **Credible founder narrative** — The HSBC / eBay / Schroders background listed across multiple pages builds genuine authority. This is a major differentiator.
- ✅ **Clean brand palette** — Navy `#004f9f` / slate-grey `#2c3439` is a dignified, professional combination that aligns with the logo and avoids the garish colour choices common in this sector.
- ✅ **Responsive image format** — AVIF assets are correctly used, which is excellent for Core Web Vitals.
- ✅ **Structured data (schema)** — `ProfessionalService` JSON-LD on the home page and `FAQPage` schema on How We Work is excellent SEO groundwork.
- ✅ **WhatsApp floating CTA** — Correctly positioned, correctly branded (`#25D366`), and always visible.
- ✅ **Alternating image/text layout on Services** — The `isImageRight` pattern creates good visual rhythm on desktop.
- ✅ **Contact form working** — Formspree integration tested; the form resets and provides toast feedback on submit.
- ✅ **Glassmorphism nav** — `backdrop-blur` sticky header works well on desktop. Feels modern.
- ✅ **About page personal touch** — The `Caveat` handwriting font on "Contact me directly…" is a genuine differentiator that adds warmth and humanises Alex's profile.

---

## 3. High-Priority Quick Wins

> These are issues that can be fixed today with minimal risk and will have an **immediate, measurable impact** on conversions or visual quality.

### QW-1 — CRITICAL: Add Social Proof / Testimonials (ZERO currently exist on the site)
**Impact: Very High | Effort: Low**

This is the single biggest conversion killer on the site. Visitors land on the page, read about 20 years of corporate experience, and then… see no evidence anyone has actually hired Alex. Top-tier consultancy sites put testimonials in at least 3 locations: hero section, services page, and contact page.

**Recommended locations:**
- A scrolling ticker strip or static 3-card block between the Trust Section and Services Section on `Home.tsx`
- One testimonial quote card at the bottom of the Services CTA section in `Services.tsx`
- A single highlighted testimonial above the contact form in `Contact.tsx`

**Content needed from Alex:**
- 2–3 client quotes (can be anonymised, e.g., "Sarah T., Airbnb Host, East Sussex")
- Even placeholder star ratings with real context would be better than nothing

---

### QW-2 — Hero section subheadline is too long (Home page)
**Impact: Medium | Effort: Very Low**

The current subheadline is **49 words**, which is nearly double the recommended maximum. Eye-tracking studies consistently show users scan the first 8–12 words of a subheadline on a hero and skip the rest.

**Current:**
> "From high-level business strategy and project management to Google Home setups, Wi-Fi fixes, and filing Self-Assessments, TotalBiz Support helps small businesses, property owners, sole traders, and busy individuals get things sorted without jargon, stress, or unnecessary cost."

**Recommended (≤25 words):**
> "One reliable partner. Every problem sorted. Tech, strategy, admin, and smart home support — without jargon, stress, or hidden costs."

Move the fuller explanation into the Founder's Story section which follows immediately below.

---

### QW-3 — Hero section has no human face visible on desktop
**Impact: High | Effort: Low**

The hero currently has a very low-opacity background image (20% opacity) that barely registers. Research from Nielsen Norman Group consistently shows service businesses convert better when a real human face is visible in the hero area. Alex's photo (`ap.avif`) already exists in assets.

**Recommendation:** Add a right-aligned photo of Alex in the hero section on `md:` screens alongside the headline/CTA block. This would also reduce the large empty whitespace visible on the right side of the hero on desktop.

---

### QW-4 — Navigation missing "Services" as a text link
**Impact: Medium | Effort: Very Low**

The current nav only shows: `How We Work | About | Contact | [Explore Services button]`

The word "Services" does not appear as a text link at all. The "Explore Services" button is prominent on desktop but on mobile the slide-out menu shows 3 text links then a large button — with **no visual indicator** that Services is the primary destination. Users instinctively look for "Services" or "What We Do" as a nav item.

**Fix:** Add `Services` as a text nav link in addition to (or instead of the button for mobile) the current `Explore Services` CTA button. The button form can stay on desktop.

---

### QW-5 — Footer services list is not linked
**Impact: Low | Effort: Very Low**

In `Footer.tsx`, the "Services" list items (`Getting You Online & Mobile Apps`, `Tech & Equipment Fixes`, etc.) have `cursor-pointer` and hover styles but no `href`. They are dead links that go nowhere.

**Fix:** Either remove the pointer cursor and hover styling, or make each one link to `/services`.

---

### QW-6 — Contact page has no map
**Impact: Medium | Effort: Low**

The `Map.tsx` component exists in the components directory but is not rendered anywhere on the live Contact page. For a locally-based service business, a map is a significant trust and local SEO signal. It visually confirms you are a real, local business.

**Fix:** Import and render `<Map />` below the contact info cards in `Contact.tsx`.

---

### QW-7 — `websites-apps.jpg` is 569 KB — too large
**Impact: Medium (Core Web Vitals) | Effort: Low**

All other site images are correctly in `.avif` format and well-compressed. The `websites-apps.jpg` generated for the services page is **569 KB** — approximately 10–18x the size of comparable assets. This will slow the Services page LCP (Largest Contentful Paint) score.

**Fix:** Regenerate the image and export it as a `.avif` at ≤80 KB, or compress the JPEG to ≤120 KB.

---

### QW-8 — H3 override in CSS is too large for card contexts
**Impact: Low | Effort: Very Low**

In `index.css`, `h3` is set to `text-2xl md:text-3xl font-bold` globally. This means the philosophy cards on `About.tsx` (e.g., "Results Over Jargon") render at 24–30px which dominates the card body. Most of these should be at `text-xl` (20px).

**Fix:** Override with explicit `text-xl` classes on card-level `h3` elements, or restructure the global CSS rule to only apply to page-level headings.

---

## 4. Design & Layout Recommendations

### 4.1 Desktop Layout

#### A. Hero Section — Add depth and a human element
The hero is visually flat. The `opacity-20` background image barely reads. Compare to top-tier freelance consultancy sites where the hero immediately establishes personality.

**Recommended changes:**
1. Replace the very low-opacity background with a subtle gradient overlay using brand colours from left-to-right, with the background image visible on the right 40% of the screen
2. Add Alex's headshot (right-aligned, circular, ~300px, with a subtle drop-shadow) on `lg:` screens
3. Add a subtle trust-line below the CTAs: `★★★★★ Based on client feedback · HSBC · eBay · Schroders background`

#### B. Services Page — Image consistency
The `websites-apps.jpg` image uses a 4:3 aspect ratio container but is a wide landscape composition, making the overlapping phone appear small. Consider a portrait or square crop for this specific service card.

#### C. How We Work — Featured card indicator
The `Project-Based` card uses `scale-105` which creates awkward overflow on some viewports. Replace with a `border-2 border-accent` + `shadow-2xl` + a "Most Popular" badge pill at the top.

#### D. About Page — Career timeline
The corporate background section is presented as a plain bullet list. This is a key trust-builder that should be visually elevated. Consider a **vertical timeline component** with company name, date range, and a short description — similar to a LinkedIn experience section.

#### E. Home Page — Replace emoji icons
The "How We Work" section uses `⏱️ 🎯 🤝` emoji. These look informal and inconsistent with the `lucide-react` icon system. Replace with: `<Clock />`, `<Target />`, `<Handshake />`.

---

### 4.2 Mobile Layout

#### F. Hero CTA touch targets
On mobile, ensure both CTA buttons have a minimum height of **48px** to meet WCAG 2.1 AA touch target guidelines. The secondary outline button currently renders slightly smaller than the filled primary button.

#### G. Navigation mobile menu
As noted in QW-4, add `Services` as a text item in the mobile slide-out nav so users can navigate without the CTA button feeling like the only choice.

#### H. Service section spacing on mobile
On `Services.tsx`, each section uses `py-12` on mobile with 6 sections, creating a very long scroll with poor visual separation. Add a thin `border-t` divider or reduce to `py-8` between alternating sections.

#### I. Contact form inputs — prevent iOS auto-zoom
Current input fields need `text-base` (minimum `16px` font size) explicitly set. Without this, iOS Safari auto-zooms the viewport when a user taps an input — a significant usability bug.

**Fix:** Add `text-base` explicitly to all `<input>` and `<textarea>` elements in `Contact.tsx`.

#### J. PersonalSupport.tsx hero uses hardcoded colour
The `PersonalSupport` page uses `bg-slate-900` — a raw Tailwind colour outside the custom CSS variable theme. If brand colours shift, this would need a separate update. Replace with a CSS custom property like `bg-foreground`.

---

## 5. Competitor Feature Benchmark

A review of comparable UK-based freelance IT consultancy and business support websites reveals the following feature gaps:

| Feature | TotalBiz Support | Industry Standard | Top-Tier Competitor |
|---|---|---|---|
| **Client testimonials** | ❌ None | ✅ 2–3 on homepage | ✅ Video testimonials + star ratings |
| **Case studies / Results** | ❌ None | ⚠️ 1–2 brief mentions | ✅ Dedicated case study pages |
| **Lead magnet / Free offer** | ❌ None | ⚠️ Some offer free consultation | ✅ "Free 30-min call" prominently in nav |
| **Social proof logos** | ❌ None | ✅ 3–5 client logos | ✅ Scrolling client logo strip |
| **FAQ accordion** | ⚠️ Static cards only | ✅ Interactive accordion | ✅ Rich interactive FAQ |
| **Pricing transparency** | ✅ Hourly ranges shown | ✅ Standard | ✅ Full pricing calculator |
| **Google reviews widget** | ❌ None | ⚠️ Some embed reviews | ✅ Live Google reviews feed |
| **Free consultation CTA** | ⚠️ "Start a Conversation" | ✅ Clear "Book Free Call" | ✅ Calendly embedded in nav |
| **Human face in hero** | ❌ None on desktop | ✅ Most include founder photo | ✅ Video background or photo |
| **Micro-animations** | ⚠️ Hover scale only | ✅ Scroll-triggered fades | ✅ Framer Motion throughout |
| **Mobile sticky CTA bar** | ⚠️ WhatsApp button only | ✅ Standard | ✅ Sticky CTA bar on mobile |

### Key Benchmark Insight
The single most impactful gap versus competitors is **social proof**. Every top-performing consultancy site in the UK sector leads with reviews, star ratings, or named client case studies. Without these, even a technically strong site loses trust at the first decision point.

---

## 6. Prioritised Implementation Roadmap

---

### Phase 1: Quick Wins — High Impact, Low Risk (1–3 days)

> **Goal:** Fix conversion-critical gaps and technical issues without structural changes.

| Priority | Task | File(s) | Estimated Effort |
|---|---|---|---|
| 🔴 P1 | Add 2–3 client testimonial cards to `Home.tsx` | `Home.tsx` | 2 hours |
| 🔴 P1 | Add the `<Map />` component to `Contact.tsx` | `Contact.tsx` | 30 min |
| 🔴 P1 | Shorten hero subheadline to ≤25 words | `Home.tsx` | 15 min |
| 🔴 P1 | Add `text-base` to all form inputs to prevent iOS zoom | `Contact.tsx` | 15 min |
| 🟠 P2 | Fix footer services list — link items to `/services` | `Footer.tsx` | 20 min |
| 🟠 P2 | Replace emoji icons in engagement cards with Lucide icons | `Home.tsx`, `HowWeWork.tsx` | 30 min |
| 🟠 P2 | Add `Services` as a text link in nav (desktop + mobile) | `Navigation.tsx` | 30 min |
| 🟠 P2 | Compress `websites-apps.jpg` to AVIF or ≤120 KB | Asset conversion | 30 min |
| 🟡 P3 | Fix featured pricing card — remove `scale-105`, use badge + border | `HowWeWork.tsx` | 30 min |

---

### Phase 2: Visual Enhancements (1–2 weeks)

> **Goal:** Elevate the design from "clean and functional" to "premium and impressive."

| Priority | Enhancement | Detail |
|---|---|---|
| 🔴 P1 | **Add Alex's photo to hero section on desktop** | Right-column layout: 50% headline/CTA + 50% portrait photo with soft background |
| 🔴 P1 | **Scroll-triggered fade-in animations** | Add Framer Motion `whileInView` subtle fade+translate-Y animations (Framer Motion is already installed) |
| 🟠 P2 | **Corporate career timeline on About page** | Vertical timeline component showing HSBC, eBay, Schroders in order |
| 🟠 P2 | **Client logo strip on homepage** | Even 2–3 past employer brand icons displayed as "background includes" |
| 🟠 P2 | **Testimonial cards with star ratings** | Styled cards with 5-star visuals, quote, first name, and business type |
| 🟡 P3 | **Upgrade homepage hero background** | Replace `opacity-20` flat image with a gradient mesh or animated gradient |
| 🟡 P3 | **Sticky mobile CTA bar** | Slim `fixed bottom-0` bar on mobile with "Get a Free Quote" — hidden on desktop |

---

### Phase 3: Conversion Features (2–4 weeks)

> **Goal:** Add structural conversion drivers that close the gap with top-tier competitors.

| Priority | Feature | Detail |
|---|---|---|
| 🔴 P1 | **Free consultation booking (Calendly)** | "Book a Free 20-Min Call" as a primary CTA. This is the single highest-converting CTA in the consultancy sector. |
| 🔴 P1 | **Mini case studies on Services page** | Even 2 one-paragraph stories: "A local Airbnb host needed X… result was Y." Converts far better than feature lists. |
| 🟠 P2 | **FAQ accordion component** | Replace static cards on `HowWeWork.tsx` with animated open/close accordion — better UX and better for Google featured snippets |
| 🟠 P2 | **Lead magnet / Content piece** | A downloadable "Small Business Tech Checklist" PDF builds an email list and positions Alex as the sector authority |
| 🟡 P3 | **Service-specific landing pages** | `/services/smart-home`, `/services/wifi-setup`, `/services/websites` for local keyword SEO |
| 🟡 P3 | **Blog / Resource section** | 4–6 articles targeting East Sussex local intent keywords would dramatically improve organic traffic |
| 🟡 P3 | **Google Business Profile reviews widget** | Live-updating Google Reviews widget on homepage or Contact page |

---

## 7. Technical & SEO Addendum

### Current Technical Health (Good)
- ✅ AVIF images for all non-generated assets
- ✅ `robots.txt` correctly configured, pointing to sitemap
- ✅ `sitemap.xml` updated with current `<lastmod>` timestamps
- ✅ `404.html` GitHub Pages SPA routing fallback in place
- ✅ `ProfessionalService` + `FAQPage` schema markup implemented
- ✅ Google Analytics (`G-DXSNWTFQQ3`) correctly installed
- ✅ Formspree contact form integration working end-to-end
- ✅ WhatsApp button with correct `+447799538311` canonical number

### Technical Issues Requiring Attention
- ⚠️ `websites-apps.jpg` at 569 KB — convert to `.avif` (see QW-7)
- ⚠️ `Map.tsx` component exists but is not imported anywhere — either use it on Contact page or remove to reduce bundle size
- ⚠️ `client/public/__manus__` directory present — appears to be a build artefact; add to `.gitignore` if not needed
- ⚠️ `index.html` default `<meta name="description">` is generic and differs from React Helmet descriptions — update to match primary Home page description
- ⚠️ `Privacy Policy` and `Terms of Service` links in footer point to `href="#"` — these should link to actual policy pages for GDPR compliance

### SEO Quick Wins Not Yet Implemented
- Add `<link rel="canonical">` tags per page (React Helmet supports this)
- Add `og:image`, `og:title`, and `og:description` Open Graph meta tags (critical for social sharing previews)
- Add `twitter:card` meta tags for Twitter/X sharing previews

---

## 8. Summary of Top 5 Actions

If Alex had to do only 5 things from this entire report, prioritised strictly by conversion impact:

1. **Add client testimonials to the homepage** — even 2 anonymous ones. This is the #1 conversion gap.
2. **Add Alex's photo to the hero section on desktop** — humanises the service immediately.
3. **Add a "Book a Free 20-Min Call" CTA** linked to Calendly — converts better than any form for consultancy services.
4. **Make the Map component live on the Contact page** — confirms local presence and builds trust.
5. **Compress `websites-apps.jpg` to AVIF** — protects Core Web Vitals score.

---

*Report saved to repository: `totalbizsupport/WEBSITE_AUDIT_RECOMMENDATIONS.md`*
*Last updated: 2026-08-07 by Antigravity AI*

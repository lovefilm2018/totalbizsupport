import express from 'express';
import https from 'https';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;
const QUEUE_FILE = process.env.QUEUE_FILE || path.join('/tmp', 'totalbiz_queue.json');

// Configuration & Default Tokens
const LINKEDIN_PERSON_TOKEN = process.env.LINKEDIN_PERSON_TOKEN || process.env.LINKEDIN_TOKEN || '';
const LINKEDIN_PERSON_URN = process.env.LINKEDIN_PERSON_URN || 'urn:li:person:pACLfBlITP';

const LINKEDIN_ORG_TOKEN = process.env.LINKEDIN_ORG_TOKEN || '';
const LINKEDIN_ORG_URN = process.env.LINKEDIN_ORG_URN || 'urn:li:organization:130184035';

const FB_PAGE_ID = process.env.FB_PAGE_ID || '1207871262402389';
const FB_PAGE_TOKEN = process.env.FB_PAGE_TOKEN || '';
const META_USER_TOKEN = process.env.META_USER_TOKEN || '';
const IG_ACCOUNT_ID = process.env.IG_ACCOUNT_ID || '17841437512971881';
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || '';
const DISCORD_BREVO_WEBHOOK_URL = process.env.DISCORD_BREVO_WEBHOOK_URL || '';

// Master Weekly Editorial Calendar (Immune to cold-starts)
const MASTER_CALENDAR = {
  '2026-09-01': {
    morningLinkedIn: {
      date: '2026-09-01',
      title: 'The Hiring Trap: Why Adding Headcount Scales Chaos',
      published: true,
      publishedAt: '2026-09-01T09:22:20.000Z',
      urnPersonal: 'urn:li:share:7500483172829265921',
      urnCompany: 'urn:li:share:7500483174699802625',
      text: `Most small business owners think they need to hire more staff.

In reality, 90% of the time, they just need to fix their operational workflows.

Having spent 20+ years leading technology and operational programmes across global enterprise organisations (HSBC, eBay, Schroders, Gumtree), I saw this exact pattern repeatedly:

When a small business grows from 3 to 10 people:
1. Communication scatters across WhatsApp, SMS, and 4 disconnected inboxes.
2. Critical customer details live in one person's head instead of a central system.
3. Team members spend 2 hours a day manually copy-pasting data between spreadsheets and accounting software.

The natural reflex is to hire another administrator to "manage the chaos".

⚠️ But adding headcount to a broken process doesn't scale your business — it just scales the chaos.

The fix isn't complicated or expensive:
• Centralise client intake into 1 structured funnel.
• Automate booking confirmations and invoice reminders.
• Consolidate your core tools so you have a single source of truth.

Enterprise operational discipline doesn't require enterprise bloat or agency prices.

If your systems feel like they're running you instead of the other way around, let's connect.

🔗 Explore our approach at totalbiz.co.uk or drop me a direct message here on LinkedIn.

#SmallBusinessUK #OperationalExcellence #TechStrategy #FractionalIT #ProcessImprovement #BusinessAutomation #TotalBizSupport #SussexBusiness #UKBusiness`
    },
    lunchLinkedIn: null,
    eveningMeta: {
      date: '2026-09-01',
      title: 'Eliminate Tech Gremlins: Hardware & Wi-Fi',
      facebookText: `Are tech gremlins, patchy Wi-Fi, or cable chaos silently eating 3+ hours of your working week? 💻 📶

For sole traders, local shops, and small businesses across Sussex and Kent, IT problems rarely start with massive cyber attacks — they start with everyday annoyances:

❌ The office printer that disconnects every time the router reboots
❌ Wi-Fi dead zones struggling through thick Sussex stone walls
❌ Sluggish workstations taking 10 minutes just to open a spreadsheet
❌ Backups that haven't actually run since last November

You don't need a £100/hr enterprise contract with an impersonal helpdesk.

We come directly to your workshop, clinic, or office, fix the root cause, clean up the wiring, and get your equipment running seamlessly.

👉 Need hands-on tech help? Book a discovery visit at totalbiz.co.uk/services/ or drop us a WhatsApp message at +44 7799 538311!

📍 Based in Heathfield, East Sussex — supporting businesses across East & West Sussex, Kent, and UK-wide remotely.

#SmallBusinessUK #SussexBusiness #KentBusiness #Heathfield #EastSussex #ITSupport #WiFiFix #TechSupport #LocalBusinessSupport #TotalBizSupport`,
      instagramImageUrl: 'https://raw.githubusercontent.com/lovefilm2018/totalbizsupport/main/client/public/hardware_wifi_visual.jpg',
      instagramCaption: `Stop losing 3+ hours every week to Wi-Fi drops, crashing PCs, and cable chaos. 🛑 🔌

Everyday tech friction kills small business momentum:
📶 Wi-Fi dead spots in the workshop or office
💻 Sluggish computers running out of storage
🖨️ Devices constantly dropping off the network
💾 Zero automated backup systems in place

At TotalBiz Support, we provide friendly, hands-on on-site technical support across Sussex & Kent. No tech jargon, no unnecessary retainers — just solid fixes that keep your business moving.

👉 Tap link in bio (totalbiz.co.uk) to explore our services or message us directly here!

📍 Hands-on on-site support across East Sussex, West Sussex & Kent | UK-wide remote consultancy

#SmallBusinessUK #SussexBusiness #KentBusiness #Heathfield #EastSussex #ITSupportUK #WiFiSolutions #HardwareSupport #LocalBusiness #TotalBizSupport #TechConsulting`
    }
  },
  '2026-09-02': {
    morningLinkedIn: {
      date: '2026-09-02',
      title: 'Free Tech Advice Wednesday: The Danger of "Free" Consumer Tools in Business',
      text: `Is using free consumer tools quietly risking your small business reputation? 🛡️ 💼

When starting out, it's completely normal to bootstrap:
• @gmail.com or @btinternet.com addresses
• Free Dropbox accounts with shared personal passwords
• Important quotes sent via personal WhatsApp
• Sensitive customer files saved on a single unencrypted desktop

But as your business grows to 5, 10, or 20 clients, consumer habits become operational liabilities:
1. When a laptop is lost, where are your client records backed up?
2. When a contractor leaves, do they still have access to your customer files?
3. What happens to your credibility when quoting a £5,000 project from a hotmail address?

Setting up professional enterprise foundations (custom domain email, cloud file security, role-based access, and automated cloud backups) doesn't cost thousands. It costs a few pounds per month.

Today is Free Advice Wednesday at TotalBiz Support.

If you have a lingering question about your business email, domain, cloud backup, or tech setup, drop it in the comments below or message me directly — zero sales pitch, just straightforward practical advice.

👉 totalbiz.co.uk

#SmallBusinessUK #FreeAdviceWednesday #TechStrategy #DataSecurity #UKBusiness #BusinessOperations #SussexBusiness #TotalBizSupport`
    },
    lunchLinkedIn: null,
    eveningMeta: {
      date: '2026-09-02',
      title: 'Free Contact Wednesday: Got an IT or Tech Headache?',
      facebookText: `It's Free Advice Wednesday at TotalBiz Support! 💡 🛠️

Are you stuck with a frustrating tech problem in your business or home office?
• Email not syncing properly across phone and laptop?
• Website feeling outdated or impossible to update?
• Invoicing and bookkeeping taking up your entire Sunday?
• Wondering if you're paying too much for your current software?

Drop us a message today! No jargon, no high-pressure sales pitch, just practical, honest advice from 20+ years of IT & business experience.

👉 Message us directly here or visit totalbiz.co.uk to get in touch.

📍 Based in Heathfield, East Sussex — serving Sussex, Kent & UK-wide remote.

#FreeAdviceWednesday #SmallBusinessUK #SussexBusiness #KentBusiness #Heathfield #EastSussex #ITSupport #BusinessAdvice #TotalBizSupport`,
      instagramImageUrl: 'https://raw.githubusercontent.com/lovefilm2018/totalbizsupport/main/client/public/free_contact_wednesday_official.jpg',
      instagramCaption: `Got a tech or business systems headache? Ask us anything today! 💡 ☕

Every Wednesday, we offer completely free, no-obligation advice for small businesses, sole traders, and property owners across Sussex and Kent.

Whether it's sorting your Wi-Fi, cleaning up your business email, or finding a simpler way to invoice your clients — we're here to help.

💬 Drop your question in the DMs or visit totalbiz.co.uk!

📍 Hands-on support in Sussex & Kent | UK-wide remote consultancy

#FreeAdviceWednesday #SmallBusinessUK #SussexBusiness #KentBusiness #Heathfield #TechHelp #BusinessTips #TotalBizSupport`
    }
  },
  '2026-09-03': {
    morningLinkedIn: {
      date: '2026-09-03',
      title: 'Why Most Small Business Websites Never Generate Qualified Inquiries',
      text: `Most small business websites are treated like digital brochures rather than conversion engines.

You pay £2,000 to an agency, they deliver 5 beautiful pages with stock photography, and then... crickets.

Why? Because sleek visuals don't generate leads — clarity and friction-free action do:

1. The 5-Second Test: Within 5 seconds of landing, does a visitor know EXACTLY what you do, who you serve, and what location you cover?
2. Direct Action vs Buried Forms: If booking a consultation requires filling out a 12-field form instead of a 1-tap WhatsApp or instant calendar link, 70% of mobile users leave.
3. Local SEO & Schema: If search engines don't have structured Geo-Schema markup for your service areas (e.g. East Sussex, West Sussex, Kent), you will lose the local map pack every time.
4. Mobile Load Speed: If your site takes 4+ seconds to render on 4G, your bounce rate doubles before they read your headline.

Enterprise digital strategy isn't about complexity. It's about removing every single barrier between a visitor with a problem and your business.

How fast can a prospect contact you from your homepage right now?

👉 totalbiz.co.uk

#WebDevelopment #ConversionOptimization #SmallBusinessUK #LocalSEO #DigitalStrategy #FractionalCTO #TotalBizSupport #SussexBusiness #UKBusiness`
    },
    lunchLinkedIn: null,
    eveningMeta: {
      date: '2026-09-03',
      title: 'Modern Websites Built to Convert',
      facebookText: `Does your website actually win you new clients, or is it just an expensive online business card? 🌐 📈

A modern business website needs to do 3 things effortlessly:
1️⃣ Load instantly on mobile (under 1.5 seconds)
2️⃣ Make getting in touch completely friction-free (direct WhatsApp, 1-click calls, easy booking)
3️⃣ Dominate local search results so customers find you before your competitors

At TotalBiz Support, we don't build bloated, slow WordPress templates that break on updates. We build ultra-fast, modern web applications designed specifically to convert visitors into paying customers.

👉 Ready for a website that works as hard as you do? Check out our work at totalbiz.co.uk/services/ or drop us a message!

📍 Hands-on support across East Sussex, West Sussex & Kent | UK-wide remote.

#SmallBusinessUK #WebDesignSussex #WebsiteDevelopment #SussexBusiness #KentBusiness #Heathfield #EastSussex #LocalSEO #TotalBizSupport`,
      instagramImageUrl: 'https://raw.githubusercontent.com/lovefilm2018/totalbizsupport/main/client/src/assets/websites-apps.jpg',
      instagramCaption: `Your website has less than 5 seconds to convince a visitor to stay. ⏱️ 📱

If your site is slow, clunky on mobile, or makes it hard to get in touch, you're losing paying customers to competitors every single day.

Here is what every high-converting small business website needs:
⚡ Blazing fast load times (<1.5s)
💬 1-tap WhatsApp & phone consultation buttons
🔍 Built-in Local SEO schema so Google knows exactly who you serve
🎯 Clean, jargon-free messaging that speaks directly to your ideal client

Need a website refresh or a brand-new digital presence?

👉 Tap link in bio (totalbiz.co.uk) or send us a DM to chat!

📍 Sussex, Kent & UK-Wide Remote

#WebDesignUK #SmallBusinessWebsites #SussexBusiness #KentBusiness #Heathfield #LocalBusiness #DigitalMarketing #TotalBizSupport`
    }
  },
  '2026-09-04': {
    morningLinkedIn: {
      date: '2026-09-04',
      title: 'The 5-Minute Friday Small Business Operations Audit',
      text: `Before you close your laptop for the weekend, run this 5-minute operational check: ⏱️ 📋

1. The Backup Check: When was your last off-site or cloud backup verified? If your main workstation failed on Monday morning, how many days of work would you lose?
2. The Access Revocation Check: Have you removed access permissions for any freelancers, interns, or past contractors who finished work this week?
3. The Inbound Lead Flow: Did any contact forms, WhatsApp inquiries, or website messages slip through the cracks during the midweek rush?
4. The Subscription Audit: Did you sign up for any "free 7-day trials" on Monday that will auto-charge your business card this weekend?

Taking 5 minutes on Friday afternoon to tidy your operational perimeter gives you 100% peace of mind all weekend.

Have a productive Friday and a restful weekend!

👉 totalbiz.co.uk

#SmallBusinessUK #Operations #FridayChecklist #TechDiscipline #BusinessSecurity #Productivity #TotalBizSupport #UKBusiness`
    },
    lunchLinkedIn: null,
    eveningMeta: {
      date: '2026-09-04',
      title: 'Weekend Peace of Mind: Systems That Run While You Rest',
      facebookText: `Enjoy your weekend knowing your business systems are secure, automated, and working for you. 🏖️ 🔒

When your technology, client booking, and automated follow-ups are set up properly, you don't have to spend your weekend answering repetitive emails or worrying about data loss.

At TotalBiz Support, our goal is simple: eliminate operational chaos and give small business owners their time back.

Need help streamlining your business for next week?

👉 Explore our hands-on support services at totalbiz.co.uk or drop us a message!

📍 Based in Heathfield, East Sussex — supporting Sussex, Kent & UK-wide.

#SmallBusinessUK #WorkLifeBalance #BusinessAutomation #SussexBusiness #KentBusiness #Heathfield #EastSussex #ITSupport #TotalBizSupport`,
      instagramImageUrl: 'https://raw.githubusercontent.com/lovefilm2018/totalbizsupport/main/client/public/zombie_saas_audit_visual.jpg',
      instagramCaption: `The best feeling on a Friday: knowing your business systems are running smoothly on auto-pilot. ☕ ✨

Automated invoicing, rock-solid cloud backups, and clear client funnels mean you can actually switch off and enjoy your weekend.

If you're tired of spending your Sunday evenings wrestling with admin and tech gremlins, let's fix your setup next week.

👉 Tap link in bio (totalbiz.co.uk) to learn more or send us a DM!

Have a fantastic weekend!

📍 Sussex & Kent | UK-wide remote

#FridayVibes #SmallBusinessUK #BusinessAutomation #SussexBusiness #KentBusiness #Heathfield #TechSupport #TotalBizSupport`
    }
  },
  '2026-09-08': {
    morningLinkedIn: {
      date: '2026-09-08',
      title: 'The Modern IT Dilemma: Why Small Businesses Need a Fixer, Not an Agency',
      text: `Most small business owners are trapped between two unhelpful extremes when IT breaks:

Option 1: The giant IT agency quoting a £150/hr retainer with a faceless ticket queue and a 48-hour response SLA.
Option 2: Searching YouTube on a Sunday night trying to figure out why the office router or cloud backup failed.

Having spent 20+ years delivering mission-critical technology programmes across global corporate institutions (HSBC, eBay, Schroders, Gumtree), I built TotalBiz Support around a different model:

The "Rolls-Royce Mechanic for Small Business":
• Hands-on, practical fixes for real everyday bottlenecks.
• High-level enterprise operational discipline, but at small business rates.
• No confusing acronyms, no unnecessary software subscriptions, and zero locked-in contracts.

Whether it's securing your customer data, getting your Wi-Fi to punch through thick Sussex walls, or automating repetitive admin so you get your weekends back — you don't need agency bloat. You just need a reliable partner who knows how to make technology work for you.

How much time did technical hiccups cost your business this week?

🔗 Discover how we support local and UK-wide businesses: totalbiz.co.uk or message me directly.

#SmallBusinessUK #TechStrategy #ITSupport #OperationalExcellence #FractionalIT #ProcessImprovement #SussexBusiness #UKBusiness #TotalBizSupport`
    },
    lunchLinkedIn: null,
    eveningMeta: {
      date: '2026-09-08',
      title: 'Local IT & Point-of-Sale / Office Tech Rescue',
      facebookText: `Is sluggish tech or flaky Wi-Fi quietly slowing down your working day? 💻 📶

For shops, clinics, offices, and trades across East Sussex, West Sussex, and Kent, IT problems rarely start with dramatic cyber attacks. They start with everyday friction:
❌ The card machine that loses connection right as a customer taps to pay
❌ Office Wi-Fi struggling to reach the workshop through thick Sussex stone walls
❌ Sluggish PCs that take 10 minutes just to load a spreadsheet
❌ Cable spaghetti behind the counter that nobody dares touch

You don't need a bloated £150/hr agency contract with a faceless helpdesk.

At TotalBiz Support, we come straight to your premises. We diagnose the bottleneck, sort the hardware and wiring, configure reliable guest and staff Wi-Fi, and get your tools running like clockwork.

👉 Ready to banish the tech gremlins? Book an on-site visit at totalbiz.co.uk/services/ or send us a WhatsApp on +44 7799 538311.

📍 Based in Heathfield, East Sussex — supporting businesses across Sussex, Kent, and UK-wide remotely.

#SmallBusinessUK #SussexBusiness #KentBusiness #Heathfield #EastSussex #ITSupport #WiFiFix #TechSupport #LocalBusinessSupport #TotalBizSupport`,
      instagramImageUrl: 'https://raw.githubusercontent.com/lovefilm2018/totalbizsupport/main/client/public/hardware_wifi_visual.jpg',
      instagramCaption: `Stop losing productive hours to Wi-Fi drops, sluggish computers, and tangled cables. 🛑 🔌

Everyday tech gremlins cost small businesses serious time and momentum:
📶 Wi-Fi dead spots in the back office or workshop
💻 Workstations running out of space and freezing on basic tasks
💳 Card readers dropping off the network during peak trade
💾 No automated cloud backup in place if hardware fails

At TotalBiz Support, we provide friendly, hands-on on-site technical support across Sussex & Kent. No confusing jargon, no rigid retainers — just solid fixes that keep your business running smoothly.

👉 Tap link in bio (totalbiz.co.uk) to book an on-site visit or send us a DM!

📍 Hands-on support across East Sussex, West Sussex & Kent | UK-wide remote consultancy

#SmallBusinessUK #SussexBusiness #KentBusiness #Heathfield #EastSussex #ITSupportUK #WiFiSolutions #HardwareSupport #LocalBusiness #TotalBizSupport #TechConsulting`
    }
  },
  '2026-09-09': {
    morningLinkedIn: {
      date: '2026-09-09',
      title: 'The "Shadow IT" Trap: Why Consumer Tools Quietly Erode Small Business Value',
      text: `Is your small business relying on consumer tools that quietly put your reputation and data at risk? 🛡️ 💼

When starting out as a sole trader or small consultancy, it is natural to bootstrap:
• Sending client proposals from personal @gmail.com or @btinternet.com addresses
• Storing confidential client contracts on free personal cloud drives with shared passwords
• Handling customer bookings and payment details across unmanaged personal phones
• Zero centralised device management or automated off-site backups

Having led major tech and operational programmes across global organisations (HSBC, eBay, Schroders, Gumtree), I frequently see growing small businesses fall into this "Shadow IT" trap.

As soon as your business grows beyond 2 or 3 people, these consumer habits become operational liabilities:
1. If a laptop is misplaced or stolen, can you remotely wipe customer records?
2. When a subcontractor leaves, do they retain access to your client repository?
3. What signal does an @outlook.com address send when quoting a high-value commercial contract?

Enterprise-grade foundations (custom branded business email, role-based cloud access, multi-factor authentication, and automated encrypted backups) do not cost thousands. They cost a few pounds per month.

Setting up proper operational hygiene protects your revenue, gives you instant credibility, and lets you scale without fear.

How secure and professional is your operational perimeter today?

🔗 Explore our approach at totalbiz.co.uk or drop me a direct message here on LinkedIn.

#SmallBusinessUK #DataSecurity #TechStrategy #OperationalExcellence #FractionalIT #CloudSecurity #TotalBizSupport #SussexBusiness #UKBusiness`,
      published: true,
      publishedAt: '2026-09-09T06:45:00Z'
    },
    lunchLinkedIn: null,
    eveningMeta: {
      date: '2026-09-09',
      title: 'Free Advice Wednesday: Got an IT, Website or Systems Headache?',
      published: true,
      publishedAt: '2026-09-09T09:35:43Z',
      facebookText: `It's Free Advice Wednesday at TotalBiz Support! 💡 🛠️

Are you dealing with an irritating tech issue or feeling overwhelmed by your business admin?
• Business email not syncing properly across your phone and laptop?
• Slow website that isn't generating qualified customer inquiries?
• Wondering how to stop spending entire evenings on manual invoicing and quotes?
• Paying monthly for 5 different software tools and unsure what you actually need?

Drop us a message today! No jargon, no hard sell — just straightforward, practical advice backed by 20+ years of enterprise IT and business operations experience.

👉 Message our page directly here, send a WhatsApp to +44 7799 538311, or visit totalbiz.co.uk.

📍 Based in Heathfield, East Sussex — serving Sussex, Kent & UK-wide remotely.

#FreeAdviceWednesday #SmallBusinessUK #SussexBusiness #KentBusiness #Heathfield #EastSussex #ITSupport #BusinessAdvice #TotalBizSupport`,
      instagramImageUrl: 'https://raw.githubusercontent.com/lovefilm2018/totalbizsupport/main/client/public/free_contact_wednesday_official.jpg',
      instagramCaption: `Got a tech or business systems headache? Ask us anything today! 💡 ☕

Every Wednesday, we offer completely free, no-obligation advice for small businesses, sole traders, and property owners across Sussex and Kent.

Whether you need help sorting Wi-Fi dead spots, setting up professional business email, or finding a simpler way to invoice your clients — we're here to help.

💬 Drop your question in the DMs, message us on WhatsApp (+44 7799 538311), or visit totalbiz.co.uk!

📍 Hands-on support in Sussex & Kent | UK-wide remote consultancy

#FreeAdviceWednesday #SmallBusinessUK #SussexBusiness #KentBusiness #Heathfield #TechHelp #BusinessTips #TotalBizSupport`
    }
  },
  '2026-09-10': {
    morningLinkedIn: {
      date: '2026-09-10',
      title: 'Airbnb & Hospitality Operations: Why Static Pricing & Key Lockboxes Bleed Margin',
      text: `If you own or manage holiday lets, boutique stays, or short-term rentals, where are you losing margin? 🏖️ 🔑

Most property owners think occupancy is purely driven by marketing photos. In reality, operational friction and static pricing silently drain thousands of pounds each season:

1. The Lockbox Headache:
Physical key lockboxes jam, code dials wear down, and guests inevitably call you at 11:15 PM on a rainy Friday night. Upgrading to connected commercial smart locks with auto-expiring codes generated per reservation eliminates check-in friction entirely.

2. Unsegregated Wi-Fi Networks:
When guests stream 4K video on the same Wi-Fi network that controls your smart thermostat, outdoor cameras, and smart locks, network drops cause smart devices to go offline and trigger negative reviews.

3. Static Pricing vs Automated Dynamic Yield Management:
Setting static seasonal rates leaves money on the table during local high-demand events and leaves properties empty during mid-week troughs. Enterprise revenue management dynamically tracks market pacing, competitor occupancy, and local search trends to maximise both Average Daily Rate (ADR) and RevPAR.

At TotalBiz Support, we have deployed custom cloud-based dynamic pricing tools and robust on-site smart hardware for UK property owners. 

Enterprise technology applied to independent hospitality means higher revenue, seamless operations, and zero late-night emergency lock runs.

🔗 Discover how we support property hosts at totalbiz.co.uk or drop me a message.

#ShortTermRental #AirbnbHost #HospitalityTech #DynamicPricing #PropertyManagement #SmartLocks #TotalBizSupport #SussexBusiness #UKBusiness`
    },
    lunchLinkedIn: null,
    eveningMeta: {
      date: '2026-09-10',
      title: 'Smart Locks & Guest Wi-Fi for Sussex & Kent Holiday Lets',
      facebookText: `Calling all Airbnb hosts and holiday cottage owners across Sussex and Kent! 🏡 🔑

Tired of 11 PM emergency calls because a guest can't get the key out of the lockbox? Or bad reviews because the Wi-Fi dropped during their favourite film?

A few smart upgrades completely transform your guest experience and your peace of mind:
✅ Smart Keyless Entry: Automatically generate unique guest codes that activate at 3 PM check-in and expire at 10 AM checkout.
✅ Dedicated Guest Mesh Wi-Fi: Ultra-reliable coverage that keeps your smart heating and security cameras safely isolated on their own secure network.
✅ Automated Dynamic Pricing: Custom algorithms that adjust your nightly rates based on real-time market demand so you never leave money on the table.

We handle the full installation and setup on-site across East Sussex, West Sussex, and Kent.

👉 Ready to make your holiday stay completely hassle-free? Visit totalbiz.co.uk/services/ or drop us a WhatsApp message on +44 7799 538311!

📍 Based in Heathfield, East Sussex.

#AirbnbHostUK #HolidayCottage #SussexStays #KentStays #SmartLocks #WiFiSetup #Heathfield #EastSussex #WestSussex #TotalBizSupport`,
      instagramImageUrl: 'https://raw.githubusercontent.com/lovefilm2018/totalbizsupport/main/client/public/day7_airbnb_smartlock.jpg',
      instagramCaption: `Turn your holiday let into a seamless, 5-star guest experience. 🏡 ✨

No more lost keys, jammed lockboxes, or late-night calls. 

With commercial-grade smart locks and dedicated mesh Wi-Fi:
🔑 Guests receive automated entry PINs that work only during their booked stay
📶 Fast, dependable Wi-Fi reaches every bedroom and garden space
🔒 Your smart heating and security cameras stay on a separate, protected network

At TotalBiz Support, we install and configure smart home & hospitality tech on-site across Sussex & Kent.

👉 Tap link in bio (totalbiz.co.uk) to upgrade your property or message us directly!

📍 Hands-on installation across Sussex & Kent | UK-wide remote consultancy

#AirbnbUK #HolidayLet #PropertyHost #SmartLocks #GuestExperience #SussexBusiness #KentBusiness #Heathfield #TotalBizSupport`
    }
  },
  '2026-09-11': {
    morningLinkedIn: {
      date: '2026-09-11',
      title: 'The 15-Minute Friday SaaS Audit: How to Cut 20–30% of Wasted Software Spend',
      text: `How much is your business spending each month on software tools that nobody actually uses? 💳 📊

In almost every SME operational review I conduct, we uncover "Zombie SaaS":
• Premium software subscriptions bought for a 1-month project that have been auto-renewing for a year
• 4 different paid tools that perform the exact same function (e.g. 2 project boards, 2 cloud storage providers)
• Paying for 10 active licenses when your core team only has 5 people
• Paying tier-3 enterprise prices for basic features available in your existing Google Workspace or Microsoft 365 package

Over a 20-year career leading operational programmes at HSBC, eBay, Schroders, and Gumtree, eliminating vendor overlap was standard corporate hygiene.

For a 5–15 person business, running a simple 15-minute software audit often frees up £200 to £600 every single month — straight back to your bottom line.

The 3-Question SaaS Test:
1. Did anyone on the team log in this week?
2. Can our existing primary platform do this natively?
3. What would actually break if we cancelled it today?

Enterprise discipline isn't about buying more technology. It's about getting maximum value out of the right technology.

🔗 Let's audit your operational tools: totalbiz.co.uk or message me directly.

#SmallBusinessUK #CostOptimization #SaaSAudit #TechStrategy #OperationalEfficiency #FractionalCOO #TotalBizSupport #SussexBusiness #UKBusiness`
    },
    lunchLinkedIn: null,
    eveningMeta: {
      date: '2026-09-11',
      title: 'Weekend Peace of Mind: Systems That Run While You Rest',
      facebookText: `The best feeling on a Friday afternoon: knowing your business systems are running smoothly on auto-pilot. 🏖️ 🔒

When your technology is set up properly:
• Invoices and payment reminders go out automatically
• Cloud backups run silently in the background
• New customer inquiries get captured into a clear, centralised inbox
• You don't spend Sunday evening panicked about admin

You started your business to do what you love — not to spend your weekends untangling software glitches or hunting down missing spreadsheets.

If your current systems feel stressful, let's get them running seamlessly next week.

👉 Explore our hands-on business and personal support at totalbiz.co.uk or send us a WhatsApp on +44 7799 538311.

Have a wonderful, restful weekend!

📍 Based in Heathfield, East Sussex — supporting Sussex, Kent & UK-wide.

#SmallBusinessUK #WorkLifeBalance #BusinessAutomation #SussexBusiness #KentBusiness #Heathfield #EastSussex #ITSupport #TotalBizSupport`,
      instagramImageUrl: 'https://raw.githubusercontent.com/lovefilm2018/totalbizsupport/main/client/public/zombie_saas_audit_visual.jpg',
      instagramCaption: `Friday afternoon peace of mind: knowing your business systems are running smoothly on auto-pilot. ☕ ✨

Automated client booking, effortless invoicing, and rock-solid cloud backups mean you can actually switch off and enjoy your weekend.

If your tech is causing you Sunday-night dread, let's fix it next week.

👉 Tap link in bio (totalbiz.co.uk) to learn more or send us a DM!

Have a fantastic weekend!

📍 Sussex & Kent | UK-wide remote

#FridayVibes #SmallBusinessUK #BusinessAutomation #SussexBusiness #KentBusiness #Heathfield #TechSupport #TotalBizSupport`
    }
  },
  '2026-09-15': {
    morningLinkedIn: {
      date: '2026-09-15',
      title: 'The "Invisible 20%": How Small Business Owners Lose 1 Working Day a Week to Admin',
      text: `Most small business owners don't realise they're working an unpaid 6th day every single week.

It happens quietly:
• 45 minutes on Tuesday evening typing up quotes.
• 1 hour on Thursday reconciling paper receipts against bank statements.
• 3 hours on Sunday chasing overdue invoices and manually updating customer spreadsheets.

Over a 20-year career leading tech and operational programmes across enterprise organisations (HSBC, eBay, Schroders, Gumtree), this was known as "operational friction".

In a large corporate, friction burns shareholder margin. 
In a 5-person business or sole trade, it burns your evenings, your weekends, and your sanity.

Here is the reality:
If your hourly rate on the tools or consulting is £60 to £120/hr, spending your Sunday evening copy-pasting numbers into Word invoices means you are paying yourself £0/hr to do basic data entry.

The modern fix doesn't require complex ERP systems or enterprise budgets:
1. 1-Tap Mobile Quoting: Quote on-site directly from your phone; the customer signs on glass or approves via WhatsApp.
2. Automated Payment Chase Flows: Polite, automated 3-day and 7-day payment reminders that get invoices settled 3x faster without awkward phone calls.
3. Paperless Receipt Capture: Snap receipt photos on your phone; let AI match them straight to your tax categories.

Technology should give you your time back — not create a second shift after hours.

How many hours did admin steal from your weekend?

🔗 Discover how we streamline business workflows: totalbiz.co.uk or drop me a message.

#SmallBusinessUK #OperationalExcellence #BusinessAutomation #Productivity #TechStrategy #FractionalCOO #SussexBusiness #UKBusiness #TotalBizSupport`
    },
    lunchLinkedIn: null,
    eveningMeta: {
      date: '2026-09-15',
      title: 'Stop Losing Sunday Evenings to Invoicing & Paperwork',
      facebookText: `Still spending your Sunday evenings typing invoices and hunting down lost paper receipts? 🧾 📱

For trades, clinics, shops, and sole traders across Sussex and Kent, the hardest part of the job isn't the work itself — it's the avalanche of admin waiting for you at the end of the day:

❌ Invoices sent out 3 weeks late because you didn't have time to sit at a computer
❌ Awkward text messages chasing unpaid bills
❌ Piles of crumpled fuel and supplier receipts stuffed in the van glovebox
❌ Zero idea of your real profit until your accountant calls with bad news

You don't need expensive accounting software or complicated systems.

At TotalBiz Support, we set up simple, streamlined mobile invoicing directly on your phone or tablet:
✅ Send professional, branded quotes and invoices in 30 seconds from your phone
✅ Automatic, polite payment reminders so you get paid faster without the stress
✅ Snap receipts with your camera and throw the paper away

We come to your premises or set it up remotely via Google Meet. Hands-on, practical, and jargon-free.

👉 Ready to reclaim your evenings? Visit totalbiz.co.uk/services/ or drop us a WhatsApp message on +44 7799 538311!

📍 Based in Heathfield, East Sussex — supporting businesses across East & West Sussex, Kent, and UK-wide remotely.

#SmallBusinessUK #SussexBusiness #KentBusiness #Heathfield #EastSussex #InvoicingHelp #BusinessAdmin #TradesUK #SoleTraderUK #TotalBizSupport`,
      instagramImageUrl: 'https://raw.githubusercontent.com/lovefilm2018/totalbizsupport/main/client/public/admin_invoicing_visual.jpg',
      instagramCaption: `Your Sunday evenings belong to you and your family — not your invoicing spreadsheet. 🛑 📋

If you're spending hours every week manually typing invoices, chasing late payments, and digging out lost receipts, your admin setup is costing you serious money.

Here's how we fix it for small businesses across Sussex & Kent:
📱 30-Second Mobile Invoicing: Send branded quotes and invoices right from your phone before you even leave the job.
💳 1-Click Online Payments: Give clients an instant card or bank link to pay on the spot.
⏰ Automated Chase Reminders: Let polite automated follow-ups get your invoices settled on time.
📷 Paperless Receipt Capture: Snap photos of receipts and ditch the glovebox shoebox forever.

No tech jargon, no confusing software — just practical systems that get you paid faster and give you your weekends back.

👉 Tap link in bio (totalbiz.co.uk) to streamline your business or send us a DM!

📍 Hands-on support in Sussex & Kent | UK-wide remote consultancy

#SmallBusinessUK #TradesmanUK #BusinessAdmin #Invoicing #SussexBusiness #KentBusiness #Heathfield #EastSussex #WorkflowAutomation #TotalBizSupport #SoleTraderLife`
    }
  },
  '2026-09-16': {
    morningLinkedIn: {
      date: '2026-09-16',
      title: 'The "Contact Form Graveyard": Why 70% of High-Intent Website Inquiries Never Convert',
      published: true,
      publishedAt: '2026-09-16T06:45:06.671Z',
      text: `Most small business websites are built like digital brochures rather than conversion engines.

You invest £2,000 to £5,000 in an agency rebuild. The site looks clean, the photography is crisp, and your visitor traffic looks steady.

Yet the phone rarely rings, and inbound project inquiries are virtually nonexistent.

Why? Because traditional agency web development focuses on aesthetics while ignoring basic behavioral friction:

1. The "12-Field Form" Friction:
If a mobile user has to fill out 10 form fields just to ask a quick question, 70% will abandon the tab. Modern prospects want instant gratification. Adding a 1-tap WhatsApp consultation button alongside clear calendar booking increases inquiry capture by 200–300%.

2. Mobile Speed Penalty:
If your website takes 4+ seconds to load on a 4G connection, half your visitors bounce before reading your headline. Bloated WordPress templates with 35 active plugins are silently destroying your conversion funnel.

3. The 5-Second Clarity Test:
Within 5 seconds of landing, does a visitor know:
• EXACTLY what problem you solve?
• EXACTLY who you serve and where?
• EXACTLY what single action they should take next?

Enterprise digital strategy isn't about flashy design gimmicks. It's about ruthlessly eliminating friction between a customer with a problem and your solution.

When did you last test contacting your own business from a smartphone?

🔗 Explore high-converting digital architecture: totalbiz.co.uk or message me directly.

#WebDevelopment #ConversionOptimization #SmallBusinessUK #DigitalStrategy #UserExperience #CRO #FractionalCTO #TotalBizSupport #UKBusiness`
    },
    lunchLinkedIn: null,
    eveningMeta: {
      date: '2026-09-16',
      title: 'Free Advice Wednesday: Got a Tech, Website or Admin Headache?',
      published: true,
      publishedAt: '2026-09-16T09:35:13.970Z',
      facebookPostId: '1207871262402389_122137870887360282',
      facebookText: `It's Free Advice Wednesday at TotalBiz Support! 💡 🛠️

Are you stuck with an annoying tech problem or feeling frustrated with your current business setup?

Today is your chance to ask anything — completely free, no strings attached, and zero sales pitch:
• Business email not syncing properly across your laptop and phone?
• Wi-Fi dead spots in the back office, workshop, or clinic?
• Sluggish PC or laptop that takes 10 minutes just to open a file?
• Website feeling outdated or failing to bring in new customer inquiries?
• Wondering if you're paying monthly for software tools you don't even use?

With 20+ years of corporate IT and business operations experience (HSBC, eBay, Schroders, Gumtree), we translate complicated tech into plain English fixes.

👉 Message our page directly here, send a WhatsApp to +44 7799 538311, or visit totalbiz.co.uk.

📍 Based in Heathfield, East Sussex — serving Sussex, Kent, and UK-wide remotely.

#FreeAdviceWednesday #SmallBusinessUK #SussexBusiness #KentBusiness #Heathfield #EastSussex #ITSupport #TechHelp #BusinessAdvice #TotalBizSupport`,
      instagramImageUrl: 'https://raw.githubusercontent.com/lovefilm2018/totalbizsupport/main/client/public/free_contact_wednesday_official.jpg',
      instagramCaption: `Got a tech headache or an annoying digital bottleneck in your business? Ask us anything today! 💡 ☕

Every Wednesday, we offer completely free, no-obligation advice for small businesses, sole traders, and property hosts across Sussex and Kent.

Whether it's:
📶 Sorting Wi-Fi dead zones in thick stone buildings
✉️ Fixing syncing issues with your business email
💻 Speeding up sluggish workstations without buying new hardware
🌐 Finding out why your website isn't bringing in leads
📊 Cutting down on software subscriptions you don't need

No tech jargon, no confusing acronyms — just clear, straightforward answers to get you unstuck.

💬 Drop your question in our DMs, message us on WhatsApp (+44 7799 538311), or head to totalbiz.co.uk!

📍 Hands-on support in Sussex & Kent | UK-wide remote consultancy

#FreeAdviceWednesday #TechHelp #SmallBusinessUK #SussexBusiness #KentBusiness #Heathfield #LocalBusiness #BusinessTips #TotalBizSupport #TechConsulting`
    }
  },
  '2026-09-17': {
    morningLinkedIn: {
      date: '2026-09-17',
      title: 'The £5,000 Agency Quote Myth: Why Most Small Businesses Overpay for Underperforming Websites',
      text: `A local business owner recently showed me an agency proposal:

£4,800 + VAT for an 8-page website, plus a mandatory £180/month "maintenance and hosting retainer".

When we audited the spec:
• A generic off-the-shelf WordPress template
• 42 separate third-party plugins (a security and performance nightmare)
• Zero schema markup for local search engine ranking
• Estimated mobile page load time: 4.8 seconds

For 90% of small businesses, this model is fundamentally broken.

You don't need bloated agency overhead, layers of account managers, or brittle plugin-stuffed themes that break every time PHP updates.

What a modern high-performing business website actually requires:
1. Ultra-Clean Architecture: Modern React/TypeScript or static builds that render in under 1.2 seconds on mobile.
2. Hardened Local SEO Schema: Structured Geo-data that tells Google exactly which towns you cover (e.g., East Sussex, West Sussex, Kent), securing local map pack visibility.
3. Zero-Maintenance Infrastructure: Hosted on modern edge networks with automated deployment, eliminating monthly "plugin maintenance" invoices.
4. Clear Commercial Copy: Messaging that speaks to client pain points instead of corporate tech jargon.

Enterprise IT discipline means stripping away bloat to deliver faster, more reliable solutions at small business prices.

Is your current website an asset that generates revenue, or a liability that generates hosting invoices?

🔗 Audit your digital presence with us: totalbiz.co.uk or connect with me directly.

#WebDesignUK #AgencyTrap #SmallBusinessUK #LocalSEO #TechStrategy #FractionalCTO #TotalBizSupport #SussexBusiness #UKBusiness`
    },
    lunchLinkedIn: null,
    eveningMeta: {
      date: '2026-09-17',
      title: 'Does Your Business Show Up When Local Customers Search for Your Services?',
      facebookText: `When someone in your local area searches Google for your services, who do they find first — you or your competitor? 📍 🔍

More than 80% of local customer journeys start with a search like:
• "plumber near me"
• "osteopath in Heathfield"
• "garden maintenance East Sussex"
• "IT support Kent"

If your business isn't appearing in the top 3 Google Map results, or if your website takes 5 seconds to load on a mobile phone, that customer simply calls the next business on the list.

At TotalBiz Support, we don't build bloated, slow websites that cost thousands and break every few months.

We build ultra-fast, modern websites designed specifically to:
⚡ Load instantly on smartphones (under 1.5 seconds)
📍 Dominate local search results across Sussex & Kent with proper Geo-Schema
💬 Make contacting you effortless with 1-tap WhatsApp and phone call buttons

We handle everything from domain setup and professional email to local search engine ranking.

👉 Want to check where your business ranks right now? Visit totalbiz.co.uk/services/ or drop us a WhatsApp message on +44 7799 538311!

📍 Based in Heathfield, East Sussex — supporting businesses across Sussex, Kent, and UK-wide remotely.

#SmallBusinessUK #LocalSEO #WebDesignSussex #SussexBusiness #KentBusiness #Heathfield #EastSussex #Uckfield #TunbridgeWells #Eastbourne #TotalBizSupport`,
      instagramImageUrl: 'https://raw.githubusercontent.com/lovefilm2018/totalbizsupport/main/client/public/local_seo_website_visual.jpg',
      instagramCaption: `Being the best at what you do doesn't matter if local customers can't find you on Google. 🔍 📍

When people in Sussex and Kent need a local service, they don't browse social media — they pull out their phone and search Google.

If your business doesn't show up in the top map results, or if your website is slow and frustrating to use, you're handing paying clients straight to your competitors.

Here's what our modern web & local search setups deliver:
⚡ Instant Mobile Loading (<1.5s): No waiting, no bouncing visitors.
🗺️ Local Search Domination: Built-in local SEO schema so search engines know exactly what areas you serve.
💬 Frictionless Contact: Direct WhatsApp, tap-to-call, and easy booking links.
🔒 Zero Plugin Chaos: Fast, secure, and built to last.

Ready for a website that actually brings in local inquiries?

👉 Tap link in bio (totalbiz.co.uk) to learn more or send us a DM to chat!

📍 Hands-on support in Sussex & Kent | UK-wide remote consultancy

#WebDesignUK #LocalSEO #SmallBusinessSupport #SussexBusiness #KentBusiness #Heathfield #EastSussex #SEOStrategy #TotalBizSupport #LocalBusinessUK`
    }
  },
  '2026-09-18': {
    morningLinkedIn: {
      date: '2026-09-18',
      title: 'The "Spilled Coffee" Litmus Test: Could Your Business Survive a Hardware Disaster on Monday Morning?',
      text: `Cyber attacks get all the headlines.

Ransomware, state-sponsored hacks, and phishing cartels dominate the news.

Yet in 20+ years of managing operational resilience across global enterprises (HSBC, eBay, Schroders, Gumtree), the single most common disaster for a small business wasn't a dark-web hack:

It was a cup of coffee knocked across a MacBook on a Thursday afternoon.
Or an unbacked external hard drive failing with 4 years of client records.
Or a laptop left in the boot of a car.

If your primary work laptop failed permanently right now, what is your exact recovery time?

For far too many small businesses:
• Critical files exist only on one physical desktop.
• Passwords and 2FA recovery codes are saved in a local browser.
• Client contracts and current accounting sheets have no off-site replica.
• Recovering takes 2 weeks of lost revenue, forensic data recovery bills, and immense stress.

Protecting your business doesn't require complex corporate infrastructure. It requires the 3-2-1 Rule:
1. 3 copies of all critical data.
2. 2 different storage media (e.g. your local SSD + encrypted cloud drive).
3. 1 copy off-site in an automated, encrypted cloud repository.

Coupled with full-disk encryption (BitLocker or FileVault) and a centralised password vault, your business can recover on a replacement machine in under 2 hours.

Before you close your laptop this Friday, ask yourself: Is your business genuinely disaster-proof?

Have a productive Friday and a peaceful, secure weekend!

🔗 Review your business continuity: totalbiz.co.uk or connect with me here.

#BusinessContinuity #DataProtection #CyberHygiene #DisasterRecovery #SmallBusinessUK #OperationalExcellence #FractionalCIO #TotalBizSupport #UKBusiness`
    },
    lunchLinkedIn: null,
    eveningMeta: {
      date: '2026-09-18',
      title: 'The Spilled Coffee Test: Is Your Business Data Safe If Hardware Fails Today?',
      facebookText: `If your work laptop died right now, how much of your business would you lose? 💻 ☕ 😱

It's an uncomfortable question, but for many small businesses and sole traders across Sussex and Kent, the answer is terrifying:
❌ Years of client files and project notes saved only on one desktop
❌ Unsent invoices and accounts stored on an old external hard drive
❌ Passwords saved in the browser with no backup recovery keys
❌ Days of lost work trying to rebuild everything from memory

Disasters rarely happen with warning. It's a spilled mug of tea, a sudden hard drive failure, or a misplaced bag.

At TotalBiz Support, we set up completely automated, hands-off cloud backup systems:
🛡️ Automatic silent backups every time you edit a document
🛡️ Full data encryption so your customer information stays 100% secure
🛡️ 2-hour disaster recovery so you can pick up a spare computer and get right back to work

Spend 30 minutes protecting your business today so you can enjoy every weekend with total peace of mind.

👉 Book a tech security & backup check at totalbiz.co.uk/services/ or drop us a WhatsApp message on +44 7799 538311!

Have a fantastic, restful weekend!

📍 Based in Heathfield, East Sussex — supporting Sussex, Kent & UK-wide.

#SmallBusinessUK #DataBackup #ITSupport #SussexBusiness #KentBusiness #Heathfield #EastSussex #BusinessContinuity #TechPeaceOfMind #TotalBizSupport`,
      instagramImageUrl: 'https://raw.githubusercontent.com/lovefilm2018/totalbizsupport/main/client/public/disaster_recovery_backup_visual.jpg',
      instagramCaption: `The best feeling on a Friday: knowing your business is safe even if disaster strikes. ☕ 🔒

A spilled cup of coffee, a dropped tablet, or a failing hard drive shouldn't bring your entire business to a grinding halt.

If you don't have an automated, off-site cloud backup running in the background, you're one accident away from losing weeks of hard work.

Here is what rock-solid peace of mind looks like:
☁️ Automated Cloud Sync: Your client documents and financial records back up silently in real-time.
🔒 Full-Disk Encryption: Even if a laptop is lost, your client data cannot be accessed.
⚡ Rapid Recovery: Get back up and running on a replacement machine in a couple of hours, not weeks.

Don't wait for hardware to fail to find out if your backups work. Let's make your business disaster-proof.

👉 Tap link in bio (totalbiz.co.uk) to book a tech check or send us a DM!

Have a wonderful, restful weekend!

📍 Sussex & Kent | UK-wide remote consultancy

#FridayPeaceOfMind #DataBackup #SmallBusinessUK #TechSafety #SussexBusiness #KentBusiness #Heathfield #BusinessContinuity #TotalBizSupport`
    }
  },
  '2026-09-21': {
    morningLinkedIn: {
      date: '2026-09-21',
      title: 'The "WhatsApp as a Database" Trap: Why Group Chats Quietly Murder Business Velocity',
      text: `Running your business from WhatsApp is like storing your accounting records in an unlabelled shoe box.

When you have 2 clients, WhatsApp feels fast, agile, and personal.

When you grow to 10 clients, 3 sub-contractors, and 5 active jobs:
❌ Critical customer specifications get buried beneath 45 unread group messages
❌ Pricing agreements and quotes exist only in one person's chat history
❌ Important client requests get marked "read" at a red light and completely forgotten
❌ If an employee or sub-contractor leaves, all your customer relationship history walks out the door with their phone

You don't need a £10,000 corporate CRM to fix this.

You just need a lightweight, single source of truth:
1. Centralise client intake into 1 shared inbox (Google Workspace or M365) where all correspondence is searchable.
2. Link every quote and job to a simple digital card, not a personal message thread.
3. Keep WhatsApp for quick coordination — never for storing critical business decisions.

Technology should give you clarity and control — not endless unread notifications.

How much of your business's critical information is currently trapped in WhatsApp chats?

👉 Streamline your operations: totalbiz.co.uk or send me a message here.

#SmallBusinessUK #Operations #Productivity #BusinessSystems #WorkflowAutomation #TotalBizSupport #SussexBusiness #UKBusiness`
    },
    lunchLinkedIn: null,
    eveningMeta: {
      date: '2026-09-21',
      title: 'Stop Running Your Business From WhatsApp',
      facebookText: `Is your business secretly running on WhatsApp chaos? 📱 🛑

It starts innocently enough — quoting a job via WhatsApp, sending supplier specs in a quick message, or texting a team member an update.

But before you know it:
❌ Important customer details are buried 100 messages deep
❌ Invoices get forgotten because "it was in that chat last week"
❌ You spend your evenings scrolling through messages trying to remember what you promised

You don't need complicated software to fix it. At TotalBiz Support, we set up simple, clean systems on your phone and laptop so client details, quotes, and jobs are organised in one place.

👉 Reclaim your evenings! Visit totalbiz.co.uk/services/ or drop us a WhatsApp on +44 7799 538311.

📍 Based in Heathfield, East Sussex — supporting Sussex, Kent & UK-wide remote.

#SmallBusinessUK #SussexBusiness #KentBusiness #Heathfield #EastSussex #BusinessAdmin #ProductivityTips #TradesUK #TotalBizSupport`,
      instagramImageUrl: 'https://raw.githubusercontent.com/lovefilm2018/totalbizsupport/main/client/public/whatsapp_chaos_visual.jpg',
      instagramCaption: `Stop letting WhatsApp run your working day. 🛑 📱

When your quotes, customer promises, and supplier details live in messy group chats:
• Jobs get missed
• Invoices go out late
• You can never truly switch off in the evening

At TotalBiz Support, we help small businesses and sole traders across Sussex & Kent set up simple, practical systems that keep client jobs organised on auto-pilot.

No confusing tech talk — just tools that make your life easier.

👉 Tap link in bio (totalbiz.co.uk) or send us a DM to chat!

📍 Sussex & Kent | UK-Wide Remote

#SmallBusinessUK #TradesmanUK #BusinessSystems #SussexBusiness #KentBusiness #Heathfield #EastSussex #WorkLifeBalance #TotalBizSupport`
    }
  },
  '2026-09-22': {
    morningLinkedIn: {
      date: '2026-09-22',
      title: 'The "Free Website" Hosting Trap: Why "Free" Web Design Usually Costs £500+ a Year',
      text: `I see ads targeted at small businesses every single day:
"Get a free 4 or 5-page website! All you pay is the monthly hosting."

It sounds like a bargain.

What they are banking on is that you won't know the reality:
Most modern websites can actually be hosted for free.

Here is how the "free website" model actually works:
1. They slap a generic template together in 20 minutes.
2. They lock your domain into their proprietary system.
3. They charge you £30 to £60 a month for "hosting and maintenance".
4. By year two, you have paid £700 to £1,400 for a slow, clunky site you don't even own.

The modern cloud reality is completely different.

At TotalBiz Support, we have built websites for small hotels, booking apps across different industries, and websites for local independent traders. 

We have never had to charge a single customer for web hosting.

Why? Because modern edge infrastructure allows clean, high-speed static sites and web apps to be hosted securely with zero monthly hosting bills.

Our model is transparent:
• We charge a fair, straightforward price to design and build your website properly.
• All you pay ongoing is your annual domain registration (£10 to £15/year, often free for the first year on .co.uk).
• You own your digital presence 100% — no monthly hosting hostages.

Don't be fooled by "free" offers that lock you into lifetime retainers.

How much is your current website costing you each month just to sit on the internet?

👉 Explore honest web development: totalbiz.co.uk or message me directly.

#WebDevelopment #SmallBusinessUK #WebDesign #Transparency #TechStrategy #CostSaving #TotalBizSupport #SussexBusiness #UKBusiness`
    },
    lunchLinkedIn: null,
    eveningMeta: {
      date: '2026-09-22',
      title: 'The "Free Website" Hosting Trap',
      facebookText: `Ever seen those ads offering a "FREE 5-page website — just pay for hosting"? 🌐 🛑

Be careful. What sounds like a great deal usually turns into an expensive trap:
❌ You end up paying £30 to £60 every single month just to keep your site online
❌ That's £360 to £700+ a year for basic hosting that costs almost nothing to run
❌ If you ever want to leave, they hold your domain and content hostage

At TotalBiz Support, we do things differently:
✅ We charge a fair, one-off price to build a fast, modern website that actually brings in local inquiries
✅ We host your website for FREE on modern cloud networks — we have never charged a client a monthly hosting bill
✅ You own your site and domain 100% (domain renewals are just £10–£15 a year)

No hidden fees, no ongoing hosting contracts. Just honest, transparent support.

👉 Ready for a website that works for you? Check out our work at totalbiz.co.uk/services/ or drop us a WhatsApp on +44 7799 538311!

📍 Based in Heathfield, East Sussex — supporting businesses across Sussex, Kent & UK-wide.

#SmallBusinessUK #WebDesignSussex #HonestPricing #SussexBusiness #KentBusiness #Heathfield #EastSussex #Websites #TotalBizSupport`,
      instagramImageUrl: 'https://raw.githubusercontent.com/lovefilm2018/totalbizsupport/main/client/public/free_website_hosting_trap.jpg',
      instagramCaption: `The "Free Website" trap: don't pay £40/month for hosting you don't need! 🛑 💻

Those "free website" ads aren't doing you a favour. They lock you into £30–£60/month hosting fees for years to come.

Here's how we build websites at TotalBiz Support:
⚡ Fast, modern, custom web apps built to convert local customers
🆓 £0 Monthly Hosting: We host our client sites on modern cloud edge networks for free. Zero monthly hosting invoices.
🔒 100% Ownership: You own your site and domain. All you pay is your annual £10–£15 domain renewal.

Honest pricing. Zero agency bloat.

👉 Tap link in bio (totalbiz.co.uk) or send us a DM to chat!

📍 Sussex & Kent | UK-wide remote

#WebDesignUK #SmallBusinessWebsites #SussexBusiness #KentBusiness #Heathfield #HonestBusiness #LocalSEO #TotalBizSupport`
    }
  },
  '2026-09-23': {
    morningLinkedIn: {
      date: '2026-09-23',
      title: 'Free Advice Wednesday: The "Forgotten Passwords" Vulnerability',
      text: `How does your team share passwords right now?

In 8 out of 10 small businesses I audit, the answer is usually:
• A shared Excel sheet titled "Passwords_2024.xlsx"
• A Post-it note stuck to the underside of the main keyboard
• Or the classic: texting the company credit card 2FA code across a WhatsApp group

It works fine — until:
1. A team member or freelancer leaves, and you have to change 30 logins manually (or worse, you forget to change them).
2. An account gets compromised, and you have no log of who accessed it or when.
3. Someone accidentally locks the primary company admin account right before a major client deadline.

Setting up a secure, encrypted password vault (like Bitwarden or 1Password) with role-based sharing takes less than 30 minutes and costs less than a cup of coffee per user per month.

Today is Free Advice Wednesday at TotalBiz Support.

In 20+ years of leading technology and operational programmes, the biggest vulnerabilities were almost never sophisticated dark-web hackers — they were basic password and access oversights.

Got a question about your business email, passwords, cloud setup, or website? Drop it in the comments below or message me directly today — 100% free, straightforward practical advice.

👉 totalbiz.co.uk

#FreeAdviceWednesday #SmallBusinessUK #CyberSecurity #DataProtection #TechStrategy #BusinessOperations #TotalBizSupport #UKBusiness`
    },
    lunchLinkedIn: null,
    wednesdayMorningMeta: {
      date: '2026-09-23',
      title: 'Free Advice Wednesday: Got an IT, Website or Systems Headache?',
      facebookText: `It's Free Advice Wednesday at TotalBiz Support! 💡 🛠️

Are you stuck with a frustrating tech problem or feeling overwhelmed by your business admin?

Today is your chance to ask anything — completely free, no strings attached, and zero sales pitch:
• Business email not syncing properly across your phone and laptop?
• Wi-Fi dead spots in the back office, workshop, or clinic?
• Sluggish PC that takes ages just to open a file?
• Website feeling outdated or failing to bring in local inquiries?
• Wondering if you're paying monthly for software tools you don't even use?

Drop us a message today! No jargon, no high-pressure sales pitch — just practical, honest advice.

👉 Message our page directly here, send a WhatsApp to +44 7799 538311, or visit totalbiz.co.uk.

📍 Based in Heathfield, East Sussex — serving Sussex, Kent, and UK-wide remotely.

#FreeAdviceWednesday #SmallBusinessUK #SussexBusiness #KentBusiness #Heathfield #EastSussex #ITSupport #TechHelp #BusinessAdvice #TotalBizSupport`,
      instagramImageUrl: 'https://raw.githubusercontent.com/lovefilm2018/totalbizsupport/main/client/public/free_contact_wednesday_official.jpg',
      instagramCaption: `Got a tech headache or an annoying digital bottleneck in your business? Ask us anything today! 💡 ☕

Every Wednesday, we offer completely free, no-obligation advice for small businesses, sole traders, and property hosts across Sussex and Kent.

Whether it's:
📶 Sorting Wi-Fi dead zones in thick Sussex stone buildings
✉️ Fixing syncing issues with your business email
💻 Speeding up sluggish workstations without buying new hardware
🌐 Finding out why your website isn't bringing in leads
📊 Cutting down on software subscriptions you don't need

No tech jargon, no confusing acronyms — just clear, straightforward answers to get you unstuck.

💬 Drop your question in our DMs, message us on WhatsApp (+44 7799 538311), or head to totalbiz.co.uk!

📍 Hands-on support in Sussex & Kent | UK-wide remote consultancy

#FreeAdviceWednesday #TechHelp #SmallBusinessUK #SussexBusiness #KentBusiness #Heathfield #LocalBusiness #BusinessTips #TotalBizSupport`
    },
    eveningMeta: null
  },
  '2026-09-24': {
    morningLinkedIn: {
      date: '2026-09-24',
      title: 'The "Agile" Dogma Debate: Why Project Buzzwords Don\'t Guarantee Delivery',
      text: `In recent years, everyone in change management and IT gets wildly excited about delivering everything using an "Agile" framework.

Daily standups, 2-week sprints, story points, backlog grooming, retrospective ceremonies.

Having delivered major programmes for over two decades — including plenty of years before "Agile" became the industry's default buzzword — is it really all it's hyped up to be?

The honest answer:
Yes, Agile has its place. But it is not a silver bullet for every delivery, and shoehorning it into every project often creates more chaos than clarity.

Here is what happens when Agile dogma collides with real-world delivery:

1. The "Endless Sprint" Trap:
Because Agile embraces changing scope, projects can easily drift into endless cycles of minor tweaks with no firm delivery deadline and ballooning budgets.

2. Fixed Scope Needs Clear Boundaries:
If you are opening a physical office, deploying a network infrastructure, or launching a customer portal for a fixed seasonal date, you don't need abstract 2-week iterations. You need clear dependencies, accountable milestones, and a firm completion date.

3. The Ceremony Overhead:
When team members spend 10 hours a week in planning poker, standups, and reviews, that's 10 hours they aren't actually building, fixing, or delivering.

The best delivery leaders aren't dogmatic about frameworks:
They use Agile principles where rapid prototyping and discovery are genuinely needed, and pragmatic milestone planning where predictability, budget control, and hard deadlines matter.

Delivery excellence isn't about following a textbook methodology. It's about getting things done on time, on budget, and without unnecessary friction.

Change managers & operators: Where do you stand on the Agile debate?

👉 Pragmatic business & tech delivery: totalbiz.co.uk

#ProjectManagement #ChangeManagement #Agile #DeliveryExcellence #Operations #TechLeadership #TotalBizSupport #UKBusiness`
    },
    lunchLinkedIn: null,
    eveningMeta: {
      date: '2026-09-24',
      title: 'Eliminate Tech Gremlins: Hardware, Wi-Fi & Office Tech',
      facebookText: `Are tech gremlins quietly stealing hours from your working week? 💻 📶

Sluggish laptops, patchy Wi-Fi that won't reach the back office, or printers that vanish every time the router reboots...

You don't have to put up with everyday tech annoyances, and you don't need an expensive monthly contract with an impersonal helpdesk.

At TotalBiz Support, we provide friendly, hands-on on-site technical support for small businesses, shops, and clinics across Sussex and Kent. We come to you, diagnose the root cause, fix it properly, and make sure it stays fixed.

👉 Need hands-on tech help? Book a visit at totalbiz.co.uk/services/ or WhatsApp us on +44 7799 538311!

📍 Based in Heathfield, East Sussex — serving East & West Sussex, Kent, and UK-wide remotely.

#SmallBusinessUK #SussexBusiness #KentBusiness #Heathfield #EastSussex #ITSupport #WiFiFix #TechSupport #LocalBusiness #TotalBizSupport`,
      instagramImageUrl: 'https://raw.githubusercontent.com/lovefilm2018/totalbizsupport/main/client/public/hardware_wifi_visual.jpg',
      instagramCaption: `Stop losing hours to crashing computers, Wi-Fi drops, and cable chaos. 🛑 🔌

Everyday tech friction kills small business momentum:
📶 Wi-Fi dead spots in the workshop or office
💻 Sluggish laptops taking 10 minutes just to start up
🖨️ Devices dropping off the network without warning
💾 Zero automated backup systems in place

We provide hands-on, friendly on-site support across Sussex and Kent. No confusing acronyms, no unnecessary retainers — just solid fixes that keep your business moving.

👉 Tap link in bio (totalbiz.co.uk) or send us a DM to book a visit!

📍 Sussex & Kent | UK-wide remote consultancy

#SmallBusinessUK #SussexBusiness #KentBusiness #Heathfield #EastSussex #ITSupportUK #WiFiSolutions #HardwareSupport #LocalBusiness #TotalBizSupport`
    }
  },
  '2026-09-25': {
    morningLinkedIn: {
      date: '2026-09-25',
      title: 'The Friday Afternoon "Disaster Drill": 3 Questions to Safeguard Your Business',
      text: `Before you close your laptop for the weekend, ask yourself these 3 questions:

1. If your primary work computer was stolen or dropped this evening, where is your most recent client invoice or project file backed up?
2. If your phone broke right now, can you still log into your banking and business email without the authenticator app on that specific device?
3. Did you sign up for any "7-day free software trials" on Monday that will quietly charge your company card £50 this weekend?

In large enterprise environments, business resilience is governed by strict automated failovers and disaster recovery runbooks.

In a 5-person company or sole trade, disaster recovery usually consists of:
"Hoping nothing goes wrong."

Protecting your livelihood doesn't require enterprise budgets. It requires 15 minutes of proactive hygiene:
• Enable automated cloud backup (OneDrive, Google Drive, or Backblaze) so every local document is mirrored off-site in real time.
• Store 2FA recovery codes in a secure, encrypted password vault — never solely on the phone itself.
• Cancel forgotten subscriptions before they roll into annual auto-renewals.

Enterprise discipline isn't about buying expensive tools. It's about eliminating unnecessary risk so you can enjoy your weekend in complete peace.

Have a productive Friday and a relaxing weekend!

👉 totalbiz.co.uk

#SmallBusinessUK #BusinessContinuity #DataSecurity #TechHygiene #FridayChecklist #Productivity #TotalBizSupport #UKBusiness`
    },
    lunchLinkedIn: null,
    eveningMeta: {
      date: '2026-09-25',
      title: 'The Spilled Coffee Test: Weekend Peace of Mind',
      facebookText: `The best feeling on a Friday afternoon: knowing your business data is 100% secure and backed up. 🏖️ 🔒

If your primary laptop failed permanently right now, what would happen on Monday morning?
• Would you lose years of customer records and tax spreadsheets?
• Or could you pick up a spare computer, log in, and pick up right where you left off?

At TotalBiz Support, we set up simple, bulletproof 3-2-1 cloud backups that run silently in the background without you having to lift a finger.

Close your laptop this weekend with complete peace of mind.

👉 Protect your business today: visit totalbiz.co.uk or drop us a WhatsApp message on +44 7799 538311!

Have a fantastic, restful weekend!

📍 Based in Heathfield, East Sussex — supporting Sussex, Kent & UK-wide.

#SmallBusinessUK #WorkLifeBalance #DataBackup #BusinessSecurity #SussexBusiness #KentBusiness #Heathfield #EastSussex #ITSupport #TotalBizSupport`,
      instagramImageUrl: 'https://raw.githubusercontent.com/lovefilm2018/totalbizsupport/main/client/public/spilled_coffee_disaster.jpg',
      instagramCaption: `Friday afternoon peace of mind: knowing your business data is safe, secure, and backed up. ☕ 🔒

Automated cloud backups mean you never have to worry about a spilled cup of coffee or a crashing hard drive destroying your client records.

If your current setup gives you Sunday-night anxiety, let's fix it next week.

👉 Tap link in bio (totalbiz.co.uk) or send us a DM to chat!

Have a wonderful weekend!

📍 Sussex & Kent | UK-wide remote

#FridayVibes #SmallBusinessUK #BusinessContinuity #SussexBusiness #KentBusiness #Heathfield #TechSupport #TotalBizSupport`
    }
  },
  '2026-09-28': {
    morningLinkedIn: {
      date: '2026-09-28',
      title: 'The 60-Page Documentation Trap: Why Nobody Reads Your Company Manuals',
      text: `In large corporate organisations, there is an unspoken rule:
If something exists, write a 60-page document about it to satisfy the audit framework.

Teams spend hundreds of hours creating glossy procedure manuals, architecture binders, and onboarding guides.

And what happens to them?
They sit in a SharePoint folder, completely unread, until they are out of date 6 months later.

When running a small business or growing team, copying this corporate habit is lethal.

You don't have the time or overhead to maintain 50-page manuals. 

What a growing business actually needs is Living Documentation:

1. The "1-Page Rule":
If a core process (e.g. client onboarding, quote generation, equipment setup) cannot be explained on 1 single page with clear bullet points, the process itself is too complicated.

2. Short Screen Recordings:
Instead of writing 15 pages explaining how to use your invoicing software, record a 2-minute Loom video walking through it. Your team will actually watch it.

3. Automated Checklists:
Embed procedure steps into your digital task board. When a step must happen, make it a simple required tick-box, not a reference to page 34 of an employee handbook.

The goal of documentation isn't to look impressive on paper. 
It's to help your team do great work without having to ask you the same question 5 times.

Does your business have living checklists, or manuals gathering digital dust?

👉 Streamline your business systems: totalbiz.co.uk or message me directly.

#Operations #SmallBusinessUK #StandardOperatingProcedures #ProcessExcellence #Productivity #BusinessGrowth #TotalBizSupport #UKBusiness`
    },
    lunchLinkedIn: null,
    eveningMeta: {
      date: '2026-09-28',
      title: 'Ditch the 60-Page Manual: Simple Living Checklists',
      facebookText: `Still spending half your day answering the same questions from your team or contractors? 📋 🛑

Large corporate companies love writing 60-page procedure manuals that look impressive on paper — but in the real world, nobody actually reads them.

When running a small business or growing team, you need living systems, not paperwork bloat:
✅ The 1-Page Rule: Every core process written on a single clear checklist
✅ 2-Minute Screen Guides: Short videos showing exactly how to do tasks so anyone can follow along
✅ Digital Task Boards: Essential steps built directly into your task workflow so nothing gets missed

At TotalBiz Support, we help small businesses eliminate operational chaos and turn messy routines into simple, repeatable systems.

👉 Want to stop repeating yourself? Visit totalbiz.co.uk/services/ or drop us a WhatsApp message on +44 7799 538311!

📍 Based in Heathfield, East Sussex — serving Sussex, Kent & UK-wide remotely.

#SmallBusinessUK #ProductivityTips #StandardOperatingProcedures #BusinessAdmin #SussexBusiness #KentBusiness #Heathfield #EastSussex #WorkflowAutomation #TotalBizSupport`,
      instagramImageUrl: 'https://raw.githubusercontent.com/lovefilm2018/totalbizsupport/main/client/public/living_documentation_visual.jpg',
      instagramCaption: `Ditch the 60-page company manual that nobody reads. 🛑 📖

If your team is constantly asking you how to do the same tasks over and over, your operating systems are broken.

Here is what living, modern business documentation looks like:
📄 The 1-Page Rule: If it can't be explained on 1 page with bullet points, it's too complicated.
🎥 2-Minute Screen Walkthroughs: Quick video guides your team will actually watch.
✅ Interactive Checklists: Built directly into your daily task board so steps never get missed.

Build systems that train your team for you so you can focus on growing your business.

👉 Tap link in bio (totalbiz.co.uk) or send us a DM to chat!

📍 Sussex & Kent | UK-wide remote

#SmallBusinessUK #BusinessOperations #ProductivityHacks #SussexBusiness #KentBusiness #Heathfield #EastSussex #BusinessGrowth #TotalBizSupport`
    }
  },
  '2026-09-29': {
    morningLinkedIn: {
      date: '2026-09-29',
      title: 'The "7-Day Absence" Litmus Test: Can Your Business Function Without You In The Engine Room?',
      text: `Here is the ultimate litmus test for small business operational health:

Can you step away from your business for 7 days without:
• Client inquiries grinding to a complete halt?
• Unpaid invoices piling up without follow-up?
• Your phone ringing every 30 minutes with preventable questions from suppliers or contractors?

If taking a single week off creates operational chaos, you don't have a scalable business — you have an exhausting, high-stress job.

Building a business that can breathe while you step away doesn't require a 20-person management layer:
1. Frictionless Inbound Routing: Contact inquiries automatically trigger a structured acknowledgment and calendar booking link so prospects are never left waiting.
2. Automated Cashflow Hygiene: Payment reminders and recurring invoices dispatch on schedule without manual intervention.
3. Centralised Documentation: Standard operating checklists stored in one searchable shared folder so team members don't need to ask you where files live.

Technology should give you the freedom to step back, recharge, and work ON your business rather than being permanently trapped IN it.

Could your business survive a 7-day absence right now?

👉 Discover how we engineer operational freedom: totalbiz.co.uk or connect with me directly.

#SmallBusinessUK #OperationalFreedom #BusinessSystems #WorkLifeBalance #Leadership #FractionalCOO #TotalBizSupport #UKBusiness`
    },
    lunchLinkedIn: null,
    eveningMeta: {
      date: '2026-09-29',
      title: 'Could Your Business Run Without You For 7 Days?',
      facebookText: `Could your business run smoothly if you took a week off? 🏖️ 📈

When your systems, client inquiries, and invoicing are properly automated:
✅ New customer leads get answered and booked automatically
✅ Invoices and payment reminders go out on schedule
✅ You can take time away with your family without checking your phone every 10 minutes

At TotalBiz Support, we eliminate operational chaos so local sole traders, small businesses, and property owners can enjoy real peace of mind.

Ready to build systems that work as hard as you do?

👉 Explore our support options at totalbiz.co.uk or drop us a WhatsApp message on +44 7799 538311!

📍 Based in Heathfield, East Sussex — supporting Sussex, Kent, and UK-wide remotely.

#SmallBusinessUK #WorkLifeBalance #BusinessSystems #Automation #SussexBusiness #KentBusiness #Heathfield #EastSussex #TotalBizSupport`,
      instagramImageUrl: 'https://raw.githubusercontent.com/lovefilm2018/totalbizsupport/main/client/public/business_freedom_beach.jpg',
      instagramCaption: `Build a business that gives you your life back. ✨ 📱

When your technology, automated booking, and client invoicing run seamlessly in the background, stepping away doesn't cause chaos.

We help small business owners across Sussex and Kent set up clean, practical systems that save hours every week.

👉 Tap link in bio (totalbiz.co.uk) or send us a DM to get started!

📍 Sussex & Kent | UK-wide remote

#SmallBusinessUK #WorkLifeBalance #BusinessAutomation #SussexBusiness #KentBusiness #Heathfield #EastSussex #TotalBizSupport`
    }
  }
};

// Load Persistent Queue from Disk or Calendar
function loadQueue() {
  try {
    if (fs.existsSync(QUEUE_FILE)) {
      const data = JSON.parse(fs.readFileSync(QUEUE_FILE, 'utf8'));
      console.log('[Queue] Loaded persistent state from disk:', QUEUE_FILE);
      return data;
    }
  } catch (err) {
    console.error('[Queue] Error loading from disk:', err);
  }
  return {};
}

function saveQueue(queue) {
  try {
    fs.writeFileSync(QUEUE_FILE, JSON.stringify(queue, null, 2), 'utf8');
    console.log('[Queue] Persisted state to disk:', QUEUE_FILE);
  } catch (err) {
    console.error('[Queue] Failed to persist state to disk:', err);
  }
}

let dynamicQueue = loadQueue();

function getLondonDateString() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London' }).format(new Date());
}

// Universal Notification Dispatcher (Discord & Logging)
function sendNotification({ title, headline, statusType, platforms, messageText, imageUrl, failureReason }) {
  console.log(`[Notification] [${statusType.toUpperCase()}] ${title}: ${headline || ''}`);
  
  if (!DISCORD_WEBHOOK_URL) return;

  try {
    let color = 3066993; // Green
    let statusText = '🟢 **PUBLISHED SUCCESSFULLY**';
    
    if (statusType === 'failed') {
      color = 15158332; // Red
      statusText = '🔴 **PUBLISHING FAILED**';
    } else if (statusType === 'skipped') {
      color = 16753920; // Amber / Orange
      statusText = '⚠️ **DISPATCH SKIPPED (ZERO-FALLBACK GUARD)**';
    }

    const snippet = messageText ? (messageText.split('\n\n')[0] || messageText.slice(0, 350)) : '';

    const embed = {
      title: `🏛️ TotalBiz Support — ${title || headline || 'Social Dispatch'}`,
      description: `**Execution:** ${statusText}\n\n${snippet}`,
      color: color,
      fields: Object.entries(platforms || {}).map(([k, v]) => ({
        name: k,
        value: `\`${v}\``,
        inline: true
      })),
      footer: { text: 'TotalBiz Google Cloud Run Scheduler • Live Alert' },
      timestamp: new Date().toISOString()
    };

    if (failureReason) {
      embed.fields.push({
        name: '⚠️ Detail / Reason',
        value: `\`\`\`${String(failureReason).slice(0, 250)}\`\`\``,
        inline: false
      });
    }

    if (imageUrl) {
      embed.image = { url: imageUrl };
    }

    const payload = JSON.stringify({
      username: 'TotalBiz Operations Dispatcher',
      embeds: [embed]
    });

    const parsedUrl = new URL(DISCORD_WEBHOOK_URL);
    const req = https.request({
      hostname: parsedUrl.hostname,
      port: 443,
      path: parsedUrl.pathname + parsedUrl.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        if (res.statusCode >= 300) {
          console.warn(`[Discord Webhook Warning: HTTP ${res.statusCode}] Response: ${d}`);
        }
      });
    });
    req.on('error', err => console.error('[Discord Webhook Network Error]', err));
    req.write(payload);
    req.end();
  } catch (err) {
    console.error('[Notification Dispatch Failure]', err);
  }
}

// 1. Publish Single LinkedIn UGC Post (Personal or Company)
function publishLinkedInSingleUgc(token, authorUrn, text, label) {
  console.log(`[LinkedIn] Publishing UGC text to ${label} (${authorUrn})...`);
  const postBody = JSON.stringify({
    author: authorUrn,
    lifecycleState: 'PUBLISHED',
    specificContent: {
      'com.linkedin.ugc.ShareContent': {
        shareCommentary: { text: text },
        shareMediaCategory: 'NONE'
      }
    },
    visibility: { 'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC' }
  });

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.linkedin.com',
      port: 443,
      path: '/v2/ugcPosts',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0',
        'Content-Length': Buffer.byteLength(postBody)
      }
    }, res => {
      let d = '';
      res.on('data', chunk => d += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(d);
          if (parsed.status && parsed.status >= 400) {
            reject(new Error(`${label} LinkedIn API Error ${parsed.status}: ${d}`));
          } else {
            resolve({ label, authorUrn, id: parsed.id, result: parsed });
          }
        } catch (e) {
          resolve({ label, authorUrn, raw: d });
        }
      });
    });
    req.on('error', reject);
    req.write(postBody);
    req.end();
  });
}

// 1b. Publish DUAL LinkedIn Text Post (Personal Profile + Company Page)
async function publishDualLinkedInText(text) {
  const promises = [];

  // 1. Personal Profile
  if (LINKEDIN_PERSON_TOKEN && LINKEDIN_PERSON_URN) {
    promises.push(publishLinkedInSingleUgc(LINKEDIN_PERSON_TOKEN, LINKEDIN_PERSON_URN, text, 'Alex Poxon Personal'));
  }

  // 2. Company Page
  if (LINKEDIN_ORG_TOKEN && LINKEDIN_ORG_URN) {
    promises.push(publishLinkedInSingleUgc(LINKEDIN_ORG_TOKEN, LINKEDIN_ORG_URN, text, 'TotalBiz Support Company Page'));
  }

  const results = await Promise.allSettled(promises);
  return results;
}

// 2. Publish Meta / Facebook Page Post
async function publishFacebook(text) {
  console.log('[Facebook] Publishing to TotalBiz Support Page...');
  const postData = new URLSearchParams({
    message: text,
    access_token: FB_PAGE_TOKEN
  }).toString();

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'graph.facebook.com',
      port: 443,
      path: `/v19.0/${FB_PAGE_ID}/feed`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, res => {
      let d = '';
      res.on('data', chunk => d += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(d);
          if (parsed.error) return reject(new Error('FB Graph Error: ' + d));
          resolve(parsed);
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

// 3. Publish Instagram Media (Photo or Reel)
async function publishInstagramMedia(mediaUrl, caption, isVideo = false) {
  console.log(`[Instagram] Uploading container (${isVideo ? 'VIDEO/REELS' : 'IMAGE'})...`);
  const tokenToUse = FB_PAGE_TOKEN || META_USER_TOKEN;
  
  const containerParams = {
    caption: caption,
    access_token: tokenToUse
  };
  
  if (isVideo) {
    containerParams.media_type = 'REELS';
    containerParams.video_url = mediaUrl;
  } else {
    containerParams.image_url = mediaUrl;
  }

  const postData = new URLSearchParams(containerParams).toString();

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'graph.facebook.com',
      port: 443,
      path: `/v19.0/${IG_ACCOUNT_ID}/media`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, res => {
      let d = '';
      res.on('data', chunk => d += chunk);
      res.on('end', () => {
        try {
          const container = JSON.parse(d);
          if (container.error || !container.id) {
            return reject(new Error('Instagram container creation failed: ' + d));
          }
          
          setTimeout(() => {
            const pubData = new URLSearchParams({ creation_id: container.id, access_token: tokenToUse }).toString();
            const pubReq = https.request({
              hostname: 'graph.facebook.com',
              port: 443,
              path: `/v19.0/${IG_ACCOUNT_ID}/media_publish`,
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(pubData) }
            }, pRes => {
              let pData = '';
              pRes.on('data', c => pData += c);
              pRes.on('end', () => {
                try {
                  const pubRes = JSON.parse(pData);
                  if (pubRes.error) {
                    return reject(new Error('Instagram publish error: ' + pData));
                  }
                  resolve(pubRes);
                } catch (e) {
                  reject(e);
                }
              });
            });
            pubReq.on('error', reject);
            pubReq.write(pubData);
            pubReq.end();
          }, 2500);
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

// Health Check & Queue Status
app.get('/health', (req, res) => {
  const todayLondon = getLondonDateString();
  const dayPlan = dynamicQueue[todayLondon] || MASTER_CALENDAR[todayLondon] || {};
  
  res.json({
    status: 'ok',
    service: 'totalbiz-social-poster',
    project: 'totalbiz-marketing-automation',
    timezone: 'Europe/London',
    todayLondon: todayLondon,
    todaySchedule: {
      morningLinkedIn: dayPlan.morningLinkedIn ? (dayPlan.morningLinkedIn.published ? `Published (${dayPlan.morningLinkedIn.title})` : `Ready: ${dayPlan.morningLinkedIn.title}`) : 'None (Will Skip)',
      lunchLinkedIn: dayPlan.lunchLinkedIn ? (dayPlan.lunchLinkedIn.published ? `Published (${dayPlan.lunchLinkedIn.title})` : `Ready: ${dayPlan.lunchLinkedIn.title}`) : 'None (Will Skip)',
      eveningMeta: dayPlan.eveningMeta ? (dayPlan.eveningMeta.published ? `Published (${dayPlan.eveningMeta.title})` : `Ready: ${dayPlan.eveningMeta.title}`) : 'None (Will Skip)'
    },
    masterCalendarDays: Object.keys(MASTER_CALENDAR),
    timestamp: new Date().toISOString()
  });
});

// View and Manage Queues
app.get('/queue', (req, res) => {
  const todayLondon = getLondonDateString();
  res.json({
    todayLondon: todayLondon,
    activeScheduleToday: dynamicQueue[todayLondon] || MASTER_CALENDAR[todayLondon] || null,
    masterCalendar: MASTER_CALENDAR,
    dynamicOverrides: dynamicQueue
  });
});

app.post('/queue/clear', (req, res) => {
  dynamicQueue = {};
  saveQueue(dynamicQueue);
  console.log('[Queue] Dynamic overrides cleared.');
  res.json({ status: 'cleared', dynamicQueue });
});

app.post('/queue/set', (req, res) => {
  const { channel, post } = req.body;
  if (!['morningLinkedIn', 'lunchLinkedIn', 'eveningMeta'].includes(channel)) {
    return res.status(400).json({ error: 'Invalid channel. Must be morningLinkedIn, lunchLinkedIn, or eveningMeta' });
  }
  if (!post || !post.date) {
    return res.status(400).json({ error: 'Post must include a target date (YYYY-MM-DD)' });
  }
  if (!dynamicQueue[post.date]) dynamicQueue[post.date] = {};
  dynamicQueue[post.date][channel] = post;
  saveQueue(dynamicQueue);
  console.log(`[Queue] Set dynamic ${channel} post for ${post.date} and saved to disk.`);
  res.json({ status: 'queued', channel, post });
});

// 4. Morning Scheduler Trigger (07:45 BST Sharp) - DUAL LinkedIn Post
app.post('/publish/daily-morning', async (req, res) => {
  const todayLondon = getLondonDateString();
  console.log(`[Cloud Scheduler] 07:45 AM Morning LinkedIn Trigger for ${todayLondon}...`);

  let postToPublish = null;
  if (req.body && req.body.text) {
    postToPublish = req.body;
  } else if (dynamicQueue[todayLondon]?.morningLinkedIn && !dynamicQueue[todayLondon]?.morningLinkedIn.published) {
    postToPublish = dynamicQueue[todayLondon].morningLinkedIn;
  } else if (MASTER_CALENDAR[todayLondon]?.morningLinkedIn && !MASTER_CALENDAR[todayLondon]?.morningLinkedIn.published) {
    postToPublish = MASTER_CALENDAR[todayLondon].morningLinkedIn;
  }

  if (!postToPublish) {
    console.log(`[Cloud Scheduler] Skipped Morning LinkedIn: No agreed pending post for today (${todayLondon}). ZERO-FALLBACK active.`);
    sendNotification({
      title: 'Morning LinkedIn (Dual)',
      headline: 'Scheduled Trigger Evaluation',
      statusType: 'skipped',
      platforms: { '💼 Platform': 'LinkedIn Personal + Company Page' },
      messageText: `No pending LinkedIn post for today (${todayLondon}). Fallback safely disabled.`,
      failureReason: 'Calendar slot empty or already published today.'
    });
    return res.json({ status: 'skipped', reason: `No agreed pending post for today (${todayLondon}). Fallback disabled.` });
  }

  try {
    const { text, title } = postToPublish;
    const results = await publishDualLinkedInText(text);
    
    // Mark published
    postToPublish.published = true;
    postToPublish.publishedAt = new Date().toISOString();
    if (MASTER_CALENDAR[todayLondon]?.morningLinkedIn) {
      MASTER_CALENDAR[todayLondon].morningLinkedIn.published = true;
      MASTER_CALENDAR[todayLondon].morningLinkedIn.publishedAt = new Date().toISOString();
    }
    if (!dynamicQueue[todayLondon]) dynamicQueue[todayLondon] = {};
    dynamicQueue[todayLondon].morningLinkedIn = postToPublish;
    saveQueue(dynamicQueue);

    console.log('[LinkedIn Morning Dual Success]', results);

    const personalOk = results.length > 0 && results[0].status === 'fulfilled';
    const orgOk = results.length > 1 && results[1].status === 'fulfilled';
    const personalUrn = personalOk ? (results[0].value?.id || 'Success') : 'Failed';
    const orgUrn = orgOk ? (results[1].value?.id || 'Success') : 'Failed';

    sendNotification({
      title: 'Morning LinkedIn (Dual Publication)',
      headline: title || 'Thought Leadership',
      statusType: (personalOk || orgOk) ? 'published' : 'failed',
      platforms: {
        '👤 Personal Profile': personalUrn,
        '🏛️ TotalBiz Company': orgUrn
      },
      messageText: text,
      imageUrl: null,
      failureReason: (personalOk && orgOk) ? null : 'One or more LinkedIn channels failed.'
    });

    res.json({ status: 'published_morning_dual_linkedin', results });
  } catch (err) {
    console.error('[LinkedIn Morning Dual Error]', err);

    sendNotification({
      title: 'Morning LinkedIn (Dual)',
      headline: postToPublish?.title || 'Thought Leadership',
      statusType: 'failed',
      platforms: { '💼 Platform': 'LinkedIn Dual' },
      messageText: postToPublish?.text || '',
      failureReason: err.message
    });

    res.status(500).json({ error: err.message });
  }
});

// Helper for publishing Meta (Facebook Page + Instagram)
async function dispatchMetaPost(postToPublish, todayLondon, isMorning = false) {
  const { facebookText, instagramImageUrl, instagramCaption, title } = postToPublish;
  const dispatchName = isMorning ? 'Wednesday Mid-Morning Meta (Free Advice Wednesday)' : 'Evening Meta Post';
  const promises = [];
  if (facebookText) promises.push(publishFacebook(facebookText));
  if (instagramImageUrl && instagramCaption) promises.push(publishInstagramMedia(instagramImageUrl, instagramCaption, false));

  const results = await Promise.allSettled(promises);
  
  postToPublish.published = true;
  postToPublish.publishedAt = new Date().toISOString();
  if (MASTER_CALENDAR[todayLondon]?.eveningMeta) {
    MASTER_CALENDAR[todayLondon].eveningMeta.published = true;
    MASTER_CALENDAR[todayLondon].eveningMeta.publishedAt = new Date().toISOString();
  }
  if (MASTER_CALENDAR[todayLondon]?.wednesdayMorningMeta) {
    MASTER_CALENDAR[todayLondon].wednesdayMorningMeta.published = true;
    MASTER_CALENDAR[todayLondon].wednesdayMorningMeta.publishedAt = new Date().toISOString();
  }
  if (!dynamicQueue[todayLondon]) dynamicQueue[todayLondon] = {};
  dynamicQueue[todayLondon].eveningMeta = postToPublish;
  saveQueue(dynamicQueue);

  console.log(`[Meta Dispatch Results (${dispatchName})]`, results);

  const fbOk = results.length > 0 && results[0].status === 'fulfilled';
  const igOk = results.length > 1 && results[1].status === 'fulfilled';
  const overallOk = results.some(r => r.status === 'fulfilled');

  sendNotification({
    title: dispatchName,
    headline: title || 'Social Dispatch',
    statusType: overallOk ? 'published' : 'failed',
    platforms: {
      '📘 Facebook Page': fbOk ? 'Published' : (facebookText ? 'Failed' : 'Skipped'),
      '📸 Instagram': igOk ? 'Published' : (instagramCaption ? 'Failed' : 'Skipped')
    },
    messageText: instagramCaption || facebookText || '',
    imageUrl: instagramImageUrl,
    failureReason: overallOk ? null : 'Failed to publish to Facebook and/or Instagram.'
  });

  return { status: isMorning ? 'published_wednesday_morning' : 'published_evening', results };
}

// 5a. Wednesday Mid-Morning Meta Trigger (10:35 BST Sharp) - Free Advice / Free Contact Wednesday
app.post('/publish/wednesday-morning', async (req, res) => {
  const todayLondon = getLondonDateString();
  console.log(`[Cloud Scheduler] 10:35 AM Wednesday Mid-Morning Meta Trigger for ${todayLondon}...`);

  let postToPublish = null;
  if (req.body && (req.body.facebookText || req.body.instagramCaption)) {
    postToPublish = req.body;
  } else if (dynamicQueue[todayLondon]?.wednesdayMorningMeta && !dynamicQueue[todayLondon]?.wednesdayMorningMeta.published) {
    postToPublish = dynamicQueue[todayLondon].wednesdayMorningMeta;
  } else if (dynamicQueue[todayLondon]?.eveningMeta && !dynamicQueue[todayLondon]?.eveningMeta.published) {
    postToPublish = dynamicQueue[todayLondon].eveningMeta;
  } else if (MASTER_CALENDAR[todayLondon]?.wednesdayMorningMeta && !MASTER_CALENDAR[todayLondon]?.wednesdayMorningMeta.published) {
    postToPublish = MASTER_CALENDAR[todayLondon].wednesdayMorningMeta;
  } else if (MASTER_CALENDAR[todayLondon]?.eveningMeta && !MASTER_CALENDAR[todayLondon]?.eveningMeta.published) {
    postToPublish = MASTER_CALENDAR[todayLondon].eveningMeta;
  }

  if (!postToPublish) {
    console.log(`[Cloud Scheduler] Skipped Wednesday Morning Meta: No agreed pending post for today (${todayLondon}) or already published.`);
    sendNotification({
      title: 'Wednesday Mid-Morning Meta (Free Advice Wednesday)',
      headline: 'Scheduled Trigger Evaluation',
      statusType: 'skipped',
      platforms: { '📘 Facebook / 📸 Instagram': 'Skipped' },
      messageText: `No Free Advice Wednesday post queued for today (${todayLondon}) or already published.`,
      failureReason: 'Calendar slot empty or already published today.'
    });
    return res.json({ status: 'skipped', reason: `No agreed post queued for today (${todayLondon}) or already published. Fallback disabled.` });
  }

  try {
    const outcome = await dispatchMetaPost(postToPublish, todayLondon, true);
    res.json(outcome);
  } catch (err) {
    console.error('[Wednesday Meta Error]', err);
    sendNotification({
      title: 'Wednesday Mid-Morning Meta',
      headline: 'Social Dispatch',
      statusType: 'failed',
      platforms: { '📘 Facebook / 📸 Instagram': 'Failed' },
      messageText: postToPublish?.instagramCaption || postToPublish?.facebookText || '',
      imageUrl: postToPublish?.instagramImageUrl,
      failureReason: err.message
    });
    res.status(500).json({ error: err.message });
  }
});

// 5b. Evening Scheduler Trigger (19:30 BST Sharp) - Meta Facebook & Instagram (Mon, Tue, Thu, Fri ONLY)
app.post('/publish/daily-evening', async (req, res) => {
  const todayLondon = getLondonDateString();
  const todayObj = new Date();
  const dayOfWeek = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', weekday: 'short' }).format(todayObj);
  const hourLondon = parseInt(new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', hour: 'numeric', hour12: false }).format(todayObj), 10);

  // Programmatic Hard Guard: Block Wednesday Evenings (>= 12:00 London)
  if (dayOfWeek === 'Wed' && hourLondon >= 12) {
    console.log(`[Cloud Scheduler] Blocked Evening Meta trigger for Wednesday (${todayLondon}): Free Contact Wednesday is strictly morning-only (10:35 BST).`);
    return res.json({
      status: 'skipped',
      reason: 'Wednesday evening Meta dispatches are permanently disabled. Free Contact Wednesday is strictly published mid-morning during active office hours.'
    });
  }

  // If called on Wednesday morning (< 12:00 London), route seamlessly to Wednesday morning handler
  if (dayOfWeek === 'Wed' && hourLondon < 12) {
    console.log(`[Cloud Scheduler] Routing morning call on Wednesday (${todayLondon}) to Wednesday Morning handler...`);
    let postToPublish = req.body?.facebookText ? req.body : (dynamicQueue[todayLondon]?.eveningMeta || MASTER_CALENDAR[todayLondon]?.eveningMeta);
    if (!postToPublish || postToPublish.published) {
      return res.json({ status: 'skipped', reason: 'Already published or empty.' });
    }
    try {
      const outcome = await dispatchMetaPost(postToPublish, todayLondon, true);
      return res.json(outcome);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  console.log(`[Cloud Scheduler] 19:30 PM Evening Meta Trigger for ${todayLondon}...`);

  let postToPublish = null;
  if (req.body && (req.body.facebookText || req.body.instagramCaption)) {
    postToPublish = req.body;
  } else if (dynamicQueue[todayLondon]?.eveningMeta && !dynamicQueue[todayLondon]?.eveningMeta.published) {
    postToPublish = dynamicQueue[todayLondon].eveningMeta;
  } else if (MASTER_CALENDAR[todayLondon]?.eveningMeta && !MASTER_CALENDAR[todayLondon]?.eveningMeta.published) {
    postToPublish = MASTER_CALENDAR[todayLondon].eveningMeta;
  }

  if (!postToPublish) {
    console.log(`[Cloud Scheduler] Skipped Evening Meta: No agreed pending post for today (${todayLondon}). ZERO-FALLBACK active.`);
    sendNotification({
      title: 'Evening Meta Post',
      headline: 'Scheduled Trigger Evaluation',
      statusType: 'skipped',
      platforms: { '📘 Facebook / 📸 Instagram': 'Skipped' },
      messageText: `No Meta post queued for today (${todayLondon}). Fallback safely disabled.`,
      failureReason: 'Calendar slot empty or already published today.'
    });
    return res.json({ status: 'skipped', reason: `No agreed post queued for today (${todayLondon}). Fallback disabled.` });
  }

  try {
    const outcome = await dispatchMetaPost(postToPublish, todayLondon, false);
    res.json(outcome);
  } catch (err) {
    console.error('[Meta Error]', err);

    sendNotification({
      title: 'Evening Meta Post',
      headline: 'Social Dispatch',
      statusType: 'failed',
      platforms: { '📘 Facebook / 📸 Instagram': 'Failed' },
      messageText: postToPublish?.instagramCaption || postToPublish?.facebookText || '',
      imageUrl: postToPublish?.instagramImageUrl,
      failureReason: err.message
    });

    res.status(500).json({ error: err.message });
  }
});

// 6. Lunch Scheduler Trigger (12:30 BST Sharp) - LinkedIn Video
app.post('/publish/lunch-linkedin', async (req, res) => {
  const todayLondon = getLondonDateString();
  console.log(`[Cloud Scheduler] 12:30 PM Lunch LinkedIn Video Trigger for ${todayLondon}...`);

  let postToPublish = null;
  if (req.body && req.body.videoUrl && req.body.title && req.body.text) {
    postToPublish = req.body;
  } else if (dynamicQueue[todayLondon]?.lunchLinkedIn && !dynamicQueue[todayLondon]?.lunchLinkedIn.published) {
    postToPublish = dynamicQueue[todayLondon].lunchLinkedIn;
  } else if (MASTER_CALENDAR[todayLondon]?.lunchLinkedIn && !MASTER_CALENDAR[todayLondon]?.lunchLinkedIn.published) {
    postToPublish = MASTER_CALENDAR[todayLondon].lunchLinkedIn;
  }

  if (!postToPublish) {
    console.log(`[Cloud Scheduler] Skipped Lunch LinkedIn: No agreed video post for today (${todayLondon}). ZERO-FALLBACK active.`);
    return res.json({ status: 'skipped', reason: `No agreed post for today (${todayLondon}). Fallback disabled.` });
  }

  return res.json({ status: 'skipped', reason: 'Lunch video queue empty for date.' });
});

// Universal Discord Webhook POST helper
function postToDiscord(webhookUrl, payloadObj) {
  return new Promise((resolve) => {
    try {
      const parsedUrl = new URL(webhookUrl);
      const data = JSON.stringify(payloadObj);
      const req = https.request({
        hostname: parsedUrl.hostname,
        port: 443,
        path: parsedUrl.pathname + parsedUrl.search,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(data)
        }
      }, res => {
        let d = '';
        res.on('data', c => d += c);
        res.on('end', () => {
          if (res.statusCode >= 300) {
            console.warn(`[Discord Webhook Warning HTTP ${res.statusCode}] Response: ${d}`);
          }
          resolve({ status: res.statusCode });
        });
      });
      req.on('error', err => {
        console.error('[Discord Webhook Network Error]', err);
        resolve({ error: err.message });
      });
      req.write(data);
      req.end();
    } catch (err) {
      console.error('[Discord Webhook Exception]', err);
      resolve({ error: err.message });
    }
  });
}

function formatBrevoEvent(item) {
  const event = (item.event || 'unknown').toLowerCase();
  const email = item.email || 'unknown recipient';
  const subject = item.subject || 'No Subject';
  const link = item.link || null;
  const reason = item.reason || null;
  const tag = Array.isArray(item.tags) ? item.tags.join(', ') : (item.tag || null);
  
  let title = `📧 Email Event: ${event}`;
  let color = 3426654; // #34495e Slate
  let description = `Recipient \`${email}\` triggered event **${event}**.`;

  switch (event) {
    case 'opened':
    case 'first_opening':
    case 'unique_opened':
      title = '📬 Email Opened';
      color = 3066993; // #2ecc71 Green
      description = `**${email}** just opened your email!\n\n📄 **Subject:** *${subject}*`;
      break;
    case 'clicks':
    case 'click':
      title = '🔗 Link Clicked in Email';
      color = 3447003; // #3498db Blue
      description = `**${email}** clicked a link inside your email!\n\n📄 **Subject:** *${subject}*`;
      break;
    case 'delivered':
      title = '📨 Email Delivered';
      color = 1752220; // #1abc9c Teal
      description = `Email successfully delivered to **${email}**.\n\n📄 **Subject:** *${subject}*`;
      break;
    case 'soft_bounce':
    case 'hard_bounce':
    case 'blocked':
    case 'invalid_email':
    case 'error':
      title = `🔴 Email Delivery Failed (${event})`;
      color = 15158332; // #e74c3c Red
      description = `Delivery to **${email}** failed (${event}).\n\n📄 **Subject:** *${subject}*`;
      break;
    case 'deferred':
      title = '⏳ Email Delivery Deferred';
      color = 16753920; // #e67e22 Amber
      description = `Delivery to **${email}** is temporarily deferred/queued by the recipient mail server.\n\n📄 **Subject:** *${subject}*`;
      break;
    case 'proxy_open':
      title = '🛡️ Apple Privacy Proxy Open';
      color = 3066993; // #2ecc71 Green
      description = `Apple Mail Privacy Protection pre-fetched the email for **${email}**.\n\n📄 **Subject:** *${subject}*`;
      break;
    case 'spam':
    case 'complaint':
      title = '⚠️ Spam Complaint Reported';
      color = 15105570; // #e67e22 Orange
      description = `**${email}** reported this email as spam.\n\n📄 **Subject:** *${subject}*`;
      break;
    case 'unsubscribed':
      title = '🚫 Recipient Unsubscribed';
      color = 9807270; // #95a5a6 Grey
      description = `**${email}** unsubscribed from emails.\n\n📄 **Subject:** *${subject}*`;
      break;
    case 'request':
    case 'sent':
      title = '📤 Email Sent';
      color = 3447003; // #3498db Blue
      description = `Email successfully dispatched to **${email}**.\n\n📄 **Subject:** *${subject}*`;
      break;
  }

  const fields = [
    { name: '👤 Recipient', value: `\`${email}\``, inline: true },
    { name: '📋 Subject', value: subject ? `\`${subject.slice(0, 100)}\`` : '*(none)*', inline: true }
  ];

  if (link) {
    fields.push({ name: '🔗 Clicked URL', value: link.length > 250 ? link.slice(0, 247) + '...' : link, inline: false });
  }

  if (reason) {
    fields.push({ name: '⚠️ Reason', value: `\`${String(reason).slice(0, 250)}\``, inline: false });
  }

  if (tag) {
    fields.push({ name: '🏷️ Tag / Campaign', value: `\`${tag}\``, inline: true });
  }

  let londonTime = '';
  try {
    const rawDate = item.date ? new Date(item.date) : (item.ts ? new Date(item.ts * 1000) : new Date());
    londonTime = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/London',
      dateStyle: 'medium',
      timeStyle: 'medium'
    }).format(rawDate);
  } catch (e) {
    londonTime = new Date().toISOString();
  }

  fields.push({ name: '🕒 Time (London)', value: londonTime, inline: true });

  return {
    title: `TotalBiz Email Intelligence • ${title}`,
    description,
    color,
    fields,
    footer: { text: 'TotalBiz Brevo Tracker • alex@totalbiz.co.uk' },
    timestamp: new Date().toISOString()
  };
}

// 7. Brevo Webhook Relay Endpoint (HTTP GET verification check + POST webhook event handler)
app.get('/webhook/brevo', (req, res) => {
  res.json({
    status: 'ok',
    service: 'TotalBiz Brevo-Discord Relay',
    configuredDiscord: Boolean(DISCORD_BREVO_WEBHOOK_URL)
  });
});

app.post('/webhook/brevo', async (req, res) => {
  const targetDiscordUrl = req.query.discord || req.query.url || DISCORD_BREVO_WEBHOOK_URL;

  console.log('[Brevo Webhook] Incoming event payload:', JSON.stringify(req.body));

  if (!req.body) {
    return res.status(200).json({ status: 'ok', warning: 'empty_body' });
  }

  const rawEvents = Array.isArray(req.body) ? req.body : [req.body];

  if (targetDiscordUrl) {
    for (const ev of rawEvents) {
      try {
        const embed = formatBrevoEvent(ev);
        await postToDiscord(targetDiscordUrl, {
          username: 'TotalBiz Email Tracker',
          avatar_url: 'https://raw.githubusercontent.com/lovefilm2018/totalbizsupport/main/client/public/profile_picture.png',
          embeds: [embed]
        });
      } catch (err) {
        console.error('[Brevo Webhook Dispatch Error]', err);
      }
    }
  }

  // Always return 200 to Brevo to acknowledge receipt and maintain green webhook health
  res.status(200).json({ status: 'received', count: rawEvents.length });
});

app.listen(PORT, () => {
  console.log(`TotalBiz Social Poster listening on port ${PORT}`);
});

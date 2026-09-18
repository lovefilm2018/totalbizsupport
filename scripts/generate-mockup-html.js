import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

// Profile images
const apAvatarBase64 = fs.existsSync('marketing/03-content/brand-assets/ap.jpg') 
  ? `data:image/jpeg;base64,${fs.readFileSync('marketing/03-content/brand-assets/ap.jpg').toString('base64')}`
  : (fs.existsSync('client/public/profile_picture.png') ? `data:image/png;base64,${fs.readFileSync('client/public/profile_picture.png').toString('base64')}` : '');

const totalbizLogoBase64 = fs.existsSync('marketing/03-content/brand-assets/totalbiz_profile.png')
  ? `data:image/png;base64,${fs.readFileSync('marketing/03-content/brand-assets/totalbiz_profile.png').toString('base64')}`
  : (fs.existsSync('client/public/profile_picture.png') ? `data:image/png;base64,${fs.readFileSync('client/public/profile_picture.png').toString('base64')}` : '');

// Schedule data for travel period
const days = [
  {
    dateStr: '2026-09-21',
    dayLabel: 'Monday 21 Sept',
    theme: 'WhatsApp as a Database Trap (Admin & Workflow Chaos)',
    imageFile: 'whatsapp_chaos_visual.jpg',
    linkedinTitle: 'The "WhatsApp as a Database" Trap: Why Group Chats Quietly Murder Business Velocity',
    linkedinText: `Running your business from WhatsApp is like storing your accounting records in an unlabelled shoe box.

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

#SmallBusinessUK #Operations #Productivity #BusinessSystems #WorkflowAutomation #TotalBizSupport #SussexBusiness #UKBusiness`,
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
  },
  {
    dateStr: '2026-09-22',
    dayLabel: 'Tuesday 22 Sept',
    theme: 'The "Free Website" Hosting Trap (£0 Cloud Hosting Reality)',
    imageFile: 'free_website_hosting_trap.jpg',
    linkedinTitle: 'The "Free Website" Hosting Trap: Why "Free" Web Design Usually Costs £500+ a Year',
    linkedinText: `I see ads targeted at small businesses every single day:
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

#WebDevelopment #SmallBusinessUK #WebDesign #Transparency #TechStrategy #CostSaving #TotalBizSupport #SussexBusiness #UKBusiness`,
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
  },
  {
    dateStr: '2026-09-23',
    dayLabel: 'Wednesday 23 Sept',
    theme: 'Free Advice Wednesday: Password Vaults & Shared Logins (Office Hours)',
    imageFile: 'free_contact_wednesday_official.jpg',
    linkedinTitle: 'Free Advice Wednesday: The "Forgotten Passwords" Vulnerability',
    linkedinText: `How does your team share passwords right now?

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

#FreeAdviceWednesday #SmallBusinessUK #CyberSecurity #DataProtection #TechStrategy #BusinessOperations #TotalBizSupport #UKBusiness`,
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
  {
    dateStr: '2026-09-24',
    dayLabel: 'Thursday 24 Sept',
    theme: 'The "Agile" Dogma Debate (Pragmatic IT & Delivery Over Buzzwords)',
    imageFile: 'hardware_wifi_visual.jpg',
    linkedinTitle: 'The "Agile" Dogma Debate: Why Project Buzzwords Don\'t Guarantee Delivery',
    linkedinText: `In recent years, everyone in change management and IT gets wildly excited about delivering everything using an "Agile" framework.

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

#ProjectManagement #ChangeManagement #Agile #DeliveryExcellence #Operations #TechLeadership #TotalBizSupport #UKBusiness`,
    facebookText: `Are tech gremlins quietly stealing hours from your working week? 💻 📶

Sluggish laptops, patchy Wi-Fi that won't reach the back office, or printers that vanish every time the router reboots...

You don't have to put up with everyday tech annoyances, and you don't need an expensive monthly contract with an impersonal helpdesk.

At TotalBiz Support, we provide friendly, hands-on on-site technical support for small businesses, shops, and clinics across Sussex and Kent. We come to you, diagnose the root cause, fix it properly, and make sure it stays fixed.

👉 Need hands-on tech help? Book a visit at totalbiz.co.uk/services/ or WhatsApp us on +44 7799 538311!

📍 Based in Heathfield, East Sussex — serving East & West Sussex, Kent, and UK-wide remotely.

#SmallBusinessUK #SussexBusiness #KentBusiness #Heathfield #EastSussex #ITSupport #WiFiFix #TechSupport #LocalBusiness #TotalBizSupport`,
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
  },
  {
    dateStr: '2026-09-25',
    dayLabel: 'Friday 25 Sept',
    theme: 'The Friday "Disaster Drill" & Spilled Coffee Test (3-2-1 Cloud Backups)',
    imageFile: 'disaster_recovery_backup_visual.jpg',
    linkedinTitle: 'The Friday Afternoon "Disaster Drill": 3 Questions to Safeguard Your Business',
    linkedinText: `Before you close your laptop for the weekend, ask yourself these 3 questions:

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

#SmallBusinessUK #BusinessContinuity #DataSecurity #TechHygiene #FridayChecklist #Productivity #TotalBizSupport #UKBusiness`,
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
    instagramCaption: `Friday afternoon peace of mind: knowing your business data is safe, secure, and backed up. ☕ 🔒

Automated cloud backups mean you never have to worry about a spilled cup of coffee or a crashing hard drive destroying your client records.

If your current setup gives you Sunday-night anxiety, let's fix it next week.

👉 Tap link in bio (totalbiz.co.uk) or send us a DM to chat!

Have a wonderful weekend!

📍 Sussex & Kent | UK-wide remote

#FridayVibes #SmallBusinessUK #BusinessContinuity #SussexBusiness #KentBusiness #Heathfield #TechSupport #TotalBizSupport`
  },
  {
    dateStr: '2026-09-28',
    dayLabel: 'Monday 28 Sept',
    theme: 'The 60-Page Documentation Trap (Living Checklists vs Paperwork Bloat)',
    imageFile: 'living_documentation_visual.jpg',
    linkedinTitle: 'The 60-Page Documentation Trap: Why Nobody Reads Your Company Manuals',
    linkedinText: `In large corporate organisations, there is an unspoken rule:
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

#Operations #SmallBusinessUK #StandardOperatingProcedures #ProcessExcellence #Productivity #BusinessGrowth #TotalBizSupport #UKBusiness`,
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
  },
  {
    dateStr: '2026-09-29',
    dayLabel: 'Tuesday 29 Sept',
    theme: 'The "7-Day Absence" Litmus Test (Business Freedom on Return Day)',
    imageFile: 'business_freedom_visual.jpg',
    linkedinTitle: 'The "7-Day Absence" Litmus Test: Can Your Business Function Without You In The Engine Room?',
    linkedinText: `Here is the ultimate litmus test for small business operational health:

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

#SmallBusinessUK #OperationalFreedom #BusinessSystems #WorkLifeBalance #Leadership #FractionalCOO #TotalBizSupport #UKBusiness`,
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
    instagramCaption: `Build a business that gives you your life back. ✨ 📱

When your technology, automated booking, and client invoicing run seamlessly in the background, stepping away doesn't cause chaos.

We help small business owners across Sussex and Kent set up clean, practical systems that save hours every week.

👉 Tap link in bio (totalbiz.co.uk) or send us a DM to get started!

📍 Sussex & Kent | UK-wide remote

#SmallBusinessUK #WorkLifeBalance #BusinessAutomation #SussexBusiness #KentBusiness #Heathfield #EastSussex #TotalBizSupport`
  }
];

function formatTextForHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');
}

// Convert public image files to Base64 data URIs so the HTML/PDF is 100% self-contained
function getImageDataUri(filename) {
  const filePath = path.resolve('client/public', filename);
  if (fs.existsSync(filePath)) {
    const b64 = fs.readFileSync(filePath).toString('base64');
    return `data:image/jpeg;base64,${b64}`;
  }
  return `https://raw.githubusercontent.com/lovefilm2018/totalbizsupport/main/client/public/${filename}`;
}

const renderedDaysHtml = days.map((d, index) => {
  const imgUri = getImageDataUri(d.imageFile);
  const isWednesday = d.dateStr === '2026-09-23';
  const metaBadgeText = isWednesday ? '10:35 BST Sharp • Office Hours' : '19:30 BST Sharp • Evening Meta';

  return `
  <section class="day-section" id="day-${d.dateStr}">
    <div class="day-header">
      <div class="day-badge">${d.dayLabel} • ${d.dateStr}</div>
      <h2 class="day-title">${d.theme}</h2>
    </div>

    <div class="mockup-grid">
      <!-- 1. LINKEDIN MOCKUP -->
      <div class="mockup-card linkedin-card">
        <div class="platform-bar linkedin-header">
          <div class="platform-pill">💼 LinkedIn Thought Leadership (07:45 BST Sharp)</div>
          <span class="platform-meta">Dual: Alex Poxon + TotalBiz Support</span>
        </div>

        <div class="linkedin-user-row">
          <img src="${apAvatarBase64}" class="user-avatar" alt="Alex Poxon">
          <div class="user-info">
            <h4>Alex Poxon <span>• 1st</span></h4>
            <p class="user-headline">Senior IT Director & Founder @ TotalBiz Support • 20+ Yrs Corporate Change & Systems Delivery</p>
            <p class="post-time">07:45 • <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0a8 8 0 100 16A8 8 0 008 0zm0 14.5A6.5 6.5 0 1114.5 8 6.5 6.5 0 018 14.5zM7.25 4v4.5l3.5 2.1.75-1.2-2.75-1.65V4h-1.5z"/></svg></p>
          </div>
          <button class="linkedin-follow-btn">+ Follow</button>
        </div>

        <div class="post-content linkedin-content">
          <p>${formatTextForHtml(d.linkedinText)}</p>
        </div>

        <div class="linkedin-social-counts">
          <span>👍 💡 ❤️ 46</span>
          <span>14 comments • 3 reposts</span>
        </div>

        <div class="platform-actions">
          <button>👍 Like</button>
          <button>💬 Comment</button>
          <button>🔁 Repost</button>
          <button>📤 Send</button>
        </div>
      </div>

      <!-- 2. FACEBOOK PAGE MOCKUP -->
      <div class="mockup-card facebook-card">
        <div class="platform-bar facebook-header">
          <div class="platform-pill">📘 Facebook Page (${metaBadgeText})</div>
          <span class="platform-meta">Feed: TotalBiz Support (1207871262402389)</span>
        </div>

        <div class="fb-user-row">
          <img src="${totalbizLogoBase64}" class="user-avatar" alt="TotalBiz Support">
          <div class="user-info">
            <h4>TotalBiz Support <span class="verified-badge">✓</span></h4>
            <p class="post-time">${isWednesday ? '10:35' : '19:30'} • <span>Heathfield, East Sussex</span> • 🌐</p>
          </div>
          <div class="fb-more-dots">•••</div>
        </div>

        <div class="post-content fb-content">
          <p>${formatTextForHtml(d.facebookText)}</p>
        </div>

        <div class="fb-media-container">
          <img src="${imgUri}" class="feed-media-img" alt="Post Visual">
        </div>

        <div class="fb-social-counts">
          <span>👍 18</span>
          <span>4 comments • 2 shares</span>
        </div>

        <div class="platform-actions">
          <button>👍 Like</button>
          <button>💬 Comment</button>
          <button>↗️ Share</button>
        </div>
      </div>

      <!-- 3. INSTAGRAM BUSINESS MOCKUP -->
      <div class="mockup-card instagram-card">
        <div class="platform-bar instagram-header">
          <div class="platform-pill">📸 Instagram Business (@totalbiz_support)</div>
          <span class="platform-meta">1080×1350 High-Res Feed Container</span>
        </div>

        <div class="ig-top-bar">
          <div class="ig-user-info">
            <div class="ig-avatar-ring">
              <img src="${totalbizLogoBase64}" class="ig-avatar" alt="TotalBiz Support">
            </div>
            <div>
              <h5>totalbiz_support</h5>
              <p class="ig-location">Heathfield, East Sussex</p>
            </div>
          </div>
          <div class="ig-dots">•••</div>
        </div>

        <div class="ig-media-box">
          <img src="${imgUri}" class="ig-media-img" alt="Instagram Visual">
        </div>

        <div class="ig-action-bar">
          <div class="ig-icons-left">
            <span class="ig-icon">❤️</span>
            <span class="ig-icon">💬</span>
            <span class="ig-icon">✈️</span>
          </div>
          <span class="ig-icon">🔖</span>
        </div>

        <div class="ig-likes-row">
          Liked by <strong>local_sussex_trades</strong> and <strong>31 others</strong>
        </div>

        <div class="post-content ig-content">
          <p><strong>totalbiz_support</strong> ${formatTextForHtml(d.instagramCaption)}</p>
        </div>

        <div class="ig-comment-cue">View all 3 comments</div>
        <div class="ig-timestamp">2 HOURS AGO</div>
      </div>
    </div>
  </section>
  `;
}).join('\n');

const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TotalBiz Support — 8-Day Marketing Campaign Live Mockup Preview</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@600;700;800;900&display=swap" rel="stylesheet">
  <style>
    :root {
      --navy-dark: #030d1a;
      --navy-card: #081d33;
      --cyan-glow: #00e5ff;
      --blue-accent: #0284c7;
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --border-line: rgba(255, 255, 255, 0.1);
    }
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', -apple-system, sans-serif; }
    body {
      background-color: #040e1a;
      color: var(--text-main);
      padding-bottom: 80px;
    }
    
    /* Top Header */
    .top-header {
      background: linear-gradient(180deg, #020914 0%, #06182c 100%);
      border-bottom: 1px solid rgba(0, 229, 255, 0.25);
      padding: 30px 40px;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: 0 10px 30px rgba(0,0,0,0.6);
    }
    .header-content {
      max-width: 1700px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 20px;
    }
    .brand-box {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .brand-logo {
      height: 48px;
      width: auto;
    }
    .brand-title h1 {
      font-family: 'Poppins', sans-serif;
      font-size: 26px;
      font-weight: 800;
      color: #fff;
    }
    .brand-title h1 span {
      color: var(--cyan-glow);
    }
    .brand-title p {
      font-size: 14px;
      color: var(--text-muted);
    }
    .status-pill {
      background: rgba(16, 185, 129, 0.15);
      border: 1px solid #10b981;
      color: #34d399;
      padding: 8px 18px;
      border-radius: 999px;
      font-size: 14px;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    
    /* Sticky Day Selector Bar */
    .day-nav {
      background: #061424;
      border-bottom: 1px solid var(--border-line);
      padding: 12px 40px;
      position: sticky;
      top: 108px;
      z-index: 90;
      overflow-x: auto;
    }
    .nav-tabs {
      max-width: 1700px;
      margin: 0 auto;
      display: flex;
      gap: 10px;
      list-style: none;
    }
    .nav-tabs a {
      text-decoration: none;
      color: var(--text-muted);
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.08);
      padding: 8px 16px;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 600;
      white-space: nowrap;
      transition: all 0.2s ease;
    }
    .nav-tabs a:hover {
      background: rgba(0, 229, 255, 0.15);
      color: var(--cyan-glow);
      border-color: var(--cyan-glow);
    }
    
    /* Main Layout */
    .main-container {
      max-width: 1700px;
      margin: 40px auto 0;
      padding: 0 30px;
    }
    
    .day-section {
      margin-bottom: 80px;
      padding-top: 20px;
      border-top: 1px dashed rgba(255, 255, 255, 0.12);
    }
    .day-section:first-child {
      border-top: none;
    }
    .day-header {
      margin-bottom: 30px;
    }
    .day-badge {
      display: inline-block;
      background: linear-gradient(90deg, #0284c7 0%, #00e5ff 100%);
      color: #030d1a;
      font-weight: 800;
      font-size: 13px;
      padding: 4px 14px;
      border-radius: 6px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
    }
    .day-title {
      font-family: 'Poppins', sans-serif;
      font-size: 30px;
      font-weight: 800;
      color: #fff;
    }

    /* 3-Column Mockup Grid */
    .mockup-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(460px, 1fr));
      gap: 30px;
      align-items: start;
    }

    .mockup-card {
      background: #ffffff;
      border-radius: 16px;
      color: #191919;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.15);
    }

    .platform-bar {
      padding: 10px 16px;
      font-size: 12px;
      font-weight: 700;
      display: flex;
      justify-content: space-between;
      align-items: center;
      letter-spacing: 0.3px;
    }
    .linkedin-header {
      background: #0077b5;
      color: #ffffff;
    }
    .facebook-header {
      background: #1877f2;
      color: #ffffff;
    }
    .instagram-header {
      background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
      color: #ffffff;
    }
    .platform-pill {
      font-weight: 700;
    }
    .platform-meta {
      opacity: 0.85;
      font-size: 11px;
    }

    /* User Row */
    .linkedin-user-row, .fb-user-row {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 16px 10px;
      position: relative;
    }
    .user-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      object-fit: cover;
      flex-shrink: 0;
      border: 1px solid #e2e8f0;
    }
    .user-info h4 {
      font-size: 15px;
      font-weight: 700;
      color: #000;
      line-height: 1.2;
    }
    .user-info h4 span {
      font-size: 12px;
      font-weight: 500;
      color: #666;
    }
    .user-headline {
      font-size: 12px;
      color: #666;
      line-height: 1.3;
      margin-top: 2px;
    }
    .post-time {
      font-size: 11px;
      color: #888;
      margin-top: 2px;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .verified-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: #1877f2;
      color: white;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      font-size: 9px;
      font-weight: bold;
    }
    .linkedin-follow-btn {
      margin-left: auto;
      background: transparent;
      border: none;
      color: #0a66c2;
      font-weight: 700;
      font-size: 14px;
      cursor: pointer;
    }
    .fb-more-dots, .ig-dots {
      margin-left: auto;
      color: #666;
      font-weight: bold;
      letter-spacing: 2px;
      cursor: pointer;
    }

    /* Post Body Content */
    .post-content {
      padding: 6px 16px 14px;
      font-size: 14px;
      line-height: 1.5;
      color: #1a1a1a;
      word-break: break-word;
    }
    .post-content p {
      margin-bottom: 12px;
    }
    .post-content p:last-child {
      margin-bottom: 0;
    }

    /* Media Images */
    .fb-media-container, .ig-media-box {
      width: 100%;
      background: #000;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }
    .feed-media-img {
      width: 100%;
      height: auto;
      max-height: 600px;
      object-fit: cover;
      display: block;
    }

    /* Social Stats & Actions */
    .linkedin-social-counts, .fb-social-counts {
      display: flex;
      justify-content: space-between;
      padding: 10px 16px;
      border-top: 1px solid #e5e7eb;
      font-size: 12px;
      color: #6b7280;
    }
    .platform-actions {
      display: flex;
      border-top: 1px solid #e5e7eb;
      padding: 6px 8px;
    }
    .platform-actions button {
      flex: 1;
      background: none;
      border: none;
      padding: 8px 4px;
      font-size: 13px;
      font-weight: 600;
      color: #4b5563;
      cursor: pointer;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }
    .platform-actions button:hover {
      background: #f3f4f6;
    }

    /* Instagram Specific Styling */
    .instagram-card {
      background: #000000;
      color: #ffffff;
      border-color: #262626;
    }
    .ig-top-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 14px;
      background: #000000;
    }
    .ig-user-info {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .ig-avatar-ring {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
      padding: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .ig-avatar {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 2px solid #000;
      object-fit: cover;
    }
    .ig-user-info h5 {
      font-size: 13px;
      font-weight: 700;
      color: #fff;
    }
    .ig-location {
      font-size: 11px;
      color: #a8a8a8;
    }
    .ig-media-img {
      width: 100%;
      height: auto;
      max-height: 600px;
      object-fit: cover;
      display: block;
    }
    .ig-action-bar {
      display: flex;
      justify-content: space-between;
      padding: 10px 14px 6px;
      font-size: 20px;
    }
    .ig-icons-left {
      display: flex;
      gap: 16px;
    }
    .ig-icon {
      cursor: pointer;
    }
    .ig-likes-row {
      padding: 0 14px 8px;
      font-size: 13px;
      color: #fff;
    }
    .ig-content {
      color: #f5f5f5;
      font-size: 13px;
      line-height: 1.45;
      padding: 0 14px 8px;
    }
    .ig-content strong {
      color: #fff;
      margin-right: 6px;
    }
    .ig-comment-cue {
      padding: 0 14px 4px;
      font-size: 12px;
      color: #737373;
      cursor: pointer;
    }
    .ig-timestamp {
      padding: 0 14px 14px;
      font-size: 10px;
      color: #737373;
      letter-spacing: 0.2px;
    }

    @media print {
      body { background: #fff; color: #000; }
      .top-header, .day-nav { display: none; }
      .day-section { page-break-after: always; margin-bottom: 0; padding: 20px 0; border: none; }
      .mockup-grid { grid-template-columns: repeat(3, 1fr); gap: 15px; }
      .mockup-card { box-shadow: none; border: 1px solid #ccc; }
    }
  </style>
</head>
<body>

  <!-- Top Sticky Header -->
  <header class="top-header">
    <div class="header-content">
      <div class="brand-box">
        <img src="${totalbizLogoBase64}" class="brand-logo" alt="TotalBiz Support">
        <div class="brand-title">
          <h1>TotalBiz Support — <span>Travel Campaign Mockups</span></h1>
          <p>Full-Fidelity Platform Simulations for Alex's Absence (21st – 29th September 2026)</p>
        </div>
      </div>
      <div class="status-pill">
        ● Live on Google Cloud Run & Ready for Auto-Pilot
      </div>
    </div>
  </header>

  <!-- Sticky Day Navigation Bar -->
  <nav class="day-nav">
    <ul class="nav-tabs">
      ${days.map(d => `<li><a href="#day-${d.dateStr}">${d.dayLabel}</a></li>`).join('')}
    </ul>
  </nav>

  <!-- Main Mockup Feeds -->
  <main class="main-container">
    ${renderedDaysHtml}
  </main>

</body>
</html>
`;

const outHtmlPath = path.resolve('marketing/03-content/travel-posts-mockup.html');
const outPublicHtmlPath = path.resolve('client/public/travel-posts-mockup.html');
fs.writeFileSync(outHtmlPath, fullHtml);
fs.writeFileSync(outPublicHtmlPath, fullHtml);
console.log(`✅ Generated Mockup HTML: ${outHtmlPath}`);
console.log(`✅ Mirrored to Public: ${outPublicHtmlPath}`);

// Also render clean PDF via Edge Headless
const outPdfPath = path.resolve('marketing/03-content/travel-posts-mockup.pdf');
console.log('Rendering full-fidelity PDF via Edge headless...');
try {
  const pdfCmd = `"${edgePath}" --headless --disable-gpu --print-to-pdf="${outPdfPath}" --print-to-pdf-no-header "file://${outHtmlPath}"`;
  execSync(pdfCmd, { stdio: 'inherit' });
  console.log(`✅ Generated PDF Mockup: ${outPdfPath}`);
} catch (err) {
  console.error('PDF generation warning:', err.message);
}

console.log('\n🎉 Complete mockups ready for viewing!');

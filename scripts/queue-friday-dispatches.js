import https from 'https';

const CLOUD_RUN_URL = 'https://totalbiz-social-poster-2wm7y2f4ia-nw.a.run.app';

const morningLinkedInPost = {
  date: '2026-08-28',
  title: 'Why 90% of small business growth pain is broken workflows',
  text: `Why 90% of small business "growth pain" isn't a lack of hustle — it's broken operational workflows.

When managing corporate IT infrastructure across HSBC, eBay, Schroders, and Gumtree, I saw firsthand that complexity kills velocity.

Local sole traders and growing businesses face the exact same problem, just without a 20-person systems team to untangle it:

❌ 5 different software tools that don't speak to each other
❌ Manual copy-pasting of customer invoices between spreadsheets and accounting software
❌ Critical business knowledge trapped in one person's WhatsApp chats
❌ Expensive monthly subscriptions running on auto-pilot for ex-contractors

You don't need a £10,000 agency consultation or more apps to fix this.

You need pragmatic systems thinking:
1. Audit your tech stack to remove duplicate subscriptions.
2. Automate handoffs between booking, invoicing, and customer follow-up.
3. Consolidate your core tools so you have 1 single source of truth.

Enterprise discipline doesn't have to mean enterprise bloat or enterprise prices.

What's the one manual task in your business you wish you could automate tomorrow?

#SmallBusinessUK #Operations #TechStrategy #BusinessGrowth #UKBusiness #Productivity #TotalBizSupport`
};

const eveningMetaPost = {
  date: '2026-08-28',
  facebookText: `Is your business quietly bleeding £200 to £500 every single month on "Zombie" software? 🧟‍♂️ 💳

Over the last 6 months auditing tech setups for sole traders, local trades, and small businesses across Sussex & Kent, here's what we routinely uncover on day one:

1️⃣ The "We used to use that" Direct Debit: Project management tools, CRM trials, and graphic apps that were tested 8 months ago, never cancelled, and still billing £30/mo.
2️⃣ Phantom User Licences: Paying £15–£25/month for Google Workspace, Microsoft 365, or Adobe seats assigned to staff or contractors who left last year.
3️⃣ Software Overlap Sprawl: Paying for 3 separate tools (e.g. DocuSign + Adobe Acrobat + HelloSign, or multiple booking systems) when one unified tool handles all of it.

💡 The Fix: An Annual Tech Stack & SaaS Audit.
Most small businesses recover between £2,400 and £6,000 a year simply by tidying up subscriptions and streamlining their workflow.

Want us to run a hands-on audit of your tools, hardware, and recurring costs?

👉 Learn more or book a free discovery chat at totalbiz.co.uk/services/ or message us directly here!

📍 Based in Heathfield, East Sussex — supporting businesses across East & West Sussex, Kent, and UK-wide remotely.

#SmallBusinessUK #SussexBusiness #KentBusiness #Heathfield #EastSussex #BusinessConsulting #CostSavings #ITSupport #TotalBizSupport`,
  instagramImageUrl: 'https://totalbiz.co.uk/zombie_saas_audit_visual.jpg',
  instagramCaption: `The "Zombie Software" trap is costing small businesses £200–£500 every month without them even noticing. 🧟‍♂️ 📉

When did you last audit your company bank statement for recurring app subscriptions?

Here are the 3 biggest money drains we find when auditing local UK businesses:

🔍 1. Forgotten Auto-Renewals: Old software trials and project tools that were set up months ago and left running on auto-pilot.
⚡ 2. SaaS Sprawl & Tool Duplication: Paying for 4–5 single-purpose apps that could easily be replaced by 1 streamlined system.
👥 3. Ghost Licences: Still paying monthly seat fees for ex-staff, past contractors, or inactive team members.

💰 Average SME recovery: £2,400 to £6,000 / year in pure operational waste eliminated.

Stop paying for software you don't use.

👉 Tap the link in our bio (totalbiz.co.uk) to explore our Business Support services, or drop us a DM to chat about auditing your setup.

📍 Hands-on support across East Sussex, West Sussex & Kent | UK-wide remote strategy

#SmallBusinessUK #SussexBusiness #KentBusiness #Heathfield #EastSussex #TechConsulting #BusinessTips #CostOptimisation #WorkflowAutomation #TotalBizSupport`
};

function postJson(url, data) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);
    const parsedUrl = new URL(url);
    const req = https.request({
      hostname: parsedUrl.hostname,
      port: 443,
      path: parsedUrl.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, raw: body });
        }
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function queuePosts() {
  console.log('--- 1. Queuing Friday Morning LinkedIn Post ---');
  const liRes = await postJson(`${CLOUD_RUN_URL}/queue/set`, {
    channel: 'morningLinkedIn',
    post: morningLinkedInPost
  });
  console.log('LinkedIn Queue Result:', liRes);

  console.log('\n--- 2. Queuing Friday Evening Meta Posts (FB + Instagram) ---');
  const metaRes = await postJson(`${CLOUD_RUN_URL}/queue/set`, {
    channel: 'eveningMeta',
    post: eveningMetaPost
  });
  console.log('Meta Queue Result:', metaRes);

  console.log('\n--- 3. Verifying Final Cloud Run Queue State ---');
  https.get(`${CLOUD_RUN_URL}/queue`, res => {
    let d = '';
    res.on('data', c => d += c);
    res.on('end', () => console.log('Current Cloud Run Queue:', JSON.parse(d)));
  });
}

queuePosts();

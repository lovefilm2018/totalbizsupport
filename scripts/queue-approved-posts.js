import https from 'https';

const serviceUrl = 'https://totalbiz-social-poster-2wm7y2f4ia-nw.a.run.app';

function postJson(path, payload) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    const url = new URL(serviceUrl + path);
    const req = https.request({
      hostname: url.hostname,
      port: 443,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    }, res => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          resolve({ raw: body, status: res.statusCode });
        }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function queuePosts() {
  const fbText = `How much is your business paying each month for software nobody uses? 💳 📉

When we audit tech setups for local businesses across Sussex and Kent, we almost always find "Zombie Subscriptions":

❌ Project tools from a 2023 trial that never got cancelled.
❌ Multiple premium cloud storage tiers doing the same job.
❌ Email marketing seats for team members who left months ago.
❌ Duplicate booking or CRM software creating data silos.

For a team of 5–15 people, this quiet leak usually adds up to £150 – £500+ every single month.

You don’t need an expensive enterprise consulting firm to plug the leak. We sit down with you, audit your active licenses, cancel the waste, and streamline what remains.

💬 Drop us a message or WhatsApp us directly to book a straightforward Tech & Cost Audit.

🌐 totalbiz.co.uk
📍 On-site across East Sussex, West Sussex & Kent | UK-Wide Remote`;

  const igCaption = `Are you paying for software subscriptions your team hasn't touched since 2024? 🛑

The average small business leaks £150–£500/month on "Zombie Subscriptions" — duplicate tools, abandoned trials, and inactive user licenses.

Here’s our 3-step fix:
1️⃣ Consolidate overlapping apps (e.g. storage & comms)
2️⃣ Strip out dormant team seats
3️⃣ Automate routine workflows using tools you already own

Straightforward tech support. No jargon. No retainers you don’t need.

👉 Tap link in bio to visit totalbiz.co.uk or send us a DM.

📍 Hands-on local support across Sussex & Kent | UK-wide remote consultancy

#SmallBusinessUK #SussexBusiness #KentBusiness #Heathfield #EastSussex #BusinessConsultantUK #TechCostOptimization #FractionalIT #TotalBizSupport #OperationalEfficiency`;

  const igImageUrl = 'https://raw.githubusercontent.com/lovefilm2018/totalbizsupport/main/client/public/zombie_saas_audit_visual.jpg';

  const eveningPost = {
    channel: 'eveningMeta',
    post: {
      date: '2026-08-27',
      facebookText: fbText,
      instagramImageUrl: igImageUrl,
      instagramCaption: igCaption
    }
  };

  const linkedInText = `Most small business owners think they need more staff.

In reality, 90% of the time, they just need to fix their workflows.

Having spent 20+ years leading technology and operational programmes across global enterprise organisations (HSBC, eBay, Schroders, Gumtree), I saw this exact pattern at every scale:

When a team grows from 3 to 10 people:
1. Communication scatters across WhatsApp, text, and 4 different inboxes.
2. Critical client info lives in one person’s head instead of a central system.
3. Staff spend 2 hours a day manually copy-pasting data between disconnected spreadsheets.

The instinct is to hire another administrator to manage the chaos.

But adding headcount to a broken process doesn't scale your business — it just scales the chaos.

The fix isn’t complex or expensive:
- Centralise client intake into one structured funnel.
- Automate invoice reconciliation and booking confirmations.
- Give everyone a single dashboard so nothing falls through the cracks.

If your business feels like it’s running you instead of the other way around, let’s talk.

🔗 Explore what we do at totalbiz.co.uk or drop me a direct message here on LinkedIn.

#SmallBusinessOperations #OperationalExcellence #FractionalCOO #BusinessAutomation #ProcessImprovement #TotalBizSupport #SussexBusiness #UKBusiness`;

  const morningPost = {
    channel: 'morningLinkedIn',
    post: {
      date: '2026-08-28',
      text: linkedInText
    }
  };

  console.log('1. Setting Evening Meta Post for 2026-08-27...');
  const resMeta = await postJson('/queue/set', eveningPost);
  console.log('Meta Result:', resMeta);

  console.log('\n2. Setting Morning LinkedIn Post for 2026-08-28...');
  const resLi = await postJson('/queue/set', morningPost);
  console.log('LinkedIn Result:', resLi);

  console.log('\n3. Verifying Health & Queue Status...');
  const health = await postJson('/health', {});
  console.log('Health Output:', health);
}

queuePosts().catch(console.error);

import express from 'express';
import https from 'https';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;
const QUEUE_FILE = process.env.QUEUE_FILE || path.join('/tmp', 'totalbiz_queue.json');

// Configuration & Default Tokens
const LINKEDIN_PERSON_TOKEN = process.env.LINKEDIN_PERSON_TOKEN || process.env.LINKEDIN_TOKEN || 'AQU8lBLIfjFyADP-a-zGe8cRHC2wzU9y7zHRpJinLqMfVNjLzha4eSKxf26p4cV8aSncBsUwCPzKLqlE-JXg8swlmnMJlXiIGnZb-a0-K9n67s6TUxPPA_fWqwj17TyxX2dshWnb-fsafb5FBORdm20d7A9EQZqQ56Ksf0R_yXAK71GcTZg_b4t7z2poh8ZXIXHZamn3H7bU8ojR0V0t60Aowl6RJrTFkn6g3UGRXW_Yzou3E2dpLpERrw-CtImOb3q3QW-DDKy90f9hoew_3mFmgASqFUDqb6b93eHhAj3sHQAWQhyCq-jUfkyNPoRmqXl2LZMXo_r43VFPLSiQe9SGyBsIMA';
const LINKEDIN_PERSON_URN = process.env.LINKEDIN_PERSON_URN || 'urn:li:person:pACLfBlITP';

const LINKEDIN_ORG_TOKEN = process.env.LINKEDIN_ORG_TOKEN || 'AQVUnsRWybq0VT8KcIrxUboH26Hae5v_PKQ6-Y8-lI_VOcVVARgZtrNgccCs8MhdpwMF7vPH-qAOlGx8SWdOWjzeoWhEeuoSmowVbjMZc54MTrSrgFaU2CQM5NraUHBHgV4auRtjHh9pMs4fDiOELQplNmeQIJG3Swsap1_hzdG3sckXTHQ_hDKNrq6w6ZfCPEXWOVDTdAha3GmcwvkTAT1Ub2InV-6MucZ3PbDFj-4eXi0ToaMfP1VJyKZw77OQ7jvgUR-ShC5-of5LF6jL4szeh91p_H2MAW71h-TtO-y2pwA3bg-I7xDynl6VdJWbzPfZ4Ru3ANfxxLsm48CCyy2yvo-5Jw';
const LINKEDIN_ORG_URN = process.env.LINKEDIN_ORG_URN || 'urn:li:organization:130184035';

const FB_PAGE_ID = process.env.FB_PAGE_ID || '1207871262402389';
const FB_PAGE_TOKEN = process.env.FB_PAGE_TOKEN || 'EAAT9dJ4m67cBSfgKrcqCpcZBJkQ79U3Vz9ioNYlHTwZCoT1krwxkK9wrO8wolZAxq0gK6UAxIhr95im25fJoBjb7SqTZADhd6bAH9EU9Rjn6ZCKz2WR8HDnQgbn73u9upjQVxmEJtwVrR2XA763jrRY1X7oN48vbobOvAs0PM9zsTRZBpTX11vTu3iQzZBAw1IbGRqYKL83VWuGGniTyQZDZD';
const META_USER_TOKEN = process.env.META_USER_TOKEN || '';
const IG_ACCOUNT_ID = process.env.IG_ACCOUNT_ID || '17841437512971881';
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || 'https://discord.com/api/webhooks/1542842538212462702/Ml0o9cn16v1CfSe9_vz4sleFnf6O0tk4Sp6FvTPSrK_5AJr7-QObwxWZFS6wH4cpnlmL';

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

// 5. Evening Scheduler Trigger (19:30 BST Sharp) - Meta Facebook & Instagram
app.post('/publish/daily-evening', async (req, res) => {
  const todayLondon = getLondonDateString();
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
    const { facebookText, instagramImageUrl, instagramCaption, title } = postToPublish;
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
    if (!dynamicQueue[todayLondon]) dynamicQueue[todayLondon] = {};
    dynamicQueue[todayLondon].eveningMeta = postToPublish;
    saveQueue(dynamicQueue);

    console.log('[Meta Dispatch Results]', results);

    const fbOk = results.length > 0 && results[0].status === 'fulfilled';
    const igOk = results.length > 1 && results[1].status === 'fulfilled';
    const overallOk = results.some(r => r.status === 'fulfilled');

    sendNotification({
      title: 'Evening Meta Post',
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

    res.json({ status: 'published_evening', results });
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

app.listen(PORT, () => {
  console.log(`TotalBiz Social Poster listening on port ${PORT}`);
});

import express from 'express';
import https from 'https';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;
const QUEUE_FILE = process.env.QUEUE_FILE || path.join('/tmp', 'totalbiz_queue.json');

// Configuration & Default Tokens
const LINKEDIN_TOKEN = process.env.LINKEDIN_TOKEN || '';
const LINKEDIN_PERSON_URN = process.env.LINKEDIN_PERSON_URN || 'urn:li:person:pACLfBlITP';

const FB_PAGE_ID = process.env.FB_PAGE_ID || '1207871262402389';
const FB_PAGE_TOKEN = process.env.FB_PAGE_TOKEN || '';
const META_USER_TOKEN = process.env.META_USER_TOKEN || '';
const IG_ACCOUNT_ID = process.env.IG_ACCOUNT_ID || '17841437512971881';
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || '';

// Built-in Default Schedule for Cold Starts / Seed Deployment
const SEED_DEFAULT_SCHEDULE = {
  morningLinkedIn: {
    date: '2026-08-28',
    title: 'Why 90% of small business growth pain is broken workflows',
    published: true,
    publishedAt: '2026-08-28T09:33:23.000Z',
    urn: 'urn:li:share:7499036395513229312',
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
  },
  lunchLinkedIn: null,
  eveningMeta: {
    date: '2026-08-28',
    title: 'Zombie Software SaaS Audit',
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
  }
};

// Load Persistent Queue from Disk or Seed
function loadQueue() {
  try {
    if (fs.existsSync(QUEUE_FILE)) {
      const data = JSON.parse(fs.readFileSync(QUEUE_FILE, 'utf8'));
      console.log('[Queue] Loaded persistent state from disk:', QUEUE_FILE);
      return data;
    }
  } catch (err) {
    console.error('[Queue] Error loading from disk, falling back to seed:', err);
  }
  console.log('[Queue] Initializing queue with seed default schedule.');
  return JSON.parse(JSON.stringify(SEED_DEFAULT_SCHEDULE));
}

function saveQueue(queue) {
  try {
    fs.writeFileSync(QUEUE_FILE, JSON.stringify(queue, null, 2), 'utf8');
    console.log('[Queue] Persisted state to disk:', QUEUE_FILE);
  } catch (err) {
    console.error('[Queue] Failed to persist state to disk:', err);
  }
}

let postQueue = loadQueue();

function getLondonDateString() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London' }).format(new Date());
}

// Universal Notification Dispatcher (Discord & Logging)
function sendNotification({ title, headline, statusType, platforms, messageText, imageUrl, failureReason }) {
  // statusType: 'published' | 'failed' | 'skipped'
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

// Health Check & Queue Status
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'totalbiz-social-poster',
    project: 'totalbiz-marketing-automation',
    timezone: 'Europe/London',
    todayLondon: getLondonDateString(),
    queueStatus: {
      morningLinkedIn: postQueue.morningLinkedIn ? (postQueue.morningLinkedIn.published ? `Published on ${postQueue.morningLinkedIn.date}` : `Queued for ${postQueue.morningLinkedIn.date}`) : 'None (Will Skip)',
      lunchLinkedIn: postQueue.lunchLinkedIn ? (postQueue.lunchLinkedIn.published ? `Published on ${postQueue.lunchLinkedIn.date}` : `Queued for ${postQueue.lunchLinkedIn.date}`) : 'None (Will Skip)',
      eveningMeta: postQueue.eveningMeta ? (postQueue.eveningMeta.published ? `Published on ${postQueue.eveningMeta.date}` : `Queued for ${postQueue.eveningMeta.date}`) : 'None (Will Skip)'
    },
    timestamp: new Date().toISOString()
  });
});

// View and Manage Queues
app.get('/queue', (req, res) => {
  res.json({
    todayLondon: getLondonDateString(),
    queue: postQueue
  });
});

app.post('/queue/clear', (req, res) => {
  postQueue = { morningLinkedIn: null, lunchLinkedIn: null, eveningMeta: null };
  saveQueue(postQueue);
  console.log('[Queue] All queued posts cleared and persisted to disk.');
  res.json({ status: 'cleared', queue: postQueue });
});

app.post('/queue/set', (req, res) => {
  const { channel, post } = req.body;
  if (!['morningLinkedIn', 'lunchLinkedIn', 'eveningMeta'].includes(channel)) {
    return res.status(400).json({ error: 'Invalid channel. Must be morningLinkedIn, lunchLinkedIn, or eveningMeta' });
  }
  if (!post || !post.date) {
    return res.status(400).json({ error: 'Post must include a target date (YYYY-MM-DD)' });
  }
  postQueue[channel] = post;
  saveQueue(postQueue);
  console.log(`[Queue] Set ${channel} post for ${post.date} and saved to disk.`);
  res.json({ status: 'queued', channel, post });
});

// Helper: Fetch binary buffer from URL
function fetchBufferFromUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(fetchBufferFromUrl(res.headers.location));
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

// 1. Publish LinkedIn Native Video
async function publishLinkedInVideo(videoUrl, title, text) {
  console.log('[LinkedIn Video] 1. Registering upload recipe...');
  const registerBody = JSON.stringify({
    registerUploadRequest: {
      recipes: ['urn:li:digitalmediaRecipe:feedshare-video'],
      owner: LINKEDIN_PERSON_URN,
      serviceRelationships: [
        {
          relationshipType: 'OWNER',
          identifier: 'urn:li:userGeneratedContent'
        }
      ]
    }
  });

  const regResponse = await new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.linkedin.com',
      port: 443,
      path: '/v2/assets?action=registerUpload',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LINKEDIN_TOKEN}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0',
        'Content-Length': Buffer.byteLength(registerBody)
      }
    }, res => {
      let d = '';
      res.on('data', chunk => d += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(d));
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.write(registerBody);
    req.end();
  });

  if (!regResponse.value) {
    throw new Error(`Register failed: ${JSON.stringify(regResponse)}`);
  }

  const uploadUrl = regResponse.value.uploadMechanism['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'].uploadUrl;
  const assetUrn = regResponse.value.asset;
  console.log(`[LinkedIn Video] 2. Uploading video payload to LinkedIn (${uploadUrl.slice(0, 45)}...)...`);

  const videoBuffer = await fetchBufferFromUrl(videoUrl);
  await new Promise((resolve, reject) => {
    const parsed = new URL(uploadUrl);
    const req = https.request({
      hostname: parsed.hostname,
      port: 443,
      path: parsed.pathname + parsed.search,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LINKEDIN_TOKEN}`,
        'Content-Type': 'application/octet-stream',
        'Content-Length': videoBuffer.length
      }
    }, res => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        resolve();
      } else {
        let d = '';
        res.on('data', c => d += c);
        res.on('end', () => reject(new Error(`Upload failed HTTP ${res.statusCode}: ${d}`)));
      }
    });
    req.on('error', reject);
    req.write(videoBuffer);
    req.end();
  });

  console.log(`[LinkedIn Video] 3. Polling asset recipe status for ${assetUrn}...`);
  const assetId = assetUrn.replace('urn:li:digitalmediaAsset:', '');
  await new Promise((resolve, reject) => {
    let attempts = 0;
    const poll = () => {
      attempts++;
      https.get({
        hostname: 'api.linkedin.com',
        port: 443,
        path: `/v2/assets/${assetId}`,
        headers: {
          'Authorization': `Bearer ${LINKEDIN_TOKEN}`,
          'X-Restli-Protocol-Version': '2.0.0'
        }
      }, res => {
        let d = '';
        res.on('data', chunk => d += chunk);
        res.on('end', () => {
          try {
            const parsed = JSON.parse(d);
            const recipeStatus = parsed?.recipes?.[0]?.status;
            console.log(` -> Poll attempt ${attempts}: asset status=${parsed?.status}, recipe status=${recipeStatus}`);
            if (recipeStatus === 'AVAILABLE' || parsed?.status === 'AVAILABLE' || (parsed?.status === 'ALLOWED' && (recipeStatus === 'AVAILABLE' || attempts >= 4))) {
              resolve(parsed);
            } else if (parsed?.status === 'CLIENT_ERROR' || parsed?.status === 'SERVICE_ERROR' || recipeStatus === 'PROCESSING_FAILED') {
              reject(new Error(`Asset processing error: ${d}`));
            } else if (attempts > 30) {
              reject(new Error('Asset processing timeout (120s exceeded)'));
            } else {
              setTimeout(poll, 4000);
            }
          } catch (err) {
            reject(err);
          }
        });
      }).on('error', reject);
    };
    poll();
  });

  console.log('[LinkedIn Video] 4. Publishing UGC Video Post...');
  const postBody = JSON.stringify({
    author: LINKEDIN_PERSON_URN,
    lifecycleState: 'PUBLISHED',
    specificContent: {
      'com.linkedin.ugc.ShareContent': {
        shareCommentary: { text: text },
        shareMediaCategory: 'VIDEO',
        media: [
          {
            status: 'READY',
            description: { text: title },
            media: assetUrn,
            title: { text: title }
          }
        ]
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
        'Authorization': `Bearer ${LINKEDIN_TOKEN}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0',
        'Content-Length': Buffer.byteLength(postBody)
      }
    }, res => {
      let d = '';
      res.on('data', chunk => d += chunk);
      res.on('end', () => resolve(JSON.parse(d)));
    });
    req.on('error', reject);
    req.write(postBody);
    req.end();
  });
}

// 1b. Publish LinkedIn Text Post
async function publishLinkedInText(text) {
  const postBody = JSON.stringify({
    author: LINKEDIN_PERSON_URN,
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
        'Authorization': `Bearer ${LINKEDIN_TOKEN}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0',
        'Content-Length': Buffer.byteLength(postBody)
      }
    }, res => {
      let d = '';
      res.on('data', chunk => d += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(d));
        } catch (e) {
          resolve({ raw: d });
        }
      });
    });
    req.on('error', reject);
    req.write(postBody);
    req.end();
  });
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

// 4. Lunch Scheduler Trigger (12:30 BST Sharp) - LinkedIn Native Video
app.post('/publish/lunch-linkedin', async (req, res) => {
  const todayLondon = getLondonDateString();
  console.log(`[Cloud Scheduler] 12:30 PM Lunch LinkedIn Video Trigger for ${todayLondon}...`);

  let postToPublish = null;
  if (req.body && req.body.videoUrl && req.body.title && req.body.text) {
    postToPublish = req.body;
  } else if (postQueue.lunchLinkedIn && postQueue.lunchLinkedIn.date === todayLondon && !postQueue.lunchLinkedIn.published) {
    postToPublish = postQueue.lunchLinkedIn;
  }

  if (!postToPublish) {
    console.log(`[Cloud Scheduler] Skipped Lunch LinkedIn: No agreed post queued for today (${todayLondon}). ZERO-FALLBACK active.`);
    sendNotification({
      title: 'Lunch LinkedIn Video',
      headline: 'Scheduled Trigger Evaluation',
      statusType: 'skipped',
      platforms: { '💼 Platform': 'LinkedIn Native Video' },
      messageText: `No video post queued for today (${todayLondon}). Fallback safely disabled.`,
      failureReason: 'Queue empty for date.'
    });
    return res.json({ status: 'skipped', reason: `No agreed post queued for today (${todayLondon}). Fallback disabled.` });
  }

  try {
    const { videoUrl, title, text } = postToPublish;
    const result = await publishLinkedInVideo(videoUrl, title, text);
    
    postQueue.lunchLinkedIn.published = true;
    postQueue.lunchLinkedIn.publishedAt = new Date().toISOString();
    saveQueue(postQueue);
    console.log('[LinkedIn Video Success]', result);

    sendNotification({
      title: 'Lunch LinkedIn Video',
      headline: title,
      statusType: 'published',
      platforms: { '💼 Platform': 'LinkedIn Native Video', '👤 Author': 'Alex Poxon' },
      messageText: text,
      imageUrl: null
    });

    res.json({ status: 'published_lunch_video', linkedin: result });
  } catch (err) {
    console.error('[LinkedIn Video Error]', err);

    sendNotification({
      title: 'Lunch LinkedIn Video',
      headline: postToPublish?.title || 'Lunch Video',
      statusType: 'failed',
      platforms: { '💼 Platform': 'LinkedIn Native Video' },
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
  } else if (postQueue.eveningMeta && postQueue.eveningMeta.date === todayLondon && !postQueue.eveningMeta.published) {
    postToPublish = postQueue.eveningMeta;
  }

  if (!postToPublish) {
    console.log(`[Cloud Scheduler] Skipped Evening Meta: No agreed post queued for today (${todayLondon}). ZERO-FALLBACK active.`);
    sendNotification({
      title: 'Evening Meta Post',
      headline: 'Scheduled Trigger Evaluation',
      statusType: 'skipped',
      platforms: { '📘 Facebook / 📸 Instagram': 'Skipped' },
      messageText: `No Meta post queued for today (${todayLondon}). Fallback safely disabled.`,
      failureReason: 'Queue empty for date.'
    });
    return res.json({ status: 'skipped', reason: `No agreed post queued for today (${todayLondon}). Fallback disabled.` });
  }

  try {
    const { facebookText, instagramImageUrl, instagramCaption, title } = postToPublish;
    const promises = [];
    if (facebookText) promises.push(publishFacebook(facebookText));
    if (instagramImageUrl && instagramCaption) promises.push(publishInstagramMedia(instagramImageUrl, instagramCaption, false));

    const results = await Promise.allSettled(promises);
    
    postQueue.eveningMeta.published = true;
    postQueue.eveningMeta.publishedAt = new Date().toISOString();
    saveQueue(postQueue);
    console.log('[Meta Dispatch Results]', results);

    const fbOk = results.length > 0 && results[0].status === 'fulfilled';
    const igOk = results.length > 1 && results[1].status === 'fulfilled';
    const overallOk = results.some(r => r.status === 'fulfilled');

    sendNotification({
      title: 'Evening Meta Post',
      headline: title || 'Zombie Software SaaS Audit',
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
      headline: 'Zombie Software SaaS Audit',
      statusType: 'failed',
      platforms: { '📘 Facebook / 📸 Instagram': 'Failed' },
      messageText: postToPublish?.instagramCaption || postToPublish?.facebookText || '',
      imageUrl: postToPublish?.instagramImageUrl,
      failureReason: err.message
    });

    res.status(500).json({ error: err.message });
  }
});

// 6. Morning Scheduler Trigger (07:45 BST Sharp) - LinkedIn Post
app.post('/publish/daily-morning', async (req, res) => {
  const todayLondon = getLondonDateString();
  console.log(`[Cloud Scheduler] 07:45 AM Morning LinkedIn Trigger for ${todayLondon}...`);

  let postToPublish = null;
  if (req.body && req.body.text) {
    postToPublish = req.body;
  } else if (postQueue.morningLinkedIn && postQueue.morningLinkedIn.date === todayLondon && !postQueue.morningLinkedIn.published) {
    postToPublish = postQueue.morningLinkedIn;
  }

  if (!postToPublish) {
    console.log(`[Cloud Scheduler] Skipped Morning LinkedIn: No agreed post queued for today (${todayLondon}). ZERO-FALLBACK active.`);
    sendNotification({
      title: 'Morning LinkedIn',
      headline: 'Scheduled Trigger Evaluation',
      statusType: 'skipped',
      platforms: { '💼 Platform': 'LinkedIn Thought Leadership' },
      messageText: `No LinkedIn thought leadership post queued for today (${todayLondon}). Fallback safely disabled.`,
      failureReason: 'Queue empty for date or already published.'
    });
    return res.json({ status: 'skipped', reason: `No agreed post queued for today (${todayLondon}). Fallback disabled.` });
  }

  try {
    const { text, title } = postToPublish;
    const result = await publishLinkedInText(text);
    
    postQueue.morningLinkedIn.published = true;
    postQueue.morningLinkedIn.publishedAt = new Date().toISOString();
    postQueue.morningLinkedIn.urn = result?.id;
    saveQueue(postQueue);
    console.log('[LinkedIn Morning Success]', result);

    sendNotification({
      title: 'Morning LinkedIn',
      headline: title || 'Thought Leadership',
      statusType: 'published',
      platforms: { '💼 Platform': 'LinkedIn Thought Leadership', '👤 Author': 'Alex Poxon' },
      messageText: text,
      imageUrl: null
    });

    res.json({ status: 'published_morning_linkedin', linkedin: result });
  } catch (err) {
    console.error('[LinkedIn Morning Error]', err);

    sendNotification({
      title: 'Morning LinkedIn',
      headline: postToPublish?.title || 'Thought Leadership',
      statusType: 'failed',
      platforms: { '💼 Platform': 'LinkedIn Thought Leadership' },
      messageText: postToPublish?.text || '',
      failureReason: err.message
    });

    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`TotalBiz Social Poster listening on port ${PORT}`);
});

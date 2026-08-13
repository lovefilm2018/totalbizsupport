import express from 'express';
import https from 'https';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;

// Configuration & Default Tokens
const LINKEDIN_TOKEN = process.env.LINKEDIN_TOKEN || 'AQU8lBLIfjFyADP-a-zGe8cRHC2wzU9y7zHRpJinLqMfVNjLzha4eSKxf26p4cV8aSncBsUwCPzKLqlE-JXg8swlmnMJlXiIGnZb-a0-K9n67s6TUxPPA_fWqwj17TyxX2dshWnb-fsafb5FBORdm20d7A9EQZqQ56Ksf0R_yXAK71GcTZg_b4t7z2poh8ZXIXHZamn3H7bU8ojR0V0t60Aowl6RJrTFkn6g3UGRXW_Yzou3E2dpLpERrw-CtImOb3q3QW-DDKy90f9hoew_3mFmgASqFUDqb6b93eHhAj3sHQAWQhyCq-jUfkyNPoRmqXl2LZMXo_r43VFPLSiQe9SGyBsIMA';
const LINKEDIN_PERSON_URN = process.env.LINKEDIN_PERSON_URN || 'urn:li:person:pACLfBlITP';

const FB_PAGE_ID = process.env.FB_PAGE_ID || '1207871262402389';
const FB_PAGE_TOKEN = process.env.FB_PAGE_TOKEN || 'EAAT9dJ4m67cBSDpkk3W4am24Tl5U2EKmpyXbyDZCiqGaIqZCN6wZAc293ebKgWQEJy2S3KfbOv8TTSf3BYZCmYldoR35RUBStp3h2wRQRdmi0ZCyKWeENHMBPZA0qc2VAB70bSGKDzB3kwS6MZCiJQAfC7VZCli4qAqu0Lr2nT77bAHMDWSQr2KeW6G3ARKv9Mk3meUjdYsMFivZBnT80nNRQL0WB3XKgjsEjwiLd27ktPLceMFNp9JikZAZCR8GwZDZD';
const IG_ACCOUNT_ID = process.env.IG_ACCOUNT_ID || '17841437512971881';

// Active Scheduled Payloads (Queue Fallback)
let queuedLinkedInPost = {
  text: `Why sole traders & small firms don't need a 5-man IT department—they need 1 reliable partner with corporate discipline 🛠️⚙️\n\nHaving spent 20+ years managing high-stakes IT infrastructure across HSBC, eBay, Schroders, and Gumtree, I built TotalBiz Support to bridge that gap.\n\nWhether you need hands-on on-site setup in East Sussex, West Sussex, or Kent, or remote consultancy across the UK, we keep your business running smoothly without agency prices.\n\n👉 totalbiz.co.uk\n\n#SmallBusinessUK #TechStrategy #ITConsulting #SussexBusiness #KentBusiness #TotalBizSupport`
};

let queuedMetaPost = {
  facebookText: `Stop falling for fake news or edited photos on your feed! 🛑\n\nHere’s how to use your phone’s built-in AI to fact-check any image or post in just a few taps. 📲 💡\n\n1️⃣ Take a screenshot\n2️⃣ Share it with Google Gemini\n3️⃣ Type "Fact check"\n\nEnterprise tech & AI made simple for everyday people and small businesses.\n\n👉 Visit totalbiz.co.uk for more practical tech support.\n\n#AILifeHacks #TechTips #SmallBusinessUK #AndroidHacks #TotalBizSupport #EastSussex #Kent`,
  instagramVideoUrl: 'https://totalbiz.co.uk/TotalBiz_Support_AI_Life_Hack_1_FINAL.mp4',
  instagramCaption: `Stop falling for fake news or edited photos on your feed! 🛑\n\nHere’s how to use your phone’s built-in AI to fact-check any image or post in just a few taps. 📲 💡\n\n1️⃣ Take a screenshot\n2️⃣ Share it with Google Gemini\n3️⃣ Type "Fact check"\n\nEnterprise tech & AI made simple for everyday people and small businesses.\n\n👉 Visit totalbiz.co.uk for more practical tech support.\n\n#AILifeHacks #TechTips #SmallBusinessUK #AndroidHacks #TotalBizSupport #EastSussex #Kent #InstagramReels`
};

// 1. Health Endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'totalbiz-social-poster',
    timezone: 'Europe/London',
    timestamp: new Date().toISOString()
  });
});

// 2. Queue Update Endpoint
app.post('/queue/update', (req, res) => {
  if (req.body.linkedin) queuedLinkedInPost = req.body.linkedin;
  if (req.body.meta) queuedMetaPost = req.body.meta;
  res.json({ status: 'queue_updated', queuedLinkedInPost, queuedMetaPost });
});

// 3. Publish LinkedIn
async function publishLinkedIn(messageText) {
  return new Promise((resolve, reject) => {
    const postBody = JSON.stringify({
      author: LINKEDIN_PERSON_URN,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: { text: messageText },
          shareMediaCategory: 'NONE'
        }
      },
      visibility: { 'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC' }
    });

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

// 4. Publish Facebook Page
async function publishFacebook(messageText) {
  return new Promise((resolve, reject) => {
    const postData = new URLSearchParams({
      message: messageText,
      access_token: FB_PAGE_TOKEN
    }).toString();

    const req = https.request({
      hostname: 'graph.facebook.com',
      port: 443,
      path: `/${FB_PAGE_ID}/feed`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, res => {
      let d = '';
      res.on('data', chunk => d += chunk);
      res.on('end', () => resolve(JSON.parse(d)));
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

// 5. Publish Instagram Reel
async function publishInstagramReel(videoUrl, caption) {
  return new Promise((resolve, reject) => {
    const postData = new URLSearchParams({
      media_type: 'REELS',
      video_url: videoUrl,
      caption: caption,
      access_token: FB_PAGE_TOKEN
    }).toString();

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
        const container = JSON.parse(d);
        if (!container.id) return reject(new Error('Container creation failed: ' + d));
        
        // Poll status before publishing
        const poll = () => {
          https.get(`https://graph.facebook.com/v19.0/${container.id}?fields=status_code&access_token=${FB_PAGE_TOKEN}`, sRes => {
            let sData = '';
            sRes.on('data', c => sData += c);
            sRes.on('end', () => {
              const sParsed = JSON.parse(sData);
              if (sParsed.status_code === 'FINISHED') {
                // Publish
                const pubData = new URLSearchParams({ creation_id: container.id, access_token: FB_PAGE_TOKEN }).toString();
                const pubReq = https.request({
                  hostname: 'graph.facebook.com',
                  port: 443,
                  path: `/v19.0/${IG_ACCOUNT_ID}/media_publish`,
                  method: 'POST',
                  headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(pubData) }
                }, pRes => {
                  let pData = '';
                  pRes.on('data', c => pData += c);
                  pRes.on('end', () => resolve(JSON.parse(pData)));
                });
                pubReq.write(pubData);
                pubReq.end();
              } else {
                setTimeout(poll, 4000);
              }
            });
          });
        };
        setTimeout(poll, 6000);
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

// 6. Morning Scheduler Trigger (07:45 BST)
app.post('/publish/daily-morning', async (req, res) => {
  console.log('[Cloud Scheduler] Executing 07:45 AM Morning LinkedIn Dispatch...');
  try {
    const text = req.body?.text || queuedLinkedInPost.text;
    const result = await publishLinkedIn(text);
    console.log('[LinkedIn Success]', result);
    res.json({ status: 'published_morning', linkedin: result });
  } catch (err) {
    console.error('[LinkedIn Error]', err);
    res.status(500).json({ error: err.message });
  }
});

// 7. Evening Scheduler Trigger (19:30 BST)
app.post('/publish/daily-evening', async (req, res) => {
  console.log('[Cloud Scheduler] Executing 19:30 PM Evening Meta Dispatch...');
  try {
    const fbText = req.body?.facebookText || queuedMetaPost.facebookText;
    const igVideo = req.body?.instagramVideoUrl || queuedMetaPost.instagramVideoUrl;
    const igCaption = req.body?.instagramCaption || queuedMetaPost.instagramCaption;

    const [fbResult, igResult] = await Promise.allSettled([
      publishFacebook(fbText),
      publishInstagramReel(igVideo, igCaption)
    ]);

    console.log('[Meta Success]', { facebook: fbResult, instagram: igResult });
    res.json({ status: 'published_evening', facebook: fbResult, instagram: igResult });
  } catch (err) {
    console.error('[Meta Error]', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`TotalBiz Social Poster listening on port ${PORT}`);
});

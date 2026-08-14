import express from 'express';
import https from 'https';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;

// Configuration & Default Tokens
const LINKEDIN_TOKEN = process.env.LINKEDIN_TOKEN || 'AQU8lBLIfjFyADP-a-zGe8cRHC2wzU9y7zHRpJinLqMfVNjLzha4eSKxf26p4cV8aSncBsUwCPzKLqlE-JXg8swlmnMJlXiIGnZb-a0-K9n67s6TUxPPA_fWqwj17TyxX2dshWnb-fsafb5FBORdm20d7A9EQZqQ56Ksf0R_yXAK71GcTZg_b4t7z2poh8ZXIXHZamn3H7bU8ojR0V0t60Aowl6RJrTFkn6g3UGRXW_Yzou3E2dpLpERrw-CtImOb3q3QW-DDKy90f9hoew_3mFmgASqFUDqb6b93eHhAj3sHQAWQhyCq-jUfkyNPoRmqXl2LZMXo_r43VFPLSiQe9SGyBsIMA';
const LINKEDIN_PERSON_URN = process.env.LINKEDIN_PERSON_URN || 'urn:li:person:pACLfBlITP';

const FB_PAGE_ID = process.env.FB_PAGE_ID || '1207871262402389';
const FB_PAGE_TOKEN = process.env.FB_PAGE_TOKEN || 'EAAT9dJ4m67cBSKtrfcSdoDG3xrg2ZCTk9aR9EJZC6OBfjidEZChE8ZBj4ZCAtDnDOcZCvZAEYKm3lZCwVMbABpkJzw8wTatvvAeMeOHUxO8Re2Y7r4UsD7y5y41gdkSE9KIVD2ZCWg9zxIh2OXaD0RfZCUR0U3slIUK6ycSofKIsbJhylZCraszFTlpJafDrBv3Ylqx57WMsWV0dMgamzvwDZCVfVQZDZD';
const IG_ACCOUNT_ID = process.env.IG_ACCOUNT_ID || '17841437512971881';

// 1. Lunch LinkedIn Video Payload (12:30 BST Sharp)
let queuedLunchLinkedInPost = {
  videoUrl: 'https://totalbiz.co.uk/TotalBiz_Support_AI_Life_Hack_1_FINAL.mp4',
  title: 'AI Life Hack #1: 30-Second Screenshot Fact Check 📲',
  text: `Stop falling for fake news or edited photos on your feed! 🛑📲\n\nHere is a 30-second AI Life Hack using your smartphone's built-in Google Gemini to fact-check any image, headline, or claim in seconds:\n\n1️⃣ Take a quick screenshot of any suspicious post or image\n2️⃣ Tap Share & send it directly to Google Gemini\n3️⃣ Type "Fact check" or "Is this real?"\n\nAt TotalBiz Support, we combine 20+ years of corporate IT discipline (HSBC, eBay, Schroders, Gumtree) with practical tech solutions for small businesses, sole traders, and everyday productivity.\n\n👉 Explore our support & tech services: totalbiz.co.uk\n\n#AILifeHacks #TechTips #SmallBusinessUK #Productivity #SussexBusiness #TotalBizSupport`
};

// 2. Evening Meta Post Payload (19:30 BST Sharp) - Approved Day 5 Client Proof
let queuedMetaPost = {
  facebookText: `"You don't need a £2,000/month agency retainer to get your business running like clockwork." 🛠️⚙️\n\nMost sole traders, trades, and property hosts in Sussex and Kent face the same dilemma:\nYou need a fast, professional website, smooth booking systems, automated admin, or reliable hardware—but big agencies quote thousands in upfront fees and lock you into hefty monthly contracts.\n\nWe do things differently at TotalBiz Support:\n\n🌟 Real Client Outcomes:\n• Bijou Coastal Stays (Worthing): Replaced manual booking checks with custom automated pricing trackers, capturing peak weekend rates hands-free.\n• HS Garden Maintenance (Heathfield): Streamlined digital presence and customer inquiries with zero tech headaches.\n\n💡 How we help local businesses:\n1️⃣ Getting You Online: High-speed, mobile-first websites without bloated agency price tags.\n2️⃣ Tech & Hardware Fixes: Wi-Fi dead zones, POS terminals, printer setups, and backup recovery.\n3️⃣ Admin & Automation: Invoicing tools, customer email workflows, and cloud organization.\n\nWhether you need hands-on, on-site help across East Sussex, West Sussex, or Kent, or remote consultancy UK-wide, you get 20+ years of corporate IT discipline (HSBC, eBay, Schroders, Gumtree) tailored to small business budgets.\n\n👉 Explore how we work: totalbiz.co.uk\n💬 Or message us directly on WhatsApp: +44 7799 538311\n\n#SmallBusinessUK #SussexBusiness #KentBusiness #Heathfield #Worthing #SoleTraderSupport #ITSupport #TotalBizSupport`,
  instagramImageUrl: 'https://totalbiz.co.uk/carousel_slide_1.jpg',
  instagramCaption: `Enterprise-grade tech support. Small business prices. 🛠️\n\nYou shouldn't have to choose between clunky DIY tech and overpriced agency retainers.\n\nFrom automated pricing trackers for short-term rental hosts to seamless websites and on-site hardware fixes for local trades—we handle the technical chaos so you can focus on running your business.\n\n📍 On-site across East Sussex, West Sussex & Kent\n🌐 UK-wide remote support\n\n👉 Tap the link in bio to visit totalbiz.co.uk or message us directly on WhatsApp.\n\n#SmallBusinessUK #SussexBusiness #KentBusiness #Heathfield #SoleTrader #AirbnbHost #TechTips #ITConsulting #TotalBizSupport`
};

// Health Check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'totalbiz-social-poster',
    project: 'totalbiz-marketing-automation',
    timezone: 'Europe/London',
    timestamp: new Date().toISOString()
  });
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
      res.on('end', () => resolve(JSON.parse(d)));
    });
    req.on('error', reject);
    req.write(registerBody);
    req.end();
  });

  const uploadUrl = regResponse.value.uploadMechanism['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'].uploadUrl;
  const customHeaders = regResponse.value.uploadMechanism['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'].headers || {};
  const assetUrn = regResponse.value.asset;

  console.log('[LinkedIn Video] 2. Downloading source video binary from URL...');
  const videoBuffer = await fetchBufferFromUrl(videoUrl);
  console.log(`[LinkedIn Video] Downloaded ${videoBuffer.length} bytes. Uploading to LinkedIn storage...`);

  const parsedUploadUrl = new URL(uploadUrl);
  await new Promise((resolve, reject) => {
    const req = https.request({
      hostname: parsedUploadUrl.hostname,
      port: 443,
      path: parsedUploadUrl.pathname + parsedUploadUrl.search,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Length': videoBuffer.length,
        ...customHeaders
      }
    }, res => {
      let d = '';
      res.on('data', chunk => d += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(true);
        } else {
          reject(new Error(`LinkedIn binary upload failed (HTTP ${res.statusCode}): ${d}`));
        }
      });
    });
    req.on('error', reject);
    req.write(videoBuffer);
    req.end();
  });

  console.log('[LinkedIn Video] 3. Polling asset status until AVAILABLE...');
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

// 2. Publish Facebook Page
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
      res.on('end', () => {
        try {
          const parsed = JSON.parse(d);
          if (parsed.error) {
            return reject(new Error('Facebook Post API Error: ' + JSON.stringify(parsed.error)));
          }
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

// 3. Publish Instagram (Image or Video)
async function publishInstagramMedia(mediaUrl, caption, isVideo = false) {
  return new Promise((resolve, reject) => {
    const params = {
      caption: caption,
      access_token: FB_PAGE_TOKEN
    };
    if (isVideo) {
      params.media_type = 'REELS';
      params.video_url = mediaUrl;
    } else {
      params.image_url = mediaUrl;
    }

    const postData = new URLSearchParams(params).toString();

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
          
          // Wait for Instagram to process the image container before publishing
          setTimeout(() => {
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
  console.log('[Cloud Scheduler] Executing 12:30 PM Lunch LinkedIn Video Dispatch...');
  try {
    const videoUrl = req.body?.videoUrl || queuedLunchLinkedInPost.videoUrl;
    const title = req.body?.title || queuedLunchLinkedInPost.title;
    const text = req.body?.text || queuedLunchLinkedInPost.text;

    const result = await publishLinkedInVideo(videoUrl, title, text);
    console.log('[LinkedIn Video Success]', result);
    res.json({ status: 'published_lunch_video', linkedin: result });
  } catch (err) {
    console.error('[LinkedIn Video Error]', err);
    res.status(500).json({ error: err.message });
  }
});

// 5. Evening Scheduler Trigger (19:30 BST Sharp) - Meta Facebook & Instagram
app.post('/publish/daily-evening', async (req, res) => {
  console.log('[Cloud Scheduler] Executing 19:30 PM Evening Meta Dispatch...');
  try {
    const fbText = req.body?.facebookText || queuedMetaPost.facebookText;
    const igImage = req.body?.instagramImageUrl || queuedMetaPost.instagramImageUrl;
    const igCaption = req.body?.instagramCaption || queuedMetaPost.instagramCaption;

    const [fbResult, igResult] = await Promise.allSettled([
      publishFacebook(fbText),
      publishInstagramMedia(igImage, igCaption, false)
    ]);

    console.log('[Meta Dispatch Results]', { facebook: fbResult, instagram: igResult });
    res.json({ status: 'published_evening', facebook: fbResult, instagram: igResult });
  } catch (err) {
    console.error('[Meta Error]', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`TotalBiz Social Poster listening on port ${PORT}`);
});

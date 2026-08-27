import express from 'express';
import https from 'https';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;

// Configuration & Default Tokens
const LINKEDIN_TOKEN = process.env.LINKEDIN_TOKEN || 'AQU8lBLIfjFyADP-a-zGe8cRHC2wzU9y7zHRpJinLqMfVNjLzha4eSKxf26p4cV8aSncBsUwCPzKLqlE-JXg8swlmnMJlXiIGnZb-a0-K9n67s6TUxPPA_fWqwj17TyxX2dshWnb-fsafb5FBORdm20d7A9EQZqQ56Ksf0R_yXAK71GcTZg_b4t7z2poh8ZXIXHZamn3H7bU8ojR0V0t60Aowl6RJrTFkn6g3UGRXW_Yzou3E2dpLpERrw-CtImOb3q3QW-DDKy90f9hoew_3mFmgASqFUDqb6b93eHhAj3sHQAWQhyCq-jUfkyNPoRmqXl2LZMXo_r43VFPLSiQe9SGyBsIMA';
const LINKEDIN_PERSON_URN = process.env.LINKEDIN_PERSON_URN || 'urn:li:person:pACLfBlITP';

const FB_PAGE_ID = process.env.FB_PAGE_ID || '1207871262402389';
const FB_PAGE_TOKEN = process.env.FB_PAGE_TOKEN || 'EAAT9dJ4m67cBSdi402D9TP5dzQkzCCW4O48Hs6kv17WV9gWXPiRFq9s1I9nFZC5F2aW1dKkAHRgnLPhcQCrdaQKIEMv9l9Ax46RlLgc2mLS5ffZAOXTCtdCNUeCl7hXZCL7Peq9isLKuQMPkcCmNak1wxbs0SmwZAGEh6bKhXKOPB7iN6cN1MRZA29guGSyL2TSmJF99RZBN1vZAZASpnwZDZD';
const META_USER_TOKEN = process.env.META_USER_TOKEN || 'EAAT9dJ4m67cBSV3ZB4tjRQrmG0UGFI5hEqpYykJNQzhHcYfZCvRfZBsrizJNlhpQZC3ZAJS4sublLupMkFhP8LTTlAoJ1C6o0RhHaXl8wBiZAQRWBXSYxLl9vkFfJqLrDFx5LPbSHwPmrChMP0B0ol77qSmhJCZBZBDbAwYifbH7vOxRhUIw8cHSodROpirUGQNacT64vRRHrAZDZD';
const IG_ACCOUNT_ID = process.env.IG_ACCOUNT_ID || '17841437512971881';

// Strict Queue State - ZERO FALLBACKS
// Posts must be explicitly agreed and queued for a specific date (YYYY-MM-DD in Europe/London).
// If no post is queued for today, the scheduler triggers will safely SKIP posting.
let postQueue = {
  morningLinkedIn: null, // { date: 'YYYY-MM-DD', text: '...', title: '...' }
  lunchLinkedIn: null,   // { date: 'YYYY-MM-DD', videoUrl: '...', title: '...', text: '...' }
  eveningMeta: null      // { date: 'YYYY-MM-DD', facebookText: '...', instagramImageUrl: '...', instagramCaption: '...' }
};

function getLondonDateString() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London' }).format(new Date());
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
      morningLinkedIn: postQueue.morningLinkedIn ? `Queued for ${postQueue.morningLinkedIn.date}` : 'None (Will Skip)',
      lunchLinkedIn: postQueue.lunchLinkedIn ? `Queued for ${postQueue.lunchLinkedIn.date}` : 'None (Will Skip)',
      eveningMeta: postQueue.eveningMeta ? `Queued for ${postQueue.eveningMeta.date}` : 'None (Will Skip)'
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
  console.log('[Queue] All queued posts cleared.');
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
  console.log(`[Queue] Set ${channel} post for ${post.date}`);
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
          const parsed = JSON.parse(d);
          if (parsed.status && parsed.status >= 400) {
            return reject(new Error('LinkedIn API error: ' + d));
          }
          resolve(parsed);
        } catch (e) {
          resolve({ raw: d, status: res.statusCode });
        }
      });
    });
    req.on('error', reject);
    req.write(postBody);
    req.end();
  });
}

// 2. Publish Facebook Page Text Post
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
    const tokenToUse = META_USER_TOKEN || FB_PAGE_TOKEN;
    const params = {
      caption: caption,
      access_token: tokenToUse
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

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || 'https://discord.com/api/webhooks/1542635929271926895/Vedw2_1bwVYZC8sfVmLPHz49lSn96gXeZyArke8JTGbFMCGvcsSiIenrJXHMGBpeBP2D';

function sendDiscordNotification({ title, headline, statusOk, platforms, messageText, imageUrl, failureReason }) {
  if (!DISCORD_WEBHOOK_URL) return;
  try {
    const color = statusOk ? 3066993 : 15158332; // Green or Red
    const statusText = statusOk ? '🟢 **PUBLISHED SUCCESSFULLY**' : '🔴 **PUBLISHING FAILED**';
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
        name: '⚠️ Error Detail',
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
    }, () => {});
    req.on('error', err => console.error('[Discord Alert Error]', err));
    req.write(payload);
    req.end();
  } catch (err) {
    console.error('[Discord Alert Failure]', err);
  }
}

// 4. Lunch Scheduler Trigger (12:30 BST Sharp) - LinkedIn Native Video
app.post('/publish/lunch-linkedin', async (req, res) => {
  const todayLondon = getLondonDateString();
  console.log(`[Cloud Scheduler] 12:30 PM Lunch LinkedIn Video Trigger for ${todayLondon}...`);

  // Explicit payload in request OR active queued post matching today's date
  let postToPublish = null;
  if (req.body && req.body.videoUrl && req.body.title && req.body.text) {
    postToPublish = req.body;
  } else if (postQueue.lunchLinkedIn && postQueue.lunchLinkedIn.date === todayLondon) {
    postToPublish = postQueue.lunchLinkedIn;
  }

  if (!postToPublish) {
    console.log(`[Cloud Scheduler] Skipped Lunch LinkedIn: No agreed post queued for today (${todayLondon}). ZERO-FALLBACK active.`);
    return res.json({ status: 'skipped', reason: `No agreed post queued for today (${todayLondon}). Fallback disabled.` });
  }

  try {
    const { videoUrl, title, text } = postToPublish;
    const result = await publishLinkedInVideo(videoUrl, title, text);
    // Clear queue so it never repeats
    postQueue.lunchLinkedIn = null;
    console.log('[LinkedIn Video Success]', result);

    sendDiscordNotification({
      title: 'Lunch LinkedIn Video',
      headline: title,
      statusOk: true,
      platforms: { '💼 Platform': 'LinkedIn Native Video', '👤 Author': 'Alex Poxon' },
      messageText: text,
      imageUrl: null
    });

    res.json({ status: 'published_lunch_video', linkedin: result });
  } catch (err) {
    console.error('[LinkedIn Video Error]', err);

    sendDiscordNotification({
      title: 'Lunch LinkedIn Video',
      headline: postToPublish?.title || 'Lunch Video',
      statusOk: false,
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

  // Explicit payload in request OR active queued post matching today's date
  let postToPublish = null;
  if (req.body && (req.body.facebookText || req.body.instagramCaption)) {
    postToPublish = req.body;
  } else if (postQueue.eveningMeta && postQueue.eveningMeta.date === todayLondon) {
    postToPublish = postQueue.eveningMeta;
  }

  if (!postToPublish) {
    console.log(`[Cloud Scheduler] Skipped Evening Meta: No agreed post queued for today (${todayLondon}). ZERO-FALLBACK active.`);
    return res.json({ status: 'skipped', reason: `No agreed post queued for today (${todayLondon}). Fallback disabled.` });
  }

  try {
    const { facebookText, instagramImageUrl, instagramCaption } = postToPublish;
    const promises = [];
    if (facebookText) promises.push(publishFacebook(facebookText));
    if (instagramImageUrl && instagramCaption) promises.push(publishInstagramMedia(instagramImageUrl, instagramCaption, false));

    const results = await Promise.allSettled(promises);
    // Clear queue so it never repeats
    postQueue.eveningMeta = null;
    console.log('[Meta Dispatch Results]', results);

    const fbOk = results.length > 0 && results[0].status === 'fulfilled';
    const igOk = results.length > 1 && results[1].status === 'fulfilled';
    const overallOk = results.some(r => r.status === 'fulfilled');

    sendDiscordNotification({
      title: 'Evening Meta Post',
      headline: 'Zombie Software SaaS Audit',
      statusOk: overallOk,
      platforms: {
        '📘 Facebook Page': fbOk ? 'Published' : (facebookText ? 'Failed' : 'Skipped'),
        '📸 Instagram': igOk ? 'Published' : (instagramCaption ? 'Failed' : 'Skipped')
      },
      messageText: instagramCaption || facebookText || '',
      imageUrl: instagramImageUrl
    });

    res.json({ status: 'published_evening', results });
  } catch (err) {
    console.error('[Meta Error]', err);

    sendDiscordNotification({
      title: 'Evening Meta Post',
      headline: 'Zombie Software SaaS Audit',
      statusOk: false,
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
  } else if (postQueue.morningLinkedIn && postQueue.morningLinkedIn.date === todayLondon) {
    postToPublish = postQueue.morningLinkedIn;
  }

  if (!postToPublish) {
    console.log(`[Cloud Scheduler] Skipped Morning LinkedIn: No agreed post queued for today (${todayLondon}). ZERO-FALLBACK active.`);
    return res.json({ status: 'skipped', reason: `No agreed post queued for today (${todayLondon}). Fallback disabled.` });
  }

  try {
    const { text, title } = postToPublish;
    const result = await publishLinkedInText(text);
    postQueue.morningLinkedIn = null;
    console.log('[LinkedIn Morning Success]', result);

    sendDiscordNotification({
      title: 'Morning LinkedIn',
      headline: title || 'Thought Leadership',
      statusOk: true,
      platforms: { '💼 Platform': 'LinkedIn Thought Leadership', '👤 Author': 'Alex Poxon' },
      messageText: text,
      imageUrl: null
    });

    res.json({ status: 'published_morning_linkedin', linkedin: result });
  } catch (err) {
    console.error('[LinkedIn Morning Error]', err);

    sendDiscordNotification({
      title: 'Morning LinkedIn',
      headline: postToPublish?.title || 'Thought Leadership',
      statusOk: false,
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

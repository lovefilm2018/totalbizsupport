import https from 'https';
import fs from 'fs';
import path from 'path';

const accessToken = 'AQU8lBLIfjFyADP-a-zGe8cRHC2wzU9y7zHRpJinLqMfVNjLzha4eSKxf26p4cV8aSncBsUwCPzKLqlE-JXg8swlmnMJlXiIGnZb-a0-K9n67s6TUxPPA_fWqwj17TyxX2dshWnb-fsafb5FBORdm20d7A9EQZqQ56Ksf0R_yXAK71GcTZg_b4t7z2poh8ZXIXHZamn3H7bU8ojR0V0t60Aowl6RJrTFkn6g3UGRXW_Yzou3E2dpLpERrw-CtImOb3q3QW-DDKy90f9hoew_3mFmgASqFUDqb6b93eHhAj3sHQAWQhyCq-jUfkyNPoRmqXl2LZMXo_r43VFPLSiQe9SGyBsIMA';
const personUrn = 'urn:li:person:pACLfBlITP';
const videoFilePath = path.resolve('client/public/TotalBiz_Support_AI_Life_Hack_1_FINAL.mp4');

const commentary = `Stop falling for fake news or edited photos on your feed! 🛑📲

Here is a 30-second AI Life Hack using your smartphone's built-in Google Gemini to fact-check any image, headline, or claim in seconds:

1️⃣ Take a quick screenshot of any suspicious post or image
2️⃣ Tap Share & send it directly to Google Gemini
3️⃣ Type "Fact check" or "Is this real?"

At TotalBiz Support, we combine 20+ years of corporate IT discipline (HSBC, eBay, Schroders, Gumtree) with practical tech solutions for small businesses, sole traders, and everyday productivity.

👉 Explore our support & tech services: totalbiz.co.uk

#AILifeHacks #TechTips #SmallBusinessUK #Productivity #SussexBusiness #TotalBizSupport`;

// Step 1: Register Upload
async function registerVideoUpload() {
  console.log('[1/4] Registering video upload with LinkedIn API...');
  const registerBody = JSON.stringify({
    registerUploadRequest: {
      recipes: ['urn:li:digitalmediaRecipe:feedshare-video'],
      owner: personUrn,
      serviceRelationships: [
        {
          relationshipType: 'OWNER',
          identifier: 'urn:li:userGeneratedContent'
        }
      ]
    }
  });

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.linkedin.com',
      port: 443,
      path: '/v2/assets?action=registerUpload',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0',
        'Content-Length': Buffer.byteLength(registerBody)
      }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve(parsed);
        } catch (e) {
          reject(new Error('Failed to parse register response: ' + data));
        }
      });
    });

    req.on('error', reject);
    req.write(registerBody);
    req.end();
  });
}

// Step 2: Upload Video Binary
async function uploadBinary(uploadUrl, customHeaders) {
  console.log('[2/4] Uploading video binary to LinkedIn storage...');
  const fileBuffer = fs.readFileSync(videoFilePath);
  const parsedUrl = new URL(uploadUrl);

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: parsedUrl.hostname,
      port: 443,
      path: parsedUrl.pathname + parsedUrl.search,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Length': fileBuffer.length,
        ...customHeaders
      }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log(`[2/4] Binary uploaded successfully (HTTP ${res.statusCode})`);
          resolve(true);
        } else {
          reject(new Error(`Upload failed with HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(fileBuffer);
    req.end();
  });
}

// Step 3: Poll Asset Status until AVAILABLE
async function pollAssetStatus(assetUrn) {
  console.log(`[3/4] Polling asset status for ${assetUrn}...`);
  const assetId = assetUrn.replace('urn:li:digitalmediaAsset:', '');

  return new Promise((resolve, reject) => {
    const check = () => {
      const req = https.request({
        hostname: 'api.linkedin.com',
        port: 443,
        path: `/v2/assets/${assetId}`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'X-Restli-Protocol-Version': '2.0.0'
        }
      }, res => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            const status = parsed?.status;
            console.log(` -> Asset status: ${status}`);
            if (status === 'AVAILABLE') {
              resolve(parsed);
            } else if (status === 'CLIENT_ERROR' || status === 'SERVICE_ERROR') {
              reject(new Error(`Asset processing failed: ${data}`));
            } else {
              // Wait 4 seconds and check again
              setTimeout(check, 4000);
            }
          } catch (e) {
            reject(new Error('Failed to parse asset status: ' + data));
          }
        });
      });

      req.on('error', reject);
      req.end();
    };

    check();
  });
}

// Step 4: Create UGC Post with Video
async function publishUgcVideoPost(assetUrn) {
  console.log('[4/4] Creating LinkedIn UGC Video Post...');
  const postBody = JSON.stringify({
    author: personUrn,
    lifecycleState: 'PUBLISHED',
    specificContent: {
      'com.linkedin.ugc.ShareContent': {
        shareCommentary: {
          text: commentary
        },
        shareMediaCategory: 'VIDEO',
        media: [
          {
            status: 'READY',
            description: {
              text: 'How to fact-check any image or headline in 30 seconds with smartphone AI.'
            },
            media: assetUrn,
            title: {
              text: 'AI Life Hack #1: 30-Second Screenshot Fact Check 📲'
            }
          }
        ]
      }
    },
    visibility: {
      'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
    }
  });

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.linkedin.com',
      port: 443,
      path: '/v2/ugcPosts',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0',
        'Content-Length': Buffer.byteLength(postBody)
      }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve(parsed);
        } catch (e) {
          reject(new Error('Failed to parse post response: ' + data));
        }
      });
    });

    req.on('error', reject);
    req.write(postBody);
    req.end();
  });
}

export async function executeVideoPublish() {
  console.log('=== STARTING LINKEDIN VIDEO PUBLISH PIPELINE ===');
  const regResult = await registerVideoUpload();
  const uploadUrl = regResult.value.uploadMechanism['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'].uploadUrl;
  const headers = regResult.value.uploadMechanism['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'].headers || {};
  const assetUrn = regResult.value.asset;

  await uploadBinary(uploadUrl, headers);
  await pollAssetStatus(assetUrn);
  const postResult = await publishUgcVideoPost(assetUrn);
  
  console.log('=== LINKEDIN VIDEO POST PUBLISHED SUCCESSFULLY ===');
  console.log(JSON.stringify(postResult, null, 2));
  return postResult;
}

if (process.argv[1].endsWith('post-linkedin-video-hack1.js')) {
  executeVideoPublish().catch(err => {
    console.error('Fatal LinkedIn Video Publish Error:', err);
    process.exit(1);
  });
}

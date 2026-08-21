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

async function run() {
  try {
    const regResult = await registerVideoUpload();
    console.log('Register Result:', JSON.stringify(regResult, null, 2));
  } catch (err) {
    console.error('Error:', err);
  }
}

run();

import https from 'https';
import fs from 'fs';

const userToken = 'EAAT9dJ4m67cBSGR9Cu7ZASFH6pZCtFMNXlMkvl8NNGJporMq0QOUMFZAVy52z3xKACkhIb1sDIEgFLV2tZAzo3lPHUYGOnnWcjpJXBWSeKLUu0XhkFVpyaKUgaFcUWZB1zp4kkVZCFdWZC5EFHqBDCsD12Lg6BCjijWb4MScAyGDPZB6lUuT5uSRsSl9CHNztT9eBwd4ZCdOlJ6ddvLIxfcVhZB9WbzBXMBZBBIOfx8NxWgENx3ueRxSdJM3ouDXUpcWfdPJqEhp9qduIOMSupleYfVEgtosotZAdE9u1PgZD';
const pageId = '1207871262402389';
const igAccountId = '17841437512971881';

const slideImages = [
  'https://totalbiz.co.uk/carousel_slide_1.jpg',
  'https://totalbiz.co.uk/carousel_slide_2.jpg',
  'https://totalbiz.co.uk/carousel_slide_3.jpg'
];

const caption = `Enterprise-grade IT, web & tech strategy without the £10k agency price tag ⚙️ 💻

Meet Alex Poxon — founder of TotalBiz Support. 

After 20+ years managing high-stakes corporate IT infrastructure across HSBC, eBay, Schroders, and Gumtree, I built TotalBiz Support to bring that exact same discipline directly to local sole traders, growing businesses, and property owners.

Whether you need hands-on tech fixes across East Sussex, West Sussex, and Kent, or high-level remote strategy across the UK:

• Custom Websites & Web Apps
• On-Site IT, Wi-Fi & Hardware Fixes
• Admin, Bookkeeping & Invoicing Automation
• Bespoke Business Tools & AI

Swipe through to see our corporate track record and 4 core pillars ➡️

👉 Visit totalbiz.co.uk or drop us a DM to discuss your setup.

#SmallBusinessUK #ITConsulting #TechStrategy #SussexBusiness #KentBusiness #EastSussex #Heathfield #TotalBizSupport #InstagramCarousel`;

function fetchJson(url, options = {}, postData = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(data);
        }
      });
    });
    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

async function main() {
  console.log('=== 1. FETCHING PERMANENT PAGE & INSTAGRAM TOKEN ===');
  const pageUrl = `https://graph.facebook.com/v19.0/${pageId}?fields=access_token,name,instagram_business_account&access_token=${userToken}`;
  const pageRes = await fetchJson(pageUrl);
  console.log('Page Query Result:', pageRes);

  if (!pageRes.access_token) {
    throw new Error('Failed to get page token: ' + JSON.stringify(pageRes));
  }

  const pageToken = pageRes.access_token;
  console.log('\n=== PERMANENT PAGE ACCESS TOKEN EXTRACTED ===');
  console.log(pageToken);

  console.log('\n=== 2. CREATING CAROUSEL ITEM CONTAINERS ===');
  const childIds = [];
  for (let i = 0; i < slideImages.length; i++) {
    console.log(`Creating Slide ${i + 1} item container...`);
    const postData = new URLSearchParams({
      image_url: slideImages[i],
      is_carousel_item: 'true',
      access_token: pageToken
    }).toString();

    const itemRes = await fetchJson(`https://graph.facebook.com/v19.0/${igAccountId}/media`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, postData);

    console.log(`Slide ${i + 1} Item Result:`, itemRes);
    if (!itemRes.id) throw new Error('Item failed: ' + JSON.stringify(itemRes));
    childIds.push(itemRes.id);
  }

  console.log('\n=== 3. CREATING PARENT CAROUSEL CONTAINER ===');
  const parentData = new URLSearchParams({
    media_type: 'CAROUSEL',
    children: childIds.join(','),
    caption: caption,
    access_token: pageToken
  }).toString();

  const parentRes = await fetchJson(`https://graph.facebook.com/v19.0/${igAccountId}/media`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(parentData)
    }
  }, parentData);

  console.log('Parent Container Result:', parentRes);
  if (!parentRes.id) throw new Error('Parent failed: ' + JSON.stringify(parentRes));

  console.log('\n=== 4. PUBLISHING CAROUSEL TO INSTAGRAM ===');
  const pubData = new URLSearchParams({
    creation_id: parentRes.id,
    access_token: pageToken
  }).toString();

  // Wait 4s for Meta internal sync
  await new Promise(r => setTimeout(r, 4000));

  const pubRes = await fetchJson(`https://graph.facebook.com/v19.0/${igAccountId}/media_publish`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(pubData)
    }
  }, pubData);

  console.log('\n🎉 === FINAL INSTAGRAM CAROUSEL PUBLISH RESULT ===');
  console.log(pubRes);
}

main().catch(console.error);

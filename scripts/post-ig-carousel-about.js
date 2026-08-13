import https from 'https';

const igAccountId = '17841437512971881';
const pageToken = 'EAAT9dJ4m67cBSDpkk3W4am24Tl5U2EKmpyXbyDZCiqGaIqZCN6wZAc293ebKgWQEJy2S3KfbOv8TTSf3BYZCmYldoR35RUBStp3h2wRQRdmi0ZCyKWeENHMBPZA0qc2VAB70bSGKDzB3kwS6MZCiJQAfC7VZCli4qAqu0Lr2nT77bAHMDWSQr2KeW6G3ARKv9Mk3meUjdYsMFivZBnT80nNRQL0WB3XKgjsEjwiLd27ktPLceMFNp9JikZAZCR8GwZDZD';

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

function createCarouselItem(imageUrl) {
  return new Promise((resolve, reject) => {
    const postData = new URLSearchParams({
      image_url: imageUrl,
      is_carousel_item: 'true',
      access_token: pageToken
    }).toString();

    const req = https.request({
      hostname: 'graph.facebook.com',
      port: 443,
      path: `/v19.0/${igAccountId}/media`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const parsed = JSON.parse(data);
        if (parsed.id) resolve(parsed.id);
        else reject(new Error('Failed creating item: ' + data));
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

function createParentCarousel(childIds, captionText) {
  return new Promise((resolve, reject) => {
    const postData = new URLSearchParams({
      media_type: 'CAROUSEL',
      children: childIds.join(','),
      caption: captionText,
      access_token: pageToken
    }).toString();

    const req = https.request({
      hostname: 'graph.facebook.com',
      port: 443,
      path: `/v19.0/${igAccountId}/media`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const parsed = JSON.parse(data);
        if (parsed.id) resolve(parsed.id);
        else reject(new Error('Failed creating parent carousel: ' + data));
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

function publishMedia(containerId) {
  return new Promise((resolve, reject) => {
    const postData = new URLSearchParams({
      creation_id: containerId,
      access_token: pageToken
    }).toString();

    const req = https.request({
      hostname: 'graph.facebook.com',
      port: 443,
      path: `/v19.0/${igAccountId}/media_publish`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve(JSON.parse(data));
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function run() {
  console.log('=== PUBLISHING INSTAGRAM PINNED CAROUSEL ===\n');
  
  console.log('1. Creating 3 carousel child item containers...');
  const childIds = [];
  for (let i = 0; i < slideImages.length; i++) {
    console.log(`Creating slide ${i + 1} container for: ${slideImages[i]}...`);
    const id = await createCarouselItem(slideImages[i]);
    console.log(`Slide ${i + 1} Item ID: ${id}`);
    childIds.push(id);
  }

  console.log('\n2. Creating parent Carousel container with children:', childIds);
  const carouselContainerId = await createParentCarousel(childIds, caption);
  console.log(`Parent Carousel Container ID: ${carouselContainerId}`);

  console.log('\n3. Publishing Carousel to @totalbiz_support Instagram feed...');
  // Brief 3s pause for Meta container sync
  await new Promise(r => setTimeout(r, 3000));
  const publishResult = await publishMedia(carouselContainerId);
  console.log('\n=== CAROUSEL PUBLISH RESULT ===');
  console.log(publishResult);
}

run().catch(console.error);

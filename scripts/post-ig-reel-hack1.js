import https from 'https';

const igAccountId = '17841437512971881';
const pageToken = 'EAAT9dJ4m67cBSDpkk3W4am24Tl5U2EKmpyXbyDZCiqGaIqZCN6wZAc293ebKgWQEJy2S3KfbOv8TTSf3BYZCmYldoR35RUBStp3h2wRQRdmi0ZCyKWeENHMBPZA0qc2VAB70bSGKDzB3kwS6MZCiJQAfC7VZCli4qAqu0Lr2nT77bAHMDWSQr2KeW6G3ARKv9Mk3meUjdYsMFivZBnT80nNRQL0WB3XKgjsEjwiLd27ktPLceMFNp9JikZAZCR8GwZDZD';
const publicVideoUrl = 'https://totalbiz.co.uk/TotalBiz_Support_AI_Life_Hack_1_FINAL.mp4';

const caption = `Stop falling for fake news or edited photos on your feed! 🛑

Here’s how to use your phone’s built-in AI to fact-check any image or post in 3 seconds flat. 📲 💡

1️⃣ Take a screenshot
2️⃣ Share it with Google Gemini
3️⃣ Type "Fact check"

Enterprise tech & AI made simple for everyday people and small businesses.

👉 Visit totalbiz.co.uk for more practical tech support.

#AILifeHacks #TechTips #SmallBusinessUK #AndroidHacks #TotalBizSupport #EastSussex #Kent #InstagramReels`;

async function publishInstagramReel() {
  console.log('Step 1: Creating Instagram Reel Container via Meta Graph API...');
  
  const createContainerUrl = `https://graph.facebook.com/v19.0/${igAccountId}/media`;
  const postData = new URLSearchParams({
    media_type: 'REELS',
    video_url: publicVideoUrl,
    caption: caption,
    access_token: pageToken
  }).toString();

  const req = https.request(createContainerUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  }, res => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', async () => {
      console.log('=== CONTAINER CREATION RESULT ===');
      console.log(data);
      const parsed = JSON.parse(data);
      if (parsed.id) {
        console.log(`Container created! ID: ${parsed.id}`);
        console.log('Waiting 10 seconds for Meta video processing before publishing...');
        setTimeout(() => publishContainer(parsed.id), 10000);
      } else {
        console.error('Failed to create container:', parsed);
      }
    });
  });

  req.on('error', e => console.error('Container Creation Error:', e));
  req.write(postData);
  req.end();
}

function publishContainer(containerId) {
  console.log(`Step 2: Publishing Instagram Reel Container (${containerId})...`);
  
  const publishUrl = `https://graph.facebook.com/v19.0/${igAccountId}/media_publish`;
  const postData = new URLSearchParams({
    creation_id: containerId,
    access_token: pageToken
  }).toString();

  const req = https.request(publishUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  }, res => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log('=== INSTAGRAM REEL PUBLISH RESULT ===');
      console.log(data);
    });
  });

  req.on('error', e => console.error('Publish Error:', e));
  req.write(postData);
  req.end();
}

publishInstagramReel();

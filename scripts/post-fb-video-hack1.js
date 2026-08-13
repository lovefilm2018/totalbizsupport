import https from 'https';

const pageId = '1207871262402389';
const pageToken = 'EAAT9dJ4m67cBSDpkk3W4am24Tl5U2EKmpyXbyDZCiqGaIqZCN6wZAc293ebKgWQEJy2S3KfbOv8TTSf3BYZCmYldoR35RUBStp3h2wRQRdmi0ZCyKWeENHMBPZA0qc2VAB70bSGKDzB3kwS6MZCiJQAfC7VZCli4qAqu0Lr2nT77bAHMDWSQr2KeW6G3ARKv9Mk3meUjdYsMFivZBnT80nNRQL0WB3XKgjsEjwiLd27ktPLceMFNp9JikZAZCR8GwZDZD';
const videoUrl = 'https://totalbiz.co.uk/TotalBiz_Support_AI_Life_Hack_1_FINAL.mp4';

const caption = `Stop falling for fake news or edited photos on your feed! 🛑

Here’s how to use your phone’s built-in AI to fact-check any image or post in just a few taps. 📲 💡

1️⃣ Take a screenshot
2️⃣ Share it with Google Gemini
3️⃣ Type "Fact check"

Enterprise tech & AI made simple for everyday people and small businesses.

👉 Visit totalbiz.co.uk for hands-on local IT support and remote tech consulting.

#AILifeHacks #TechTips #SmallBusinessUK #AndroidHacks #TotalBizSupport #EastSussex #Kent #SussexBusiness`;

console.log('Publishing AI Life Hack 1 video to Facebook Page...');

const postData = new URLSearchParams({
  file_url: videoUrl,
  description: caption,
  title: 'AI Life Hack 1: Fact Check Social Media Posts in Just a Few Taps',
  access_token: pageToken
}).toString();

const req = https.request({
  hostname: 'graph.facebook.com',
  port: 443,
  path: `/v19.0/${pageId}/videos`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }
}, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('=== FACEBOOK PAGE VIDEO PUBLISH RESULT ===');
    console.log(data);
  });
});

req.on('error', e => console.error('Facebook Video Publish Error:', e));
req.write(postData);
req.end();

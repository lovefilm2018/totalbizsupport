import https from 'https';

const serviceUrl = 'https://totalbiz-social-poster-x2gt3erp4a-nw.a.run.app';

const linkedInCopy = `How to use your phone's built-in AI to fact-check fake news, viral claims & edited photos in just a few taps 📱💡

We've all seen viral social posts, dramatic screenshots, or questionable business news circulating on our feeds. 

Before sharing or acting on dubious claims, you don't need complex investigative software—you just need the AI assistant already sitting in your pocket.

Here is AI Life Hack #1:
1️⃣ Take a screenshot of the post, claim, or image.
2️⃣ Share it with Google Gemini (or tap "Ask about this screen").
3️⃣ Type: "Fact check"

Gemini scans verified web sources, cross-references recent reporting, and breaks down whether the claim is confirmed, disputed, or completely fabricated.

At TotalBiz Support, we believe enterprise technology and AI shouldn't be reserved for tech giants. We help small businesses, sole traders, and property owners across Sussex, Kent, and the UK cut through the noise and leverage modern tech simply.

👉 totalbiz.co.uk

#AILifeHacks #TechStrategy #SmallBusinessUK #ArtificialIntelligence #GoogleGemini #SussexBusiness #KentBusiness #TotalBizSupport`;

const payload = JSON.stringify({
  linkedin: {
    text: linkedInCopy
  }
});

const url = new URL(`${serviceUrl}/queue/update`);

console.log('Sending updated LinkedIn copy to GCP Cloud Run Poster...');

const req = https.request({
  hostname: url.hostname,
  port: 443,
  path: url.pathname,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload)
  }
}, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('=== GCP CLOUD RUN QUEUE UPDATE SUCCESS ===');
    console.log(data);
  });
});

req.on('error', e => console.error('Queue Update Error:', e));
req.write(payload);
req.end();

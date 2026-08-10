import https from 'https';
import querystring from 'querystring';

const pageToken = 'EAAT9dJ4m67cBSD4Ky8Irx7IrLdXmvyydZBhTZB579sbA6EQjptBQYt1NVeACagGlKMgpGZAfHcYGszixYZB3zXiPUJSVuwXRIqVujwJ3B9EyWOthYc7phBQZC0ZCEztRH0waDPdLRUvxir0ZAZAbUxrEZAoblP09dSeZBUUUucqwDsZCLazMS28Ahv8VXxJp0AInbm7vMZA8VCaqPUNmcZBjBWKe26fZBBAZBbk1njXfyC2DX1kbVFfNLTfJoRVUQZDZD';
const pageId = '1207871262402389';

const messageText = `After 20+ years navigating corporate IT, systems strategy, and digital operations across global brands like HSBC, eBay, and AXA, I kept seeing the exact same problem:

Small business owners, sole traders, and property hosts are drowning in operational chaos.

They buy expensive software they don't have time to configure. Their Wi-Fi drops during critical calls. Paperwork eats their weekends. And web agencies charge thousands for pretty storefronts without integrating back-office tools.

That’s why I launched TotalBiz Support right here in Heathfield, East Sussex.

Think of us as the 'Rolls-Royce mechanic for small business.'

Whether you need:
🔧 On-site Mesh Wi-Fi & smart lock setups (East Sussex)
💻 Custom web design & mobile app development (UK-wide via Google Meet)
📈 Target Operating Model (TOM) & Fractional COO strategy
📋 HMRC tax & invoicing admin organization

We deliver enterprise-grade discipline at small business prices—with zero corporate bloat or tech jargon.

Check out our full service catalog at totalbiz.co.uk or drop me a direct message!

#SmallBusinessUK #EastSussex #TechSupport #Operations #WebDesign #Heathfield #TotalBiz`;

const postData = querystring.stringify({
  message: messageText,
  access_token: pageToken
});

const req = https.request({
  hostname: 'graph.facebook.com',
  port: 443,
  path: `/${pageId}/feed`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }
}, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('=== FACEBOOK API POST RESULT ===');
    console.log(data);
  });
});

req.on('error', e => console.error('Post Error:', e));
req.write(postData);
req.end();

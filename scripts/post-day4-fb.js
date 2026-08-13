import https from 'https';
import querystring from 'querystring';

const pageToken = 'EAAT9dJ4m67cBSLzxt5qOn3vP9z6MTGgdKG3fjeYsoCAhH4tmx8ZBe4xP5dihZCbZAclzoBuTDePZBxOtiu83GLrsQjmvyxITD0jRhGUthZAF571I0gzo1mBO8woiYVbQFM3mZC9mJ7o4ZAfC04JuCZCZAfJZCK2J7ZACASLIRZCSYd2d8ur6ZC5SpOYRgO4xLRmhueCMJd9WPfz0r6iZB31E9ePwZDZD';
const pageId = '1207871262402389';

const messageText = `Why your small business shouldn't pay £5,000–£10,000 for a website (and how enterprise architecture cuts dev costs by 60%) 🚀💻

If you've asked a traditional UK marketing agency for a web or mobile app quote recently, you've probably seen quotes ranging from £5,000 up to £15,000 for standard builds. 

Why do traditional agencies charge so much? Account managers, overheads, fancy offices, and multi-layered project bloat.

At TotalBiz Support, we take a different approach:
Enterprise UK Leadership + White-Label Near-Offshore Execution.

Here's how it works for your business:
1️⃣ Local Accountable Direction: You work directly with Alex Poxon (20+ years enterprise corporate IT background at HSBC, eBay, Schroders, Gumtree), based right here in East Sussex.
2️⃣ High-Speed Near-Offshore Dev Team: Our vetted engineering partners handle the backend build at near-offshore developer rates (~£15/hr), cutting your direct costs by over 60%.
3️⃣ Enterprise-Grade Delivery: You get custom, lightning-fast web builds, Shopify stores, and iOS/Android mobile apps—without the agency markup.

Whether you're a sole trader in Sussex or Kent needing a crisp new website, or a growing business building a custom client app across the UK, we deliver enterprise-grade results at small business prices.

👉 Get a transparent project quote today: totalbiz.co.uk
📞 Direct chat on WhatsApp: wa.me/447799538311

#SmallBusinessUK #WebDevelopment #AppDevelopment #SussexBusiness #KentBusiness #TechStrategy #TotalBizSupport`;

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
    console.log('=== FACEBOOK DAY 4 POST RESULT ===');
    console.log(data);
  });
});

req.on('error', e => console.error('Post Error:', e));
req.write(postData);
req.end();

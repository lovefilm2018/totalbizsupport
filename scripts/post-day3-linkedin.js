import https from 'https';

const accessToken = 'AQU8lBLIfjFyADP-a-zGe8cRHC2wzU9y7zHRpJinLqMfVNjLzha4eSKxf26p4cV8aSncBsUwCPzKLqlE-JXg8swlmnMJlXiIGnZb-a0-K9n67s6TUxPPA_fWqwj17TyxX2dshWnb-fsafb5FBORdm20d7A9EQZqQ56Ksf0R_yXAK71GcTZg_b4t7z2poh8ZXIXHZamn3H7bU8ojR0V0t60Aowl6RJrTFkn6g3UGRXW_Yzou3E2dpLpERrw-CtImOb3q3QW-DDKy90f9hoew_3mFmgASqFUDqb6b93eHhAj3sHQAWQhyCq-jUfkyNPoRmqXl2LZMXo_r43VFPLSiQe9SGyBsIMA';
const personUrn = 'urn:li:person:pACLfBlITP';

const messageText = `Why sole traders & small firms don't need a 5-man IT department—they need 1 reliable partner with corporate discipline 🛠️⚙️

When you run a small business, property portfolio, or sole-trader practice, you hit a classic tech trap:

Option A: You sign up with a big Managed Service Provider (MSP). They put you on a £500+/mo retainer, assign junior helpdesk staff to your tickets, and charge extra for every basic request.
Option B: You try to do everything yourself late at night—troubleshooting Wi-Fi, managing admin, building a website, and fixing printer drivers—sacrificing your free time.

Having spent 20+ years managing high-stakes IT infrastructure across HSBC, eBay, Schroders, and Gumtree, I built TotalBiz Support to bridge that gap.

Small businesses don't need corporate bloat or multi-tiered helpdesks. They need:
✅ Enterprise-grade discipline (structured backups, clean security, reliable web builds)
✅ Pragmatic, jargon-free execution (straight answers, transparent pricing, fast turnarounds)
✅ One trusted partner who handles digital presence, hardware, bookkeeping, and tech strategy under one roof.

Whether you need hands-on on-site setup in East Sussex, West Sussex, or Kent, or remote consultancy across the UK, we keep your business running smoothly without agency prices.

👉 totalbiz.co.uk

#SmallBusinessUK #TechStrategy #ITConsulting #SussexBusiness #KentBusiness #SoleTraderSupport #TotalBizSupport`;

const postBody = JSON.stringify({
  author: personUrn,
  lifecycleState: "PUBLISHED",
  specificContent: {
    "com.linkedin.ugc.ShareContent": {
      shareCommentary: {
        text: messageText
      },
      shareMediaCategory: "NONE"
    }
  },
  visibility: {
    "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
  }
});

console.log('Sending LinkedIn Personal Profile Day 3 Post request...');
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
    console.log('=== LINKEDIN DAY 3 POST RESULT ===');
    console.log(data);
  });
});

req.on('error', e => console.error(e));
req.write(postBody);
req.end();

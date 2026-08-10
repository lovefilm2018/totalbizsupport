import https from 'https';

const accessToken = 'AQU8lBLIfjFyADP-a-zGe8cRHC2wzU9y7zHRpJinLqMfVNjLzha4eSKxf26p4cV8aSncBsUwCPzKLqlE-JXg8swlmnMJlXiIGnZb-a0-K9n67s6TUxPPA_fWqwj17TyxX2dshWnb-fsafb5FBORdm20d7A9EQZqQ56Ksf0R_yXAK71GcTZg_b4t7z2poh8ZXIXHZamn3H7bU8ojR0V0t60Aowl6RJrTFkn6g3UGRXW_Yzou3E2dpLpERrw-CtImOb3q3QW-DDKy90f9hoew_3mFmgASqFUDqb6b93eHhAj3sHQAWQhyCq-jUfkyNPoRmqXl2LZMXo_r43VFPLSiQe9SGyBsIMA';
const personUrn = 'urn:li:person:pACLfBlITP';

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

console.log('Sending LinkedIn Personal Profile Post request...');
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
    console.log('=== LINKEDIN POST RESULT ===');
    console.log(data);
  });
});

req.on('error', e => console.error(e));
req.write(postBody);
req.end();

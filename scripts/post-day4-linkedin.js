import https from 'https';

const accessToken = 'AQU8lBLIfjFyADP-a-zGe8cRHC2wzU9y7zHRpJinLqMfVNjLzha4eSKxf26p4cV8aSncBsUwCPzKLqlE-JXg8swlmnMJlXiIGnZb-a0-K9n67s6TUxPPA_fWqwj17TyxX2dshWnb-fsafb5FBORdm20d7A9EQZqQ56Ksf0R_yXAK71GcTZg_b4t7z2poh8ZXIXHZamn3H7bU8ojR0V0t60Aowl6RJrTFkn6g3UGRXW_Yzou3E2dpLpERrw-CtImOb3q3QW-DDKy90f9hoew_3mFmgASqFUDqb6b93eHhAj3sHQAWQhyCq-jUfkyNPoRmqXl2LZMXo_r43VFPLSiQe9SGyBsIMA';
const personUrn = 'urn:li:person:pACLfBlITP';

const messageText = `How we built a Google Cloud dynamic pricing engine for Airbnb hosts—and why custom tech strategy beats off-the-shelf software 📊🏠

Most short-term rental hosts and boutique stay operators face a constant dilemma:
Set fixed nightly rates and miss out on major demand surges (e.g. event weekends where rates jump from £100 to £400), or spend hours manually checking competitor listings on Airbnb and Booking.com.

Off-the-shelf dynamic pricing software exists, but it's often bloated, confusing, and full of monthly percentage cuts.

So we built a proprietary solution on Google Cloud:

💡 The Architecture:
1️⃣ Cloud Run Scraper Engine: Daily automated execution tracking 60-day competitor rates across local market properties.
2️⃣ Anomaly & Demand Spike Detection: Real-time detection of local inventory drops and price surges.
3️⃣ Automated Webhook Alerts: Instant notifications dispatching optimal rate recommendations straight to host inboxes.

Live Case Study: 
This exact engine is currently driving revenue optimization for Bijou Coastal Stays in Worthing, West Sussex—maximizing occupancy while capturing peak weekend rate premiums completely hands-free.

At TotalBiz Support, we combine 20+ years of corporate IT architecture (HSBC, eBay, Schroders, Gumtree) with practical solutions for small businesses, landlords, and sole traders.

Whether you need bespoke automation, dynamic price scrapers, or complete IT and digital management, we bring enterprise technology within small business reach.

👉 Read how we work: totalbiz.co.uk

#ShortTermRentals #AirbnbHost #PropTech #GoogleCloud #Automation #SussexBusiness #TotalBizSupport`;

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

console.log('Sending LinkedIn Personal Profile Day 4 Post request...');
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
    console.log('=== LINKEDIN DAY 4 POST RESULT ===');
    console.log(data);
  });
});

req.on('error', e => console.error(e));
req.write(postBody);
req.end();

import https from 'https';

const accessToken = 'AQU8lBLIfjFyADP-a-zGe8cRHC2wzU9y7zHRpJinLqMfVNjLzha4eSKxf26p4cV8aSncBsUwCPzKLqlE-JXg8swlmnMJlXiIGnZb-a0-K9n67s6TUxPPA_fWqwj17TyxX2dshWnb-fsafb5FBORdm20d7A9EQZqQ56Ksf0R_yXAK71GcTZg_b4t7z2poh8ZXIXHZamn3H7bU8ojR0V0t60Aowl6RJrTFkn6g3UGRXW_Yzou3E2dpLpERrw-CtImOb3q3QW-DDKy90f9hoew_3mFmgASqFUDqb6b93eHhAj3sHQAWQhyCq-jUfkyNPoRmqXl2LZMXo_r43VFPLSiQe9SGyBsIMA';
const personUrn = 'urn:li:person:pACLfBlITP';

const messageText = `The 3 hidden costs behind bloated UK web agency quotes (and how white-label project management saves 60%) 💡💼

When small business owners or growing firms ask for a web design or custom mobile app quote, they are often quoted £8,000 to £25,000+.

Having spent 20+ years delivering major tech transformations across HSBC, eBay, and AXA, here is what you are actually paying for in those agency quotes:

1. Account Executive & Overhead Markup — You pay for their fancy office rent, multiple account managers, and pitch decks.
2. Scope Creep & Misalignment — Non-technical project managers acting as middlemen, resulting in endless revision rounds and billable scope additions.
3. Lock-in & Hosting Bloat — Proprietary CMS platforms charging monthly retainer fees just for basic content tweaks.

The Modern Alternative? Structured Senior PM Oversight + White-Label Engineering.

At TotalBiz Support, we handle high-level Target Operating Model (TOM) design, architecture, and project management directly. We pair client briefs with elite white-label dev partners, delivering custom websites, iOS/Android apps, and workflow tools at a fraction of agency rates—with enterprise-grade quality control.

No fluff. No agency markups. Just clean delivery on time and on budget.

Navigating a digital or app project? Let's discuss it over Google Meet or in person across Sussex & Kent.

👉 totalbiz.co.uk

#WebDevelopment #AppDevelopment #ProjectManagement #SmallBusinessUK #TechStrategy #TotalBizSupport`;

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

console.log('Sending LinkedIn Personal Profile Day 2 Post request...');
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
    console.log('=== LINKEDIN DAY 2 POST RESULT ===');
    console.log(data);
  });
});

req.on('error', e => console.error(e));
req.write(postBody);
req.end();

import https from 'https';

const accessToken = 'AQU8lBLIfjFyADP-a-zGe8cRHC2wzU9y7zHRpJinLqMfVNjLzha4eSKxf26p4cV8aSncBsUwCPzKLqlE-JXg8swlmnMJlXiIGnZb-a0-K9n67s6TUxPPA_fWqwj17TyxX2dshWnb-fsafb5FBORdm20d7A9EQZqQ56Ksf0R_yXAK71GcTZg_b4t7z2poh8ZXIXHZamn3H7bU8ojR0V0t60Aowl6RJrTFkn6g3UGRXW_Yzou3E2dpLpERrw-CtImOb3q3QW-DDKy90f9hoew_3mFmgASqFUDqb6b93eHhAj3sHQAWQhyCq-jUfkyNPoRmqXl2LZMXo_r43VFPLSiQe9SGyBsIMA';
const personUrn = 'urn:li:person:pACLfBlITP';

const text = `Why 90% of small business "growth pain" isn't a lack of hustle — it's broken operational workflows.

When managing corporate IT infrastructure across HSBC, eBay, Schroders, and Gumtree, I saw firsthand that complexity kills velocity.

Local sole traders and growing businesses face the exact same problem, just without a 20-person systems team to untangle it:

❌ 5 different software tools that don't speak to each other
❌ Manual copy-pasting of customer invoices between spreadsheets and accounting software
❌ Critical business knowledge trapped in one person's WhatsApp chats
❌ Expensive monthly subscriptions running on auto-pilot for ex-contractors

You don't need a £10,000 agency consultation or more apps to fix this.

You need pragmatic systems thinking:
1. Audit your tech stack to remove duplicate subscriptions.
2. Automate handoffs between booking, invoicing, and customer follow-up.
3. Consolidate your core tools so you have 1 single source of truth.

Enterprise discipline doesn't have to mean enterprise bloat or enterprise prices.

What's the one manual task in your business you wish you could automate tomorrow?

#SmallBusinessUK #Operations #TechStrategy #BusinessGrowth #UKBusiness #Productivity #TotalBizSupport`;

const postBody = JSON.stringify({
  author: personUrn,
  lifecycleState: 'PUBLISHED',
  specificContent: {
    'com.linkedin.ugc.ShareContent': {
      shareCommentary: {
        text: text
      },
      shareMediaCategory: 'NONE'
    }
  },
  visibility: {
    'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
  }
});

console.log('Publishing Friday Morning LinkedIn post...');

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
    console.log(`[HTTP ${res.statusCode}] Result:`, data);
  });
});

req.on('error', e => console.error('Error:', e));
req.write(postBody);
req.end();

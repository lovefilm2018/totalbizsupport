import https from 'https';

const personalToken = 'AQU8lBLIfjFyADP-a-zGe8cRHC2wzU9y7zHRpJinLqMfVNjLzha4eSKxf26p4cV8aSncBsUwCPzKLqlE-JXg8swlmnMJlXiIGnZb-a0-K9n67s6TUxPPA_fWqwj17TyxX2dshWnb-fsafb5FBORdm20d7A9EQZqQ56Ksf0R_yXAK71GcTZg_b4t7z2poh8ZXIXHZamn3H7bU8ojR0V0t60Aowl6RJrTFkn6g3UGRXW_Yzou3E2dpLpERrw-CtImOb3q3QW-DDKy90f9hoew_3mFmgASqFUDqb6b93eHhAj3sHQAWQhyCq-jUfkyNPoRmqXl2LZMXo_r43VFPLSiQe9SGyBsIMA';
const personUrn = 'urn:li:person:pACLfBlITP';

const orgToken = 'AQVUnsRWybq0VT8KcIrxUboH26Hae5v_PKQ6-Y8-lI_VOcVVARgZtrNgccCs8MhdpwMF7vPH-qAOlGx8SWdOWjzeoWhEeuoSmowVbjMZc54MTrSrgFaU2CQM5NraUHBHgV4auRtjHh9pMs4fDiOELQplNmeQIJG3Swsap1_hzdG3sckXTHQ_hDKNrq6w6ZfCPEXWOVDTdAha3GmcwvkTAT1Ub2InV-6MucZ3PbDFj-4eXi0ToaMfP1VJyKZw77OQ7jvgUR-ShC5-of5LF6jL4szeh91p_H2MAW71h-TtO-y2pwA3bg-I7xDynl6VdJWbzPfZ4Ru3ANfxxLsm48CCyy2yvo-5Jw';
const orgUrn = 'urn:li:organization:130184035';

const text = `Most small business owners think they need to hire more staff.

In reality, 90% of the time, they just need to fix their operational workflows.

Having spent 20+ years leading technology and operational programmes across global enterprise organisations (HSBC, eBay, Schroders, Gumtree), I saw this exact pattern repeatedly:

When a small business grows from 3 to 10 people:
1. Communication scatters across WhatsApp, SMS, and 4 disconnected inboxes.
2. Critical customer details live in one person's head instead of a central system.
3. Team members spend 2 hours a day manually copy-pasting data between spreadsheets and accounting software.

The natural reflex is to hire another administrator to "manage the chaos".

⚠️ But adding headcount to a broken process doesn't scale your business — it just scales the chaos.

The fix isn't complicated or expensive:
• Centralise client intake into 1 structured funnel.
• Automate booking confirmations and invoice reminders.
• Consolidate your core tools so you have a single source of truth.

Enterprise operational discipline doesn't require enterprise bloat or agency prices.

If your systems feel like they're running you instead of the other way around, let's connect.

🔗 Explore our approach at totalbiz.co.uk or drop me a direct message here on LinkedIn.

#SmallBusinessUK #OperationalExcellence #TechStrategy #FractionalIT #ProcessImprovement #BusinessAutomation #TotalBizSupport #SussexBusiness #UKBusiness`;

async function publishPost(token, authorUrn) {
  const postBody = JSON.stringify({
    author: authorUrn,
    lifecycleState: 'PUBLISHED',
    specificContent: {
      'com.linkedin.ugc.ShareContent': {
        shareCommentary: { text: text },
        shareMediaCategory: 'NONE'
      }
    },
    visibility: { 'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC' }
  });

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.linkedin.com',
      port: 443,
      path: '/v2/ugcPosts',
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0',
        'Content-Length': Buffer.byteLength(postBody)
      }
    }, res => {
      let d = '';
      res.on('data', chunk => d += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(d);
          if (parsed.status && parsed.status >= 400) {
            reject(new Error(`LinkedIn API Error ${parsed.status}: ${d}`));
          } else {
            resolve(parsed);
          }
        } catch (e) {
          resolve({ raw: d });
        }
      });
    });
    req.on('error', reject);
    req.write(postBody);
    req.end();
  });
}

(async () => {
  console.log('1. Publishing to Alex Poxon Personal Profile...');
  try {
    const resPersonal = await publishPost(personalToken, personUrn);
    console.log('✅ Personal Profile Published Successfully!');
    console.log('URN:', resPersonal.id || resPersonal);
  } catch (err) {
    console.error('❌ Personal Profile Error:', err.message);
  }

  console.log('\n2. Publishing to TotalBiz Support Company Page...');
  try {
    const resOrg = await publishPost(orgToken, orgUrn);
    console.log('✅ TotalBiz Company Page Published Successfully!');
    console.log('URN:', resOrg.id || resOrg);
  } catch (err) {
    console.error('❌ Company Page Error:', err.message);
  }
})();

import https from 'https';

const ORG_TOKEN = process.env.LINKEDIN_ORG_TOKEN || 'AQVUnsRWybq0VT8KcIrxUboH26Hae5v_PKQ6-Y8-lI_VOcVVARgZtrNgccCs8MhdpwMF7vPH-qAOlGx8SWdOWjzeoWhEeuoSmowVbjMZc54MTrSrgFaU2CQM5NraUHBHgV4auRtjHh9pMs4fDiOELQplNmeQIJG3Swsap1_hzdG3sckXTHQ_hDKNrq6w6ZfCPEXWOVDTdAha3GmcwvkTAT1Ub2InV-6MucZ3PbDFj-4eXi0ToaMfP1VJyKZw77OQ7jvgUR-ShC5-of5LF6jL4szeh91p_H2MAW71h-TtO-y2pwA3bg-I7xDynl6VdJWbzPfZ4Ru3ANfxxLsm48CCyy2yvo-5Jw';
const ORG_URN = 'urn:li:organization:130184035';

export async function publishToLinkedInCompany(text) {
  const postBody = JSON.stringify({
    author: ORG_URN,
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
        'Authorization': `Bearer ${ORG_TOKEN}`,
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

// Standalone execution test
if (process.argv[1] && process.argv[1].endsWith('post-linkedin-company.js') && process.argv[2]) {
  publishToLinkedInCompany(process.argv[2])
    .then(res => console.log('Successfully published to TotalBiz Company Page:', res))
    .catch(err => console.error('Publish error:', err));
}

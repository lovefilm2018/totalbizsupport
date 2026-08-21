import https from 'https';

const inputToken = 'EAAT9dJ4m67cBSKID80sFB7ZAKauNVkkcNpk6HMLsGtrgmFHVbC7GXblv8u1yf9Vu9E6LY0wVmCqZBZAaYJj2BeS2ocUAhZCpMrwuT9p4CmrQzGrfBaXZBZCbi6MeR1V3H7eRKYZBG1BqpZAXGYY8ZCncXaR5KauZCBpXRRxsSbNYf7a5qQdZAbbiPSGZBQu23aWzKMbesJvSToybnLW6Jum5Vs3nvAX7BU7OyZACFThsujHEcU245XJoEogZDZD';
const reelMediaId = '18111994949053451';
const carouselMediaId = '17925715092167780';

// Step 1: Query accounts to get Page Access Token
function getAccounts() {
  return new Promise((resolve, reject) => {
    const url = `https://graph.facebook.com/v19.0/me/accounts?fields=id,name,access_token,instagram_business_account&access_token=${inputToken}`;
    https.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

function fetchInstagramStats(mediaId, token) {
  return new Promise((resolve) => {
    const url = `https://graph.facebook.com/v19.0/${mediaId}?fields=id,media_type,media_product_type,caption,timestamp,like_count,comments_count,permalink&access_token=${token}`;
    https.get(url, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        let media = {};
        try { media = JSON.parse(data); } catch(e) {}
        
        // Insights
        const iUrl = `https://graph.facebook.com/v19.0/${mediaId}/insights?metric=plays,reach,saved,shares,total_interactions&access_token=${token}`;
        https.get(iUrl, iRes => {
          let iData = '';
          iRes.on('data', ic => iData += ic);
          iRes.on('end', () => {
            let insights = {};
            try { insights = JSON.parse(iData); } catch(e) {}
            resolve({ media, insights });
          });
        });
      });
    }).on('error', e => resolve({ error: e.message }));
  });
}

async function run() {
  console.log('1. Resolving Page & Instagram tokens...');
  const accResult = await getAccounts();
  console.log('Accounts Result:', JSON.stringify(accResult, null, 2));

  let pageToken = inputToken;
  if (accResult?.data && accResult.data.length > 0) {
    pageToken = accResult.data[0].access_token;
    console.log('\nExtracted Page Token:', pageToken);
  }

  console.log('\n2. Querying Live Video & Reel Insights...');
  const reelData = await fetchInstagramStats(reelMediaId, pageToken);
  console.log('\n=== REEL INSIGHTS ===');
  console.log(JSON.stringify(reelData, null, 2));

  const carouselData = await fetchInstagramStats(carouselMediaId, pageToken);
  console.log('\n=== CAROUSEL INSIGHTS ===');
  console.log(JSON.stringify(carouselData, null, 2));
}

run();

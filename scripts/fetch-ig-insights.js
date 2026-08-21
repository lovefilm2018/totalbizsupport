import https from 'https';

const pageToken = 'EAAT9dJ4m67cBSDn5peGzsdPB6kPMZBwKLN4Atmk1TGRl0rzwTPQJZAvH22S7YMG89uOGPV3UeAJyI5SlvTKL2hFfvIc6sl7EYac0Of7ZA5oI8lf6ZAiZAkvdGS53RNqLDxonIror7NtRUj9qkZBgxho4hsaUPfJMViYnaAhXDFFkKLg0EyvMd6ALjN3XUzDr2f6yCCzyqVKNz2uj9wr4Pkx58FKK15VnB1ay0FIXQZCZAdor6nAsdX4P';
const reelMediaId = '18111994949053451';
const carouselMediaId = '17925715092167780';

function fetchMediaStats(mediaId, label) {
  return new Promise((resolve) => {
    const url = `https://graph.facebook.com/v19.0/${mediaId}?fields=id,media_type,media_product_type,caption,timestamp,like_count,comments_count,permalink&access_token=${pageToken}`;
    
    https.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        let mediaData = {};
        try { mediaData = JSON.parse(data); } catch(e) {}

        const insightsUrl = `https://graph.facebook.com/v19.0/${mediaId}/insights?metric=plays,reach,saved,shares,total_interactions&access_token=${pageToken}`;
        
        https.get(insightsUrl, iRes => {
          let iData = '';
          iRes.on('data', chunk => iData += chunk);
          iRes.on('end', () => {
            let insights = {};
            try {
              insights = JSON.parse(iData);
            } catch (e) {}
            resolve({ label, mediaData, insights });
          });
        });
      });
    }).on('error', e => resolve({ label, error: e.message }));
  });
}

async function run() {
  const reel = await fetchMediaStats(reelMediaId, 'AI Life Hack #1 Reel');
  const carousel = await fetchMediaStats(carouselMediaId, 'Brand Carousel');

  console.log('\n=== REEL DATA ===');
  console.log(JSON.stringify(reel, null, 2));

  console.log('\n=== CAROUSEL DATA ===');
  console.log(JSON.stringify(carousel, null, 2));
}

run();

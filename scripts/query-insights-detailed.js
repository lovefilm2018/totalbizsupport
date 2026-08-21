import https from 'https';

const pageToken = 'EAAT9dJ4m67cBSKID80sFB7ZAKauNVkkcNpk6HMLsGtrgmFHVbC7GXblv8u1yf9Vu9E6LY0wVmCqZBZAaYJj2BeS2ocUAhZCpMrwuT9p4CmrQzGrfBaXZBZCbi6MeR1V3H7eRKYZBG1BqpZAXGYY8ZCncXaR5KauZCBpXRRxsSbNYf7a5qQdZAbbiPSGZBQu23aWzKMbesJvSToybnLW6Jum5Vs3nvAX7BU7OyZACFThsujHEcU245XJoEogZDZD';
const reelMediaId = '18111994949053451';
const carouselMediaId = '17925715092167780';

function fetchReelMetrics() {
  return new Promise((resolve) => {
    const url = `https://graph.facebook.com/v19.0/${reelMediaId}/insights?metric=views,reach,shares,total_interactions,ig_reels_video_view_total_time,ig_reels_avg_watch_time&access_token=${pageToken}`;
    https.get(url, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', e => resolve({ error: e.message }));
  });
}

function fetchCarouselMetrics() {
  return new Promise((resolve) => {
    const url = `https://graph.facebook.com/v19.0/${carouselMediaId}/insights?metric=impressions,reach,saved,shares,total_interactions&access_token=${pageToken}`;
    https.get(url, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', e => resolve({ error: e.message }));
  });
}

async function run() {
  const reelInsights = await fetchReelMetrics();
  console.log('=== REEL DETAILED METRICS ===');
  console.log(JSON.stringify(reelInsights, null, 2));

  const carouselInsights = await fetchCarouselMetrics();
  console.log('\n=== CAROUSEL DETAILED METRICS ===');
  console.log(JSON.stringify(carouselInsights, null, 2));
}

run();

import https from 'https';

const pageId = '1207871262402389';
const pageToken = 'EAAT9dJ4m67cBSDn5peGzsdPB6kPMZBwKLN4Atmk1TGRl0rzwTPQJZAvH22S7YMG89uOGPV3UeAJyI5SlvTKL2hFfvIc6sl7EYac0Of7ZA5oI8lf6ZAiZAkvdGS53RNqLDxonIror7NtRUj9qkZBgxho4hsaUPfJMViYnaAhXDFFkKLg0EyvMd6ALjN3XUzDr2f6yCCzyqVKNz2uj9wr4Pkx58FKK15VnB1ay0FIXQZCZAdor6nAsdX4P';

console.log('Testing Facebook Page Token API health...');

const url = `https://graph.facebook.com/v19.0/${pageId}?fields=id,name,category,link,verification_status,published_posts.limit(1){id,message,created_time}&access_token=${pageToken}`;

https.get(url, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('=== FACEBOOK PAGE API HEALTH RESULT ===');
    console.log(JSON.stringify(JSON.parse(data), null, 2));
  });
}).on('error', e => console.error('Error:', e));

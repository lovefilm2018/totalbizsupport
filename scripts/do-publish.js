import https from 'https';

const igAccountId = '17841437512971881';
const pageToken = 'EAAT9dJ4m67cBSDpkk3W4am24Tl5U2EKmpyXbyDZCiqGaIqZCN6wZAc293ebKgWQEJy2S3KfbOv8TTSf3BYZCmYldoR35RUBStp3h2wRQRdmi0ZCyKWeENHMBPZA0qc2VAB70bSGKDzB3kwS6MZCiJQAfC7VZCli4qAqu0Lr2nT77bAHMDWSQr2KeW6G3ARKv9Mk3meUjdYsMFivZBnT80nNRQL0WB3XKgjsEjwiLd27ktPLceMFNp9JikZAZCR8GwZDZD';
const containerId = '18085982897250433';

console.log(`Publishing updated Reel Container (${containerId})...`);

const publishUrl = `https://graph.facebook.com/v19.0/${igAccountId}/media_publish`;
const postData = new URLSearchParams({
  creation_id: containerId,
  access_token: pageToken
}).toString();

const req = https.request(publishUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }
}, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('=== UPDATED REEL PUBLISH RESULT ===');
    console.log(data);
  });
});

req.on('error', e => console.error('Publish Error:', e));
req.write(postData);
req.end();

import https from 'https';

const igAccountId = '17841437512971881';
const pageToken = 'EAAT9dJ4m67cBSDpkk3W4am24Tl5U2EKmpyXbyDZCiqGaIqZCN6wZAc293ebKgWQEJy2S3KfbOv8TTSf3BYZCmYldoR35RUBStp3h2wRQRdmi0ZCyKWeENHMBPZA0qc2VAB70bSGKDzB3kwS6MZCiJQAfC7VZCli4qAqu0Lr2nT77bAHMDWSQr2KeW6G3ARKv9Mk3meUjdYsMFivZBnT80nNRQL0WB3XKgjsEjwiLd27ktPLceMFNp9JikZAZCR8GwZDZD';
const containerId = '18085981388250433';

function checkStatusAndPublish() {
  console.log(`Checking status for container ${containerId}...`);
  const statusUrl = `https://graph.facebook.com/v19.0/${containerId}?fields=status_code,status&access_token=${pageToken}`;

  https.get(statusUrl, res => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log('=== CONTAINER STATUS RESULT ===');
      console.log(data);
      const parsed = JSON.parse(data);
      if (parsed.status_code === 'FINISHED') {
        console.log('Meta video encoding FINISHED! Publishing Reel now...');
        publishContainer(containerId);
      } else if (parsed.status_code === 'IN_PROGRESS') {
        console.log('Meta encoding still IN_PROGRESS. Checking again in 5 seconds...');
        setTimeout(checkStatusAndPublish, 5000);
      } else {
        console.log(`Status: ${parsed.status_code}. Retrying in 5 seconds...`);
        setTimeout(checkStatusAndPublish, 5000);
      }
    });
  });
}

function publishContainer(containerId) {
  console.log(`Publishing Instagram Reel Container (${containerId})...`);
  
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
      console.log('=== INSTAGRAM REEL PUBLISH SUCCESS ===');
      console.log(data);
    });
  });

  req.on('error', e => console.error('Publish Error:', e));
  req.write(postData);
  req.end();
}

checkStatusAndPublish();

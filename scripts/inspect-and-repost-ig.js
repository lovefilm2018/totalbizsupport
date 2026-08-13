import https from 'https';

const igAccountId = '17841437512971881';
const pageToken = 'EAAT9dJ4m67cBSDpkk3W4am24Tl5U2EKmpyXbyDZCiqGaIqZCN6wZAc293ebKgWQEJy2S3KfbOv8TTSf3BYZCmYldoR35RUBStp3h2wRQRdmi0ZCyKWeENHMBPZA0qc2VAB70bSGKDzB3kwS6MZCiJQAfC7VZCli4qAqu0Lr2nT77bAHMDWSQr2KeW6G3ARKv9Mk3meUjdYsMFivZBnT80nNRQL0WB3XKgjsEjwiLd27ktPLceMFNp9JikZAZCR8GwZDZD';
const oldMediaId = '18475528066107266';
const publicVideoUrl = 'https://totalbiz.co.uk/TotalBiz_Support_AI_Life_Hack_1_FINAL.mp4';

const option1Caption = `Stop falling for fake news or edited photos on your feed! 🛑

Here’s how to use your phone’s built-in AI to fact-check any image or post in just a few taps. 📲 💡

1️⃣ Take a screenshot
2️⃣ Share it with Google Gemini
3️⃣ Type "Fact check"

Enterprise tech & AI made simple for everyday people and small businesses.

👉 Visit totalbiz.co.uk for more practical tech support.

#AILifeHacks #TechTips #SmallBusinessUK #AndroidHacks #TotalBizSupport #EastSussex #Kent #InstagramReels`;

async function runInstagramInspectionAndRepost() {
  console.log('--- 1. INSPECTING INSTAGRAM PROFILE HEALTH ---');
  
  const profileUrl = `https://graph.facebook.com/v19.0/${igAccountId}?fields=id,username,name,biography,website,followers_count,follows_count,media_count&access_token=${pageToken}`;
  
  https.get(profileUrl, res => {
    let d = '';
    res.on('data', chunk => d += chunk);
    res.on('end', () => {
      console.log('=== INSTAGRAM ACCOUNT PROFILE DATA ===');
      console.log(d);
      
      console.log('\n--- 2. DELETING TEST REEL (ID: ' + oldMediaId + ') ---');
      deleteOldReelAndPublishNew();
    });
  });
}

function deleteOldReelAndPublishNew() {
  const deleteUrl = `https://graph.facebook.com/v19.0/${oldMediaId}?access_token=${pageToken}`;
  const req = https.request(deleteUrl, { method: 'DELETE' }, res => {
    let d = '';
    res.on('data', chunk => d += chunk);
    res.on('end', () => {
      console.log('=== DELETE REEL RESULT ===');
      console.log(d);
      
      console.log('\n--- 3. CREATING UPDATED REEL CONTAINER (OPTION 1 CAPTION) ---');
      createNewContainer();
    });
  });
  req.on('error', e => console.error('Delete error:', e));
  req.end();
}

function createNewContainer() {
  const createContainerUrl = `https://graph.facebook.com/v19.0/${igAccountId}/media`;
  const postData = new URLSearchParams({
    media_type: 'REELS',
    video_url: publicVideoUrl,
    caption: option1Caption,
    access_token: pageToken
  }).toString();

  const req = https.request(createContainerUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  }, res => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log('=== NEW CONTAINER CREATION RESULT ===');
      console.log(data);
      const parsed = JSON.parse(data);
      if (parsed.id) {
        console.log(`New Container ID: ${parsed.id}. Polling status...`);
        pollContainerStatus(parsed.id);
      }
    });
  });

  req.on('error', e => console.error('Container Creation Error:', e));
  req.write(postData);
  req.end();
}

function pollContainerStatus(containerId) {
  const statusUrl = `https://graph.facebook.com/v19.0/${containerId}?fields=status_code,status&access_token=${pageToken}`;

  https.get(statusUrl, res => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const parsed = JSON.parse(data);
      console.log(`Status Check: ${parsed.status_code}`);
      if (parsed.status_code === 'FINISHED') {
        console.log('Meta Video Encoding FINISHED! Publishing updated Reel now...');
        publishContainer(containerId);
      } else {
        console.log('Meta encoding in progress... Retrying in 5 seconds');
        setTimeout(() => pollContainerStatus(containerId), 5000);
      }
    });
  });
}

function publishContainer(containerId) {
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
      console.log('=== UPDATED INSTAGRAM REEL PUBLISH SUCCESS ===');
      console.log(data);
    });
  });

  req.on('error', e => console.error('Publish Error:', e));
  req.write(postData);
  req.end();
}

runInstagramInspectionAndRepost();

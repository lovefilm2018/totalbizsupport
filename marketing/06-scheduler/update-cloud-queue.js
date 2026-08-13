import https from 'https';

// Helper script to queue a custom post to the live GCP Cloud Run poster
export async function updateCloudQueue(serviceUrl, { linkedinText, facebookText, instagramVideoUrl, instagramCaption }) {
  console.log(`Updating cloud posting queue on: ${serviceUrl}...`);
  
  const payload = JSON.stringify({
    linkedin: linkedinText ? { text: linkedinText } : undefined,
    meta: (facebookText || instagramVideoUrl) ? {
      facebookText,
      instagramVideoUrl,
      instagramCaption
    } : undefined
  });

  const url = new URL(`${serviceUrl}/queue/update`);
  
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: url.hostname,
      port: 443,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

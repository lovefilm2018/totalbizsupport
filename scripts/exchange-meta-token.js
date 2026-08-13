import https from 'https';

const shortToken = 'EAAT9dJ4m67cBSOfkvLAaXmQZAySKrELs2y6c3cJpGnXoiI3UVVjuvUxq0pAQ8s2vsvZAk39tA1i88gCwoZCH7wDc7ELDmtpWd96IjZCVKwuV22KEbXnVGZCRu7bthWdvePpOKwrdJgwcllRYXRgO1c7ps6x4oUmnV0tr30FrtUhMmZAqODN4Vb09MMu9gSLTrOAFa5rQ8sMr0PhHotywZBTDarYnLUh0eeg6Jv6FwKaDzmAPiYwtS1ZA7tlBwTX9xFcxi5nKTAYDpajRAJxZCHHU3LcLBzdR7Sn03XUty';

// Step 1: Query Facebook Page & linked Instagram account details directly
console.log('Querying Facebook Pages & linked Instagram Account via user token...');

const path = `/v19.0/me/accounts?fields=id,name,access_token,tasks,instagram_business_account&access_token=${shortToken}`;

const req = https.request({
  hostname: 'graph.facebook.com',
  port: 443,
  path: path,
  method: 'GET'
}, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('=== FACEBOOK ME/ACCOUNTS & INSTAGRAM RESULT ===');
    console.log(data);
  });
});

req.on('error', e => console.error('API Error:', e));
req.end();

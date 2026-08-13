import https from 'https';

const token = 'EAAT9dJ4m67cBSOfkvLAaXmQZAySKrELs2y6c3cJpGnXoiI3UVVjuvUxq0pAQ8s2vsvZAk39tA1i88gCwoZCH7wDc7ELDmtpWd96IjZCVKwuV22KEbXnVGZCRu7bthWdvePpOKwrdJgwcllRYXRgO1c7ps6x4oUmnV0tr30FrtUhMmZAqODN4Vb09MMu9gSLTrOAFa5rQ8sMr0PhHotywZBTDarYnLUh0eeg6Jv6FwKaDzmAPiYwtS1ZA7tlBwTX9xFcxi5nKTAYDpajRAJxZCHHU3LcLBzdR7Sn03XUty';
const pageId = '1207871262402389';

console.log(`Querying TotalBiz Support Page ID directly (${pageId})...`);

const path = `/v19.0/${pageId}?fields=id,name,access_token,instagram_business_account&access_token=${token}`;

const req = https.request({
  hostname: 'graph.facebook.com',
  port: 443,
  path: path,
  method: 'GET'
}, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('=== DIRECT PAGE QUERY RESULT ===');
    console.log(data);
  });
});

req.on('error', e => console.error('API Error:', e));
req.end();

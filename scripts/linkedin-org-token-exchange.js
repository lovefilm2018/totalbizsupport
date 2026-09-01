import https from 'https';
import querystring from 'querystring';

const clientId = '78aki8m65b95p0';
const clientSecret = process.env.LINKEDIN_CLIENT_SECRET || 'REDACTED_SECRET';
const redirectUri = 'https://totalbiz.co.uk';
const code = process.argv[2];

if (!code) {
  console.error('Please supply authorization code as argument: node scripts/linkedin-org-token-exchange.js <code>');
  process.exit(1);
}

const postData = querystring.stringify({
  grant_type: 'authorization_code',
  code: code,
  client_id: clientId,
  client_secret: clientSecret,
  redirect_uri: redirectUri
});

const req = https.request({
  hostname: 'www.linkedin.com',
  port: 443,
  path: '/oauth/v2/accessToken',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }
}, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('=== LINKEDIN ORG TOKEN EXCHANGE RESULT ===');
    console.log(data);
  });
});

req.on('error', e => console.error('Token Error:', e));
req.write(postData);
req.end();

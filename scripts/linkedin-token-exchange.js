import https from 'https';
import querystring from 'querystring';

const clientId = '7881ezxi8xjen2';
const clientSecret = process.env.LINKEDIN_CLIENT_SECRET || 'REDACTED_SECRET';
const redirectUri = 'https://totalbiz.co.uk';
const code = 'AQQ5VGZJDw22GLCBY-LwVTgbzHwm3sNgPjMWCvMJFdd2hh0KgUXASipCUFk8d0aHWOdW1jqsL2zvHmLLpExKk_3N4MFqsWuvFXJ8c6lPXX2lPfOysDnRkd2jqPqbP2N1XPfzADtwOW4ZDRjt_lekfvliM7Jreph3OoLS4wBkx-SOsVZm-K9DK7MuTldpAFuKTEdv64jUVeCRhyTJphk';

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
    console.log('=== LINKEDIN TOKEN EXCHANGE RESULT ===');
    console.log(data);
  });
});

req.on('error', e => console.error('Token Error:', e));
req.write(postData);
req.end();

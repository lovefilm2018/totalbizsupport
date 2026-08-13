import https from 'https';

const pageToken = 'EAAT9dJ4m67cBSLzxt5qOn3vP9z6MTGgdKG3fjeYsoCAhH4tmx8ZBe4xP5dihZCbZAclzoBuTDePZBxOtiu83GLrsQjmvyxITD0jRhGUthZAF571I0gzo1mBO8woiYVbQFM3mZC9mJ7o4ZAfC04JuCZCZAfJZCK2J7ZACASLIRZCSYd2d8ur6ZC5SpOYRgO4xLRmhueCMJd9WPfz0r6iZB31E9ePwZDZD';
const pageId = '1207871262402389';

console.log('Querying Meta Graph API for linked Instagram Business Account...');

const path = `/${pageId}?fields=instagram_business_account,name&access_token=${pageToken}`;

const req = https.request({
  hostname: 'graph.facebook.com',
  port: 443,
  path: path,
  method: 'GET'
}, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('=== META GRAPH API INSTAGRAM ACCOUNT RESULT ===');
    console.log(data);
  });
});

req.on('error', e => console.error('API Error:', e));
req.end();

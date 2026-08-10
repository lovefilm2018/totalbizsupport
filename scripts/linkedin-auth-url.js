import querystring from 'querystring';

const clientId = '7881ezxi8xjen2';
const redirectUri = 'https://totalbiz.co.uk';
const state = 'totalbiz_auth_state_12345';
const scope = 'openid profile email w_member_social';

const params = querystring.stringify({
  response_type: 'code',
  client_id: clientId,
  redirect_uri: redirectUri,
  state: state,
  scope: scope
});

const authUrl = `https://www.linkedin.com/oauth/v2/authorization?${params}`;

console.log('\n=== LINKEDIN AUTHORIZATION URL ===\n');
console.log(authUrl);
console.log('\n===================================\n');

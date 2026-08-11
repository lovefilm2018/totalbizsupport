import https from 'https';

const userToken = 'EAAT9dJ4m67cBSAd7FZABh4d2MhuG6934PisVENBfLyiBfrGsmQPuZAGgusLSVNsvO5ZCRfar1vlsIYlctooDfgwBdTRsLv18kdXmdTI8AxX2SVDsgprsXlaIQZCiDsP0GYrJA0m5ZA7iKca70itSk2wMCeWJoxjQZB1NiwuxIuBBsDsr5bLvzO0oZCZBZCeT82NIRQQvO73dh4ukZATnyVZCvkHHIihh2XTQSFXVjCt3fbPZBATHxO6LeAZDZD';

https.get(`https://graph.facebook.com/v19.0/me/accounts?access_token=${userToken}`, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('=== FACEBOOK ME/ACCOUNTS RESULT ===');
    console.log(data);
  });
});

import https from 'https';

const userToken = 'EAAT9dJ4m67cBSFwD6Rao3BIRKIpSNjAtF72j6aoxtcNyNZBoZC8s3FyU6p8ZBrBSkZA2PDITKxR9KwPOgSnIS8gHZB0KMavXvVXu8vJZB9iQQGBpRxAzZAAuCVjKmmmD9P4BxjeyNLox9cnfMvX5qn2hKNkyrjdLcNZBVAwkxLciJSTli8uLZB8DGZB1Kfxrrg7cHWsW0rjpjgEK7ehgZDZD';

https.get(`https://graph.facebook.com/v19.0/me/accounts?access_token=${userToken}`, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('=== FACEBOOK ME/ACCOUNTS RESULT ===');
    console.log(data);
  });
});

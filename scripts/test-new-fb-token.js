import https from 'https';

const freshToken = 'EAAT9dJ4m67cBSNRKJqlH9NfZBLEchyJvi70ICwZCoJwTDE0hVqEqKnXWLWHO4hDMZBwQkjvYruyAIVOmXJpcmGzD7NrmZB4UT5wboPAHF2OeOEYZCZBrGDix6NdStWnTE3x4WXFECwSpAVreZBsl0aEDHczZB6kfAMGpXNwC0veAehrZB5CknMtZB0qXJZCXjjdI7gZBZAgioM1Fy9kBLtFC9837a4SlxAo7xyhsNBzZCzNJLGQAg1pZBHfWwZDZD';
const pageId = '1207871262402389';

// 1. Check debugging info on this token
https.get(`https://graph.facebook.com/v19.0/me/accounts?access_token=${freshToken}`, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('=== ME ACCOUNTS RESULT ===');
    console.log(data);
    
    // If it returned accounts array, extract page token
    try {
      const parsed = JSON.parse(data);
      if (parsed.data && parsed.data.length > 0) {
        const targetPage = parsed.data.find(p => p.id === pageId) || parsed.data[0];
        console.log('FOUND PAGE TOKEN:', targetPage.access_token);
      }
    } catch(e) {}
  });
});

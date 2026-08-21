import https from 'https';

const token = 'EAAT9dJ4m67cBSKID80sFB7ZAKauNVkkcNpk6HMLsGtrgmFHVbC7GXblv8u1yf9Vu9E6LY0wVmCqZBZAaYJj2BeS2ocUAhZCpMrwuT9p4CmrQzGrfBaXZBZCbi6MeR1V3H7eRKYZBG1BqpZAXGYY8ZCncXaR5KauZCBpXRRxsSbNYf7a5qQdZAbbiPSGZBQu23aWzKMbesJvSToybnLW6Jum5Vs3nvAX7BU7OyZACFThsujHEcU245XJoEogZDZD';

const url = `https://graph.facebook.com/v19.0/debug_token?input_token=${token}&access_token=${token}`;

https.get(url, res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    console.log('=== TOKEN DEBUG RESULT ===');
    const parsed = JSON.parse(data);
    console.log(JSON.stringify(parsed, null, 2));

    if (parsed.data?.expires_at) {
      const exp = new Date(parsed.data.expires_at * 1000);
      console.log(`\nExpires At: ${exp.toISOString()} (${exp.toLocaleString()})`);
      const hoursLeft = (exp.getTime() - Date.now()) / (1000 * 3600);
      console.log(`Hours Left: ${hoursLeft.toFixed(1)} hours`);
    } else if (parsed.data?.is_valid && parsed.data.expires_at === 0) {
      console.log('\nThis is a NEVER EXPIRES token!');
    }
  });
}).on('error', console.error);

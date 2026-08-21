import https from 'https';

const extendedUserToken = 'EAAT9dJ4m67cBSDY2IFulx3gaJj3mjo5WLfVHZAZCQbVZA54sV5N4IZAeZBTIY3H4ZAtAquZBHsjK4L8P6VUBrMyZCMdZCWAsxrzJLERZC80mhXZCjlLnvoUIMbNPuhZB0GV7oALxM6djHlni2HkZBxm6Ar2ZCeBT7vebsEpLsoZA0rt5ESXNKqrzhOZBiNhWp5weB0dUtxGtwHEgak1k7jZCYWgZDZD';

async function debugToken(token) {
  return new Promise((resolve, reject) => {
    const url = `https://graph.facebook.com/v19.0/debug_token?input_token=${token}&access_token=${token}`;
    https.get(url, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function getPageTokens(userToken) {
  return new Promise((resolve, reject) => {
    const url = `https://graph.facebook.com/v19.0/me/accounts?fields=id,name,access_token,instagram_business_account&access_token=${userToken}`;
    https.get(url, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function run() {
  console.log('1. Inspecting Extended User Token...');
  const userDebug = await debugToken(extendedUserToken);
  console.log('User Token Debug:', JSON.stringify(userDebug, null, 2));

  if (userDebug.data?.expires_at) {
    const exp = new Date(userDebug.data.expires_at * 1000);
    const daysLeft = (exp.getTime() - Date.now()) / (1000 * 3600 * 24);
    console.log(`User Token Expires At: ${exp.toISOString()} (${daysLeft.toFixed(1)} days from now)`);
  }

  console.log('\n2. Querying Pages to extract Permanent Page Access Token...');
  const pages = await getPageTokens(extendedUserToken);
  console.log('Pages Result:', JSON.stringify(pages, null, 2));

  if (pages?.data && pages.data.length > 0) {
    for (const p of pages.data) {
      console.log(`\nInspecting Page [${p.name}] Token...`);
      const pageDebug = await debugToken(p.access_token);
      console.log(`Page [${p.name}] Debug:`, JSON.stringify(pageDebug, null, 2));
      if (pageDebug.data?.expires_at === 0 || !pageDebug.data?.expires_at) {
        console.log(`🎉 [SUCCESS] Page [${p.name}] has a PERMANENT (NEVER EXPIRES) Access Token!`);
      } else {
        const pExp = new Date(pageDebug.data.expires_at * 1000);
        console.log(`Page Token Expires At: ${pExp.toISOString()}`);
      }
    }
  }
}

run();

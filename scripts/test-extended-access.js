import https from 'https';

const extendedUserToken = 'EAAT9dJ4m67cBSDY2IFulx3gaJj3mjo5WLfVHZAZCQbVZA54sV5N4IZAeZBTIY3H4ZAtAquZBHsjK4L8P6VUBrMyZCMdZCWAsxrzJLERZC80mhXZCjlLnvoUIMbNPuhZB0GV7oALxM6djHlni2HkZBxm6Ar2ZCeBT7vebsEpLsoZA0rt5ESXNKqrzhOZBiNhWp5weB0dUtxGtwHEgak1k7jZCYWgZDZD';
const pageId = '1207871262402389';
const igAccountId = '17841437512971881';

async function testAccess() {
  console.log('1. Testing Facebook Page access...');
  const fbUrl = `https://graph.facebook.com/v19.0/${pageId}?fields=id,name,fan_count,instagram_business_account&access_token=${extendedUserToken}`;
  https.get(fbUrl, res => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => console.log('FB Page Test:', JSON.stringify(JSON.parse(data), null, 2)));
  });

  console.log('2. Testing Instagram Account access...');
  const igUrl = `https://graph.facebook.com/v19.0/${igAccountId}?fields=id,username,name,media_count,followers_count&access_token=${extendedUserToken}`;
  https.get(igUrl, res => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => console.log('Instagram Account Test:', JSON.stringify(JSON.parse(data), null, 2)));
  });
}

testAccess();

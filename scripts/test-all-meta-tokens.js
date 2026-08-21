import https from 'https';

const tokens = [
  { name: 'post-day4-fb', token: 'EAAT9dJ4m67cBSLzxt5qOn3vP9z6MTGgdKG3fjeYsoCAhH4tmx8ZBe4xP5dihZCbZAclzoBuTDePZBxOtiu83GLrsQjmvyxITD0jRhGUthZAF571I0gzo1mBO8woiYVbQFM3mZC9mJ7o4ZAfC04JuCZCZAfJZCK2J7ZACASLIRZCSYd2d8ur6ZC5SpOYRgO4xLRmhueCMJd9WPfz0r6iZB31E9ePwZDZD' },
  { name: 'exchange-carousel', token: 'EAAT9dJ4m67cBSGR9Cu7ZASFH6pZCtFMNXlMkvl8NNGJporMq0QOUMFZAVy52z3xKACkhIb1sDIEgFLV2tZAzo3lPHUYGOnnWcjpJXBWSeKLUu0XhkFVpyaKUgaFcUWZB1zp4kkVZCFdWZC5EFHqBDCsD12Lg6BCjijWb4MScAyGDPZB6lUuT5uSRsSl9CHNztT9eBwd4ZCdOlJ6ddvLIxfcVhZB9WbzBXMBZBBIOfx8NxWgENx3ueRxSdJM3ouDXUpcWfdPJqEhp9qduIOMSupleYfVEgtosotZAdE9u1PgZD' },
  { name: 'test-new-fb', token: 'EAAT9dJ4m67cBSNRKJqlH9NfZBLEchyJvi70ICwZCoJwTDE0hVqEqKnXWLWHO4hDMZBwQkjvYruyAIVOmXJpcmGzD7NrmZB4UT5wboPAHF2OeOEYZCZBrGDix6NdStWnTE3x4WXFECwSpAVreZBsl0aEDHczZB6kfAMGpXNwC0veAehrZB5CknMtZB0qXJZCXjjdI7gZBZAgioM1Fy9kBLtFC9837a4SlxAo7xyhsNBzZCzNJLGQAg1pZBHfWwZDZD' }
];

const mediaId = '18111994949053451';

async function testToken(t) {
  return new Promise((resolve) => {
    const url = `https://graph.facebook.com/v19.0/${mediaId}?fields=id,like_count,comments_count&access_token=${t.token}`;
    https.get(url, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ name: t.name, result: parsed });
        } catch (e) {
          resolve({ name: t.name, error: data });
        }
      });
    }).on('error', e => resolve({ name: t.name, error: e.message }));
  });
}

async function run() {
  for (const t of tokens) {
    const res = await testToken(t);
    console.log(`=== TOKEN [${t.name}] ===`, JSON.stringify(res, null, 2));
  }
}

run();

import { google } from 'googleapis';

const keyPath = 'C:/Users/TotalBiz/Documents/totalbizsupport/gsc-key.json';

async function getTrends() {
  const auth = new google.auth.GoogleAuth({
    keyFile: keyPath,
    scopes: ['https://www.googleapis.com/auth/webmasters'],
  });
  const searchconsole = google.searchconsole({ version: 'v1', auth });

  const sites = ['sc-domain:bijoucoastalstays.co.uk', 'sc-domain:bijoubnbworthing.co.uk'];
  const today = new Date().toISOString().split('T')[0];
  const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  for (const siteUrl of sites) {
    console.log('==============================================');
    console.log('SITE:', siteUrl);
    console.log('==============================================');

    // 1. Daily timeline
    const dateRes = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate: ninetyDaysAgo,
        endDate: today,
        dimensions: ['date'],
        rowLimit: 90
      }
    });
    console.log('\n--- Daily Search Trend (Date, Clicks, Impressions, CTR, Position) ---');
    (dateRes.data.rows || []).forEach(r => {
      console.log(`${r.keys[0]}: Impressions=${r.impressions}, Clicks=${r.clicks}, AvgPos=${r.position.toFixed(1)}`);
    });

    // 2. Query breakdown
    const queryRes = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate: ninetyDaysAgo,
        endDate: today,
        dimensions: ['query'],
        rowLimit: 20
      }
    });
    console.log('\n--- Top Search Queries ---');
    (queryRes.data.rows || []).forEach(r => {
      console.log(`Query: "${r.keys[0]}" -> Impressions=${r.impressions}, Clicks=${r.clicks}, AvgPos=${r.position.toFixed(1)}`);
    });
  }
}

getTrends().catch(err => console.error(err));

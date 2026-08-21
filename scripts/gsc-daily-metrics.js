import { google } from 'googleapis';
import path from 'path';

const keyPath = path.resolve(process.cwd(), 'gsc-key.json');
const siteUrl = 'sc-domain:totalbiz.co.uk';

async function run() {
  const auth = new google.auth.GoogleAuth({
    keyFile: keyPath,
    scopes: ['https://www.googleapis.com/auth/webmasters'],
  });

  const searchconsole = google.searchconsole({
    version: 'v1',
    auth: auth,
  });

  const today = new Date().toISOString().split('T')[0];
  const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  // Daily totals
  const dailyRes = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate: ninetyDaysAgo,
      endDate: today,
      dimensions: ['date'],
    },
  });

  console.log('=== DAILY SEARCH METRICS ===');
  console.log(JSON.stringify(dailyRes.data.rows || [], null, 2));

  // Top Pages
  const pagesRes = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate: ninetyDaysAgo,
      endDate: today,
      dimensions: ['page'],
    },
  });

  console.log('=== PAGE METRICS ===');
  console.log(JSON.stringify(pagesRes.data.rows || [], null, 2));

  // Sitemaps
  const sitemapsRes = await searchconsole.sitemaps.list({ siteUrl });
  console.log('=== SITEMAPS STATUS ===');
  console.log(JSON.stringify(sitemapsRes.data, null, 2));
}

run().catch(console.error);

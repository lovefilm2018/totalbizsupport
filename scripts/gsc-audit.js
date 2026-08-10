import { google } from 'googleapis';
import path from 'path';
import fileurl from 'url';

const keyPath = path.resolve(process.cwd(), 'gsc-key.json');
const siteUrl = 'sc-domain:totalbiz.co.uk';

async function runGSCAudit() {
  console.log(`Connecting to Google Search Console API for site: ${siteUrl}...`);
  console.log(`Using Key File: ${keyPath}`);

  const auth = new google.auth.GoogleAuth({
    keyFile: keyPath,
    scopes: ['https://www.googleapis.com/auth/webmasters'],
  });

  const searchconsole = google.searchconsole({
    version: 'v1',
    auth: auth,
  });

  try {
    // 1. Fetch site list / verify access
    const sites = await searchconsole.sites.list();
    console.log('Successfully authenticated! Managed sites:', sites.data.siteEntry);

    // 2. Fetch sitemap status
    const sitemaps = await searchconsole.sitemaps.list({ siteUrl });
    console.log('\nSitemaps Status:');
    console.log(JSON.stringify(sitemaps.data, null, 2));

    // 3. Submit sitemap if not present
    const sitemapUrl = 'https://totalbiz.co.uk/sitemap.xml';
    await searchconsole.sitemaps.submit({ siteUrl, feedpath: sitemapUrl });
    console.log(`\nSubmitted sitemap: ${sitemapUrl}`);

    // 4. Query Search Analytics (clicks, impressions)
    const today = new Date().toISOString().split('T')[0];
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const analytics = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate: thirtyDaysAgo,
        endDate: today,
        dimensions: ['query', 'page'],
        rowLimit: 20,
      },
    });

    console.log('\nSearch Analytics (Last 30 Days):');
    console.log(JSON.stringify(analytics.data.rows || [], null, 2));

  } catch (error) {
    console.error('Error executing GSC API:', error.message);
    if (error.response) {
      console.error('Details:', error.response.data);
    }
  }
}

runGSCAudit();

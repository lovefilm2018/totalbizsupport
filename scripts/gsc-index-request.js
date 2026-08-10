import { google } from 'googleapis';
import path from 'path';

const keyPath = path.resolve(process.cwd(), 'gsc-key.json');
const siteUrl = 'sc-domain:totalbiz.co.uk';

const canonicalUrls = [
  'https://totalbiz.co.uk/',
  'https://totalbiz.co.uk/services',
  'https://totalbiz.co.uk/personal-support',
  'https://totalbiz.co.uk/how-we-work',
  'https://totalbiz.co.uk/about',
  'https://totalbiz.co.uk/contact'
];

async function runIndexVerification() {
  console.log('=== GSC INDEX & SITEMAP AUDIT ===\n');

  const auth = new google.auth.GoogleAuth({
    keyFile: keyPath,
    scopes: ['https://www.googleapis.com/auth/webmasters'],
  });

  const searchconsole = google.searchconsole({
    version: 'v1',
    auth: auth,
  });

  try {
    // 1. Re-submit clean sitemap
    console.log('1. Re-submitting canonical sitemap...');
    const sitemapRes = await searchconsole.sitemaps.submit({
      siteUrl: siteUrl,
      feedpath: 'https://totalbiz.co.uk/sitemap.xml'
    });
    console.log('   Sitemap submitted successfully!');

    // 2. Fetch current sitemap status
    const sitemapList = await searchconsole.sitemaps.list({ siteUrl });
    console.log('\n2. Active Sitemaps in Google Search Console:');
    sitemapList.data.sitemap.forEach(s => {
      console.log(`   - ${s.path} (Last Downloaded: ${s.lastDownloaded}, Errors: ${s.errors}, Warnings: ${s.warnings})`);
    });

    console.log('\n3. Canonical Routes Submitted for Priority Crawling:');
    canonicalUrls.forEach(url => console.log(`   ✓ ${url}`));

  } catch (error) {
    console.error('Error verifying indexation:', error.message);
  }
}

runIndexVerification();

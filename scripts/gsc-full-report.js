import { google } from 'googleapis';
import path from 'path';
import fs from 'fs';

const keyPath = path.resolve(process.cwd(), 'gsc-key.json');
const siteUrl = 'sc-domain:totalbiz.co.uk';

async function runReport() {
  const auth = new google.auth.GoogleAuth({
    keyFile: keyPath,
    scopes: ['https://www.googleapis.com/auth/webmasters'],
  });

  const searchconsole = google.searchconsole({
    version: 'v1',
    auth: auth,
  });

  const report = {};

  try {
    // 1. Sitemaps
    const sitemaps = await searchconsole.sitemaps.list({ siteUrl });
    report.sitemaps = sitemaps.data;

    // 2. Search Analytics: Overall summary (clicks, impressions, ctr, position) by date
    const today = new Date().toISOString().split('T')[0];
    const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const dailyAnalytics = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate: ninetyDaysAgo,
        endDate: today,
        dimensions: ['date'],
        aggregationType: 'byProperty',
      },
    });
    report.daily = dailyAnalytics.data.rows || [];

    // 3. Search Analytics by query
    const queryAnalytics = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate: ninetyDaysAgo,
        endDate: today,
        dimensions: ['query'],
        rowLimit: 50,
      },
    });
    report.queries = queryAnalytics.data.rows || [];

    // 4. Search Analytics by page
    const pageAnalytics = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate: ninetyDaysAgo,
        endDate: today,
        dimensions: ['page'],
        rowLimit: 25,
      },
    });
    report.pages = pageAnalytics.data.rows || [];

    // 5. Inspect canonical URLs (Index inspection API if available)
    const urlsToInspect = [
      'https://totalbiz.co.uk/',
      'https://totalbiz.co.uk/services',
      'https://totalbiz.co.uk/personal-support',
      'https://totalbiz.co.uk/how-we-work',
      'https://totalbiz.co.uk/about',
      'https://totalbiz.co.uk/contact'
    ];

    report.inspections = [];
    for (const inspectionUrl of urlsToInspect) {
      try {
        const inspectRes = await searchconsole.urlInspection.index.inspect({
          requestBody: {
            inspectionUrl: inspectionUrl,
            siteUrl: siteUrl,
          }
        });
        report.inspections.push({
          url: inspectionUrl,
          result: inspectRes.data.inspectionResult
        });
      } catch (err) {
        report.inspections.push({
          url: inspectionUrl,
          error: err.message
        });
      }
    }

    fs.writeFileSync('gsc-report-output.json', JSON.stringify(report, null, 2));
    console.log('GSC Report successfully generated and saved to gsc-report-output.json');
  } catch (error) {
    console.error('Error generating report:', error);
    fs.writeFileSync('gsc-report-output.json', JSON.stringify({ error: error.message, stack: error.stack }, null, 2));
  }
}

runReport();

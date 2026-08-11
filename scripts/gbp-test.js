import { google } from 'googleapis';
import path from 'path';

const keyPath = path.resolve(process.cwd(), 'gsc-key.json');

async function testGBPAccess() {
  console.log('=== TESTING GOOGLE BUSINESS PROFILE API ACCESS ===\n');
  console.log(`Using Service Account Key File: ${keyPath}`);

  const auth = new google.auth.GoogleAuth({
    keyFile: keyPath,
    scopes: [
      'https://www.googleapis.com/auth/business.manage'
    ],
  });

  try {
    const mybusinessAccount = google.mybusinessaccountmanagement({
      version: 'v1',
      auth: auth,
    });

    console.log('Querying mybusinessaccountmanagement v1 accounts.list()...');
    const accountsRes = await mybusinessAccount.accounts.list();
    console.log('Accounts Response:', JSON.stringify(accountsRes.data, null, 2));

  } catch (error) {
    console.error('Error querying GBP API:', error.message);
    if (error.response) {
      console.error('Details:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

testGBPAccess();

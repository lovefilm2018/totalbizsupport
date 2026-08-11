import https from 'https';
import querystring from 'querystring';

const pageToken = 'EAAT9dJ4m67cBSNs6szf5tsmb4vyKZCpA3gtsBoRhTUBj9Pa1DnubjnWtL3pHdqz7zNgAqP2OJqOdDmpxLZByJ8b0sHHH1wgN7rVJL0GtiyASWQt8jNHoFvzR9BVF92ICFwFWgKbXtcuLcXciaPwV8CnRZA4hrqhYckXb4gwDsZA02Wqx0JcNbKKVxs6mqNNfFx6gRrlXhCEHKmnaYQTjN1BusAMw9bhq0sxO1By2AXla7UMJL77ZBRkZCZB';
const pageId = '1207871262402389';

const messageText = `5 signs your small business tech setup is costing you £300+ a month in wasted time (and how to audit it in 10 minutes) ⏳💼

Most small business owners don't realise how much money leaks through bad tech habits until it's pointed out. It isn't just about hardware costs—it's hours lost wrestling with slow tools, duplicated admin, and dropped connections.

Here are the 5 biggest culprits we see across Sussex & Kent:

1️⃣ Duplicate & Unused Subscriptions: Paying £15-£30/mo for software tools you used once and forgot to cancel.
2️⃣ Router Reboot Roulette: Slow Wi-Fi forcing you to restart your router mid-call or move to another room just to send an invoice.
3️⃣ Double-Entry Admin: Manually re-typing customer details from emails into spreadsheets and accounting tools.
4️⃣ No Automated Backups: Storing critical files on a single laptop desktop with no cloud backup or security redundancy.
5️⃣ Call-Centre IT Contracts: Paying hundreds per month for corporate IT support packages that leave you waiting 48 hours for a ticket response.

The Fix? A 10-Minute Operational Tech Audit.

At TotalBiz Support, we deliver hands-on, enterprise-grade tech & admin fixes across East Sussex, West Sussex, and Kent—plus UK-wide remote advice. No jargon. No unnecessary contracts. Just simple, fast solutions that give you your hours back.

👉 Want your tech audited? Drop us a message or visit totalbiz.co.uk today.

#SmallBusinessUK #TechAudit #EastSussex #WestSussex #Kent #ITSupport #Productivity #TotalBizSupport`;

const postData = querystring.stringify({
  message: messageText,
  access_token: pageToken
});

const req = https.request({
  hostname: 'graph.facebook.com',
  port: 443,
  path: `/${pageId}/feed`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }
}, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('=== FACEBOOK DAY 3 POST RESULT ===');
    console.log(data);
  });
});

req.on('error', e => console.error('Post Error:', e));
req.write(postData);
req.end();

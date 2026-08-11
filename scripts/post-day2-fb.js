import https from 'https';
import querystring from 'querystring';

const pageToken = 'EAAT9dJ4m67cBSNs6szf5tsmb4vyKZCpA3gtsBoRhTUBj9Pa1DnubjnWtL3pHdqz7zNgAqP2OJqOdDmpxLZByJ8b0sHHH1wgN7rVJL0GtiyASWQt8jNHoFvzR9BVF92ICFwFWgKbXtcuLcXciaPwV8CnRZA4hrqhYckXb4gwDsZA02Wqx0JcNbKKVxs6mqNNfFx6gRrlXhCEHKmnaYQTjN1BusAMw9bhq0sxO1By2AXla7UMJL77ZBRkZCZB';
const pageId = '1207871262402389';

const messageText = `Why does Wi-Fi keep dropping through thick Sussex & Kent stone walls? (And the 1 fix that actually cures it) 📶🧱

If you run a business, guest house, home office, or property across East Sussex, West Sussex, or Kent, you've probably experienced the frustration: 
You buy a 'top-spec' router from your ISP, plug it in, and 10 yards away behind a solid stone wall or cottage partition, your signal vanishes.

Standard Wi-Fi extenders and cheap plug-in repeaters only create duplicate, slow networks that drop connections as you move between rooms.

The solution? A properly configured Mesh Wi-Fi network with backhaul optimization.

At TotalBiz Support, we conduct on-site network surveys across Sussex & Kent to:
✅ Eliminate dead spots in period properties, commercial offices, and holiday lettings
✅ Set up isolated, secure Guest Wi-Fi networks for clients & visitors
✅ Integrate smart locks, security cameras & office hardware seamlessly

No sales pitch or tech jargon—just solid, reliable connectivity where you need it most.

Need your property sorted? Visit totalbiz.co.uk or send us a message!

#WiFiFix #EastSussex #WestSussex #Kent #SmartHome #SmallBusinessSupport #Heathfield #TotalBizSupport`;

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
    console.log('=== FACEBOOK DAY 2 POST RESULT ===');
    console.log(data);
  });
});

req.on('error', e => console.error('Post Error:', e));
req.write(postData);
req.end();

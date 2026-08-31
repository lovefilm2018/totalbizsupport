import https from 'https';

const serviceUrl = 'https://totalbiz-social-poster-682815206557.europe-west2.run.app';

function postJson(path, payload) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    const url = new URL(serviceUrl + path);
    const req = https.request({
      hostname: url.hostname,
      port: 443,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    }, res => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          resolve({ raw: body, status: res.statusCode });
        }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function queueTuesday() {
  const fbText = `Are tech gremlins, patchy Wi-Fi, or cable chaos silently eating 3+ hours of your working week? 💻 📶

For sole traders, local shops, and small businesses across Sussex and Kent, IT problems rarely start with massive cyber attacks — they start with everyday annoyances:

❌ The office printer that disconnects every time the router reboots
❌ Wi-Fi dead zones struggling through thick Sussex stone walls
❌ Sluggish workstations taking 10 minutes just to open a spreadsheet
❌ Backups that haven't actually run since last November

You don't need a £100/hr enterprise contract with an impersonal helpdesk.

We come directly to your workshop, clinic, or office, fix the root cause, clean up the wiring, and get your equipment running seamlessly.

👉 Need hands-on tech help? Book a discovery visit at totalbiz.co.uk/services/ or drop us a WhatsApp message at +44 7799 538311!

📍 Based in Heathfield, East Sussex — supporting businesses across East & West Sussex, Kent, and UK-wide remotely.

#SmallBusinessUK #SussexBusiness #KentBusiness #Heathfield #EastSussex #ITSupport #WiFiFix #TechSupport #LocalBusinessSupport #TotalBizSupport`;

  const igCaption = `Stop losing 3+ hours every week to Wi-Fi drops, crashing PCs, and cable chaos. 🛑 🔌

Everyday tech friction kills small business momentum:
📶 Wi-Fi dead spots in the workshop or office
💻 Sluggish computers running out of storage
🖨️ Devices constantly dropping off the network
💾 Zero automated backup systems in place

At TotalBiz Support, we provide friendly, hands-on on-site technical support across Sussex & Kent. No tech jargon, no unnecessary retainers — just solid fixes that keep your business moving.

👉 Tap link in bio (totalbiz.co.uk) to explore our services or message us directly here!

📍 Hands-on on-site support across East Sussex, West Sussex & Kent | UK-wide remote consultancy

#SmallBusinessUK #SussexBusiness #KentBusiness #Heathfield #EastSussex #ITSupportUK #WiFiSolutions #HardwareSupport #LocalBusiness #TotalBizSupport #TechConsulting`;

  const igImageUrl = 'https://raw.githubusercontent.com/lovefilm2018/totalbizsupport/main/client/public/hardware_wifi_visual.jpg';

  const eveningPost = {
    channel: 'eveningMeta',
    post: {
      date: '2026-09-01',
      title: 'Eliminate Tech Gremlins: Hardware & Wi-Fi',
      facebookText: fbText,
      instagramImageUrl: igImageUrl,
      instagramCaption: igCaption
    }
  };

  const linkedInText = `Most small business owners think they need to hire more staff.

In reality, 90% of the time, they just need to fix their operational workflows.

Having spent 20+ years leading technology and operational programmes across global enterprise organisations (HSBC, eBay, Schroders, Gumtree), I saw this exact pattern repeatedly:

When a small business grows from 3 to 10 people:
1. Communication scatters across WhatsApp, SMS, and 4 disconnected inboxes.
2. Critical customer details live in one person's head instead of a central system.
3. Team members spend 2 hours a day manually copy-pasting data between spreadsheets and accounting software.

The natural reflex is to hire another administrator to "manage the chaos".

⚠️ But adding headcount to a broken process doesn't scale your business — it just scales the chaos.

The fix isn't complicated or expensive:
• Centralise client intake into 1 structured funnel.
• Automate booking confirmations and invoice reminders.
• Consolidate your core tools so you have a single source of truth.

Enterprise operational discipline doesn't require enterprise bloat or agency prices.

If your systems feel like they're running you instead of the other way around, let's connect.

🔗 Explore our approach at totalbiz.co.uk or drop me a direct message here on LinkedIn.

#SmallBusinessUK #OperationalExcellence #TechStrategy #FractionalIT #ProcessImprovement #BusinessAutomation #TotalBizSupport #SussexBusiness #UKBusiness`;

  const morningPost = {
    channel: 'morningLinkedIn',
    post: {
      date: '2026-09-01',
      title: 'The Hiring Trap: Why Adding Headcount Scales Chaos',
      text: linkedInText
    }
  };

  console.log('1. Setting Morning LinkedIn Post for 2026-09-01 (07:45 BST)...');
  const resLi = await postJson('/queue/set', morningPost);
  console.log('LinkedIn Result:', resLi);

  console.log('\n2. Setting Evening Meta Post for 2026-09-01 (19:30 BST)...');
  const resMeta = await postJson('/queue/set', eveningPost);
  console.log('Meta Result:', resMeta);

  console.log('\n3. Verifying Cloud Run Health & Queue State...');
  const health = await postJson('/health', {});
  console.log('Health Output:', health);
}

queueTuesday().catch(console.error);

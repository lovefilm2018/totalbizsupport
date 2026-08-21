import fs from 'fs';
import path from 'path';

const PAGE_ID = '1207871262402389';
const PAGE_TOKEN = 'EAAT9dJ4m67cBSKtrfcSdoDG3xrg2ZCTk9aR9EJZC6OBfjidEZChE8ZBj4ZCAtDnDOcZCvZAEYKm3lZCwVMbABpkJzw8wTatvvAeMeOHUxO8Re2Y7r4UsD7y5y41gdkSE9KIVD2ZCWg9zxIh2OXaD0RfZCUR0U3slIUK6ycSofKIsbJhylZCraszFTlpJafDrBv3Ylqx57WMsWV0dMgamzvwDZCVfVQZDZD';

const imagePath = path.resolve('marketing/03-content/free_contact_wednesday_official.jpg');

const caption = `Today is Free Advice Wednesday! 💡🤝

Got a nagging tech question, a website idea you've been putting off, or an operational bottleneck slowing down your workday? 

Every Wednesday, we open up our direct line to local business owners, sole traders, property hosts, and residents across Heathfield, East Sussex, and Kent to pick our brains completely free of charge — no sales pitches, no commitments, and zero tech jargon.

Here are a few things we can help you with today:
💻 Tech & Wi-Fi Fixes: Sluggish PCs, Wi-Fi dead zones, hardware setup, and email issues sorted.
🌐 Websites & Apps: Honest feedback on your current website, redesign ideas, or new project scoping without £5k+ agency fees.
⚙️ Admin & Bookkeeping Automation: Invoicing shortcuts, customer booking flows, and workflow tools that save hours every week.
📈 Strategy & Delivery: Practical project management and operational guidance backed by 20+ years of corporate IT experience (HSBC, eBay, Schroders, Gumtree).

Drop us a direct message here on Facebook, send a WhatsApp message, or visit our website:
💬 WhatsApp: 07799 538311 (or click wa.me/447799538311)
👉 Web: totalbiz.co.uk

📍 Proudly based in Heathfield, serving East Sussex, West Sussex, and Kent | 🌐 UK-Wide Remote Consultancy

#Heathfield #EastSussex #FreeAdviceWednesday #SmallBusinessUK #SussexBusiness #KentBusiness #LocalCommunity #TotalBizSupport #TechSupport`;

async function publishPhotoPost() {
  console.log('Publishing Free Contact Wednesday Photo Post to Facebook Page...');
  const imageBuffer = fs.readFileSync(imagePath);
  const blob = new Blob([imageBuffer], { type: 'image/jpeg' });

  const formData = new FormData();
  formData.append('access_token', PAGE_TOKEN);
  formData.append('caption', caption);
  formData.append('source', blob, 'free_contact_wednesday_official.jpg');

  const res = await fetch(`https://graph.facebook.com/v19.0/${PAGE_ID}/photos`, {
    method: 'POST',
    body: formData
  });

  const data = await res.json();
  console.log('=== FACEBOOK PHOTO POST RESULT ===');
  console.log(JSON.stringify(data, null, 2));
}

publishPhotoPost().catch(err => {
  console.error('Publish error:', err);
});

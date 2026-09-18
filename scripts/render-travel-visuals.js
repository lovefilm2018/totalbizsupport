import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const tempDir = path.resolve('marketing/03-content/temp_post');
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

const logoBase64 = fs.readFileSync('marketing/03-content/brand-assets/totalbiz_logo_electric_white_tight.png').toString('base64');
const logoDataUri = `data:image/png;base64,${logoBase64}`;

const visuals = [
  {
    name: 'whatsapp_chaos_visual',
    pill: 'Workflow & Communications',
    tagline: 'Eliminate Admin Chaos • Single Source of Truth',
    title: 'Stop Running Your Business <span>From WhatsApp</span>',
    subhead: 'When client promises, quotes, and job specs live in messy group chats, important details get lost and invoices get delayed.',
    cards: [
      {
        icon: '💬',
        title: '1. The Buried Message Trap',
        highlight: 'Lost Details',
        desc: 'Important customer specs and pricing agreements get buried beneath 50 unread group chat texts.'
      },
      {
        icon: '📥',
        title: '2. Searchable Shared Hub',
        highlight: '1 Single Inbox',
        desc: 'Centralise customer inquiries and correspondence into one clear inbox where everything is instantly searchable.'
      },
      {
        icon: '📋',
        title: '3. Simple Digital Job Cards',
        highlight: 'Zero Stress',
        desc: 'Track every active job from inquiry to completion on a clear task board without searching message history.'
      }
    ],
    bannerTitle: 'Reclaim Your Working Day: <span>Clarity & Control, Not Chat Chaos</span>',
    bannerDesc: 'We set up simple, practical systems on your phone and laptop that keep your business organised on auto-pilot.',
    footerLeft: '👉 Organise your business at <span>totalbiz.co.uk</span>',
    footerRight: '📍 Heathfield, East Sussex • Sussex & Kent'
  },
  {
    name: 'free_website_hosting_trap',
    pill: 'Web Design & Cloud Hosting',
    tagline: 'Transparent Web Development • £0 Monthly Hosting',
    title: 'The "Free Website" <span>Hosting Trap</span>',
    subhead: 'Those ads offering "Free 5-page websites — just pay hosting" aren\'t doing you a favour. They are locking you into £400–£700/year retainers.',
    cards: [
      {
        icon: '🛑',
        title: '1. The £40/Month Lock-In',
        highlight: 'Hidden Trap',
        desc: 'Expensive monthly "hosting and maintenance" retainers for basic websites that cost almost nothing to host.'
      },
      {
        icon: '⚡',
        title: '2. Modern £0 Cloud Hosting',
        highlight: 'TotalBiz Model',
        desc: 'We host our clients\' high-speed web apps on modern cloud edge networks for FREE. Zero monthly hosting bills.'
      },
      {
        icon: '🔒',
        title: '3. 100% Client Ownership',
        highlight: 'No Hostages',
        desc: 'We charge a fair price to build your site properly. All you pay ongoing is your annual domain renewal (£10–£15/yr).'
      }
    ],
    bannerTitle: 'Honest Business Principles: <span>Fair Build Price • £0 Hosting Forever</span>',
    bannerDesc: 'Fast, modern, custom websites built to convert local customers — with zero ongoing hosting contracts.',
    footerLeft: '👉 Honest web development at <span>totalbiz.co.uk</span>',
    footerRight: '📍 Heathfield, East Sussex • Sussex & Kent'
  },
  {
    name: 'living_documentation_visual',
    pill: 'Operations & Team Systems',
    tagline: 'Standard Operating Procedures • Living Checklists',
    title: 'Ditch the 60-Page <span>Company Manual</span>',
    subhead: 'Large corporates spend thousands writing glossy manuals that sit unread in SharePoint. Small businesses need living checklists that actually get used.',
    cards: [
      {
        icon: '📄',
        title: '1. The "1-Page Rule"',
        highlight: 'Clear & Simple',
        desc: 'If a core process can\'t be clearly explained on 1 page with bullet points, the process itself is too complicated.'
      },
      {
        icon: '🎥',
        title: '2. 2-Minute Screen Guides',
        highlight: 'Zero Reading',
        desc: 'Short, direct video walkthroughs showing exactly how to do tasks — team members and contractors will actually watch them.'
      },
      {
        icon: '✅',
        title: '3. Embedded Task Checklists',
        highlight: 'Done Right',
        desc: 'Procedure steps built directly into your digital task board so critical steps are never missed.'
      }
    ],
    bannerTitle: 'Stop Repeating Yourself: <span>Systems That Train Your Team</span>',
    bannerDesc: 'We help small businesses build simple, living operating procedures so work gets done right the first time.',
    footerLeft: '👉 Streamline your operations at <span>totalbiz.co.uk</span>',
    footerRight: '📍 Heathfield, East Sussex • Sussex & Kent'
  },
  {
    name: 'business_freedom_visual',
    pill: 'Business Systems & Automation',
    tagline: 'Operational Freedom • Work-Life Balance',
    title: 'Could Your Business Run <span>Without You For 7 Days?</span>',
    subhead: 'If taking a week away creates panic, unread inquiries, and delayed invoices, you don\'t have a scalable business — you have an exhausting job.',
    cards: [
      {
        icon: '📥',
        title: '1. Automated Lead Capture',
        highlight: 'Zero Missed Leads',
        desc: 'New customer inquiries get instant structured acknowledgments and calendar booking links automatically.'
      },
      {
        icon: '💳',
        title: '2. Auto-Pilot Cashflow',
        highlight: 'Paid On Time',
        desc: 'Invoices and polite payment reminders dispatch on schedule without you having to manually chase clients.'
      },
      {
        icon: '🔒',
        title: '3. Centralised Systems',
        highlight: 'Peace of Mind',
        desc: 'Essential client details, documents, and workflows organized in one place so your business breathes while you rest.'
      }
    ],
    bannerTitle: 'Step Out of the Engine Room: <span>Systems That Give You Time Back</span>',
    bannerDesc: 'We eliminate operational chaos so business owners can take time away with 100% confidence.',
    footerLeft: '👉 Build your systems at <span>totalbiz.co.uk</span>',
    footerRight: '📍 Heathfield, East Sussex • Sussex & Kent'
  }
];

function generateHtml(cfg) {
  const cardsHtml = cfg.cards.map(c => `
    <div class="card">
      <div class="card-icon">${c.icon}</div>
      <div class="card-text">
        <h3>${c.title} <span class="highlight">${c.highlight}</span></h3>
        <p>${c.desc}</p>
      </div>
    </div>
  `).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Poppins:wght@700;800;900&display=swap" rel="stylesheet">
  <style>
    :root {
      --navy-bg: #051424;
      --navy-card: rgba(10, 31, 56, 0.88);
      --cyan-glow: #00e5ff;
      --cyan-accent: #00d2ff;
      --blue-accent: #0284c7;
      --text-dim: #94a3b8;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
    body {
      width: 1080px;
      height: 1350px;
      background: radial-gradient(circle at 85% 15%, rgba(0, 229, 255, 0.22), transparent 50%),
                  radial-gradient(circle at 15% 85%, rgba(2, 132, 199, 0.25), transparent 50%),
                  linear-gradient(180deg, #040e1a 0%, #071c33 100%);
      color: #f8fafc;
      padding: 60px 55px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.12);
      padding-bottom: 25px;
    }
    .logo-container {
      display: flex;
      align-items: center;
    }
    .logo-img {
      height: 60px;
      width: auto;
      object-fit: contain;
    }
    .pill {
      background: rgba(0, 229, 255, 0.12);
      border: 1px solid var(--cyan-glow);
      color: var(--cyan-glow);
      padding: 10px 24px;
      border-radius: 9999px;
      font-size: 19px;
      font-weight: 700;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .hero-section {
      margin-top: 10px;
    }
    .tagline {
      color: var(--cyan-glow);
      font-size: 23px;
      font-weight: 700;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      margin-bottom: 12px;
    }
    .main-title {
      font-family: 'Poppins', sans-serif;
      font-size: 58px;
      line-height: 1.15;
      font-weight: 900;
      color: #ffffff;
      margin-bottom: 16px;
    }
    .main-title span {
      background: linear-gradient(135deg, #00e5ff 0%, #38bdf8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .subhead {
      font-size: 24px;
      line-height: 1.45;
      color: #cbd5e1;
      max-width: 950px;
    }
    .cards-grid {
      display: flex;
      flex-direction: column;
      gap: 18px;
      margin: 10px 0;
    }
    .card {
      background: var(--navy-card);
      border: 1px solid rgba(0, 229, 255, 0.25);
      border-radius: 20px;
      padding: 24px 30px;
      display: flex;
      align-items: center;
      gap: 24px;
      box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
    }
    .card-icon {
      font-size: 42px;
      background: rgba(2, 132, 199, 0.25);
      border: 1px solid rgba(0, 229, 255, 0.4);
      width: 76px;
      height: 76px;
      border-radius: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .card-text h3 {
      font-family: 'Poppins', sans-serif;
      font-size: 26px;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 6px;
    }
    .card-text h3 .highlight {
      color: var(--cyan-glow);
      font-size: 20px;
      font-weight: 600;
      margin-left: 10px;
      background: rgba(0, 229, 255, 0.15);
      padding: 3px 12px;
      border-radius: 8px;
    }
    .card-text p {
      font-size: 20px;
      line-height: 1.4;
      color: #94a3b8;
    }
    .saving-banner {
      background: linear-gradient(90deg, rgba(0, 229, 255, 0.15) 0%, rgba(2, 132, 199, 0.25) 100%);
      border: 1px solid var(--cyan-glow);
      border-radius: 20px;
      padding: 24px 30px;
      text-align: left;
    }
    .saving-banner h4 {
      font-family: 'Poppins', sans-serif;
      font-size: 26px;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 6px;
    }
    .saving-banner h4 span {
      color: var(--cyan-glow);
    }
    .saving-banner p {
      font-size: 20px;
      color: #e2e8f0;
      line-height: 1.35;
    }
    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid rgba(255, 255, 255, 0.12);
      padding-top: 25px;
    }
    .footer-left {
      font-size: 22px;
      font-weight: 700;
      color: #ffffff;
    }
    .footer-left span {
      color: var(--cyan-glow);
    }
    .footer-right {
      font-size: 20px;
      color: var(--text-dim);
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo-container">
      <img src="${logoDataUri}" class="logo-img" alt="TotalBiz Support">
    </div>
    <div class="pill">${cfg.pill}</div>
  </div>

  <div class="hero-section">
    <div class="tagline">${cfg.tagline}</div>
    <h1 class="main-title">${cfg.title}</h1>
    <p class="subhead">${cfg.subhead}</p>
  </div>

  <div class="cards-grid">
    ${cardsHtml}
  </div>

  <div class="saving-banner">
    <h4>${cfg.bannerTitle}</h4>
    <p>${cfg.bannerDesc}</p>
  </div>

  <div class="footer">
    <div class="footer-left">${cfg.footerLeft}</div>
    <div class="footer-right">${cfg.footerRight}</div>
  </div>
</body>
</html>`;
}

for (const v of visuals) {
  console.log(`Rendering visual: ${v.name}...`);
  const html = generateHtml(v);
  const htmlFile = path.resolve(tempDir, `${v.name}.html`);
  fs.writeFileSync(htmlFile, html);

  const rawOut = path.resolve(tempDir, `${v.name}_raw.jpg`);
  const outFile1 = path.resolve(`client/public/${v.name}.jpg`);
  const outFile2 = path.resolve(`marketing/03-content/${v.name}.jpg`);
  const userDataDir = path.resolve(tempDir, `user_data_${v.name}`);

  const cmd = `"${edgePath}" --headless --disable-gpu --hide-scrollbars --window-size=1080,1350 --user-data-dir="${userDataDir}" --screenshot="${rawOut}" "file://${htmlFile}"`;
  execSync(cmd, { stdio: 'inherit' });

  // Python clean metadata strip (guarantees zero AI metadata, zero EXIF, pure clean image)
  const pyCmd = `python -c "from PIL import Image; im = Image.open(r'${rawOut}'); clean = Image.new(im.mode, im.size); clean.putdata(list(im.getdata())); clean.save(r'${outFile1}', 'JPEG', quality=95); print('Cleaned metadata for ${v.name}')"`;
  execSync(pyCmd, { stdio: 'inherit' });

  fs.copyFileSync(outFile1, outFile2);
  console.log(`✅ Saved & Metadata Cleaned: ${outFile1}`);
}

console.log('\n🎉 All travel visuals rendered & metadata scrubbed!');

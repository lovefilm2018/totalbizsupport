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
    name: 'admin_invoicing_visual',
    pill: 'Admin & Invoicing',
    tagline: 'Small Business Workflow Automation',
    title: 'Ditch the Sunday <span>Invoicing Chaos</span>',
    subhead: 'Stop losing 5+ hours every weekend to manual invoices, paper receipts, and awkward payment chasing.',
    cards: [
      {
        icon: '📱',
        title: '1. 30-Second Mobile Invoicing',
        highlight: 'On-Site Quotes',
        desc: 'Send professional, branded quotes and invoices from your phone before leaving the job site.'
      },
      {
        icon: '💳',
        title: '2. 1-Click Instant Payments',
        highlight: 'Fast Settlement',
        desc: 'Give clients easy tap-to-pay & direct bank links so invoices get paid 3x faster.'
      },
      {
        icon: '⏰',
        title: '3. Automated Chase Reminders',
        highlight: 'Zero Stress',
        desc: 'Polite, automated follow-up emails chase overdue bills without awkward phone calls.'
      }
    ],
    bannerTitle: 'Reclaim Your Weekends: <span>From Chaos to Auto-Pilot</span>',
    bannerDesc: 'We set up simple mobile systems that get you paid faster and give you your time back.',
    footerLeft: '👉 Streamline your business at <span>totalbiz.co.uk</span>',
    footerRight: '📍 Heathfield, East Sussex • Sussex & Kent'
  },
  {
    name: 'local_seo_website_visual',
    pill: 'Web Design & Local SEO',
    tagline: 'High-Speed Web & Local Search Rankings',
    title: 'Get Found on Google <span>Across Sussex & Kent</span>',
    subhead: 'When local customers search for your services, does your business show up first — or your competitors?',
    cards: [
      {
        icon: '⚡',
        title: '1. Lightning-Fast Mobile Speed',
        highlight: 'Under 1.5s',
        desc: 'Ultra-fast web apps that load instantly on smartphones so visitors never bounce.'
      },
      {
        icon: '🗺️',
        title: '2. Local Google 3-Pack SEO',
        highlight: 'Rank #1',
        desc: 'Hardened Geo-Schema markup to dominate Google Maps across Sussex and Kent.'
      },
      {
        icon: '💬',
        title: '3. Friction-Free Inquiries',
        highlight: 'Direct WhatsApp',
        desc: '1-tap WhatsApp consultation and call buttons that convert visitors into paying clients.'
      }
    ],
    bannerTitle: 'Enterprise Web Architecture: <span>Zero Agency Bloat</span>',
    bannerDesc: 'Fast, secure, custom websites designed to convert — without the £5,000 agency price tag.',
    footerLeft: '👉 Dominate local search at <span>totalbiz.co.uk</span>',
    footerRight: '📍 Heathfield, East Sussex • Sussex & Kent'
  },
  {
    name: 'disaster_recovery_backup_visual',
    pill: 'Data Backup & Security',
    tagline: 'Business Continuity & Peace of Mind',
    title: 'The Spilled Coffee Test: <span>Is Your Data Safe?</span>',
    subhead: 'If your primary work laptop failed permanently today, how many days of revenue and client records would you lose?',
    cards: [
      {
        icon: '☁️',
        title: '1. Automated 3-2-1 Cloud Backup',
        highlight: 'Silent Sync',
        desc: 'Continuous automated off-site backups of every critical client document and spreadsheet.'
      },
      {
        icon: '🔒',
        title: '2. Full-Disk Encryption & Security',
        highlight: 'Total Protection',
        desc: 'Bank-grade encryption so client records stay safe even if a laptop is lost, broken, or stolen.'
      },
      {
        icon: '⚡',
        title: '3. 2-Hour Rapid Recovery',
        highlight: 'Zero Downtime',
        desc: 'Pick up a replacement computer and get right back to business without missing a beat.'
      }
    ],
    bannerTitle: 'Weekend Peace of Mind: <span>Systems That Protect 24/7</span>',
    bannerDesc: 'Protect your livelihood today so you can close your laptop on Friday with 100% confidence.',
    footerLeft: '👉 Protect your business at <span>totalbiz.co.uk</span>',
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
    }
    .logo-container {
      background: rgba(255, 255, 255, 0.05);
      border: 2px solid rgba(0, 229, 255, 0.35);
      padding: 14px 28px;
      border-radius: 20px;
      backdrop-filter: blur(12px);
      box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 229, 255, 0.15);
    }
    .logo-img {
      height: 65px;
      width: auto;
      object-fit: contain;
      filter: drop-shadow(0 0 12px rgba(0, 229, 255, 0.4));
    }
    .pill {
      font-size: 20px;
      font-weight: 800;
      color: var(--cyan-glow);
      background: rgba(0, 229, 255, 0.12);
      border: 2px solid rgba(0, 229, 255, 0.4);
      padding: 10px 24px;
      border-radius: 999px;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    .hero-section {
      text-align: center;
      margin: 15px 0 25px 0;
    }
    .tagline {
      font-size: 22px;
      font-weight: 800;
      color: var(--cyan-glow);
      text-transform: uppercase;
      letter-spacing: 3px;
      margin-bottom: 12px;
    }
    .main-title {
      font-family: 'Poppins', sans-serif;
      font-size: 52px;
      font-weight: 900;
      line-height: 1.15;
      color: #ffffff;
      margin-bottom: 16px;
      text-shadow: 0 4px 20px rgba(0,0,0,0.6);
    }
    .main-title span {
      background: linear-gradient(135deg, #00e5ff 0%, #38bdf8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .subhead {
      font-size: 25px;
      color: #cbd5e1;
      line-height: 1.45;
      max-width: 920px;
      margin: 0 auto;
    }
    .cards-grid {
      display: flex;
      flex-direction: column;
      gap: 22px;
    }
    .card {
      background: var(--navy-card);
      border: 2px solid rgba(0, 229, 255, 0.25);
      border-radius: 24px;
      padding: 24px 30px;
      display: flex;
      align-items: center;
      gap: 26px;
      backdrop-filter: blur(14px);
      box-shadow: 0 10px 30px -5px rgba(0,0,0,0.5);
      position: relative;
      overflow: hidden;
    }
    .card::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 6px;
      background: linear-gradient(180deg, var(--cyan-glow), var(--blue-accent));
    }
    .card-icon {
      width: 80px;
      height: 80px;
      min-width: 80px;
      background: rgba(0, 229, 255, 0.12);
      border: 2px solid rgba(0, 229, 255, 0.35);
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 38px;
    }
    .card-text h3 {
      font-size: 28px;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .card-text h3 .highlight {
      color: var(--cyan-glow);
      font-size: 22px;
      font-weight: 700;
    }
    .card-text p {
      font-size: 22px;
      color: #cbd5e1;
      line-height: 1.45;
    }
    .saving-banner {
      background: linear-gradient(135deg, rgba(0, 229, 255, 0.15), rgba(2, 132, 199, 0.25));
      border: 2px solid var(--cyan-glow);
      border-radius: 22px;
      padding: 22px 30px;
      text-align: center;
      box-shadow: 0 0 30px rgba(0, 229, 255, 0.2);
    }
    .saving-banner h4 {
      font-size: 30px;
      font-weight: 900;
      color: #ffffff;
      margin-bottom: 6px;
    }
    .saving-banner h4 span {
      color: var(--cyan-glow);
    }
    .saving-banner p {
      font-size: 22px;
      color: #e2e8f0;
      font-weight: 600;
    }
    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 20px;
      border-top: 2px solid rgba(255, 255, 255, 0.1);
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

  const outFile1 = path.resolve(`client/public/${v.name}.jpg`);
  const outFile2 = path.resolve(`marketing/03-content/${v.name}.jpg`);
  const userDataDir = path.resolve(tempDir, `user_data_${v.name}`);

  const cmd = `"${edgePath}" --headless --disable-gpu --hide-scrollbars --window-size=1080,1350 --user-data-dir="${userDataDir}" --screenshot="${outFile1}" "file://${htmlFile}"`;
  execSync(cmd, { stdio: 'inherit' });
  fs.copyFileSync(outFile1, outFile2);
  console.log(`✅ Saved: ${outFile1}`);
}

console.log('\n🎉 All weekly visuals successfully generated!');

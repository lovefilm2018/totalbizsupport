import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const tempDir = path.resolve('marketing/03-content/temp_post');
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

const logoBase64 = fs.readFileSync('marketing/03-content/brand-assets/totalbiz_logo_electric_white_tight.png').toString('base64');
const logoDataUri = `data:image/png;base64,${logoBase64}`;

const html = `<!DOCTYPE html>
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
      font-size: 56px;
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
      font-size: 26px;
      color: #cbd5e1;
      line-height: 1.45;
      max-width: 900px;
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
    <div class="pill">Cost Optimisation</div>
  </div>

  <div class="hero-section">
    <div class="tagline">Small Business Tech Health Check</div>
    <h1 class="main-title">The <span>Zombie Software</span> Audit</h1>
    <p class="subhead">Is your business quietly bleeding £200 to £500 every month on forgotten SaaS tools, duplicate apps, and unused user licences?</p>
  </div>

  <div class="cards-grid">
    <div class="card">
      <div class="card-icon">🔍</div>
      <div class="card-text">
        <h3>1. Uncover Forgotten Tools <span class="highlight">Auto-Renewals</span></h3>
        <p>Identify old subscriptions, test accounts, and recurring direct debits nobody uses.</p>
      </div>
    </div>

    <div class="card">
      <div class="card-icon">⚡</div>
      <div class="card-text">
        <h3>2. Eliminate Overlap <span class="highlight">SaaS Sprawl</span></h3>
        <p>Replace 4–5 fragmented single-purpose tools with one streamlined ecosystem.</p>
      </div>
    </div>

    <div class="card">
      <div class="card-icon">👥</div>
      <div class="card-text">
        <h3>3. Right-Size Licences <span class="highlight">Seat Auditing</span></h3>
        <p>Stop paying premium monthly tier seats for ex-staff and inactive team members.</p>
      </div>
    </div>
  </div>

  <div class="saving-banner">
    <h4>Average SME Recovery: <span>£2,400 to £6,000 / year</span></h4>
    <p>We audit your complete digital setup and eliminate operational waste.</p>
  </div>

  <div class="footer">
    <div class="footer-left">👉 Tap link in bio <span>totalbiz.co.uk</span></div>
    <div class="footer-right">📍 Heathfield, East Sussex • UK-Wide Remote</div>
  </div>
</body>
</html>`;

const htmlFile = path.resolve(tempDir, 'zombie_saas_audit.html');
fs.writeFileSync(htmlFile, html);

const outFile1 = path.resolve('client/public/zombie_saas_audit_visual.jpg');
const outFile2 = path.resolve('marketing/03-content/zombie_saas_audit_visual.jpg');
const userDataDir = path.resolve(tempDir, 'user_data_saas');

const cmd = `"${edgePath}" --headless --disable-gpu --hide-scrollbars --window-size=1080,1350 --user-data-dir="${userDataDir}" --screenshot="${outFile1}" "file://${htmlFile}"`;
console.log('Rendering 1080x1350 bespoke visual with Edge headless...');
execSync(cmd, { stdio: 'inherit' });
fs.copyFileSync(outFile1, outFile2);
console.log('Successfully generated bespoke visual at:', outFile1);

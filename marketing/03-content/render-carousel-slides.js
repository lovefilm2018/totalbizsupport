import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outputDir = path.resolve('client/public');
const tempDir = path.resolve('marketing/03-content/temp_slides');

if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

// Convert images to base64 data URIs so Edge headless renders them instantly without network delay
const logoBase64 = fs.readFileSync('marketing/03-content/brand-assets/totalbiz_logo_electric_white_tight.png').toString('base64');
const presenterBase64 = fs.readFileSync('marketing/03-content/life-hacks/assets/presenter_portrait.png').toString('base64');

const logoDataUri = `data:image/png;base64,${logoBase64}`;
const presenterDataUri = `data:image/png;base64,${presenterBase64}`;

const slideHtml = (contentHtml, slideNum, footerPrompt, isHero = false) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Inter:wght@400;500;600;700;800;900&family=Montserrat:wght@800;900&family=Poppins:wght@600;700;800;900&family=Source+Serif+4:ital,wght@0,600;0,700;1,400&display=swap" rel="stylesheet">
  <style>
    :root {
      --navy-bg: #06182c;
      --cyan-accent: #00d2ff;
      --blue-accent: #0080ff;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
    body {
      width: 1080px;
      height: 1350px;
      background: radial-gradient(circle at 85% 15%, rgba(0, 210, 255, 0.22), transparent 55%),
                  radial-gradient(circle at 15% 85%, rgba(0, 128, 255, 0.18), transparent 55%),
                  var(--navy-bg);
      color: #f8fafc;
      padding: 60px 50px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
    }
    .slide-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .brand-logo-wrap {
      display: flex;
      align-items: center;
      background: rgba(255, 255, 255, 0.06);
      border: 2px solid rgba(0, 210, 255, 0.25);
      padding: 14px 28px;
      border-radius: 20px;
      backdrop-filter: blur(12px);
    }
    .brand-logo-wrap-hero {
      display: flex;
      align-items: center;
      background: rgba(255, 255, 255, 0.08);
      border: 2px solid rgba(0, 210, 255, 0.4);
      padding: 18px 36px;
      border-radius: 24px;
      backdrop-filter: blur(14px);
      box-shadow: 0 12px 30px -5px rgba(0, 0, 0, 0.6), 0 0 25px rgba(0, 210, 255, 0.25);
    }
    .brand-logo-img {
      height: 70px;
      width: auto;
      object-fit: contain;
      filter: drop-shadow(0 0 16px rgba(0, 210, 255, 0.5));
    }
    .brand-logo-img-hero {
      height: 105px;
      width: auto;
      object-fit: contain;
      filter: drop-shadow(0 0 24px rgba(0, 210, 255, 0.65));
    }
    .slide-number {
      font-size: 24px;
      font-weight: 800;
      color: var(--cyan-accent);
      background: rgba(0, 210, 255, 0.12);
      border: 2px solid rgba(0, 210, 255, 0.35);
      padding: 10px 24px;
      border-radius: 999px;
    }
    .slide-content-hero {
      margin: auto 0;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .slide-tag {
      color: var(--cyan-accent);
      font-size: 22px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 2px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .hero-title {
      font-family: 'Poppins', sans-serif;
      font-size: 54px;
      font-weight: 800;
      line-height: 1.22;
      color: #fff;
    }
    .hero-title span { color: var(--cyan-accent); }
    .hero-desc {
      font-size: 30px;
      line-height: 1.55;
      color: #cbd5e1;
    }
    .founder-card {
      display: flex;
      align-items: center;
      gap: 24px;
      background: rgba(11, 37, 69, 0.85);
      border: 2px solid rgba(0, 210, 255, 0.35);
      border-radius: 28px;
      padding: 24px 30px;
      backdrop-filter: blur(12px);
      box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.6);
      margin-top: 10px;
    }
    .founder-avatar-img {
      width: 105px;
      height: 105px;
      border-radius: 50%;
      border: 4px solid var(--cyan-accent);
      object-fit: cover;
    }
    .founder-info h4 { font-size: 32px; font-weight: 800; color: #fff; margin-bottom: 4px; }
    .founder-info p { font-size: 24px; color: var(--cyan-accent); font-weight: 700; }
    .founder-badge { font-size: 20px; color: #94a3b8; margin-top: 4px; font-weight: 500; }

    /* Slide 2 Grid */
    .credentials-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin: 15px 0;
    }
    .cred-box {
      background: rgba(11, 37, 69, 0.85);
      border: 2px solid rgba(255, 255, 255, 0.15);
      border-radius: 24px;
      padding: 30px 20px;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 165px;
    }
    .logo-hsbc {
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Inter', sans-serif;
      font-weight: 900;
      font-size: 38px;
      letter-spacing: 1px;
      color: #ffffff;
    }
    .logo-ebay {
      font-family: 'Montserrat', sans-serif;
      font-size: 46px;
      font-weight: 900;
      letter-spacing: -2px;
    }
    .ebay-e { color: #e53238; }
    .ebay-b { color: #0064d2; }
    .ebay-a { color: #f5af02; }
    .ebay-y { color: #86b817; }
    .logo-schroders {
      font-family: 'Source Serif 4', serif;
      font-size: 40px;
      font-weight: 700;
      letter-spacing: 1px;
      color: #ffffff;
    }
    .logo-gumtree {
      font-family: 'Poppins', sans-serif;
      font-size: 36px;
      font-weight: 800;
      color: #72ef36;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .cred-desc {
      font-size: 20px;
      color: var(--cyan-accent);
      font-weight: 700;
      margin-top: 10px;
    }
    .mission-quote-box {
      background: rgba(0, 210, 255, 0.1);
      border-left: 6px solid var(--cyan-accent);
      padding: 24px 28px;
      border-radius: 0 24px 24px 0;
      font-size: 25px;
      line-height: 1.5;
      color: #e2e8f0;
      margin-top: 10px;
    }

    /* Slide 3 Pillars */
    .pillars-list {
      display: flex;
      flex-direction: column;
      gap: 18px;
      margin: 15px 0;
    }
    .pillar-item {
      display: flex;
      align-items: center;
      gap: 24px;
      background: rgba(11, 37, 69, 0.85);
      border: 2px solid rgba(0, 210, 255, 0.22);
      border-radius: 20px;
      padding: 18px 24px;
    }
    .pillar-icon-box {
      width: 65px;
      height: 65px;
      border-radius: 16px;
      background: rgba(0, 210, 255, 0.15);
      border: 2px solid rgba(0, 210, 255, 0.35);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 34px;
      flex-shrink: 0;
    }
    .pillar-text h5 {
      font-size: 27px;
      font-weight: 800;
      color: #fff;
      margin-bottom: 4px;
    }
    .pillar-text p {
      font-size: 21px;
      color: #94a3b8;
      line-height: 1.35;
    }
    .cta-banner {
      background: linear-gradient(135deg, #00509E, #0080ff);
      border: 2px solid rgba(0, 210, 255, 0.5);
      border-radius: 24px;
      padding: 24px 28px;
      text-align: center;
      margin-top: 10px;
    }
    .cta-banner h4 { font-size: 28px; font-weight: 800; color: #fff; margin-bottom: 4px; }
    .cta-banner p { font-size: 22px; color: #dbeafe; font-weight: 600; }

    /* Footer */
    .slide-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 2px solid rgba(255, 255, 255, 0.15);
      padding-top: 24px;
    }
    .swipe-prompt {
      font-size: 24px;
      font-weight: 800;
      color: var(--cyan-accent);
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .dots-indicator { display: flex; gap: 10px; }
    .dot {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
    }
    .dot.active {
      width: 36px;
      border-radius: 999px;
      background: var(--cyan-accent);
    }
  </style>
</head>
<body>
  <div class="slide-header">
    <div class="${isHero ? 'brand-logo-wrap-hero' : 'brand-logo-wrap'}">
      <img src="${logoDataUri}" alt="TotalBiz Support" class="${isHero ? 'brand-logo-img-hero' : 'brand-logo-img'}">
    </div>
    <div class="slide-number">${slideNum} / 3</div>
  </div>

  <div class="slide-content-hero">
    ${contentHtml}
  </div>

  <div class="slide-footer">
    <div class="swipe-prompt">${footerPrompt}</div>
    <div class="dots-indicator">
      <div class="dot ${slideNum === 1 ? 'active' : ''}"></div>
      <div class="dot ${slideNum === 2 ? 'active' : ''}"></div>
      <div class="dot ${slideNum === 3 ? 'active' : ''}"></div>
    </div>
  </div>
</body>
</html>`;

const slide1Html = `
  <span class="slide-tag">⚡ ENTERPRISE DISCIPLINE • SMALL BIZ PRICES</span>
  <h1 class="hero-title">High-Level IT & Strategy. <span>Zero Jargon.</span></h1>
  <p class="hero-desc">Delivering 20+ years of global corporate IT experience directly to local sole traders, growing businesses, and property hosts across Sussex & Kent.</p>
  <div class="founder-card">
    <img src="${presenterDataUri}" alt="Alex Poxon" class="founder-avatar-img">
    <div class="founder-info">
      <h4>Alex Poxon</h4>
      <p>Founder & Project Director</p>
      <div class="founder-badge">📍 Heathfield • Sussex, Kent & UK Remote</div>
    </div>
  </div>
`;

const slide2Html = `
  <span class="slide-tag">🏛️ PROVEN AT ENTERPRISE SCALE</span>
  <h2 class="hero-title" style="font-size: 46px;">Built on High-Stakes <span>Global Infrastructure</span></h2>
  <div class="credentials-grid">
    <div class="cred-box">
      <div class="logo-hsbc">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 32" width="68" height="34" style="display:inline-block; vertical-align: middle; margin-right: 10px;">
          <polygon points="0,16 16,0 16,32" fill="#db0011"/>
          <polygon points="64,16 48,0 48,32" fill="#db0011"/>
          <polygon points="16,0 48,0 32,16" fill="#db0011"/>
          <polygon points="16,32 48,32 32,16" fill="#db0011"/>
          <polygon points="16,0 16,32 32,16" fill="#ffffff"/>
          <polygon points="48,0 48,32 32,16" fill="#ffffff"/>
        </svg>
        <span>HSBC</span>
      </div>
      <div class="cred-desc">World's #1 Global Trade Finance Bank</div>
    </div>
    <div class="cred-box">
      <div class="logo-ebay">
        <span class="ebay-e">e</span><span class="ebay-b">b</span><span class="ebay-a">a</span><span class="ebay-y">y</span>
      </div>
      <div class="cred-desc">Global E-Commerce Giant</div>
    </div>
    <div class="cred-box">
      <div class="logo-schroders">Schroders</div>
      <div class="cred-desc">£750B+ Global Asset Manager</div>
    </div>
    <div class="cred-box">
      <div class="logo-gumtree">🌳 Gumtree</div>
      <div class="cred-desc">UK's #1 Classifieds Platform</div>
    </div>
  </div>
  <div class="mission-quote-box">
    "You don't need a bloated 5-man agency. You need 1 reliable, accountable partner who solves digital, hardware, and admin headaches under one roof."
  </div>
`;

const slide3Html = `
  <span class="slide-tag">🛠️ 4 CORE SERVICE PILLARS</span>
  <div class="pillars-list">
    <div class="pillar-item">
      <div class="pillar-icon-box">💻</div>
      <div class="pillar-text">
        <h5>Websites & Mobile Apps</h5>
        <p>Custom builds without £5k–£10k agency price bloat.</p>
      </div>
    </div>
    <div class="pillar-item">
      <div class="pillar-icon-box">🛠️</div>
      <div class="pillar-text">
        <h5>Tech & Equipment Fixes</h5>
        <p>Hands-on Wi-Fi, hardware & networks across Sussex & Kent.</p>
      </div>
    </div>
    <div class="pillar-item">
      <div class="pillar-icon-box">📊</div>
      <div class="pillar-text">
        <h5>Admin & Bookkeeping</h5>
        <p>Streamlined invoices, software audits, and automation.</p>
      </div>
    </div>
    <div class="pillar-item">
      <div class="pillar-icon-box">⚡</div>
      <div class="pillar-text">
        <h5>Proprietary Tech & AI</h5>
        <p>Airbnb dynamic pricing engines and custom tools.</p>
      </div>
    </div>
  </div>
  <div class="cta-banner">
    <h4>Ready to streamline your business?</h4>
    <p>🌐 totalbiz.co.uk • 📍 Heathfield, East Sussex</p>
  </div>
`;

// Write HTML files
fs.writeFileSync(path.join(tempDir, 'slide_1.html'), slideHtml(slide1Html, 1, 'Swipe for Corporate Track Record ➡️', true));
fs.writeFileSync(path.join(tempDir, 'slide_2.html'), slideHtml(slide2Html, 2, 'Swipe to See What We Fix ➡️', false));
fs.writeFileSync(path.join(tempDir, 'slide_3.html'), slideHtml(slide3Html, 3, '👉 Tap Link in Bio (totalbiz.co.uk)', false));

console.log('Rendering 1080x1350 HD Carousel Slide images with headless browser...');

for (let i = 1; i <= 3; i++) {
  const htmlFile = path.resolve(tempDir, `slide_${i}.html`);
  const outFile = path.resolve(outputDir, `carousel_slide_${i}.jpg`);
  const userDataDir = path.resolve(tempDir, `user_data_${i}`);
  
  const cmd = `"${edgePath}" --headless --disable-gpu --hide-scrollbars --window-size=1080,1350 --user-data-dir="${userDataDir}" --screenshot="${outFile}" "file://${htmlFile}"`;
  
  console.log(`Rendering Slide ${i} -> ${outFile}...`);
  execSync(cmd, { stdio: 'inherit' });
}

console.log('All 3 slides successfully rendered to client/public!');

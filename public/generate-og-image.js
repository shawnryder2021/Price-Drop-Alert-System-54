// Node.js script to generate the OG image
// Run with: node public/generate-og-image.js

const fs = require('fs');
const path = require('path');

// Create a simple SVG version for better compatibility
const ogImageSVG = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1e40af;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#3b82f6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#60a5fa;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="cardBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.95" />
      <stop offset="100%" style="stop-color:#f8fafc;stop-opacity:0.95" />
    </linearGradient>
    <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#10b981;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#059669;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>
  
  <!-- Decorative elements -->
  <circle cx="1100" cy="100" r="150" fill="rgba(255,255,255,0.1)"/>
  <circle cx="100" cy="530" r="100" fill="rgba(255,255,255,0.1)"/>
  
  <!-- Main card -->
  <rect x="100" y="115" width="1000" height="400" rx="24" fill="url(#cardBg)" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
  
  <!-- Logo/Title -->
  <text x="600" y="200" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="48" font-weight="900" fill="#1e40af">
    🚗 Premium Auto Gallery
  </text>
  
  <!-- Tagline -->
  <text x="600" y="240" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="500" fill="#374151">
    Buy Quality Cars • Sell Your Car for Cash
  </text>
  
  <!-- Feature icons and text -->
  <g transform="translate(250, 280)">
    <!-- Feature 1 -->
    <circle cx="0" cy="0" r="32" fill="url(#greenGrad)"/>
    <text x="0" y="8" text-anchor="middle" font-family="system-ui" font-size="24">🏆</text>
    <text x="0" y="60" text-anchor="middle" font-family="system-ui" font-size="16" font-weight="700" fill="#1f2937">Premium Inventory</text>
    <text x="0" y="80" text-anchor="middle" font-family="system-ui" font-size="14" fill="#6b7280">Quality pre-owned vehicles</text>
  </g>
  
  <g transform="translate(600, 280)">
    <!-- Feature 2 -->
    <circle cx="0" cy="0" r="32" fill="url(#greenGrad)"/>
    <text x="0" y="8" text-anchor="middle" font-family="system-ui" font-size="24">💰</text>
    <text x="0" y="60" text-anchor="middle" font-family="system-ui" font-size="16" font-weight="700" fill="#1f2937">Instant Cash Offers</text>
    <text x="0" y="80" text-anchor="middle" font-family="system-ui" font-size="14" fill="#6b7280">Sell your car today</text>
  </g>
  
  <g transform="translate(950, 280)">
    <!-- Feature 3 -->
    <circle cx="0" cy="0" r="32" fill="url(#greenGrad)"/>
    <text x="0" y="8" text-anchor="middle" font-family="system-ui" font-size="24">⚡</text>
    <text x="0" y="60" text-anchor="middle" font-family="system-ui" font-size="16" font-weight="700" fill="#1f2937">Quick Process</text>
    <text x="0" y="80" text-anchor="middle" font-family="system-ui" font-size="14" fill="#6b7280">Fast &amp; easy transactions</text>
  </g>
  
  <!-- CTA Button -->
  <rect x="450" y="420" width="300" height="56" rx="12" fill="url(#greenGrad)"/>
  <text x="600" y="456" text-anchor="middle" font-family="system-ui" font-size="20" font-weight="600" fill="white">
    Visit Our Showroom Online
  </text>
  
  <!-- Powered by text -->
  <text x="1160" y="610" text-anchor="end" font-family="system-ui" font-size="14" font-weight="500" fill="rgba(255,255,255,0.8)">
    Powered by Shawn Ryder Digital
  </text>
</svg>
`;

// Write the SVG file
fs.writeFileSync(path.join(__dirname, 'og-image.svg'), ogImageSVG);

console.log('✅ OG image SVG generated successfully!');
console.log('📁 File location: public/og-image.svg');
console.log('🌐 Add this to your HTML head:');
console.log('<meta property="og:image" content="/og-image.svg">');
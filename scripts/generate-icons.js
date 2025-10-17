import fs from 'fs';
import path from 'path';

// SVG content for different sizes
const generateSVG = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#9333ea" />
      <stop offset="50%" stop-color="#a855f7" />
      <stop offset="100%" stop-color="#ec4899" />
    </linearGradient>
    <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#e0e7ff" />
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="40" fill="url(#bgGradient)" />
  <g transform="translate(100, 60)">
    <path d="M -15 0 L -15 40 L -30 40 L 0 70 L 30 40 L 15 40 L 15 0 Z" fill="url(#iconGradient)" stroke="#ffffff" stroke-width="4" stroke-linejoin="round"/>
  </g>
  <rect x="50" y="135" width="100" height="15" rx="7.5" fill="url(#iconGradient)" stroke="#ffffff" stroke-width="3"/>
  <circle cx="35" cy="40" r="4" fill="#ffffff" opacity="0.9"/>
  <circle cx="165" cy="45" r="3" fill="#ffffff" opacity="0.9"/>
  <circle cx="45" cy="160" r="3" fill="#ffffff" opacity="0.9"/>
  <circle cx="160" cy="155" r="4" fill="#ffffff" opacity="0.9"/>
</svg>
`;

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

// Generate different icon sizes
const sizes = [ 16, 32, 48, 64, 128, 180, 192, 512 ];

sizes.forEach(size => {
    const svg = generateSVG(size);
    const filename = size === 180 ? 'apple-touch-icon.svg' :
        size === 192 ? 'icon-192.svg' :
            size === 512 ? 'icon-512.svg' :
                `favicon-${size}x${size}.svg`;

    fs.writeFileSync(path.join(publicDir, filename), svg);
    console.log(`✓ Generated ${filename}`);
});

// Generate main favicon
const mainFavicon = `
<svg width="32" height="32" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#9333ea" />
      <stop offset="100%" stop-color="#ec4899" />
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="40" fill="url(#grad)" />
  <path d="M 70 50 L 70 110 L 45 110 L 100 165 L 155 110 L 130 110 L 130 50 Z" fill="white" stroke="white" stroke-width="8"/>
  <rect x="50" y="175" width="100" height="15" rx="7.5" fill="white"/>
</svg>
`;

fs.writeFileSync(path.join(publicDir, 'favicon.svg'), mainFavicon);
console.log('✓ Generated favicon.svg');

console.log('\n✨ All icons generated successfully!\n');
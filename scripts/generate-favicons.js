const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const ICON_SIZES = {
  'favicon-16x16.png': 16,
  'favicon-32x32.png': 32,
  'apple-touch-icon.png': 180,
  'android-chrome-192x192.png': 192,
  'android-chrome-512x512.png': 512,
  'mstile-144x144.png': 144
};

async function generateFavicons() {
  const inputSvg = path.join(__dirname, '../src/assets/icons/logo.svg');
  const outputDir = path.join(__dirname, '../src/assets/icons');

  // Ensure output directory exists
  await fs.mkdir(outputDir, { recursive: true });

  // Generate PNG versions
  for (const [filename, size] of Object.entries(ICON_SIZES)) {
    await sharp(inputSvg)
      .resize(size, size)
      .png()
      .toFile(path.join(outputDir, filename));
    console.log(`Generated ${filename}`);
  }

  // Generate both sizes for favicon.ico
  const favicon16 = await sharp(inputSvg)
    .resize(16, 16)
    .png()
    .toBuffer();
  
  const favicon32 = await sharp(inputSvg)
    .resize(32, 32)
    .png()
    .toBuffer();

  // Combine both sizes into one ICO file
  const icoBuffer = Buffer.concat([favicon16, favicon32]);
  await fs.writeFile(path.join(outputDir, 'favicon.ico'), icoBuffer);
  console.log('Generated favicon.ico');

  // Generate Safari pinned tab SVG (monochrome)
  const safariSvg = await sharp(inputSvg)
    .resize(32, 32)
    .toBuffer();
  
  await fs.writeFile(path.join(outputDir, 'safari-pinned-tab.svg'), safariSvg);
  console.log('Generated safari-pinned-tab.svg');
}

generateFavicons().catch(console.error); 
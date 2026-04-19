const sharp = require('sharp');

async function processImage() {
  const { data, info } = await sharp('public/rose.png')
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const numPixels = info.width * info.height;
  for (let i = 0; i < numPixels; i++) {
    const idx = i * 4;
    const r = data[idx];
    const g = data[idx+1];
    const b = data[idx+2];
    
    // The background is #00FF00
    // So typical chroma key condition: green >> red and green >> blue
    const maxRB = Math.max(r, b);
    const dif = g - maxRB;
    
    // Very strong green pixel
    if (g > 200 && r < 50 && b < 50) {
      data[idx+3] = 0;
    } else if (dif > 30) {
      // Semi-transparent
      let alpha = 255 - Math.min(255, dif * 3);
      data[idx+3] = Math.max(0, alpha);
    }
  }

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 }
  }).toFile('public/rose-transparent.png');
}
processImage().catch(console.error);

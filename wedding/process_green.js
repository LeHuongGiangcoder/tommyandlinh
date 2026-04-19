const sharp = require('sharp');

async function processImage() {
  try {
    const { data, info } = await sharp('public/rose.png')
      .raw()
      .toBuffer({ resolveWithObject: true });

    const pixelArray = new Uint8ClampedArray(data.buffer);
    
    // Key out #00FF00
    for (let i = 0; i < pixelArray.length; i += 3) {
      const r = pixelArray[i];
      const g = pixelArray[i+1];
      const b = pixelArray[i+2];

      // Green screen detection
      // High green, low red/blue
      if (g > 200 && r < 50 && b < 50) {
        // We'll have to output RGBA, wait raw is RGB if we don't have alpha.
      }
    }
  } catch(e) {}
}

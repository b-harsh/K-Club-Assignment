const axios = require('axios');
const sharp = require('sharp');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function processImages(url) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const image = sharp(response.data);
    const metadata = await image.metadata();
    const perimeter = 2 * (metadata.height + metadata.width);
    const delay = Math.random() * 300 + 100;
    await sleep(delay);
    return { success: true, perimeter };
  } catch {
    return { success: false, error: error.message };
  }
}

module.exports = { processImages };

import { takeScreenshot } from './src/lib/screenshot.js';

async function testTakeScreenshot() {
  try {
    const icao24 = '4CAFB3'; // Replace this with a valid ICAO24 code
    const screenshotDirectory = './screenshots';

    const imagePath = await takeScreenshot(icao24, screenshotDirectory);
    console.log(`Screenshot saved at ${imagePath}`);
  } catch (error) {
    console.error('Error taking screenshot:', error);
  }
}

testTakeScreenshot();

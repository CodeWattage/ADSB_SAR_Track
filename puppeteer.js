const puppeteer = require('puppeteer');

async function takeScreenshot(url, outputPath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try {
    // Set user-agent to simulate a real browser
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36');

    // Navigate to the page and wait for it to load
    await page.goto(url, { waitUntil: 'networkidle0' });

    // Hide any overlays or popups that may interfere with the screenshot
    await page.evaluate(() => {
      const overlays = document.querySelectorAll('.overlay');
      overlays.forEach((overlay) => {
        overlay.style.display = 'none';
      });
    });

    // Take screenshot and save to output path
    await page.screenshot({ path: outputPath, fullPage: true });

    console.log(`Screenshot saved at ${outputPath}`);
  } catch (error) {
    console.error(`Error taking screenshot: ${error}`);
  } finally {
    await browser.close();
  }
}

// Example usage:
takeScreenshot('http://192.168.1.39/tar1090/?icao=440c33&zoom=12&enableLabels&extendedLabels=2&hideSideBar&hideButtons&screenshot', 'screenshot.png');

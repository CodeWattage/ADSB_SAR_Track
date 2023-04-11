const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const path = require('path');

async function takeScreenshot(icao24) {
  const url = `https://globe.adsbexchange.com/?icao=${icao24}`;
  const imagePath = path.join(__dirname, '../../screenshots', `${icao24}.png`);

  try {
    const options = new chrome.Options();
    options.headless();
    options.addArguments('--disable-gpu');

    const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    await driver.get(url);
    await driver.sleep(5000);

    const base64Image = await driver.takeScreenshot();
    fs.writeFileSync(imagePath, base64Image, 'base64');

    await driver.quit();

    return imagePath;
  } catch (error) {
    console.error('Error taking screenshot:', error);
    return null;
  }
}

module.exports = {
  takeScreenshot
};

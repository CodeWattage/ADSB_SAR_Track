const config = require('../config.json');
const { getAircraftData, filterWatchlistAircraft, filterAircraftByDistance } = require('./lib/aircraft');
const { tweetAircraftInfoWithImage } = require('./lib/twitter');
const { takeScreenshot } = require('./lib/screenshot');

async function main() {
  const data = await getAircraftData();
  if (data && data.length > 0) {
    const watchlistAircraft = filterWatchlistAircraft(data);
    const aircraftWithinRadius = filterAircraftByDistance(watchlistAircraft, config.feeder_lat, config.feeder_lon, config.radius_km);

    for (const aircraft of aircraftWithinRadius) {
      const screenshotPath = await takeScreenshot(aircraft.icao24);
      await tweetAircraftInfoWithImage(aircraft, screenshotPath);
    }
  } else {
    console.log('No aircraft data available.');
  }
}

main();

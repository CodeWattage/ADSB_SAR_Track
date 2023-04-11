import { getAircraftData, filterWatchlistAircraft, filterAircraftByDistance } from './lib/aircraft.js';
import { tweetAircraftInfoWithImage } from './lib/twitter.js';
import { takeScreenshot } from './lib/screenshot.js';


async function main() {
  try {
    const aircraftData = await aircraft.getAircraftData();
    const filteredAircraftData = aircraftData
      .filter((aircraft) => aircraft.flight && aircraft.flight !== '')
      .map((aircraft) => ({
        flight: aircraft.flight,
        altitude: aircraft.altitude || 0,
        lat: aircraft.lat || 0,
        lon: aircraft.lon || 0,
      }));
    const promises = filteredAircraftData.map(async (aircraft) => {
        const location = await geocoding.getLocation(aircraft.latitude, aircraft.longitude);
      if (location) {
        return {
          flight: aircraft.flight,
          altitude: aircraft.altitude,
          location,
        };
      }
      return null;
    });
    const results = await Promise.all(promises);
    const tweets = results.filter((result) => result !== null).map((result) => {
      const locationStr = `${result.location.city}, ${result.location.region}, ${result.location.country}`;
      const tweet = `${result.flight} is currently at ${locationStr} and is flying at ${result.altitude} feet.`;
      return tweet;
    });
    if (tweets.length > 0) {
      console.log(`Sending ${tweets.length} tweets.`);
      await twitter.sendTweets(tweets);
    } else {
      console.log('No tweets to send.');
    }
  } catch (error) {
    console.error(`Error fetching aircraft data: ${error.message}`);
  }
}

main();

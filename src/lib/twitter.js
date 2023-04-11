const Twitter = require('twitter');
const config = require('../../config.json');
const client = new Twitter(config.twitter_credentials);
const { reverseGeocode } = require('./geocoding');

async function tweetAircraftInfoWithImage(aircraft, imagePath) {
  const tweetText = await formatTweet(aircraft);

  client.post('media/upload', { media: imagePath }, (error, media) => {
    if (error) {
      console.error('Error uploading image:', error);
      return;
    }

    const status = {
      status: tweetText,
      media_ids: media.media_id_string
    };

    client.post('statuses/update', status, (error) => {
      if (error) {
        console.error('Error posting tweet:', error);
      } else {
        console.log(`Tweeted: ${tweetText}`);
      }
    });
  });
}

async function formatTweet(aircraft) {
  const template = getTweetTemplate(aircraft.icao24);
  const geocodingData = await reverseGeocode(aircraft.lat, aircraft.lon);
  const neighborhood = geocodingData.address.suburb || geocodingData.address.city || geocodingData.address.state || 'unknown location';

  return template
    .replace('{name}', getAircraftName(aircraft.icao24))
    .replace('{altitude}', aircraft.alt_baro)
    .replace('{speed}', aircraft.gs)
    .replace('{position}', `${aircraft.lat}, ${aircraft.lon}`)
    .replace('{neighborhood}', neighborhood);
}

function getTweetTemplate(icao24) {
  const templates = config.tweet_templates;
  return templates[icao24.toLowerCase()] || templates.default;
}

function getAircraftName(icao24) {
  const watchlistItem = config.watchlist.find(item => item.icao24.toLowerCase() === icao24.toLowerCase());
  return watchlistItem ? watchlistItem.name : icao24;
}

module.exports = {
  tweetAircraftInfoWithImage
};

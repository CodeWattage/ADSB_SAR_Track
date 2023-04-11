const fetch = import('node-fetch').then((module) => module.default);

async function getAircraftData() {
  const url = 'http://192.168.1.39/tar1090/data/aircraft.json';

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.aircraft;
  } catch (error) {
    console.error('Error fetching aircraft data:', error);
    return null;
  }
}

function filterWatchlistAircraft(data) {
  const watchlist = require('../../config.json').watchlist;
  const icao24Set = new Set(watchlist.map(item => item.icao24.toLowerCase()));

  return data.filter(aircraft => icao24Set.has(aircraft.icao24.toLowerCase()));
}

function filterAircraftByDistance(data, centerLat, centerLon, radius) {
  return data.filter(aircraft => {
    if (!aircraft.lat || !aircraft.lon) return false;

    const distance = calculateDistance(centerLat, centerLon, aircraft.lat, aircraft.lon);
    return distance <= radius;
  });
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
  Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
return R * c; // Distance in km
}

function deg2rad(deg) {
return deg * (Math.PI / 180);
}

module.exports = {
getAircraftData,
filterWatchlistAircraft,
filterAircraftByDistance
};

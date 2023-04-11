import fetch from 'node-fetch';

async function getAircraftData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.aircraft;
  } catch (error) {
    console.error('Error fetching aircraft data:', error);
    return [];
  }
}

function filterAircraftByWatchlist(aircraftList, watchlist) {
  return aircraftList.filter(aircraft => watchlist.includes(aircraft.hex));
}

function filterAircraftByDistance(aircraftList, lat, lon, maxDistanceKm) {
  return aircraftList.filter(aircraft => {
    if (!aircraft.lat || !aircraft.lon) return false;
    const distance = calculateDistance(lat, lon, aircraft.lat, aircraft.lon);
    return distance <= maxDistanceKm;
  });
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}

export { getAircraftData, filterAircraftByWatchlist, filterAircraftByDistance };

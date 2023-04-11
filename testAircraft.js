import { getAircraftData, filterAircraftByWatchlist, filterAircraftByDistance } from './src/lib/aircraft.js';

const TEST_URL = 'http://192.168.1.39/tar1090/data/aircraft.json'; // Replace with the actual URL from your config file
const WATCHLIST = ['4CAA55', 'AD5F34']; // Replace with your desired watchlist
const LOCATION_LAT = 55.96192431824567; // Replace with your desired latitude
const LOCATION_LON = -3.190797543124287; // Replace with your desired longitude
const MAX_DISTANCE_KM = 100; // Replace with your desired max distance in km

async function testAircraftFunctions() {
  const aircraftData = await getAircraftData(TEST_URL);
  console.log('Aircraft Data:', aircraftData);

  const watchlistAircraft = filterAircraftByWatchlist(aircraftData, WATCHLIST);
  console.log('Watchlist Aircraft:', watchlistAircraft);

  const nearbyAircraft = filterAircraftByDistance(aircraftData, LOCATION_LAT, LOCATION_LON, MAX_DISTANCE_KM);
  console.log('Nearby Aircraft:', nearbyAircraft);
}

testAircraftFunctions();

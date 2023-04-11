const fetch = import('node-fetch').then((module) => module.default);


async function reverseGeocode(lat, lon) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&zoom=18`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching reverse geocoding data:', error);
    return null;
  }
}

module.exports = {
  reverseGeocode
};

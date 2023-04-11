import fetch from 'node-fetch';

async function getLocation(latitude, longitude) {
    const fetch = await import('node-fetch');
    return new Promise((resolve, reject) => {
      fetch.default(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            resolve(data);
          } else {
            reject(new Error('No location data available.'));
          }
        })
        .catch((error) => reject(error));
    });
  }

  export { reverseGeocode };
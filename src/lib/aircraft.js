const fetch = require('node-fetch');

function getAircraftData() {
  return new Promise((resolve, reject) => {
    fetch('http://192.168.1.39/tar1090/data/aircraft.json')
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          resolve(data);
        } else {
          reject(new Error('No aircraft data available.'));
        }
      })
      .catch((error) => reject(error));
  });
}

module.exports = {
  getAircraftData,
};

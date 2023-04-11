async function getAircraftData() {
    const fetch = await import('node-fetch');
    return new Promise((resolve, reject) => {
      fetch.default('http://192.168.1.39/tar1090/data/aircraft.json')
        .then((response) => response.json())
        .then((data) => {
          if (data && Array.isArray(data.aircraft)) {
            resolve(data.aircraft);
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

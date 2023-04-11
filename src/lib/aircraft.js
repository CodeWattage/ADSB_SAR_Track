async function getAircraftData() {
    try {
      const response = await fetch(config.feeder_url);
      const data = await response.json();
      return data.aircraft;
    } catch (error) {
      console.error('Error fetching aircraft data:', error);
      return [];
    }
  }

  function filterAircraftByDistance(aircraftList, center, radiusKm) {
    return aircraftList.filter((aircraft) => {
      if (!aircraft.lat || !aircraft.lon) {
        return false;
      }

      const distance = calculateDistance(center.latitude, center.longitude, aircraft.lat, aircraft.lon);
      return distance <= radiusKm;
    });
  }

  export { getAircraftData, filterWatchlistAircraft, filterAircraftByDistance };

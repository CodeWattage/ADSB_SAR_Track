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


  export { getAircraftData, filterWatchlistAircraft, filterAircraftByDistance };

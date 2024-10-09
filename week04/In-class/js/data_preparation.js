/* eslint-disable no-inner-declarations */
/* eslint-disable require-jsdoc */
import * as turf from 'https://cdn.jsdelivr.net/npm/@turf/turf@7.1.0/+esm';

async function loadStationsData() {
  const hoodsResponse = await fetch('data/philadelphia-neighborhoods.geojson');
  const hoodsCollection = await hoodsResponse.json();

  const stationsResponse = await fetch('https://gbfs.bcycle.com/bcycle_indego/station_information.json');
  const stationsData = await stationsResponse.json();

  function gbfsStationToFeature(gbfsStation) {
    return {
      type: 'Feature',
      properties: gbfsStation,
      geometry: {
        type: 'Point',
        coordinates: [gbfsStation.lon, gbfsStation.lat],
      },
    };
  }
  // window.gbfsStationToFeature = gbfsStationToFeature;
  // window.stationsData = stationsData;
  const stations = stationsData.data.stations.map(gbfsStationToFeature);

  // Calculate the bikeshare density for each neighborhood...
  for (const hood of hoodsCollection.features) {
    function stationInHood(station) {
      return turf.booleanPointInPolygon(station, hood);
    }

    const hoodStations = stations.filter(stationInHood);

    const areaSqKm = hood.properties['Shape_Area'] / 3280.84 / 3280.84;
    const stationCount = hoodStations.length;
    const stationDensity = stationCount / areaSqKm;

    Object.assign(hood.properties, {
      areaSqKm,
      stationCount,
      stationDensity,
    });
    // console.log(hood);
  }

  return { hoodsCollection, stations };
}

export { loadStationsData };

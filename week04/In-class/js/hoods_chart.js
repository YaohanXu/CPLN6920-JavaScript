import { Chart } from 'https://cdn.jsdelivr.net/npm/chart.js@4.4.4/auto/+esm'; // Add “/auto/” to automatically register all chart types.

function initChart(chartEl, hoodsCollection, stations) {
  const hoods = hoodsCollection.features
    .filter(hood => hood.properties.stationDensity > 0)
    .sort((a, b) => b.properties.stationDensity - a.properties.stationDensity);
  /*
  function getHoodNames(hood) {
    return hood.properties['LISTNAME'];
  }
  */
  const hoodNames = hoods.map(hood => hood.properties['LISTNAME']);
  const hoodDensities = hoods.map(hood => hood.properties.stationDensity);

  console.log(hoodNames);
  console.log(hoodDensities);

  const data = {
    labels: hoodNames,
    datasets: [{
      label : 'Stations per Square Kilometer',
      data: hoodDensities,
    }],
  };
  const options = {
    indexAxis: 'y',
    aspectRatio: 0.5,
    scales: {
      y: { beginAtZero: true },
    },
  };
  const chart = new Chart(chartEl, { type: 'bar', data, options });
}

export { initChart };

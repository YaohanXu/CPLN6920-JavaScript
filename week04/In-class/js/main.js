import { loadStationsData } from './data_preparation.js';
import { initMap } from './hoods_map.js';
import { initChart } from './hoods_chart.js';

/*
  1. Load the neighborhood and station data.
  1.5 Calculate the bikeshare density for each neighborhood.
  2. Create a map and add the neighborhoods and stations to it.
  3. Create the chart and add neighborhoods to it.
*/

// Load the neighborhood and station data...
const { hoodsCollection, stations } = await loadStationsData();

// Create a map and add the neighborhoods and stations to it...
const mapEl = document.querySelector('.map');
initMap(mapEl, hoodsCollection, stations);

// Create the chart and add neighborhoods to it...
const chartEl = document.querySelector('.chart canvas');
initChart(chartEl, hoodsCollection, stations);

//
// Create a new Leaflet map object to be displayed in the #map div
//
const element = document.querySelector('#map');
const map = L.map(element, { maxZoom: 18, zoomSnap: 0 }).setView([41, -77.5], 7);

//
// Add a base layer to the map
//
const mapboxKey = 'pk.eyJ1IjoieHV5YW9oYW4iLCJhIjoiY20xN3l1aDl0MHlhdTJqb3NrN3JzcHZ3ZyJ9.W0K0GomuRMj9lrIY029KoA';
const mapboxStyle = 'mapbox/dark-v11';

const baseLayer = L.tileLayer(
    `https://api.mapbox.com/styles/v1/${mapboxStyle}/tiles/512/{z}/{x}/{y}{r}?access_token=${mapboxKey}`, {
  tileSize: 512,
  zoomOffset: -1,
  detectRetina: true,
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
baseLayer.addTo(map);

//
// Load GeoJSON data from a file and add it to the map
//
const response = await fetch("data/pa_pres_results.geojson");
const data = await response.json();

function styleCounty(feature) {
  let party = feature.properties.party;
  let fillColor = "gray";

  if (party === "REPUBLICAN") {
    fillColor = "red";
  } else if (party === "DEMOCRAT") {
    fillColor = "blue";
  }

  //
  // Normalization of evenness
  //
  
  // Initialize maximum and minimum values
  let maxEvenness = -Infinity;
  let minEvenness = Infinity;

  // Loop through all features to calculate the maximum and minimum evenness
  data.features.forEach(function(feature) {
    let evenness = feature.properties.candidatevotes / feature.properties.totalvotes;
    if (evenness > maxEvenness) maxEvenness = evenness;
    if (evenness < minEvenness) minEvenness = evenness;
  });

  let evenness = feature.properties.candidatevotes / feature.properties.totalvotes;
  let normalizedEvenness = (evenness - minEvenness) / (maxEvenness - minEvenness);
  let fillOpacity = normalizedEvenness;
  // let fillOpacity = Math.min(Math.pow(evenness, 1.8), 1);
  
  return {
    color: "gray",
    weight: 1,
    fillColor: fillColor,
    fillOpacity: fillOpacity,
    };
  }

const dataLayer = L.geoJSON(data, {style: styleCounty} );
dataLayer.bindTooltip((layer) => layer.feature.properties.name);
dataLayer.addTo(map);

//
// Fit the map to the bounds of the GeoJSON data
//
map.fitBounds(dataLayer.getBounds(), {
  padding: [50, 50]
});
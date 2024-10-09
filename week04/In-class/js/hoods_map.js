function initMap(mapEl, hoodsCollection, stations) {
  const map = L.map(mapEl);

  // Add neighborhoods to map...
  const hoodsLayer = L.geoJSON(hoodsCollection);
  hoodsLayer.addTo(map);
  map.fitBounds(hoodsLayer.getBounds());

  // Add bikeshare stations to map...
  const stationsLayer = L.geoJSON(stations);
  stationsLayer.addTo(map);

  // Add tooltip with name and bikeshare density...
  hoodsLayer.bindTooltip(layer => {
    const hood = layer.feature;
    const name = hood.properties['LISTNAME'];
    const density = hood.properties.stationDensity.toFixed(2);
    return `${name}<br>${density} stations / sq km`;
  });
}

export { initMap };

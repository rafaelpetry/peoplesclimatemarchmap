PCM.EventsMap = (function() {

  var blueIcon = new L.Icon({
    iconUrl: 'leaflet/images/marker-icon-2x-blue.png',
    shadowUrl: 'leaflet/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  var redIcon = new L.Icon({
    iconUrl: 'leaflet/images/marker-icon-2x-red.png',
    shadowUrl: 'leaflet/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  var greenIcon = new L.Icon({
    iconUrl: 'leaflet/images/marker-icon-2x-green.png',
    shadowUrl: 'leaflet/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  function createEventsMap(mapContainer) {
    var map = L.map(mapContainer).setView([39.8282, -98.5795], 4);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    PCM.ActionNetworkGateway.fetchEvents(function(lat, lon, title) {
      L.marker([lat, lon], { icon: blueIcon }).addTo(map)
        .bindPopup(title);
    });

    PCM.GoogleSheetsGateway.fetchBuses(function(lat, lon, title) {
      L.marker([lat, lon], { icon: greenIcon }).addTo(map)
        .bindPopup(title);
    });

    PCM.GoogleSheetsGateway.fetchGroups(function(lat, lon, title) {
      L.marker([lat, lon], { icon: redIcon }).addTo(map)
        .bindPopup(title);
    });
  }

  return {
    createEventsMap: createEventsMap
  }
})();

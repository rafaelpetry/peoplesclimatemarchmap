PCM.EventsMap = (function() {
  function createEventsMap(mapContainer) {
    var map = L.map(mapContainer).setView([39.8282, -98.5795], 4);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    PCM.ActionNetworkGateway.fetchEvents(function(lat, lon, title) {
      L.marker([lat, lon]).addTo(map)
        .bindPopup(title);
    })
  }

  return {
    createEventsMap: createEventsMap
  }
})();

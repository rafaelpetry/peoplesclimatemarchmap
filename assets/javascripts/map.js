PCM.Map = (function() {
  var map;
  var marchMarkers;
  var busMarkers;
  var groupMarkers;

  function createMap(mapContainer) {
    marchMarkers = L.layerGroup([]);
    busMarkers = L.layerGroup([]);
    groupMarkers = L.layerGroup([]);

    map = L.map(mapContainer).setView([39.8282, -98.5795], 4);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    PCM.ActionNetworkGateway.fetchMarches(function(title, street, city, state, lat, lon, start_date, browser_url ) {
      var date = new Date(start_date);
      popup_message = '<a href="'+browser_url+'">'+title+'</a><p>'+date.toString()+'</p>';
      popup_message += "<p>" + street + ", " + city + ", " +state + "</p>";
      var marker = L.marker([lat, lon], { icon: PCM.MapIcons.blueIcon() }).bindPopup(popup_message);
      marchMarkers.addLayer(marker);
    });

    PCM.GoogleSheetsGateway.fetchBuses(function(lat, lon, title) {
      var marker = L.marker([lat, lon], { icon: PCM.MapIcons.greenIcon() }).bindPopup(title);
      busMarkers.addLayer(marker);
    });

    PCM.GoogleSheetsGateway.fetchGroups(function(lat, lon, title) {
      var marker = L.marker([lat, lon], { icon: PCM.MapIcons.redIcon() }).bindPopup(title);
      groupMarkers.addLayer(marker);
    });

    marchMarkers.addTo(map);
    busMarkers.addTo(map);
    groupMarkers.addTo(map);

    $('#climate_map_march_filter').on('click', toggleMarches);
    $('#climate_map_bus_filter').on('click', toggleBuses);
    $('#climate_map_group_filter').on('click', toggleGroups);
  }

  function toggleLayerGroup(toggleElement, markerGroup) {
    if ($(toggleElement).prop('checked')) {
      markerGroup.addTo(map);
    } else {
      markerGroup.remove();
    }
  }

  function toggleMarches() {
    toggleLayerGroup(this, marchMarkers);
  }

  function toggleBuses() {
    toggleLayerGroup(this, busMarkers);
  }

  function toggleGroups() {
    toggleLayerGroup(this, groupMarkers);
  }

  return {
    createMap: createMap
  }
})();

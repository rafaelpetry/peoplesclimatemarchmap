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
    L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
      attribution: '<a href=https://wikimediafoundation.org/wiki/Terms_of_Use>Wikimedia</a> | &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    PCM.ActionNetworkGateway.fetchMarches(addMarch);

    PCM.GoogleSheetsGateway.fetchBuses(addBus);

    PCM.GoogleSheetsGateway.fetchGroups(addGroup);

    marchMarkers.addTo(map);
    busMarkers.addTo(map);
    groupMarkers.addTo(map);

    $('#climate_map_march_filter').on('click', toggleMarches);
    $('#climate_map_bus_filter').on('click', toggleBuses);
    $('#climate_map_group_filter').on('click', toggleGroups);
    $('#climate_map_search').on('submit', PCM.Search.performSearch);
  }

  function setView(lat, lng) {
    map.setView([lat, lng], 10);
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

  function addMarch(march) {
    var address = march['location'];
    var coordinates = address['location'];

    var date = new Date(march['start_date']);
    popupMessage = '<a href="'+march['browser_url']+'">'+march['title']+'</a><br>';
    popupMessage += PCM.Formatter.formatDate(date) + ' • ' + PCM.Formatter.formatTime(date) + '<br>';
    popupMessage += PCM.Formatter.formatAddress(address['venue'], address['address_lines'], address['locality'], address['region']);

    var marker = L.marker([coordinates['latitude'], coordinates['longitude']], { icon: PCM.Icons.marchIcon() }).bindPopup(popupMessage);
    marchMarkers.addLayer(marker);
  }

  function addBus(lat, lon, row) {
    name = row['name'];
    if (name == '') { name = "Bus to People's Climate March"; }
    popupMessage = '<a href="'+row['link']+'">'+name+'</a><br>';
    popupMessage += PCM.Formatter.formatAddress(row['location'], row['address'], row['city'], row['state']);

    var marker = L.marker([lat, lon], { icon: PCM.Icons.busIcon() }).bindPopup(popupMessage);
    busMarkers.addLayer(marker);
  }

  function addGroup(lat, lon, row){
    popupMessage = '<a href="'+row['link']+'">'+row['name']+'</a><br>';
    popupMessage += row['contact_email']+'<br>';
    popupMessage += PCM.Formatter.formatAddress('', '', row['city'], row['state']);

    var marker = L.marker([lat, lon], { icon: PCM.Icons.groupIcon() }).bindPopup(popupMessage);
    groupMarkers.addLayer(marker);
  }

  return {
    createMap: createMap,
    setView: setView
  }
})();

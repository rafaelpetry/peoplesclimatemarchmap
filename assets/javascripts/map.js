PCM.Map = (function() {
  var map;
  var busMarkers;
  var groupMarkers;

  function createMap(mapContainer) {
    busMarkers = L.layerGroup([]);
    groupMarkers = L.layerGroup([]);

    map = L.map(mapContainer).setView([39.8282, -98.5795], 4);
    L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
      attribution: '<a href=https://wikimediafoundation.org/wiki/Terms_of_Use>Wikimedia</a> | &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    PCM.March.fetchMarches();

    PCM.GoogleSheetsGateway.fetchBuses(addBus);

    PCM.GoogleSheetsGateway.fetchGroups(addGroup);

    PCM.March.marchMarkers.addTo(map);
    busMarkers.addTo(map);
    groupMarkers.addTo(map);

    $('#climate_map_march_filter').on('click', PCM.March.toggle);
    $('#climate_map_bus_filter').on('click', toggleBuses);
    $('#climate_map_group_filter').on('click', toggleGroups);
    $('#climate_map_search').on('submit', PCM.Search.performSearch);
  }

  function setView(lat, lng) {
    map.setView([lat, lng], 11);
    locatePins();
  }

  function locatePins(){
    busMarkers.eachLayer(listBusPins);
    groupMarkers.eachLayer(listGroupPins);

    var bounds = map.getBounds();
    PCM.March.locatePins(bounds);
  }

  function listBusPins(pin){
    var bounds = map.getBounds();
    listPinsWithinBounds(pin, bounds, 'buses');
  }

  function listGroupPins(pin){
    var bounds = map.getBounds();
    listPinsWithinBounds(pin, bounds, 'groups');
  }


  function listPinsWithinBounds(pin, bounds, tag){
    var latLng = pin.getLatLng();
    if( bounds.contains(latLng) ){
      $("#"+ tag +"_near_you ul").append('<li>'+pin.getPopup().getContent()+'</li>');
    }
  }

  function toggleLayerGroup(toggleElement, markerGroup) {
    if ($(toggleElement).prop('checked')) {
      markerGroup.addTo(map);
    } else {
      markerGroup.remove();
    }
  }

  function toggleBuses() {
    toggleLayerGroup(this, busMarkers);
  }

  function toggleGroups() {
    toggleLayerGroup(this, groupMarkers);
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
    setView: setView,
    toggleLayerGroup: toggleLayerGroup
  }
})();

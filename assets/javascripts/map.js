PCM.Map = (function() {
  var map;
  var groupMarkers;

  function createMap(mapContainer) {
    groupMarkers = L.layerGroup([]);

    map = L.map(mapContainer).setView([39.8282, -98.5795], 4);
    L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
      attribution: '<a href=https://wikimediafoundation.org/wiki/Terms_of_Use>Wikimedia</a> | &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    PCM.March.fetchMarches();
    PCM.Bus.fetchBuses();

    PCM.GoogleSheetsGateway.fetchGroups(addGroup);

    PCM.March.marchMarkers.addTo(map);
    PCM.Bus.busMarkers.addTo(map);
    groupMarkers.addTo(map);

    $('#climate_map_march_filter').on('click', PCM.March.toggle);
    $('#climate_map_bus_filter').on('click', PCM.Bus.toggle);
    $('#climate_map_group_filter').on('click', toggleGroups);
    $('#climate_map_search').on('submit', PCM.Search.performSearch);
  }

  function setView(lat, lng) {
    map.setView([lat, lng], 11);
    locatePins();
  }

  function locatePins(){
    groupMarkers.eachLayer(listGroupPins);

    var bounds = map.getBounds();
    PCM.March.locatePins(bounds);
    PCM.Bus.locatePins(bounds);
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

  function toggleLayer(toggleElement, markerGroup) {
    if ($(toggleElement).prop('checked')) {
      markerGroup.addTo(map);
    } else {
      markerGroup.remove();
    }
  }

  function toggleGroups() {
    toggleLayerGroup(this, groupMarkers);
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
    toggleLayer: toggleLayer
  }
})();

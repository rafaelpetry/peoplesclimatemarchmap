PCM.Map = (function() {
  var map;

  function createMap(mapContainer) {

    map = L.map(mapContainer).setView([39.8282, -98.5795], 4);
    L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
      attribution: '<a href=https://wikimediafoundation.org/wiki/Terms_of_Use>Wikimedia</a> | &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    PCM.March.setupMarches();
    PCM.Bus.setupBuses();
    PCM.Groups.setupGroups();

    PCM.March.marchMarkers.addTo(map);
    PCM.Bus.busMarkers.addTo(map);
    PCM.Groups.groupMarkers.addTo(map);

    $('#climate_map_search').on('submit', PCM.Search.performSearch);
  }

  function setView(lat, lng) {
    map.setView([lat, lng], 11);
    locatePins();
  }

  function locatePins(){
    var bounds = map.getBounds();
    PCM.March.locatePins(bounds);
    PCM.Bus.locatePins(bounds);
    PCM.Groups.locatePins(bounds);
  }

  function toggleLayer(toggleElement, markerGroup) {
    if ($(toggleElement).prop('checked')) {
      markerGroup.addTo(map);
    } else {
      markerGroup.remove();
    }
  }

  function listPinsWithinBounds(pin, bounds, tag){
    var latLng = pin.getLatLng();
    if( bounds.contains(latLng) ){
      $("#"+ tag +"_near_you ul").append('<li>'+pin.getPopup().getContent()+'</li>');
      $("#new_"+ tag + "_button").hide();
    }
  }

  return {
    createMap: createMap,
    setView: setView,
    toggleLayer: toggleLayer,
    listPinsWithinBounds: listPinsWithinBounds
  }
})();

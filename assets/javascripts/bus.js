PCM.Bus = (function(){
  var busMarkers = L.layerGroup([]);

  function setupBuses(){
    PCM.GoogleSheetsGateway.fetchBuses(addBus);
    $('#climate_map_bus_filter').on('click', toggle);
  }

  function addBus(lat, lon, row) {
    name = row['name'];
    if (name == '') { name = "Bus to People's Climate March"; }
    popupMessage = '<a href="'+row['link']+'">'+name+'</a><br>';
    popupMessage += PCM.Formatter.formatAddress(row['location'], row['address'], row['city'], row['state']);

    var marker = L.marker([lat, lon], { icon: PCM.Icons.busIcon() }).bindPopup(popupMessage);
    busMarkers.addLayer(marker);
  }

  function toggle() {
    PCM.Map.toggleLayer(this, busMarkers);
    $("#buses_near_you").toggle();
  }

  function locatePins(bounds){
    busMarkers.eachLayer( pin => PCM.Map.listPinsWithinBounds(pin, bounds, 'buses'));
  }

  return{
    busMarkers: busMarkers,
    setupBuses: setupBuses,
    toggle: toggle,
    locatePins: locatePins
  }
})();

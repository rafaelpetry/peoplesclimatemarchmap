PCM.March = (function(){
  var marchMarkers = L.layerGroup([]);

  function setupMarches(){
    PCM.ActionNetworkGateway.fetchMarches(addMarch);
    $('#climate_map_march_filter').on('click', toggle);
  }

  function addMarch(march) {
    var date = new Date(march['start_date']);
    popupMessage = '<a href="'+march['url']+'">'+march['title']+'</a><br>';
    popupMessage += PCM.Formatter.formatDate(date) + ' • ' + PCM.Formatter.formatTime(date) + '<br>';
    popupMessage += PCM.Formatter.formatAddress(march['venue'], march['address'], march['city'], march['state']);

    var marker = L.marker([march['latitude'], march['longitude']], { icon: PCM.Icons.marchIcon() }).bindPopup(popupMessage);
    marchMarkers.addLayer(marker);
  }

  function toggle(){
    PCM.Map.toggleLayer(this, marchMarkers);
  }

  function locatePins(bounds){
    marchMarkers.eachLayer( pin => PCM.Map.listPinsWithinBounds(pin, bounds, 'marches'));
  }

  return {
    marchMarkers: marchMarkers,
    setupMarches: setupMarches,
    toggle: toggle,
    locatePins: locatePins
  }
})();

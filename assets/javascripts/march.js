PCM.March = (function(){
  var marchMarkers = L.layerGroup([]);

  function fetchMarches(){
    PCM.ActionNetworkGateway.fetchMarches(addMarch);
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
    marchMarkers.eachLayer( pin => listPinsWithinBounds(pin, bounds, 'marches'));
  }

  function listPinsWithinBounds(pin, bounds, tag){
    var latLng = pin.getLatLng();
    if( bounds.contains(latLng) ){
      $("#"+ tag +"_near_you ul").append('<li>'+pin.getPopup().getContent()+'</li>');
    }
  }

  return {
    marchMarkers: marchMarkers,
    fetchMarches: fetchMarches,
    toggle: toggle,
    locatePins: locatePins
  }
})();

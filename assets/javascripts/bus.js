PCM.Bus = (function(){
  var busMarkers = L.layerGroup([]);

  function fetchBuses(){
    PCM.GoogleSheetsGateway.fetchBuses(addBus);
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
  }

  function locatePins(bounds){
    busMarkers.eachLayer( pin => listPinsWithinBounds(pin, bounds, 'buses'));
  }

  function listPinsWithinBounds(pin, bounds, tag){
    var latLng = pin.getLatLng();
    if( bounds.contains(latLng) ){
      $("#"+ tag +"_near_you ul").append('<li>'+pin.getPopup().getContent()+'</li>');
    }
  }

  return{
    busMarkers: busMarkers,
    fetchBuses: fetchBuses,
    toggle: toggle,
    locatePins: locatePins
  }
})();

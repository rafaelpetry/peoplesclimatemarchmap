PCM.Groups = (function(){
  var groupMarkers = L.layerGroup([]);

  function setupGroups() {
    PCM.GoogleSheetsGateway.fetchGroups(addGroup);
    $('#climate_map_group_filter').on('click', toggle);
  }

  function addGroup(lat, lon, row){
    popupMessage = '<a href="'+row['link']+'">'+row['name']+'</a><br>';
    popupMessage += row['contact_email']+'<br>';
    popupMessage += PCM.Formatter.formatAddress('', '', row['city'], row['state']);

    var marker = L.marker([lat, lon], { icon: PCM.Icons.groupIcon() }).bindPopup(popupMessage);
    groupMarkers.addLayer(marker);
  }

  function toggle() {
    PCM.Map.toggleLayer(this, groupMarkers);
  }

  function locatePins(bounds){
    groupMarkers.eachLayer( pin => PCM.Map.listPinsWithinBounds(pin, bounds, 'groups'));
  }

  return{
    groupMarkers: groupMarkers,
    setupGroups: setupGroups,
    toggle: toggle,
    locatePins: locatePins
  }
})();

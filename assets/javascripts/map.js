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
    popupMessage += formatDate(date) + ' • ' + formatTime(date) + '<br>';
    popupMessage += formatAddress(address['venue'], address['address_lines'], address['locality'], address['region']);

    var marker = L.marker([coordinates['latitude'], coordinates['longitude']], { icon: PCM.Icons.marchIcon() }).bindPopup(popupMessage);
    marchMarkers.addLayer(marker);
  }

  function addBus(lat, lon, row) {
    name = row['name'];
    if (name == '') { name = "Bus to People's Climate March"; }
    popupMessage = '<a href="'+row['link']+'">'+name+'</a><br>';
    popupMessage += formatAddress(row['location'], row['address'], row['city'], row['state']);

    var marker = L.marker([lat, lon], { icon: PCM.Icons.busIcon() }).bindPopup(popupMessage);
    busMarkers.addLayer(marker);
  }

  function addGroup(lat, lon, row){
    popupMessage = '<a href="'+row['link']+'">'+row['name']+'</a><br>';
    popupMessage += row['contact_email']+'<br>';
    popupMessage += formatAddress('', '', row['city'], row['state']);

    var marker = L.marker([lat, lon], { icon: PCM.Icons.groupIcon() }).bindPopup(popupMessage);
    groupMarkers.addLayer(marker);
  }

  function formatAddress(venue, address, city, state) {
    formattedAddress = '';
    if (venue != '') { formattedAddress += venue + "<br>"; }
    if (address != '') { formattedAddress += address + "<br>"; }
    formattedAddress += city + ", " + state;
    return formattedAddress
  }

  function formatDate(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    var day = date.getUTCDate();
    var monthIndex = date.getUTCMonth();
    var year = date.getUTCFullYear();

    return monthNames[monthIndex] + ' ' + day + ', ' + year;
  }

  function formatTime(date) {
    var hour = date.getUTCHours() % 12;
    if (hour == 0) { hour = 12; }
    var minutes = date.getUTCMinutes();
    if (minutes < 10) { minutes = '0' + minutes; }
    var suffix = date.getUTCHours() > 11 ? 'PM' : 'AM';

    return hour + ':' + minutes + ' ' + suffix;
  }

  return {
    createMap: createMap,
    setView: setView
  }
})();

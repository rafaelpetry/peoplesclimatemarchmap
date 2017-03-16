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
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    PCM.ActionNetworkGateway.fetchMarches(addMarch);

    PCM.GoogleSheetsGateway.fetchBuses(function(lat, lon, row) {
      popup_message = '<a href="'+row['link']+'">'+row[`name`]+'</a>';
      popup_message += "<p>" + row['location'] + ", " + row['address'] + ", " + row['city'] + ", " + row['state'] + "</p>";

      var marker = L.marker([lat, lon], { icon: PCM.MapIcons.greenIcon() }).bindPopup(popup_message);
      busMarkers.addLayer(marker);
    });

    PCM.GoogleSheetsGateway.fetchGroups(function(lat, lon, row) {
      var marker = L.marker([lat, lon], { icon: PCM.MapIcons.redIcon() }).bindPopup(row[`name`]);
      groupMarkers.addLayer(marker);
    });

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
    popup_message = '<a href="'+march['browser_url']+'">'+march['title']+'</a><br>';
    popup_message += formatDate(date) + ' • ' + formatTime(date) + '<br>';
    popup_message += address['venue'] + '<br>';
    popup_message += address['address_lines'] + "<br>";
    popup_message += address['locality'] + ", " + address['region'];

    var marker = L.marker([coordinates['latitude'], coordinates['longitude']], { icon: PCM.MapIcons.blueIcon() }).bindPopup(popup_message);
    marchMarkers.addLayer(marker);
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

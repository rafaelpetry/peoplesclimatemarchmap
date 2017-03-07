$(document).ready(function() {
  var map = L.map('climate_map').setView([39.8282, -98.5795], 4);
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  $.ajax('https://actionnetwork.org/api/v2/event_campaigns/bd077f2f-280d-49d2-b675-e8156ee3d856/events', {
    headers: { 'OSDI-API-Token': 'APIKEYUSEDTOGOHERE' },
    success: function(data) {
      var events = data['_embedded']['osdi:events'];
      $(events).each(function(idx, event) {
        console.log(event);
        var lat = event['location']['location']['latitude'];
        var lon = event['location']['location']['longitude'];

        L.marker([lat, lon]).addTo(map)
          .bindPopup(event['title']);
      });
    }
  });

});

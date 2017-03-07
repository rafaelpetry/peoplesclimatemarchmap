$(document).ready(function() {
  var map = L.map('climate_map').setView([39.8282, -98.5795], 4);
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
});

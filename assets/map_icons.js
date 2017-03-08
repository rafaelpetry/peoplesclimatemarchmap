PCM.MapIcons = (function() {
  function icon(fileName) {
    return new L.Icon({
      iconUrl: 'assets/leaflet/images/' + fileName,
      shadowUrl: 'assets/leaflet/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  }

  return {
    blueIcon: function() { return icon('marker-icon-2x-blue.png'); },
    redIcon: function() { return icon('marker-icon-2x-red.png'); },
    greenIcon: function() { return icon('marker-icon-2x-green.png'); }
  }
})();

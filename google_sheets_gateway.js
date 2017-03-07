PCM.GoogleSheetsGateway = (function() {

  function fetchSheet(sheetName, callback) {
    Tabletop.init({
      key: 'https://docs.google.com/spreadsheets/d/1-fnEMQMXZAu2dmPj7m0WnGlM8QGgFpw5BVN86lQwhXI/pubhtml',
      callback: function(data, tabletop) {
        data = tabletop.sheets(sheetName).all();
        $(data).each(function(idx, row){
          var lat = row['latitude'];
          var lon = row['longitude'];
          if (lat && lon) {
            callback(lat, lon, row['name']);
          }
        })
      }
    });
  }

  function fetchBuses(callback) {
    fetchSheet('Buses', callback);
  }

  function fetchGroups(callback) {
    fetchSheet('Local Groups', callback);
  }

  return {
    fetchBuses: fetchBuses,
    fetchGroups: fetchGroups
  };
})();

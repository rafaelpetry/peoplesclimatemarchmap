PCM.ActionNetworkGateway = (function() {

  function fetchMarches(callback) {
    $.ajax('/marches', {
      success: function(data) {
        $(data).each(function(idx, march) {
          var address = march['location'];
          var location = address['location'];
          callback(march['title'],
                  address['address_lines'],
                  address['locality'],
                  address['region'],
                  location['latitude'],
                  location['longitude'],
                  march['start_date'],
                  march['browser_url']);
        });
      }
    });
  }

  return {
    fetchMarches: fetchMarches
  };
})();

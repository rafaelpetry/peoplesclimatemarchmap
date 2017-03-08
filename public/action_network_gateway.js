PCM.ActionNetworkGateway = (function() {

  function processMarches(data, callback) {
    var marches = data['_embedded']['osdi:events'];
    $(marches).each(function(idx, march) {
      var location = march['location']['location'];
      callback(location['latitude'], location['longitude'], march['title']);
    });
  }

  function fetchPage(pageUrl, callback) {
    $.ajax(pageUrl, {
      headers: { 'OSDI-API-Token': 'APIKEYUSEDTOGOHERE' },
      success: function(data) {
        processMarches(data, callback);
        try {
          fetchPage(data['_links']['next']['href'], callback);
        } catch(error) {};
      }
    });
  }

  function fetchMarches(callback) {
    fetchPage('https://actionnetwork.org/api/v2/event_campaigns/bd077f2f-280d-49d2-b675-e8156ee3d856/events', callback);
  }

  return {
    fetchMarches: fetchMarches
  };
})();

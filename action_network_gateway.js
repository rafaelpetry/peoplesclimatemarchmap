PCM.ActionNetworkGateway = (function() {

  function processEvents(data, callback) {
    var events = data['_embedded']['osdi:events'];
    $(events).each(function(idx, event) {
      var location = event['location']['location'];
      callback(location['latitude'], location['longitude'], event['title']);
    });
  }

  function fetchPage(pageUrl, callback) {
    $.ajax(pageUrl, {
      headers: { 'OSDI-API-Token': 'APIKEYUSEDTOGOHERE' },
      success: function(data) {
        processEvents(data, callback);
        try {
          fetchPage(data['_links']['next']['href'], callback);
        } catch(error) {};
      }
    });
  }

  function fetchEvents(callback) {
    fetchPage('https://actionnetwork.org/api/v2/event_campaigns/bd077f2f-280d-49d2-b675-e8156ee3d856/events', callback);
  }

  return {
    fetchEvents: fetchEvents
  };
})();

PCM.ActionNetworkGateway = (function() {

  function fetchEvents(callback) {
    $.ajax('https://actionnetwork.org/api/v2/event_campaigns/bd077f2f-280d-49d2-b675-e8156ee3d856/events', {
      headers: { 'OSDI-API-Token': 'APIKEYUSEDTOGOHERE' },
      success: function(data) {
        var events = data['_embedded']['osdi:events'];
        $(events).each(function(idx, event) {
          var location = event['location']['location'];
          callback(location['latitude'], location['longitude'], event['title']);
        });
      }
    });
  }

  return {
    fetchEvents: fetchEvents
  };
})();

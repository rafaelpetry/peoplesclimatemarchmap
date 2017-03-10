PCM.ActionNetworkGateway = (function() {

  function fetchMarches(callback) {
    $.ajax('/marches', {
      success: function(data) {
        $(data).each(function(idx, march) {
          var location = march['location']['location'];
          callback(location['latitude'], location['longitude'], march['title']);
        });
      }
    });
  }

  return {
    fetchMarches: fetchMarches
  };
})();

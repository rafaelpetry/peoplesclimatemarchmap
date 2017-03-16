PCM.ActionNetworkGateway = (function() {

  function fetchMarches(callback) {
    $.ajax('/marches', {
      success: function(data) {
        $(data).each(function(idx, march) {
          callback(march);
        });
      }
    });
  }

  return {
    fetchMarches: fetchMarches
  };
})();

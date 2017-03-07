var PCM = {
  loadScript: function(scriptPath) {
    var head = document.getElementsByTagName('head')[0];

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = scriptPath;
    head.appendChild(script);
  },

  loadStylesheet: function(stylesheetPath) {
    var head = document.getElementsByTagName('head')[0];

    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = stylesheetPath;
    head.appendChild(link);
  }
};

PCM.loadScript('leaflet/leaflet.js');
PCM.loadScript('jquery-3.1.1.min.js');
PCM.loadScript('action_network_gateway.js');
PCM.loadScript('events_map.js');
PCM.loadStylesheet('leaflet/leaflet.css');

document.write('<div id="climate_map_embed" style="width: 100%; min-height: 400px;"></div>');

window.addEventListener("load", function() {
  PCM.EventsMap.createEventsMap('climate_map_embed');
});

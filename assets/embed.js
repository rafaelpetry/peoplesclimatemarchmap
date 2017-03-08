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

PCM.loadScript('assets/leaflet/leaflet.js');
PCM.loadScript('assets/tabletop.min.js');
PCM.loadScript('assets/jquery-3.1.1.min.js');
PCM.loadScript('assets/action_network_gateway.js');
PCM.loadScript('assets/google_sheets_gateway.js');
PCM.loadScript('assets/map.js');
PCM.loadScript('assets/map_icons.js');
PCM.loadStylesheet('assets/leaflet/leaflet.css');

document.write('<div id="climate_map_embed" style="width: 100%; min-height: 400px;"></div>');

document.write('<input type="checkbox" name="climate_map_march_filter" id="climate_map_march_filter" checked="checked" />');
document.write('<label for="climate_map_march_filter">Sister Marches</label>');

document.write('<input type="checkbox" name="climate_map_bus_filter" id="climate_map_bus_filter" checked="checked" />');
document.write('<label for="climate_map_bus_filter">Buses</label>');

document.write('<input type="checkbox" name="climate_map_group_filter" id="climate_map_group_filter" checked="checked" />');
document.write('<label for="climate_map_group_filter">Local Groups</label>');

window.addEventListener("load", function() {
  PCM.Map.createMap('climate_map_embed');
});

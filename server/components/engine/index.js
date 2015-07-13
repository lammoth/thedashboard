

var _ = require('lodash');
var Acquisitor = require('./lib/acquisitor');
var Visualizator = require('./lib/visualizator');

module.exports = Engine;

// {
//   "plugins": [
//     { "name": "acquisitor", "pluginName": "druid", "pluginTitle": "Druid", "enable": true }
//   ]
// }

function Engine(app) {
  this.app = app;
  this.acquisitor = new Acquisitor();
  this.visualizator = new Visualizator();
}

Engine.prototype.visualizationQuery = function(raw) {
  var parent = this;
  this.acquisitor.plugin().then(function(data) {
    var pluginObj = _.first(_.filter(parent.app.get('plugins'), function(plugin) {
      if (plugin.pluginName === data.pluginName && plugin.name === data.name) {
        return true;
      }
    }));

    // TODO: Check errors (array elements)
    var Plugin = require(pluginObj.path);
    var pluginInstance = new Plugin(pluginObj.config, true);
    var pluginConnection = pluginInstance.connect(function () {
      pluginInstance.queryClient.execQuery('SHOW DATABASES', raw);
    });
  });
};
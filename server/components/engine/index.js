

var _ = require('lodash');
var Acquisitor = require('./lib/acquisitor');
var Visualizator = require('./lib/visualizator');
var Persistor = require('./lib/persistor');

module.exports = Engine;

function Engine(app) {
  this.app = app;
  this.acquisitor = new Acquisitor();
  this.visualizator = new Visualizator();
  this.persistor = new Persistor();
}

Engine.prototype.visualizationQuery = function(raw, cb) {
  var parent = this;
  this.acquisitor.plugin().then(function(dataAcquisitor) {
    var acquisitorPluginObj = _.first(_.filter(parent.app.get('plugins'), function(plugin) {
      if (plugin.pluginName === dataAcquisitor.pluginName && plugin.name === dataAcquisitor.name) {
        return true;
      }
    }));

    // TODO: Check errors (array elements)
    var AcquisitorPlugin = require(acquisitorPluginObj.path);
    var AcquisitorInstancePlugin = new AcquisitorPlugin(acquisitorPluginObj.config);
    var AcquisitorPluginConnection = AcquisitorInstancePlugin.connect(function () {
      parent.visualizator.plugin().then(function(dataVisualizator) {
        var visualizatorPluginObj = _.first(_.filter(parent.app.get('plugins'), function(plugin) {
          if (plugin.pluginName === dataVisualizator.pluginName && plugin.name === dataVisualizator.name) {
            return true;
          }
        }));
        var VisualizatorPlugin = require(visualizatorPluginObj.path);
        AcquisitorInstancePlugin.queryClient.execQuery('select * from pruebas', raw, function(data) {
          var VisualizatorInstancePlugin = new VisualizatorPlugin(data);
          VisualizatorInstancePlugin.parser(VisualizatorInstancePlugin.data, function(parsedData) {
            parent.persistor.saveTaskResults(12, parsedData, cb);
          });
        });
      });
    });
  });
};
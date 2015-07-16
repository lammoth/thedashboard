

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

  var data = {
    acquisitorPluginObj: null,
    visualizatorPluginObj: null,
    AcquisitorPlugin: null,
    VisualizatorPlugin: null,
  };

  // Getting the acquisitor plugin
  this.acquisitor.plugin()
  .then(function(dataAcquisitor) {
    data.acquisitorPluginObj = parent.acquisitor.getObject(parent.app.get('plugins'), dataAcquisitor);
    return parent.visualizator.plugin();
  })
  // Getting the visualizator plugin
  // Instantiating the acquisitor plugin
  // Connecting the acquisitor plugin
  .then(function(dataVisualizator) {
    data.visualizatorPluginObj = parent.visualizator.getObject(parent.app.get('plugins'), dataVisualizator);
    data.AcquisitorPlugin = new (require(data.acquisitorPluginObj.path))(data.acquisitorPluginObj.config);
    return data.AcquisitorPlugin.connect();
  })
  // Executing the query in the acquisitor plugin
  .then(function() {
    return data.AcquisitorPlugin.queryClient.execQuery('select * from pruebas');
  })
  // Instantiating the visualizator plugin
  // Parsing the acquisitor results in the visualizator
  .then(function(queryResult) {
    data.VisualizatorPlugin = new (require(data.visualizatorPluginObj.path))(queryResult);
    return data.VisualizatorPlugin.parser(data.VisualizatorPlugin.data);
  })
  // Saving task results in Redis
  .then(function(visualizatorData) {
    return parent.persistor.saveTaskResults(12, visualizatorData);
  })
  // Emitting an event in order to refresh the web visualization
  .then(function(){
    cb();
  });
};


module.exports = visualizationQuery;


function visualizationQuery(parent, task, cb) {

  var data = {
    acquisitorPluginObj: null,
    visualizatorPluginObj: null,
    AcquisitorPlugin: null,
    VisualizatorPlugin: null,
  };

  // Getting the acquisitor plugin
  parent.acquisitor.plugin()
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
    return parent.persistor.saveTaskResults(task, visualizatorData);
  })
  // Emitting an event in order to refresh the web visualization
  .then(function(){
    cb();
  });
}


module.exports = visualizationQuery;


function visualizationQuery(parent, task, cb) {

  var data = {
    visualizatorPluginObj: null,
    VisualizatorPlugin: null,
  };

  // Getting the acquisitor plugin
  parent.visualizator.plugin()
  .then(function(dataVisualizator) {
    data.visualizatorPluginObj = parent.visualizator.getObject(parent.app.get('plugins'), dataVisualizator);
    // TODO: Sergio's task
    // In this call, you must transform the frontend JSON to SQL or whatever
    return parent.acquisitor.queryClient.execQuery('select * from logstash_collectd');
  })
  .then(function(queryResult) {
    data.VisualizatorPlugin = new (require(data.visualizatorPluginObj.path))(queryResult);
    // TODO: Sergio's task
    // In this call, you must transform the acquisitor results to C3 valid data
    // From Parser, you should choose the proper parser (Spark) in order to adapt
    // the results to C3
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
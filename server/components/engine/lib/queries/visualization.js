

module.exports = visualizationQuery;


function visualizationQuery(parent, queryData, task, cb) {

  var data = {
    visualizatorPluginObj: null,
    VisualizatorPlugin: null,
  };

  // Getting the visualizator plugin
  parent.visualizator.plugin()
  .then(function(dataVisualizator) {
    data.visualizatorPluginObj = parent.visualizator.getObject(parent.app.get('plugins'), dataVisualizator);
    // Instantiating Visulazator plugin 
    data.VisualizatorPlugin = new (require(data.visualizatorPluginObj.path))();
    // In this call, you must transform the frontend JSON to SQL or whatever
    return parent.acquisitor.queryClient.execQuery(queryData);
  })
  .then(function(queryResult) {
    // Passing the Acquisitor results to the Visualizator plugin
    data.VisualizatorPlugin.data = queryResult;
    // In this call, you must transform the acquisitor results to C3 valid data
    // From Parser, you should choose the proper parser (Spark) in order to adapt
    // the results to C3
    return data.VisualizatorPlugin.parser();
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
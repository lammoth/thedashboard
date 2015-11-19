

module.exports = visualizationQuery;


function visualizationQuery(parent, queryData, task, cb) {

  var data = {
    visualizatorPluginObj: null,
    VisualizatorPlugin: null,
    query: null,
    query_raw: null
  };

  // Getting the visualizator plugin
  parent.visualizator.plugin()
  .then(function(dataVisualizator) {
    data.visualizatorPluginObj = parent.visualizator.getObject(parent.app.get('plugins'), dataVisualizator);
    // Instantiating Visualizator plugin 
    data.VisualizatorPlugin = new (require(data.visualizatorPluginObj.path))();
    // In this call, you must transform the frontend JSON to SQL or whatever
    return parent.acquisitor.queryClient.execQuery(queryData);
  })
  .then(function(queryResult) {
    // Passing the Acquisitor results to the Visualizator plugin
    data.VisualizatorPlugin.data = queryResult.rows;
    // Setting query
    data.query = queryResult.query;
    data.query_raw = queryResult.query_raw;

    // Passing the raw data to the Visualizator plugin
    data.VisualizatorPlugin.raw = queryData;
    // Setting the Acquisitor name in the visualizator in order to do a proper parsing
    data.VisualizatorPlugin.acquisitorParser = parent.acquisitor.name;
    // In this call, you must transform the acquisitor results to C3 valid data
    // From Parser, you should choose the proper parser in order to adapt
    // the results to C3
    return data.VisualizatorPlugin.parser();
  })
  // Saving task results in Redis
  .then(function(visualizatorData) {
    return parent.persistor.saveTaskResults(task, {
      visualization: visualizatorData,
      query: data.query,
      query_raw: data.query_raw
    });
  })
  // Emitting an event in order to refresh the web visualization
  .then(function() {
    cb();
  });
}
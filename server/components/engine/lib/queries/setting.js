

module.exports = settingQuery;


function settingQuery(parent, queryData, task, cb) {

  var data = {
    visualizatorPluginObj: null,
    VisualizatorPlugin: null,
  };

  switch(queryData.action) {
    case "updateDatasources":
      parent.acquisitor.queryClient.execQuery(queryData.action, false).then(function(queryResult) {
        console.log(queryResult);
        // Saving task results in Redis
        return parent.persistor.saveTaskResults(task, queryResult);
      })
      // Emitting an event in order to update settings data
      .then(function(){
        cb();
      });
      break;
  }
}
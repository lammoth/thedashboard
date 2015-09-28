var visualizationQuery = require('./visualization'),
  Q = require('q');

module.exports = checkQuery;


function checkQuery(parent, queryData, task, cb) {
  // Check if the visualization can be reused
  // If not, execute the visualization query routine
  parent.persistor.getVisualizationResults(queryData.redis).then(function(persistorData) {
    if (persistorData) {
      return parent.persistor.saveTaskResults(task, {
        visualization: persistorData.graph,
        query: persistorData.query
      });
    } else {
      var deferred = Q.defer();
      deferred.resolve({visualization: true});
      return deferred.promise;
    }
  })
  .then(function(dataPersistor) {
    if (dataPersistor) {
      visualizationQuery(parent, queryData.mongo.data, task, cb);
    } else {
      cb();
    }
  });
}
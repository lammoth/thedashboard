var visualizationQuery = require('./visualization');

module.exports = checkQuery;


function checkQuery(parent, queryData, task, cb) {
  parent.persistor.getVisualizationResults(queryData).then(function(persistorData) {
    if (persistorData) {
      cb();
    } else {
      visualizationQuery(parent, queryData, task, cb);
    }
  });
}
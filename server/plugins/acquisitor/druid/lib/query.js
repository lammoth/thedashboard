/**
 * Druid query lib
 */

var Druid = require('druid-query');
var _ = require('lodash');

// module.exports = function(druid) {
//   console.log('Druid query invoked');
// };

module.exports = Query;
console.log(_);

function Query(query) {
  druidObject = parseJson(query);

}

function parseJson(query) {
  druidQuery = _.mapKeys(query, function(value, key) {
    var druidObj = null;
    if (key === "queryType") {
      switch(value) {
        case "timeBoundary":
          druidObj = new Druid.TimeBoundaryQuery();
          druidObj.timeBoundary()
          break;
        default:
          break;
      }
    }
    if (druidObj) {
      druidObj
    }
  });
}

function createConnection(data) {
  return new Druid(data.address, data.parameters, data.extra);
}
/**
 * Druid query lib
 */

var Druid = require('druid-query');
var _ = require('lodash');


module.exports = QueryReq;

function QueryReq(query) {
  // var druidConnection = createConnection;
  // var druidQuery = parseJson(query);
  // execQuery(druidConnection, druidQuery);
  this.query = query;
  // makeQuery(query);
}

// function parseJson(query) {
//   var druidQuery = makeQuery(query, _.keys(query));
// }

// QueryReq.prototype.createConnection = function(data) {
//   return new Druid(data.address, data.parameters, data.extra);
// }

// Extract all needed key in the query
QueryReq.prototype.makeQuery = function(connection) {
// function makeQuery(query, keys) {
  var Client = Druid.Client
    , Query = Druid.Query(Client, this.query);
  console.log(this.query);
  this.execQuery(connection, Query);
  // var druidObj = null;
  // _.forEach(keys, function(key) {
  //   if (key === "queryType") {
  //     switch(value) {
  //       case "groupBy":
  //         druidObj = new Druid.TimeBoundaryQuery();
  //         break;
  //       case "search":
  //         druidObj = new Druid.TimeBoundaryQuery();
  //         break;
  //       case "segmentMetadata":
  //         druidObj = new Druid.TimeBoundaryQuery();
  //         break;
  //       case "timeBoundary":
  //         druidObj = new Druid.TimeBoundaryQuery();
  //         break;
  //       case "timeseries":
  //         druidObj = new Druid.TimeBoundaryQuery();
  //         break;
  //       case "topN":
  //         druidObj = new Druid.TimeBoundaryQuery();
  //         break;
  //       default:
  //         break;
  //     }
  //   }
  // });
}

QueryReq.prototype.execQuery = function(connection, query) {
  connection.exec(query, function(err, results) {
    if (err) {
      // error reasons:
      // 1. data source is not served by any known node
      // 2. query validation error
      // 3. error from Druid node after executing query
      console.log(err);
    } else {
      // handle results
      console.log(results);
    }
    
    // Call .end() when finished working with Druid
    connection.end();
  });

  connection.once('ready', function() {
    // Do what you want with this event :-)
  });

  connection.on('error', function(err) {
    // handle client error here
  });
}





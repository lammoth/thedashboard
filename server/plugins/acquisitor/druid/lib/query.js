/**
 * Druid query lib
 */

var Druid = require('druid-query'),
  _ = require('lodash'),
  Benchmark = require('./benchmark');


module.exports = QueryReq;

// Query request object
function QueryReq(benchmark) {
  this.query = null;
  this.benchmark = ((benchmark) ? new Benchmark() : null);
}

// Extract all needed key in the query
QueryReq.prototype.makeQuery = function(connection) {
  var Query = Druid.Query;
  var query = new Query(connection, this.query);
  this.execQuery(connection, query);
}

QueryReq.prototype.execQuery = function(connection, query) {
  var parent = this;

  if (this.benchmark) {
    this.benchmark.startBenchmark();
  }

  connection.exec(query, function(err, results) {
    if (err) {
      // error reasons:
      // 1. data source is not served by any known node
      // 2. query validation error
      // 3. error from Druid node after executing query
      console.log(err);
    } else {
      // handle results
      if (parent.benchmark) {
        parent.benchmark.stopBenchmark();
        console.info("Druid query has took %d %s to get %d results", parent.benchmark.result(), 'ms', results.length);
      }
    }
    
    // Call .end() when finished working with Druid
    connection.end();
  });

  connection.on('error', function(err) {
    // handle client error here
    console.log(err);
  });
}





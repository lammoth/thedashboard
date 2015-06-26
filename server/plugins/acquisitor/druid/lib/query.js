/**
 * Druid query lib
 */

var Druid = require('druid-query');
var _ = require('lodash');


module.exports = QueryReq;

function QueryReq(query) {
  this.query = query;
}

// Extract all needed key in the query
QueryReq.prototype.makeQuery = function(connection) {
  console.log(this.query);
  var Client = Druid.Client
    , Query = Druid.Query(Client, this.query);
  this.execQuery(connection, Query);
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





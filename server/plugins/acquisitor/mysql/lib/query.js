/**
 * Spark query lib
 */

var _ = require('lodash'),
  Q = require('q'),
  Benchamark = new (require('./benchmark'))(),
  Parser = new (require('./parser'))();


module.exports = QueryReq;


// Spark query object
function QueryReq(connection) {
  var parent = this;

  this.connection = connection;
}

// Spark query executor
QueryReq.prototype.execQuery = function(query) {  
  var parent = this;
  var deferred = Q.defer();

  this.connection.query(query, function(err, rows) {
    console.log(rows);
    deferred.resolve({});
  });

  return deferred.promise;
}





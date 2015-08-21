/**
 * MySQL query lib
 */

var _ = require('lodash'),
  Q = require('q'),
  Parser = new (require('./parser'))();


module.exports = QueryReq;


// Spark query object
function QueryReq(connection) {
  this.connection = connection;
}

// Spark query executor
QueryReq.prototype.execQuery = function(data) {  
  var deferred = Q.defer();
  Parser.parse(data);
  console.log(Parser.query);  
  this.connection.query(Parser.query, function(err, rows) {
    console.log(rows);
    deferred.resolve(rows);
  });

  return deferred.promise;
}





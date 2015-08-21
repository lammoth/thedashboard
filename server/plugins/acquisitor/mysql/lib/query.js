/**
 * MySQL query lib
 */

var _ = require('lodash'),
  Q = require('q'),
  Parser = new (require('./parser'))();


module.exports = QueryReq;


// MySQL query object
function QueryReq(connection) {
  this.connection = connection;
}

// MySQL query executor
QueryReq.prototype.execQuery = function(data, parsing) {  
  var deferred = Q.defer();
  if (!parsing) {
    switch(data) {
      case "updateDatasources":
        data = "SHOW TABLES;"
        break;
      default:
        break;
    }
  } else {
    Parser.parse(data)
  }

  this.connection.query(((parsing) ? Parser.query : data), function(err, rows) {
    deferred.resolve(rows);
  });

  return deferred.promise;
}





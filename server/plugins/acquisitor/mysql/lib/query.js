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
QueryReq.prototype.execQuery = function(data) {
  var deferred = Q.defer(),
      raw = null;
  // If data object has an "action" property,
  // the query will be executed in raw mode
  if (data.action) {
    switch(data.action) {
      case "updateDatasources":
        raw = "SHOW TABLES;";
        break;
      case "fieldsFromDatasources":
        raw = "SELECT * FROM information_schema.columns WHERE table_schema = '" + this.connection.config.database + "';";
        break;
      default:
        break;
    }
  } else {
    // Data is parsed only when the results must be represented
    Parser.parse(data);
  }

  this.connection.query(((!data.action) ? Parser.query : raw), function(err, rows) {
    deferred.resolve(rows);
  });

  return deferred.promise;
}





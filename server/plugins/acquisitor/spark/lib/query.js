/**
 * Spark query lib
 */

var _ = require('lodash'),
  Q = require('q'),
  Parser = new (require('./parser'))();


module.exports = QueryReq;


// Spark query object
function QueryReq(connection) {
  var parent = this;

  this.connection = connection;
  
  this.manager = function(query, deferred) {
    parent.connection.executeQuery(query, function genericQueryHandler(err, results) {
      if (err) {
        console.log(err);
        deferred.resolve({});
        close();
      } else if (results) {
        console.log(results);
        deferred.resolve(results);
        close();
      }
    });

    function close() {
      parent.connection.close(function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Connection closed successfully!");
        }
      });
    }
  };
}

// Spark query executor
QueryReq.prototype.execQuery = function(query) {  
  var parent = this;
  var deferred = Q.defer();

  // TODO: Uncomment when Spark will be ready
  // this.connection.open(function(err, conn) {
  //   if (err) {
  //     console.log(err);
  //     deferred.resolve({});
  //   }

  //   if (conn) {
  //     parent.manager(Parser.parse(query), deferred);
  //   }
  // });
  deferred.resolve({});

  return deferred.promise;
}





/**
 * Spark query lib
 */

var _ = require('lodash');


module.exports = QueryReq;

// Query request object
function QueryReq(connection) {
  this.connection = connection;

  this.genericQueryHandler = function(err, results) {
    if (err) {
      console.log(err);
    } else if (results) {
      console.log(results);
    }

    connection.close(function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("Connection closed successfully!");
      }
    });
  };
}


QueryReq.prototype.execQuery = function(query) {
  this.connection.open(function(err, conn) {
    if (err) console.log(err);
    if (conn) {
      this.connection.executeQuery(query, this.genericQueryHandler);
    }
  });
}





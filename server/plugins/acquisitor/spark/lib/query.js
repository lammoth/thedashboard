/**
 * Spark query lib
 */

var _ = require('lodash'),
  Parser = require('./parser')();


module.exports = QueryReq;

// Spark query object
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


QueryReq.prototype.execQuery = function(query, raw) {
  // TODO: Waiting to request data from Spark
  // var parent = this;
  // this.connection.open(function(err, conn) {
  //   if (err) console.log(err);
  //   if (conn) {
  //     parent.connection.executeQuery(((raw) ? query : Parser.parse(query)), parent.genericQueryHandler);
  //   }
  // });
  return [
    ['data1', 30, 200, 100, 400, 150, 250],
    ['data2', 50, 20, 10, 40, 15, 25],
    ['data3', 230, 40, 330, 120, 150, 250]
  ];
}





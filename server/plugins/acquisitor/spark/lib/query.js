/**
 * Spark query lib
 */

var _ = require('lodash'),
  Parser = require('./parser')();


module.exports = QueryReq;

// Spark query object
function QueryReq(connection) {
  var parent = this;
  this.connection = connection;
  this.cb = null;

  this.genericQueryHandler = function(err, results) {
    if (err) {
      console.log(err);
    } else if (results) {
      console.log(results);
      parent.cb(results);
    }

    parent.connection.close(function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("Connection closed successfully!");
      }
    });
  };
}


QueryReq.prototype.execQuery = function(query, raw, cb) {
  // TODO: Waiting to request data from Spark
  var parent = this;
  parent.cb = cb;
  this.connection.open(function(err, conn) {
    if (err) console.log(err);
    if (conn) {
      parent.connection.executeQuery(((raw) ? query : Parser.parse(query)), parent.genericQueryHandler);
    }
  });
  // return [
  //   ['data1', 30, 200, 100, 400, 150, 250],
  //   ['data2', 50, 20, 10, 40, 15, 25],
  //   ['data3', 230, 40, 330, 120, 150, 250]
  // ];
  // var request = require('request');
  // request(
  //   { method: 'GET'
  //   , uri: 'http://mtgjson.com/json/AllCards.json'
  //   , gzip: true
  //   }
  // , function (error, response, body) {
  //     var jsonObject = JSON.parse(body);
  //     cb(jsonObject);
  //   }
  // );
}





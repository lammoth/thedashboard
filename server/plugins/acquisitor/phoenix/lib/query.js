/**
 * Phoenix query lib
 */

// var _ = require('lodash'),
//   Q = require('q'),
//   Parser = new (require('./parser'))();
var Benchmark = new (require('./benchmark'))();

module.exports = QueryReq;


// // Phoenix query object
function QueryReq(connection) {
  var parent = this;
  this.connection = connection;
  this.poolCon = null;
  this.connection.reserve(function(err, connObj) {
    if (connObj) {
      console.log("Using connection: " + connObj.uuid);
      parent.poolCon = connObj.conn;
      Benchmark.startBenchmark();
    }
  }); 
}

// Phoenix query executor
QueryReq.prototype.execQuery = function(data) {
  // var deferred = Q.defer(),
  //     raw = null,
  //     parent = this;
  // If data object has an "action" property,
  // the query will be executed in raw mode
  // if (data.action) {
  //   switch(data.action) {
  //     case "updateDatasources":
  //       raw = "SHOW TABLES;";
  //       break;
  //     case "fieldsFromDatasources":
  //       raw = "SELECT * FROM information_schema.columns WHERE table_schema = '" + this.connection.config.database + "';";
  //       break;
  //     default:
  //       break;
  //   }
  // } else {
  //   // Data is parsed only when the results must be represented
  //   Parser.parse(data);
  // }

  this.poolCon.createStatement(function(err, statement) {
    if (err) {
      console.log(err);
    } else {
      statement.executeQuery('SELECT * from "logstash.netflow2"',
                            function(err, resultset) {
        if (err) {
          console.log(err);
        } else {
          resultset.toObjArray(function(err, results) {
            Benchmark.stopBenchmark();
            console.log(results);
            console.log(Benchmark.result()/1000);
          });
        }
      });
    }
  });

  // this.connection.query(((!data.action) ? Parser.query : raw), function(err, rows) {
  //   deferred.resolve({
  //     rows: rows,
  //     query: ((!data.action) ? Parser.query : raw)
  //   });
  // });

  // return deferred.promise;
}





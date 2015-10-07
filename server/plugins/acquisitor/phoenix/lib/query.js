/**
 * Phoenix query lib
 */

var _ = require('lodash'),
  Q = require('q'),
  Parser = new (require('./parser'))(),
  Benchmark = new (require('./benchmark'))();

module.exports = QueryReq;


// // Phoenix query object
function QueryReq(connection) {
  // var parent = this;
  this.connection = connection;
}

// Phoenix query executor
QueryReq.prototype.execQuery = function(data) {
  var parent = this;
  var deferred = Q.defer();
  // If data object has an "action" property,
  // the query will be executed in raw mode
  if (data.action) {
    switch(data.action) {
      case "updateDatasources":
        showTables().then(function(tablesResult) {
          deferred.resolve(tablesResult);
        });
        break;
      case "fieldsFromDatasources":
        showTables().then(function(tablesResult) {
          var count = tablesResult.rows.length;
          var tables = [];
          _.forEach(tablesResult.rows, function(table) {
            var tableObject = {
              name: table,
              fields: []
            };
            getTableInfo(tableObject.name).then(function(fields) {
              tableObject.fields = fields;
              tables.push(tableObject);
              count -= 1;
              if (count === 0) {
                deferred.resolve(tables);
              }
            });
          });
        });
        break;
      default:
        break;
    }
  } else {
    // Data is parsed only when the results must be represented
    Parser.parse(data);
    makeQuery(Parser.query);
  }

  function reserveConnection(cb) {
    parent.connection.reserve(function(err, connObj) {
      if (connObj) {
        console.log("Using connection: " + connObj.uuid);
        cb(connObj.conn);
      }
    });
  }

  function showTables() {
    var deferred = Q.defer();
    reserveConnection(function(connection) {
      connection.getMetaData(function(err, metadata) {
        metadata.getTables(null, null, null, null, function(err, resultset) {
          resultset.toObjArray(function(err, results) {
            var tables = [];
            _.forEach(_.pluck(_.filter(results, { 'TABLE_TYPE': 'TABLE'}), 'TABLE_NAME'), function(table) {
              tables.push(table);
              deferred.resolve({
                rows: tables,
                query: null
              });
            });
          });
        });
      });
    });
    return deferred.promise;  
  }

  function getTableInfo(table) {
    var deferred = Q.defer();
    reserveConnection(function(connection) {
      Benchmark.startBenchmark();
      connection.createStatement(function(err, statement) {
        if (err) {
          console.log(err);
        } else {
          console.log(table);
          statement.executeQuery('SELECT * from "' + table + '" LIMIT 1',
                                function(err, resultset) {
            if (err) {
              console.log(err);
            } else {
              getFields(resultset, deferred);
            }
          });
        }
      });
    });
    return deferred.promise;
  }

  function getFields(metadata, deferred) {
    metadata.toObject(function(err, result) {
      var fields = [];
      _.forEach(result.labels, function(fieldName, index) {
        fields.push(
          {
            name: fieldName,
            type: metadata._types[result.types[index]]
          }
        );
      });
      deferred.resolve(fields);
    });
  }

  function makeQuery(query) {
    reserveConnection(function(connection) {
      Benchmark.startBenchmark();
      connection.createStatement(function(err, statement) {
        if (err) {
          console.log(err);
        } else {
          // statement.executeQuery(query,
          statement.executeQuery('SELECT * from "logstash.netflow" LIMIT 1',
          // statement.executeQuery('SELECT * from SYSTEM.CATALOG',
                                function(err, resultset) {
            if (err) {
              console.log(err);
            } else {
              Benchmark.stopBenchmark();
              console.log(Benchmark.result()/1000);
              // console.log(resultset);
              // getFields(resultset);
              // resultset.toObjArray(function(err, results) {
              //   // console.log(_.map(results, "DATA_TYPE"));
              //   console.log(results[5]);
              // });
              // console.log(resultset._rs);
              resultset.toObject(function(err, results) {
                console.log(resultset._types[93]);
              });
            }
          });
        }
      });
    });
  }

  return deferred.promise;
}





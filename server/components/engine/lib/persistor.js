/**
 * Persistor engine
 */

'use strict';

var redis = require('redis'),
  _ = require('lodash'),
  Q = require('q');

module.exports = Persistor;

function Persistor() {
  this.client = redis.createClient();

  this.client.on("error", function (err) {
    console.log("Error " + err);
  });
}

Persistor.prototype.saveTaskResults = function(task, data) {
  var deferred = Q.defer();
  var parent = this;
  
  this.client.hmset(
    'task:' + task,
    data,
    function(err, response) {
      if (!err) {
        deferred.resolve();
      }
    }
  );

  return deferred.promise;
}

Persistor.prototype.getTaskResults = function(task, cb) {
  this.client.hgetall("task:" + task, function(err, result) {
    // TODO: Only for test purposes
    // The result should be parsed yet 
    var resultArray = [];
    _.forEach(result, function(value, key){
      resultArray.push(value.split(","));
    });
    cb(resultArray);
    //cb(result);
  });
}

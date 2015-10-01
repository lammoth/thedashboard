/**
 * Persistor engine
 */

'use strict';

var redis = require('redis'),
  _ = require('lodash'),
  Q = require('q'),
  timeUtil = require('./utils/time');

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
  
  this.client.mset(
    'task:' + task,
    JSON.stringify(data),
    function(err, response) {
      if (!err) {
        deferred.resolve();
      }
    }
  );

  return deferred.promise;
};

Persistor.prototype.saveVisualization = function(data) {
  var deferred = Q.defer();
  var parent = this;
  
  this.client.mset(
    'visualization:' + data.id,
    JSON.stringify(data),
    function(err, response) {
      if (!err) {
        deferred.resolve();
      }
    }
  );

  return deferred.promise;
};

Persistor.prototype.getTaskResults = function(task, cb) {
  this.client.get("task:" + task, function(err, result) {
    cb(JSON.parse(result));
  });
};

Persistor.prototype.getVisualizationResults = function(data) {
  var deferred = Q.defer();
  var TimeUtilInstance = new timeUtil();
  // TODO: Get a real value to set "Margin of Error"
  // For test purposes the ME has been established to 10 hours
  this.client.get("visualization:" + data.id, function(err, result) {
    deferred.resolve(JSON.parse(result));
    if (err) deferred.resolve(false);
    // if (result) {
    //   var visualization = JSON.parse(result);
    //   deferred.resolve(
    //     (
    //       (
    //         TimeUtilInstance.check(data.time.to, visualization.time.to, 'hours', 10) && 
    //         TimeUtilInstance.check(data.time.from, visualization.time.from, 'hours', 10)
    //       ) 
    //       ? result : false
    //     )
    //   );
    // } else {
    //   deferred.resolve(false);
    // }
  });
  return deferred.promise;
};

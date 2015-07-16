/**
 * Persistor engine
 */

'use strict';

var redis = require("redis"),
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
        parent.client.quit();
        deferred.resolve();
      }
    }
  );

  return deferred.promise;
}
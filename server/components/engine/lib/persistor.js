/**
 * Persistor engine
 */

'use strict';

var redis = require("redis");

module.exports = Persistor;

function Persistor() {
  this.client = redis.createClient();

  this.client.on("error", function (err) {
    console.log("Error " + err);
  });
}

Persistor.prototype.saveTaskResults = function(task, data, cb) {
  this.client.hmset(
    'task:' + task,
    data,
    function(err, response) {
      if (!err) {
        this.client.quit();
        cb();
      }
    }
  );
}
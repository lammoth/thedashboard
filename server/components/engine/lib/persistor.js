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
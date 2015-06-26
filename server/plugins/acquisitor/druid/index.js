/**
 * Druid acquisition engine
 */

var Druid = require('druid-query'),
    Query = require('./lib/query');

module.exports = DruidPlugin;

function DruidPlugin(data) {

  // Druid data needed to stablish the connection
  this.data = data;

  // Druid query lib
  this.query = new Query(this.data);
}

// Return a new Druid connection
DruidPlugin.prototype.connect = function() {
  return new Druid(this.data.address, this.data.parameters, this.data.extra);
}
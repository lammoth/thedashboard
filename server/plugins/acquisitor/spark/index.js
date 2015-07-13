/**
 * Spark acquisition engine
 */

var jdbc = new (require('jdbc')),
    Query = require('./lib/query');

module.exports = SparkPlugin;

function SparkPlugin(data) {

  // Spark data needed to stablish the connection
  this.data = data;

  // Spark query lib
  this.queryClient = null;
}

// Return a new Druid connection
SparkPlugin.prototype.connect = function(cb) {
  var parent = this;
  jdbc.initialize(this.data, function(err, res) {
    if (err) {
      console.log(err);
    } else {
      parent.queryClient = new Query(jdbc);
      cb();
    }
  });
};
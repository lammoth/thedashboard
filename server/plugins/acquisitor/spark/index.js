/**
 * Spark acquisition engine
 */

var jdbc = new (require('jdbc')),
    Query = require('./lib/query'),
    Q = require('q');

module.exports = SparkPlugin;

function SparkPlugin(data) {

  // Spark data needed to stablish the connection
  this.data = data;

  // Spark query lib
  this.queryClient = null;
}

// Return a new Spark connection
SparkPlugin.prototype.connect = function() {

  var deferred = Q.defer();
  var parent = this;  
  jdbc.initialize(this.data, function(err, res) {
    if (err) {
      console.log(err);
    } else {
      parent.queryClient = new Query(jdbc);
      deferred.resolve();
    }
  });
  return deferred.promise;
};
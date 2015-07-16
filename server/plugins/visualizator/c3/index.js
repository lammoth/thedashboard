/**
 * C3 visualizator engine
 */

var Q = require('q'),
  Parser = new (require('./lib/parser'))();


module.exports = C3Plugin;

function C3Plugin(data) {
  // C3 data needed to stablish the connection
  this.data = data;
}

C3Plugin.prototype.parser = function(data) {
  var deferred = Q.defer();
  Parser.parse(((data) ? data : this.data), deferred);
  return deferred.promise;
}

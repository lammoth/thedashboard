/**
 * C3 visualizator engine
 */

var Q = require('q'),
  Parser = new (require('./lib/parser'))();


module.exports = C3Plugin;

function C3Plugin() {
  // C3 data needed to make the dataset
  this.data = null;

  // C3 graph data needed to make the dataset
  this.raw = null;

  // C3 graphic requirements
  this.requirements = null;

  // C3 acquisitor parser
  this.acquisitorParser = null; 
}

C3Plugin.prototype.parser = function(data) {
  var deferred = Q.defer();
  Parser.parse(((data) ? data : this.data), this.raw, this.acquisitorParser, deferred);
  return deferred.promise;
};

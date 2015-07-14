/**
 * C3 visualizator engine
 */

var Parser = new (require('./lib/parser'))();


module.exports = C3Plugin;

function C3Plugin(data) {
  // C3 data needed to stablish the connection
  this.data = data;
}

C3Plugin.prototype.parser = function(data, cb) {
  Parser.parse(((data) ? data : this.data), cb);
}

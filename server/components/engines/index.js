
var Acquisitor = require('./lib/acquisitor');
var Visualizator = require('./lib/visualizator');

module.exports = Engine;

function Engine(app) {
  this.acquisitor = new Acquisitor();
  this.visualizator = new Visualizator();
}
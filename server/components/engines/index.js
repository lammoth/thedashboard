
var Acquisitor = require('./lib/acquisitor');
var Visualizator = require('./lib/visualizator');

module.exports = Engine;

// {
//   "plugins": [
//     { "name": "acquisitor", "pluginName": "druid", "pluginTitle": "Druid", "enable": true }
//   ]
// }

function Engine(app) {
  console.log(app.get('plugins'));
  this.acquisitor = new Acquisitor();
  this.visualizator = new Visualizator();
}
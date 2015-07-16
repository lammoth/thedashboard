

var _ = require('lodash'),
  Acquisitor = require('./lib/acquisitor'),
  Visualizator = require('./lib/visualizator'),
  Persistor = require('./lib/persistor');
  visualizationQuery = require('./lib/queries/visualization');
 

module.exports = Engine;

function Engine(app) {
  this.app = app;
  this.acquisitor = new Acquisitor();
  this.visualizator = new Visualizator();
  this.persistor = new Persistor();
}


Engine.prototype.select = function(type, subtype, task, cb) {
  switch (subtype) {
    case 'visualization':
      visualizationQuery(this, task, cb);
      break;
  }
};


var _ = require('lodash'),
  Acquisitor = require('./lib/acquisitor'),
  Visualizator = require('./lib/visualizator'),
  Persistor = require('./lib/persistor');
  visualizationQuery = require('./lib/queries/visualization');
 

module.exports = Engine;

function Engine(app) {
  this.app = app;
  // Loaded at app boot
  this.acquisitor = app.get('acquisitor');
  this.visualizator = new Visualizator();
  // Loaded at app boot
  this.persistor = app.get('persistor');
}


Engine.prototype.select = function(type, subtype, data, task, cb) {
  switch (subtype) {
    case 'visualization':
      visualizationQuery(this, data, task, cb);
      break;
  }
};
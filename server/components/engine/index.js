

var _ = require('lodash'),
  Acquisitor = require('./lib/acquisitor'),
  Visualizator = require('./lib/visualizator'),
  Persistor = require('./lib/persistor'),
  visualizationQuery = require('./lib/queries/visualization'),
  settingQuery = require('./lib/queries/setting'),
  checkQuery = require('./lib/queries/check');
 

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
  switch(subtype) {
    case 'visualization':
      visualizationQuery(this, data, task, cb);
      break;
    case 'setting':
      settingQuery(this, data, task, cb);
      break;
    case 'check':
      checkQuery(this, data, task, cb);
      break;
  }
};
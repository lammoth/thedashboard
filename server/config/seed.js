/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var PluginModel = require('../api/data/plugin.model');
var Dashboard = require('../api/data/dashboard.model');
var _ = require('lodash');

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});



PluginModel.find({}, function(err, plugins) {
  if (plugins) {
    Dashboard.find({}).remove(function() {
      var nDashboards = 12;
      var visualizators = _.filter(plugins, function(v) {
        return v.name == 'visualizator'
      });
      var acquisitors = _.filter(plugins, function(v) {
        return v.name == 'acquisitor'
      });
      _.times(nDashboards, function(i) {
        Dashboard.create({
          name: 'Dashboard ' + (i + 1),
          visualizatorPlugin: visualizators[_.random(visualizators.length - 1)].pluginName,
          acquisitorPlugin: acquisitors[_.random(acquisitors.length - 1)].pluginName,
          visualizations: [],
          matrix: [],
          time: new Date()
        }, function() {
          if (i == nDashboards - 1) {
            console.log('finished populating dashboards');
          }
        });
      });
    });
  }
})
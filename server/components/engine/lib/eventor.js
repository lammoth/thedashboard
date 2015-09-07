/**
 * Eventor engine
 */

'use strict';

var PluginModel = require('../../../api/data/plugin.model'),
    _ = require('lodash'),
    Q = require('q');


module.exports = Eventor;

function Eventor() {
  var parent = this;
  this.sockets = [];

  this.init = function(app) {
    parent.plugin().then(function(data) {
      if (!data) {
        console.log('Error >> Not found enable Eventor');
      }
      var eventorPluginData = parent.getObject(app.get('plugins'), data);
      var EventorPlugin = new (require(eventorPluginData.path))(parent, eventorPluginData.config);
      EventorPlugin.connect();
      console.log("Eventor loaded at boot");
      app.set('eventor', EventorPlugin);
    });
  };

  this.plugin = function() {
    var deferred = Q.defer();
    return fetchPluginActive(deferred);
  };

  function fetchPluginActive(deferred) {
    PluginModel.getPluginEnabled('eventor', function(data) {
      if (!data) {
        deferred.resolve();
      } else {
        deferred.resolve(data);
      }
    });
    return deferred.promise;
  }
}

Eventor.prototype.getObject = function(plugins, data) {
  return _.first(_.filter(plugins, function(plugin) {
    if (plugin.pluginName === data.pluginName && plugin.name === data.name) {
      return true;
    }
  }));
};

Eventor.prototype.registerSocket = function(socket) {
  this.sockets.push(socket);
  console.log('socket registered. TOTAL: ', this.sockets.length);
}

Eventor.prototype.removeSocket = function(socket) {
  // TODO: improve this behaviour
  var index = this.sockets.indexOf(socket);
  if (index > -1) {
    this.sockets.splice(index, 1);
  }
  console.log('socket removed. TOTAL: ', this.sockets.length);
}

Eventor.prototype.emit = function(evName, data) {
  _.forEach(this.sockets, function(socket) {
    socket.emit(evName, data);
  });
}

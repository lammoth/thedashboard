/**
 * Acqusitor engine
 */

'use strict';

var PluginData = require('../../../api/data/plugin.model');
var _ = require('lodash');
var Q = require('q');


module.exports = Acquisitor;

function Acquisitor() {
  var parent = this;
  this.app = null;

  this.init = function(app) {
    parent.app = app;
    parent.changePlugin();
  };

  this.plugin = function() {
    var deferred = Q.defer();
    return fetchPluginActive(deferred);
  };

  function fetchPluginActive(deferred) {
    PluginModel.getPluginEnabled('acquisitor', function(data){
      if (!data) {
        deferred.resolve({});
      } else {
        deferred.resolve(data);
      }
    });

    return deferred.promise;
  }
}

Acquisitor.prototype.getObject = function(plugins, data) {
  return _.first(_.filter(plugins, function(plugin) {
    if (plugin.pluginName === data.pluginName && plugin.name === data.name) {
      return true;
    }
  }));
};

Acquisitor.prototype.changePlugin = function() {
  var parent = this;
  var app = this.app;
  var acquisitor = app.get('acquisitor');
  
  if (acquisitor && acquisitor.isConnected) {
    app.get('acquisitor').close(function() {
      usePlugin();
    });
  } else {
    usePlugin();
  }
  
  function usePlugin() {
    parent.plugin().then(function(data) {
      if (!data) {
        console.log('Error >> Not found enabled Acquisitor');
      }
      var acquisitorPluginData = parent.getObject(app.get('plugins'), data);
      var AcquisitorPlugin = new (require(acquisitorPluginData.path))(parent, acquisitorPluginData.config);
      AcquisitorPlugin.connect();
      console.log("Acquisitor loaded");
      app.set('acquisitor', AcquisitorPlugin);
    });
  }
}

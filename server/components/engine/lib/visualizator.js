/**
 * Visualizator engine
 */

'use strict';

var PluginData = require('../../../api/data/plugin.model');
var _ = require('lodash');
var Q = require('q');


module.exports = Visualizator;

function Visualizator() {
  this.plugin = function() {
    var deferred = Q.defer();
    return fetchPluginActive(deferred);
  };

  function fetchPluginActive(deferred) {
    PluginModel.getPluginEnabled('visualizator', function(data){
      if (!data) {
        deferred.resolve({});
      } else {
        deferred.resolve(data);
      }
    });

    return deferred.promise;
  }
}

Visualizator.prototype.getObject = function(plugins, data) {
  return _.first(_.filter(plugins, function(plugin) {
    if (plugin.pluginName === data.pluginName && plugin.name === data.name) {
      return true;
    }
  }));
};

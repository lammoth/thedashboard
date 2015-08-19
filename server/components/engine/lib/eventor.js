/**
 * Eventor engine
 */

'use strict';

var PluginData = require('../../../api/data/plugin.model'),
    _ = require('lodash'),
    Q = require('q');


module.exports = Eventor;

function Eventor() {

  this.plugin = function() {
    var deferred = Q.defer();
    return fetchPluginActive(deferred);
  };

  function fetchPluginActive(deferred) {
    PluginModel.getPluginEnabled('eventor', function(data) {
      if (!data) {
        deferred.resolve({});
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

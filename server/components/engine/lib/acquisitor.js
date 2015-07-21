/**
 * Acqusitor engine
 */

'use strict';

var PluginData = require('../../../api/data/plugin.model');
var _ = require('lodash');
var Q = require('q');


module.exports = Acquisitor;

function Acquisitor() {

  this.plugin = function() {
    var deferred = Q.defer();
    return fetchPluginActive(deferred);
  };

  function fetchPluginActive(deferred) {
    PluginData.findOne({"name": "acquisitor", "enable": true}, function (err, data) {
      if(err) { deferred.resolve({}) }
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

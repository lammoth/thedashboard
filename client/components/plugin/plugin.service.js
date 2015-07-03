'use strict';

// TODO: Get API version from somewhere

angular.module('thedashboardApp')
  .factory('Plugin', function Plugin($http, $q) {
    var plugins = {};

    // Get enable plugins
    function getConfig(cb) {
      
      var deferred = $q.defer();

      $http.get('/api/v1/data/config', {}).
        success(function(data) {
          if (data.response === "error") { return data.data; }
          plugins = data.data;
          deferred.resolve(cb());
        }).
        error(function(err) {
          console.log(err);
        });
      return deferred.promise;
    }

    return {
      // Requests broker
      broker: function(name) {
        var promise = getConfig(this[name]);
        return promise;
      },

      getAcquisitorPlugins: function() {
        if (plugins) {
            var acquisitorPlugins = _.filter(plugins[0].plugins, function(plugin) {
              if (plugin.name === "acquisitor") {
                return true;
              } else {
                return false;
              }
            });

            return acquisitorPlugins;
            // _.find(plugins[0].plugins, {'name': 'acquisitor'});
            // console.log(acquisitorPlugins);
            // return ((_.isArray(acquisitorPlugins)) ? acquisitorPlugins : [acquisitorPlugins]);
          }
          return null;
      },

      // Returns the acquisitor plugin active
      getAcquisitor: function() {
          if (plugins) {
            return _.result(_.find(plugins[0].plugins, {'name': 'acquisitor', 'enable': true}), 'pluginName');
          }
          return null;
      }
    };
  });

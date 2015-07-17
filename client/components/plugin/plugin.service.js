'use strict';

// TODO: Get API version from somewhere

angular.module('thedashboardApp')
  .factory('Plugin', function Plugin($http, $q, $cacheFactory) {
    var plugins = {};
    var cache = $cacheFactory('Plugin');

    // Get enable plugins
    function getConfig(cb) {
      
      var deferred = $q.defer();

      $http.get('/api/v1/data/config', {}).
        success(function(data) {
          if (data.response === "error") { return data.data; }
          plugins = data.data;
          cache.put("plugins", plugins);
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
        if (!cache.get("plugins")) {
          var promise = getConfig(this[name]);
          return promise;
        } else {
          return this[name]();
        }
      },

      // Returns all acquisitor plugins availables
      getAcquisitorPlugins: function() {
        if (plugins || cache.get("plugins")) {
            if ((!plugins) ? plugins = cache.get("plugins") : plugins);
            var acquisitorPlugins = _.filter(plugins[0].plugins, function(plugin) {
              if (plugin.name === "acquisitor") {
                return true;
              } else {
                return false;
              }
            });

            return acquisitorPlugins;
          }
          return null;
      },

      // Returns the acquisitor plugin active
      getAcquisitor: function() {
          if (plugins || cache.get("plugins")) {
            if ((!plugins) ? plugins = cache.get("plugins") : plugins);
            return _.result(_.find(plugins[0].plugins, {'name': 'acquisitor', 'enable': true}), 'pluginName');
          }
          return null;
      },

      // Returns all visualizator plugins availables
      getVisualizatorPlugins: function() {
        if (plugins || cache.get("plugins")) {
            if ((!plugins) ? plugins = cache.get("plugins") : plugins);
            var visualizatorPlugins = _.filter(plugins[0].plugins, function(plugin) {
              if (plugin.name === "visualizator") {
                return true;
              } else {
                return false;
              }
            });

            return visualizatorPlugins;
          }
          return null;
      },

      // Returns the visualizator plugin active
      getVisualizator: function() {
          if (plugins || cache.get("plugins")) {
            if ((!plugins) ? plugins = cache.get("plugins") : plugins);
            return _.result(_.find(plugins[0].plugins, {'name': 'visualizator', 'enable': true}), 'pluginName');
          }
          return null;
      }
    };
  });

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

      // Returns the acquisitor plugin active
      getAcquisitor: function() {
          if (plugins) {
            return _.result(_.find(plugins[0].plugins, {'name': 'acquisitor', 'enable': true}), 'pluginName');
          }
          return null;
      }
    };
  });

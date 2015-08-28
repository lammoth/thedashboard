'use strict';

angular.module('thedashboardApp')
  .service('Settings', function Plugin($http, $q, $cacheFactory) {
    var cache = $cacheFactory('Settings');
    var settings = {};

    // Get setting data
    function getData(type, cb, extra) {
      
      var deferred = $q.defer();

      $http.get(apiPrefix + '/data/' + type, ((extra) ? extra : {})).
        success(function(data) {
          if (data.response === "error") { return data.data; }
          settings[type] = data.data;
          cache.put("settings", settings);
          deferred.resolve(cb(type));
        }).
        error(function(err) {
          console.log(err);
        });
      return deferred.promise;
    }

    return {
      // Requests broker
      broker: function(type, name, data) {
        if (!cache.get("settings")) {
          var promise = getData(type, this[name], data);
          return promise;
        } else {
          return this[name]();
        }
      },

      // Returns the datasources
      getDatasources: function(type) {
        ((!settings) ? settings = cache.get("settings") : settings);
        if (settings[type] || cache.get("settings")[type]) {
          return settings[type];
        } else {
          return {};
        }
      },
    }
    
  });

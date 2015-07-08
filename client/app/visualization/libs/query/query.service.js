'use strict';

angular.module('thedashboardApp')
  .service('queryVisualization', function ($http, socket) {
    return {
        query: function(cb) {
          $http.get('/api/v1/broker', {}).
            success(function(data) {
              if (data.response === "error") { return cb(data); }
              return cb(data);
            }).
            error(function(err) {
              console.log(err);
            });
        }
    };
  });

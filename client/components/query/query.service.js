'use strict';

angular.module('thedashboardApp')
  .service('queryService', function ($http, socket) {
    return {
        createTask: function(type, subtype, cb) {
          $http.post('/api/v1/broker/task/' + type + '/' + subtype, {}).
            success(function(data) {
              if (data.response === "error") { return cb(data); }
              return cb(data);
            }).
            error(function(err) {
              console.log(err);
            });
        },
        updateVisualization: function(task) {
          $http.get('/api/v1/broker/task/' + task).
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

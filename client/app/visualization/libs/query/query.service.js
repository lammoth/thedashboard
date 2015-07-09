'use strict';

angular.module('thedashboardApp')
  .service('queryService', function ($http, socket) {
    return {
        createTask: function(type, cb) {
          $http.post('/api/v1/broker/task/' + type, {}).
            success(function(data) {
              if (data.response === "error") { return cb(data); }
              return cb(data);
            }).
            error(function(err) {
              console.log(err);
            });
        },
        executeTask: function(job, type, cb) {
          $http.post('/api/v1/broker/task/' + type + '/' + job, {}).
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

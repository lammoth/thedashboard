'use strict';

angular.module('thedashboardApp')
  .service('queryService', function ($http, socket) {
    return {
        // Creates a task in the backend and returns the task id 
        createTask: function(type, subtype, cb) {
          $http.post('/api/v1/broker/task', {type: type, subtype:subtype}).
            success(function(data) {
              if (data.response === "error") { return cb(data); }
              return cb(data);
            }).
            error(function(err) {
              console.log(err);
            });
        },
        // Update a visualization with the data returned by a task
        updateVisualization: function(task, cb) {
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

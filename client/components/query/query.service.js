'use strict';

angular.module('thedashboardApp')
  .service('queryService', function ($http, socket) {
    return {
        // Creates a task in the backend and returns the task id 
        createTask: function(type, subtype, data, cb) {
          $http.post(apiPrefix + '/broker/task', {type: type, subtype: subtype, data: data}).
            success(function(data) {
              if (data.response === "error") { return cb(data); }
              return cb(data);
            }).
            error(function(err) {
              console.log(err);
            });
        },
        // Update a visualization with the data returned by a task
        getVisualizationTaskData: function(task, cb) {
          $http.get(apiPrefix + '/broker/task/' + task).
            success(function(data) {
              if (data.response === "error") { return cb(data); }
              return cb(data);
            }).
            error(function(err) {
              console.log(err);
            });  
        },
        // Get any setting data
        getSetting: function(task, cb) {
          $http.get(apiPrefix + '/broker/task/' + task).
            success(function(data) {
              if (data.response === "error") { return cb(data); }
              return cb(data);
            }).
            error(function(err) {
              console.log(err);
            });  
        },
        // Update any setting data
        updateSetting: function(type, data, cb) {
          $http.post(
            apiPrefix + '/data/' + type,
            {data: data}
          ).
            success(function(data) {
              if (data.response === "error") { return cb(data); }
              return cb(data);
            }).
            error(function(err) {
              console.log(err);
            });  
        },
        // Delete any setting data
        deleteSetting: function(type, id, cb) {
          $http.delete(
            apiPrefix + '/data/' + type + '/' + id
          ).
            success(function(data) {
              if (data.response === "error") { return cb(data); }
              return cb(data);
            }).
            error(function(err) {
              console.log(err);
            });  
        },
        // Save visualization data
        saveVisualization: function(type, data, cb) {
          $http.post(
            apiPrefix + '/data/' + type,
            {data: data}
          ).
            success(function(data) {
              if (data.response === "error") { return cb(data); }
              return cb(data);
            }).
            error(function(err) {
              console.log(err);
            });  
        },
    };
  });

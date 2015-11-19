'use strict';

angular.module('thedashboardApp')
  .service('queryService', function ($http, socket) {
    var timeData = []
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
        // Get the data returned by a task
        getTaskData: function(task, cb) {
          $http.get(apiPrefix + '/broker/task/' + task).
            success(function(data) {
              if (data.response === "error") { return cb(data); }
              return cb(data);
            }).
            error(function(err) {
              console.log(err);
            });  
        },
        // Set time preferences on Redis
        setTime: function(timeData, cb) {
          $http.post(apiPrefix + '/broker/time', {from: timeData.from, to: timeData.to}).
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
        // Save a data like visualizations, dashboards, etc
        saveData: function(type, data, cb) {
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

        // Save a data like visualizations, dashboards, etc
        updateData: function(type, data, id, cb) {
          $http.put(
            apiPrefix + '/data/' + type + '/' + id,
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

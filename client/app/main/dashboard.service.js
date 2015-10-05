'use strict';

angular.module('thedashboardApp')
  .service('DashboardService', function DashBoadService($http, socket, queryService, Settings) {
    var items = [];
    var currentRow = 0;
    return {
      // addVisulization: function(visualization, visualizatorService) {
      //   items.push({ sizeX: 12, sizeY: 3, row: currentRow, col: 0, id: visualization._id, name: visualization.name});
      //   currentRow += 1;
      //   var charts = {};
      //   queryService.createTask(
      //     'query',
      //     'check',
      //     {
      //       redis: {
      //         name: visualization.name,
      //         time: {
      //           from: null,
      //           to: null
      //         },
      //         id: visualization._id
      //       },
      //       mongo: {
      //         data: visualization.json
      //       }
      //     },
      //     function(data) {
      //       if (data.response !== 'error') {
      //         createSocket("query-" + data.data.job, function(data) {
      //           console.log("Task %d event received", data.job);
      //           queryService.getTaskData(
      //             data.job,
      //             function(taskData) {
      //               visualizatorService.data(taskData.data.visualization);
      //               visualizatorService.onresize = function(){resize(visualization._id)};
      //               visualizatorService.bind('#vis-' + visualization._id);
      //               var chart = visualizatorService.render();
      //               charts[visualization._id] = chart;
      //               resize(visualization._id);
      //             }
      //           );
      //         });
      //       }
      //     }
      //   );

      //   function createSocket(name, cb) {
      //     console.log("Creating socket %s", name);
      //     socket.socket.on(name, function(data) {
      //       cb(data);
      //     });
      //   }

      //   // This function use resize method of the c3js charts to modify its sizes.
      //   // Is used to adjust the chart to its containers
      //   // VERY IMPORTANT: all charts need to call this in its onresize function.
      //   function resize(chart_id, height) {
      //     if (!height) {
      //       height = getHeight(chart_id) + getRemainingHeight(chart_id);
      //     }
      //     charts[chart_id].resize({height: height - getRemainingHeight(chart_id)});
      //   }

      //   // This function return the height of a gridster item container.
      //   // Is used to know the height that should have the chart.
      //   // VERY IMPORTANT: all charts need to call this when its size is declared.
      //   function getHeight(chart_id) {
      //     var el = angular.element('#_' + chart_id)[0];
      //     var size = el.clientHeight - getRemainingHeight(chart_id);
      //     return size;
      //   }

      //   // This function return the remaining height between container and chart.
      //   function getRemainingHeight(chart_id) {
      //     var heading = angular.element('#_' + chart_id + ' .panel-heading')[0].clientHeight;
      //     var spacingTop = parseInt(angular.element('#_' + chart_id + ' .panel-body').css('padding-top').replace('px', ''));
      //     var spacingBottom = parseInt(angular.element('#_' + chart_id + ' .panel-body').css('padding-bottom').replace('px', ''));
      //     return heading + spacingTop + spacingBottom;
      //   }
      // },
      loadDashboardVisualizations: function(dashboardId) {
        var settingsPromise = Settings.broker('dashboards', 'getData', {_id: dashboardId});
        settingsPromise.then(function(dashboard) {
          console.log(dashboard)
        });
        // _.forEach(dashboard.visualizations, function(visualization) {
        //   this.addVisulization(visualization);
        // });
        // return items;
      }
    }
    
  });

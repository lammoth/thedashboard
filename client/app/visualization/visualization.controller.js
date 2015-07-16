'use strict';

angular.module('thedashboardApp')
  .controller('VisualizationCtrl', function ($scope, $rootScope, Plugin) {
    $rootScope.sectionName = "Visualizations";
    $rootScope.sectionDescription = "Create a new visulaization";
  })
  .controller('VisualizationEditorCtrl', function ($scope, $stateParams, Plugin, $injector, $timeout) {
    $scope.chart = $stateParams.chart;
    // Header.sectionTitle = "Visualizations";
    // Header.sectionDescription = "Create a new visulaization in the editor area";
    var c3Visualizator = $injector.get('c3Visualizator');
    c3Visualizator.data();
    c3Visualizator.type($stateParams.chart);
    c3Visualizator.bind('#visualization-chart-editor');
    var chart = c3Visualizator.compile();
    // $timeout(function() {
    //   chart.unload({
    //     ids: ['data2']
    //   });
    //   $timeout(function() {
    //     chart.transform('line');
    //   }, 2000);
    // }, 1000);
    $scope.c3test = function() { 
      $timeout(function() {
        c3Visualizator.transform(chart, 'line');
      }, 2000);
    };
  })
  .controller('VisualizationEditorTabController', function ($scope, queryService, socket) {
    $scope.form = {};
    $scope.$on('c3test', function(event, mass) { 
      console.log(mass);
    });
    $scope.makeQuery = function() {
      queryService.createTask(
        'query',
        'visualization',
        function(data) {
          if (data.response !== 'error') {
            createSocket("query-" + data.data.job, function(data) {
              console.log("Task %d event received", data.job);
              $scope.$parent.c3test();
            });
          }
        }
      );
    };

    function createSocket(name, cb) {
      console.log("Creating socket %s", name);
      socket.socket.on(name, function(data) {
        cb(data);
      });
    }

  });

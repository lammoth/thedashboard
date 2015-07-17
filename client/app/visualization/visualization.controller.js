'use strict';

angular.module('thedashboardApp')
  .controller('VisualizationCtrl', function ($scope, $rootScope, Plugin) {
    $rootScope.sectionName = "Visualizations";
    $rootScope.sectionDescription = "Create a new visulaization";
  })
  .controller('VisualizationEditorCtrl', function ($scope, $stateParams, Plugin, $injector, $timeout, $cacheFactory) {
    $scope.chart = $stateParams.chart;
    var VisualizatorService = null;
    var chart = null;

    if ($cacheFactory.info().Plugin.size === 0) {
      var visualizatorPluginPromise = Plugin.broker('getVisualizator');
      visualizatorPluginPromise.then(function(visualizatorPlugin) {
        VisualizatorService = $injector.get(visualizatorPlugin + "Visualizator");
        // VisualizatorService.data();
        // VisualizatorService.type($stateParams.chart);
        // VisualizatorService.bind('#visualization-chart-editor');
        // chart = VisualizatorService.compile();
      });
    } else {
      var cache = $cacheFactory.get("Plugin");
      if (cache.get("plugins")) {
        VisualizatorService = $injector.get(Plugin.getVisualizator() + "Visualizator");
      }
    }
  })
  .controller('VisualizationEditorTabController', function ($scope, queryService, socket) {
    $scope.form = {};

    $scope.makeQuery = function() {
      var chart = $scope.$parent.chart;
      queryService.createTask(
        'query',
        'visualization',
        function(data) {
          if (data.response !== 'error') {
            createSocket("query-" + data.data.job, function(data) {
              console.log("Task %d event received", data.job);
              queryService.updateVisualization(
                data.job,
                function(taskData) {
                  console.log(taskData);
                }
              );
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

'use strict';

angular.module('thedashboardApp')
  .controller('VisualizationCtrl', function ($scope, $state) {
  })
  .controller('VisualizationNewCtrl', function ($scope, $rootScope) {
    $rootScope.sectionName = "Visualizations";
    $rootScope.sectionDescription = "Create a new visulaization";
  })
  .controller('VisualizationEditorCtrl', function ($scope, $rootScope, $stateParams, Plugin, $injector, $cacheFactory) {
    $rootScope.sectionName = "Visualizations";
    $rootScope.sectionDescription = "Edit a visulaization";
    $scope.chartType = $stateParams.chart;
    $scope.visualizatorService = null;
    $scope.acquisitorService = null;

    if ($cacheFactory.info().Plugin.size === 0) {
      var visualizatorPluginPromise = Plugin.broker('getVisualizator');
      visualizatorPluginPromise.then(function(visualizatorPlugin) {
        $scope.visualizatorService = $injector.get(visualizatorPlugin + "Visualizator");
        $scope.acquisitorService = $injector.get(Plugin.getAcquisitor() + "Acquisitor");
      });
    } else {
      var cache = $cacheFactory.get("Plugin");
      if (cache.get("plugins")) {
        $scope.visualizatorService = $injector.get(Plugin.getVisualizator() + "Visualizator");
        $scope.acquisitorService = $injector.get(Plugin.getAcquisitor() + "Acquisitor");
      }
    }
  })
  .controller('VisualizationEditorTabController', function ($scope, queryService, socket) {
    $scope.form = {};
    $scope.form.groups = [];
    $scope.form.chartType = $scope.$parent.chartType;

    $scope.addAggregation = function() {
      if (!$scope.form.aggregations) {
        $scope.form.aggregations = [];
      }
      $scope.form.aggregations.push({});
    };

    $scope.addGroup = function() {
      if (!$scope.form.groups) {
        $scope.form.groups = [];
      }
      $scope.form.groups.push({});
    };

    $scope.changeGraphicOptions = function(options, model) {
      $scope.$parent.visualizatorService.option(options, model, $scope.chart); 
      if (options.restart) {
        $scope.chart = $scope.$parent.visualizatorService.render();
      }
    }

    $scope.runVisualization = function() {
      var chart = $scope.$parent.chart;
      // var query = $scope.$parent.acquisitorService.parse($scope.form);
      queryService.createTask(
        'query',
        'visualization',
        $scope.form,
        function(data) {
          if (data.response !== 'error') {
            createSocket("query-" + data.data.job, function(data) {
              console.log("Task %d event received", data.job);
              queryService.updateVisualization(
                data.job,
                function(taskData) {
                  var columnsArray = [];
                  _.forEach(taskData.data, function(td) {
                    columnsArray.push(td);
                  });
                  $scope.$parent.visualizatorService.data(
                    {
                      columns: columnsArray
                    }
                  );
                  $scope.$parent.visualizatorService.type($scope.$parent.chartType);
                  $scope.$parent.visualizatorService.bind('#visualization-chart-editor');
                  $scope.chart = $scope.$parent.visualizatorService.render();
                }
              );
            });
          }
        }
      );
    };

    $scope.saveVisualization = function() {
      console.log($scope.form);
      console.log($scope.$parent.visualizatorService.hasGraph);
      if ($scope.$parent.visualizatorService.hasGraph) {
        console.log($scope.chart);
      }
    };

    function createSocket(name, cb) {
      console.log("Creating socket %s", name);
      socket.socket.on(name, function(data) {
        cb(data);
      });
    }

  });

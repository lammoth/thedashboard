'use strict';

angular.module('thedashboardApp')
  .controller('VisualizationCtrl', function ($scope, $state) {
  })
  .controller('VisualizationNewCtrl', function ($scope, $rootScope) {
    $rootScope.sectionName = "Visualizations";
    $rootScope.sectionDescription = "Create a new visualization";
  })
  .controller('VisualizationOpenCtrl', function ($scope, $rootScope, $cacheFactory, Plugin, $http, $injector) {
    $rootScope.sectionName = "Visualizations";
    $rootScope.sectionDescription = "Open a visualization";
    getPlugins();
    function getPlugins() {
      $scope.plugins = {};
      if ($cacheFactory.info().Plugin.size === 0) {
        var pluginsAcquisitorPromise = Plugin.broker('getAcquisitorPlugins');
        pluginsAcquisitorPromise.then(function(acquisitorPlugins) {
          if (acquisitorPlugins) {      
            $scope.plugins.acquisitorActive = Plugin.getAcquisitor();
            $scope.plugins.visualizatorActive = Plugin.getVisualizator();
            $scope.visualizatorService = $injector.get($scope.plugins.visualizatorActive + "Visualizator");
            getVisualizations();
          }
        });
      } else {
        var cache = $cacheFactory.get("Plugin");
        if (cache.get("plugins")) {
          $scope.plugins.acquisitorActive = Plugin.getAcquisitor();
          $scope.plugins.visualizatorActive = Plugin.getVisualizator();
          $scope.visualizatorService = $injector.get($scope.plugins.visualizatorActive + "Visualizator");
          getVisualizations();
        }
      }
    }
    
    function getVisualizations() {
      var q = {
        visualizator: $scope.plugins.visualizatorActive,
        acquisitor: $scope.plugins.acquisitorActive
      };
      $http.get('api/v1/data/visualizations', {params: q}).success(function(res) {
        if (res.response == 'ok') {
          $scope.visualizations = res.data;
        }
      });
    }

    $scope.getIcon = function(visualization) {
      return $scope.visualizatorService.getIcon(visualization.graphOptions.chart)
    }
  })
  .controller('VisualizationEditorCtrl', function ($scope, $rootScope, $stateParams, Plugin, $injector, $cacheFactory) {
    $rootScope.sectionName = "Visualizations";
    $rootScope.sectionDescription = "Edit a visualization";
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
  .controller('VisualizationEditorTabController', function ($scope, queryService, socket, Settings) {
    $scope.form = {};
    $scope.form.fields = {};
    $scope.form.groups = [];
    $scope.form.chartType = $scope.$parent.chartType;

    getDatasources();

    function getDatasources(acquisitor) {
      var settingsPromise = Settings.broker('datasource', 'getData', {acquisitor: acquisitor});
      settingsPromise.then(function(datasources) {
        $scope.datasources = datasources;
      });
    }

    $scope.selectFields = function(datasource) {
      $scope.fields = datasource.fields;

    };

    $scope.updateFields = function(field) { 
      if (!$scope.form.fields[field]) {
        delete $scope.form.fields[field];
      }
    };

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

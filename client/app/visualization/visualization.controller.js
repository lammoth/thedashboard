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
  .controller('VisualizationEditorCtrl', function ($scope, $rootScope, $stateParams, Plugin, $injector, $cacheFactory, $modal) {
    // PAD: http://piratepad.net/Mo5aCZVETx

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

    // Modal section
    $scope.animationsEnabled = true;

    $scope.open = function() {

      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'ModalVisualizationSaveContent.html',
        controller: 'ModalSaveInstanceController'
      });

      modalInstance.result.then(function (data) {
        // TODO: Shit, this must be improved
        $scope.$broadcast('saveVisualization', data);
      });
    };

  })
  .controller('VisualizationEditorTabController', function ($scope, $timeout, $stateParams, queryService, socket, Settings) {
    $scope.form = {};
    $scope.form.fields = {};
    $scope.form.chartType = $scope.$parent.chartType;
    var query = null;

    getDatasources();

    if ($stateParams.id) {
      var settingsPromise = Settings.broker('visualizations', 'getData', {});
      settingsPromise.then(function(visualizations) {
        $scope.currentVisualization = _.first(visualizations);
        // TODO: Improve this operation, it's a shit, maybe stablish a kind of callback in the directive
        $timeout(function() {
          $scope.$broadcast('currentVisualizationSetted', _.first(visualizations));
        }, 100);
      });
    }

    function getDatasources(acquisitor) {
      var settingsPromise = Settings.broker('datasource', 'getData', {acquisitor: acquisitor});
      settingsPromise.then(function(datasources) {
        $scope.datasources = datasources;
      });
    }

    $scope.selectFields = function(datasource) {
      $scope.fields = datasource.fields;
    };

    $scope.runVisualization = function() {
      // console.log($scope.form);
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
              queryService.getVisualizationTaskData(
                data.job,
                function(taskData) {
                  // console.log(JSON.stringify(taskData.data));
                  query = taskData.data.query;
                  $scope.$parent.visualizatorService.data(taskData.data.visualization);
                  $scope.$parent.visualizatorService.bind('#visualization-chart-editor');
                  $scope.chart = $scope.$parent.visualizatorService.render();
                }
              );
            });
          }
        }
      );
    };

    // $scope.saveVisualization = function() {
    //   console.log($scope.form);
    //   console.log($scope.$parent.visualizatorService.hasGraph);
    //   if ($scope.$parent.visualizatorService.hasGraph) {
    //     console.log($scope.chart);
    //   }
    // };

    function createSocket(name, cb) {
      console.log("Creating socket %s", name);
      socket.socket.on(name, function(data) {
        cb(data);
      });
    }

    // TODO: Shit, this must be improved
    $scope.$on('saveVisualization', function(event, visualizationName) {
      queryService.saveVisualization(
        'visualizations',
        {
          name: visualizationName,
          type: $scope.form.datasource.name,
          query: query,
          json: $scope.form,
          visualizatorPlugin: $scope.$parent.visualizatorService.name,
          acquisitorPlugin: $scope.$parent.acquisitorService.name
        },
        function(){}
      );
    });

  })
  .controller('ModalSaveInstanceController', function ($scope, $modalInstance) {
    $scope.save = function() {
      $modalInstance.close($scope.visualizationName);
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };
  });

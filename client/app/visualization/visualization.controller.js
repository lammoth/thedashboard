'use strict';

angular.module('thedashboardApp')
  .controller('VisualizationCtrl', function ($scope, $state) {
  })
  .controller('VisualizationNewCtrl', function ($scope, $rootScope) {
    $rootScope.sectionName = "Visualizations";
    $rootScope.sectionDescription = "Create a new visualization";
  })
  .controller('VisualizationOpenCtrl', function ($scope, $rootScope, $cacheFactory, Plugin, $http, $injector, Settings) {
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
      var settingsPromise = Settings.broker('visualizations', 'getData', {});
      settingsPromise.then(function(visualizations) {
        $scope.visualizations = visualizations;
      });
    }

    $scope.getIcon = function(visualization) {
      return $scope.visualizatorService.getIcon(visualization.json.chartType)
    }
  })
  .controller('VisualizationEditorCtrl', function ($scope, $rootScope, $stateParams, Plugin, $injector, $cacheFactory, $modal) {
    // PAD: http://piratepad.net/Mo5aCZVETx

    $rootScope.sectionName = "Visualizations";
    $rootScope.sectionDescription = "Edit a visualization";
    $scope.chartType = $stateParams.chart;
    $scope.visualizatorService = null;
    $scope.acquisitorService = null;

    // Loads a preset visualization
    if ($stateParams.id) {
      
    }

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

    $scope.saveVisualizationModal = function() {

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
      });
    }

    // Dumb method to emit an event to the directives in order to set a default visualization data
    $scope.$on('visualizatorDirectiveReady', function(event, data) {
      $scope.$broadcast('currentVisualizationSetted', $scope.currentVisualization);
    });

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
      var chart = $scope.$parent.chart;
      queryService.createTask(
        'query',
        'visualization',
        $scope.form,
        function(data) {
          if (data.response !== 'error') {
            createSocket("query-" + data.data.job, function(data) {
              console.log("Task %d event received", data.job);
              queryService.getTaskData(
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

    function createSocket(name, cb) {
      console.log("Creating socket %s", name);
      socket.socket.on(name, function(data) {
        cb(data);
      });
    }

    // TODO: Shit, this must be improved
    $scope.$on('saveVisualization', function(event, visualizationName) {
      if ($scope.$parent.visualizatorService.hasGraph()) {
        queryService.saveData(
          'visualizations',
          {
            name: visualizationName,
            type: $scope.form.datasource.name,
            query: query,
            json: $scope.form,
            visualizatorPlugin: $scope.$parent.visualizatorService.name,
            acquisitorPlugin: $scope.$parent.acquisitorService.name,
            graph: $scope.$parent.visualizatorService.hasGraph()
          },
          function(){}
        );
      }
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

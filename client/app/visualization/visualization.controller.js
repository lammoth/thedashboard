'use strict';

angular.module('thedashboardApp')
  .controller('VisualizationCtrl', function ($scope, $state) {
  })
  .controller('VisualizationNewCtrl', function ($scope, $rootScope, Plugin) {
    $rootScope.sectionName = "Visualizations";
    $rootScope.sectionDescription = "Create a new visualization";

    var pluginsAcquisitorPromise = Plugin.broker('getAcquisitorPlugins');
    pluginsAcquisitorPromise.then(function(acquisitorPlugins) {
      $scope.visualizatorService = Plugin.getVisualizatorInstance();
      $scope.charts = [];
      _.forEach(Plugin.getVisualizatorInstance().getChartsAvailables(), function(chart) {
        if (!chart.title) {
          chart.title = _.first(_.filter(Plugin.getVisualizatorChartsAvailables(), {name: chart.name})).title;
        }
        if (!chart.description) {
          chart.description = _.first(_.filter(Plugin.getVisualizatorChartsAvailables(), {name: chart.name})).description;
        }
        $scope.charts.push(chart);
      });
    });
  })
  .controller('VisualizationOpenCtrl', function ($scope, $rootScope, $cacheFactory, Plugin, $http, $injector, Settings) {
    $rootScope.sectionName = "Visualizations";
    $rootScope.sectionDescription = "Open a visualization";
    
    getPlugins();

    function getPlugins() {
      $scope.plugins = {};
    
      var pluginsAcquisitorPromise = Plugin.broker('getAcquisitorPlugins');
      pluginsAcquisitorPromise.then(function(acquisitorPlugins) {
        $scope.visualizatorService = Plugin.getVisualizatorInstance();
        getVisualizations();
      });
    }
    
    function getVisualizations() {
      var settingsPromise = Settings.broker('visualizations', 'getData', {});
      settingsPromise.then(function(visualizations) {
        $scope.visualizations = visualizations;
      });
    }

    $scope.getIcon = function(visualization) {
      return $scope.visualizatorService.getIcon(visualization.json.chartType);
    }
  })
  .controller('VisualizationEditorCtrl', function ($scope, $rootScope, $stateParams, Plugin, $injector, $cacheFactory, $modal) {
    $rootScope.sectionName = "Visualizations";
    $rootScope.sectionDescription = "Edit a visualization";
    $scope.chartType = $stateParams.chart;

    var pluginsAcquisitorPromise = Plugin.broker('getAcquisitorPlugins');
    pluginsAcquisitorPromise.then(function(acquisitorPlugins) {
      $scope.visualizatorService = Plugin.getVisualizatorInstance();
      $scope.acquisitorService = Plugin.getAcquisitorInstance();
    });

    // Modal section
    $scope.animationsEnabled = true;

    $scope.saveVisualizationModal = function() {
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'ModalVisualizationSaveContent.html',
        controller: 'ModalSaveInstanceController',
        resolve: {
          visualization: function () {
            return $stateParams.id;
          }
        }
      });

      modalInstance.result.then(function (data) {
        // TODO: Shit, this must be improved
        $scope.$broadcast('saveVisualization', data);
      });
    };
  })
  .controller('VisualizationEditorTabController', function ($scope, $timeout, $stateParams, queryService, socket, Settings, VisualizationService, Plugin, TimeFilter) {
    $scope.form = {};
    $scope.form.fields = {};
    $scope.form.chartType = $scope.$parent.chartType;
    $scope.graphicOptions = {};
    var query = null;

    getDatasources();

    if ($stateParams.id) {
      // Loads a preset visualization
      var VisualizationPromise = VisualizationService.loadVisualization($stateParams.id);
      VisualizationPromise.then(function(visualization) {
        $scope.currentVisualization = visualization;
      });
    }

    // Dumb method to emit an event to the directives in order to set a default visualization data
    $scope.$on('visualizatorDirectiveReady', function(event, data) {
      // TODO: It's possible that the visualization can not be ready when the event will be fired
      if ($scope.currentVisualization) {
        $scope.$broadcast('currentVisualizationSetted', $scope.currentVisualization);
      }
    });

    // This function try to set the datasource availables
    function getDatasources(acquisitor) {
      var settingsPromise = Settings.broker('datasource', 'getData', {acquisitor: acquisitor});
      settingsPromise.then(function(datasources) {
        $scope.datasources = datasources;
      });
    }

    $scope.runVisualization = function() {
      var chart = $scope.$parent.chart;

      $scope.form.time = { from: TimeFilter.from(), to:TimeFilter.to() }

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
                  query = taskData.data.query;
                  $scope.visualizatorService.data(taskData.data.visualization);
                  $scope.visualizatorService.bind('#visualization-chart-editor');
                  $scope.chart = $scope.visualizatorService.render();
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
      if ($scope.visualizatorService.hasGraph()) {

        if (!$stateParams.id) {
          queryService.saveData(
            'visualizations',
            {
              name: visualizationName,
              type: $scope.form.datasource.name,
              query: query,
              json: $scope.form,
              visualizatorPlugin: $scope.visualizatorService.name,
              acquisitorPlugin: $scope.acquisitorService.name,
              graph: $scope.visualizatorService.hasGraph(),
              graphicOptions: $scope.graphicOptions
            },
            function(){}
          );
        } else {
          queryService.updateData(
            'visualizations',
            {
              name: $scope.currentVisualization.name,
              type: $scope.form.datasource.name,
              query: query,
              json: $scope.form,
              visualizatorPlugin: $scope.visualizatorService.name,
              acquisitorPlugin: $scope.acquisitorService.name,
              graph: $scope.visualizatorService.hasGraph(),
              graphicOptions: $scope.graphicOptions
            },
            $stateParams.id,
            function(){}
          );
        }
      }
    });

  })
  .controller('ModalSaveInstanceController', function ($scope, $modalInstance, visualization) {
    $scope.visualization = visualization;
    $scope.input = {};

    $scope.save = function() {
      $modalInstance.close($scope.input.visualizationName);
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };
  });

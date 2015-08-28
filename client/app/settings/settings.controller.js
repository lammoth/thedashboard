'use strict';

angular.module('thedashboardApp')
  .controller('SettingsDashboardCtrl', function ($scope) {
    
  })
  .controller('SettingsTabController', function ($scope, $cacheFactory, Plugin, $http, $injector) {
    $scope.plugins = {};

    // Initializing plugins tab
    initTabPlugins();

    function initTabPlugins() {
      if ($cacheFactory.info().Plugin.size === 0) {
        var pluginsAcquisitorPromise = Plugin.broker('getAcquisitorPlugins');

        pluginsAcquisitorPromise.then(function(acquisitorPlugins) {
          if (acquisitorPlugins) {      
            $scope.plugins.acquisitors = acquisitorPlugins;
            $scope.plugins.acquisitorActive = Plugin.getAcquisitor();
            $scope.plugins.visualizators = Plugin.getVisualizatorPlugins();
            $scope.plugins.visualizatorActive = Plugin.getVisualizator();
            $scope.visualizatorService = $injector.get($scope.plugins.visualizatorActive + "Visualizator");
          }
        });
      } else {
        var cache = $cacheFactory.get("Plugin");
        if (cache.get("plugins")) {
          $scope.plugins.acquisitors = Plugin.getAcquisitorPlugins();
          $scope.plugins.acquisitorActive = Plugin.getAcquisitor();
          $scope.plugins.visualizators = Plugin.getVisualizatorPlugins();
          $scope.plugins.visualizatorActive = Plugin.getVisualizator();
          $scope.visualizatorService = $injector.get($scope.plugins.visualizatorActive + "Visualizator");
        }
      }
    }

    $scope.acquisitorSelectChange = function() {
      console.log($scope.plugins.acquisitors);
    };

    $scope.visulizatorSelectChange = function() {
      console.log($scope.plugins.visualizators);
    };

    // Dashboards
    getDashboards();
    function getDashboards() {
      $http.get('api/v1/data/dashboards').success(function(res) {
        if (res.response == 'ok') {
          $scope.dashboards = res.data;
        }
      });
    }

    $scope.selectedDashboards = [];
    $scope.toggleAllDashboards = function() {
      if ($scope.selectedDashboards.length === $scope.dashboards.length) {
        // all items selected
        $scope.selectedDashboards = [];
      } else {
        // 0/some items selected
        $scope.selectedDashboards = _.clone($scope.dashboards);
      }
    };

    $scope.deleteDashboard = function(dashboard) {
      $http.delete('/api/v1/data/dashboard/' + dashboard._id).success(function() {
        var iDasboards = $scope.dashboards.indexOf(dashboard);
        if (iDasboards > -1) {
          $scope.dashboards.splice(iDasboards, 1);
          console.log('Deleted dashboard: >' + dashboard.name);
        }
      });
    };

    $scope.showDashboard = function(dashboard) {
      // TODO: show the dashboard
      console.log('Showing dashboard: ' + dashboard.name);
    };

    $scope.deleteAllDashboards = function() {
      // TODO: delete all the dashboard
      var temp = _.clone($scope.selectedDashboards);
      _.each(temp, function(dashboard) {
        $scope.deleteDashboard(dashboard);
      });
      temp = null;
    };

    $scope.toggleDashboard = function(dashboard) {
      var index = $scope.selectedDashboards.indexOf(dashboard);
      if (index > -1) {
        $scope.selectedDashboards.splice(index, 1);
      } else {
        $scope.selectedDashboards.push(dashboard);
      }
    };


    // Visualizations
    getVisualizations();
    function getVisualizations() {
      $http.get('api/v1/data/visualizations').success(function(res) {
        if (res.response == 'ok') {
          $scope.visualizations = res.data;
        }
      });
    }

    $scope.selectedVisualizations = [];
    $scope.toggleAllVisualizations = function() {
      if ($scope.selectedVisualizations.length === $scope.visualizations.length) {
        // all items selected
        $scope.selectedVisualizations = [];
      } else {
        // 0/some items selected
        $scope.selectedVisualizations = _.clone($scope.visualizations);
      }
    };

    $scope.deleteVisualization = function(visualization) {
      $http.delete('/api/v1/data/visualization/' + visualization._id).success(function() {
        var iVisualization = $scope.visualizations.indexOf(visualization);
        if (iVisualization > -1) {
          $scope.visualizations.splice(iVisualization, 1);
          console.log('Deleted visualization: >' + visualization.name);
        }
      });
    };

    $scope.deleteAllVisualizations = function() {
      // TODO: delete all the visualization
      var temp = _.clone($scope.selectedVisualizations);
      _.each(temp, function(visualization) {
        $scope.deleteVisualization(visualization);
      });
      temp = null;
    };

    $scope.toggleVisualization = function(visualization) {
      var index = $scope.selectedVisualizations.indexOf(visualization);
      if (index > -1) {
        $scope.selectedVisualizations.splice(index, 1);
      } else {
        $scope.selectedVisualizations.push(visualization);
      }
    };

    $scope.getIcon = function(visualization) {
      return $scope.visualizatorService.getIcon(visualization.graphOptions.chart)
    }

    
  })
  .controller('SettingsTabDataSourcesController', function ($scope, queryService, socket, $cacheFactory, $injector, Plugin, Settings) {
    getPlugins();

    // Getting the visualizator and the acquisitor
    function getPlugins() {
      if ($cacheFactory.info().Plugin.size === 0) {
        var visualizatorPluginPromise = Plugin.broker('getVisualizator');
        visualizatorPluginPromise.then(function(visualizatorPlugin) {
          $scope.visualizatorService = $injector.get(visualizatorPlugin + "Visualizator");
          $scope.acquisitorService = $injector.get(Plugin.getAcquisitor() + "Acquisitor");
          // Getting the datasources
          getDatasources(Plugin.getAcquisitor());

        });
      } else {
        var cache = $cacheFactory.get("Plugin");
        if (cache.get("plugins")) {
          $scope.visualizatorService = $injector.get(Plugin.getVisualizator() + "Visualizator");
          $scope.acquisitorService = $injector.get(Plugin.getAcquisitor() + "Acquisitor");
          // Getting the datasources
          getDatasources(Plugin.getAcquisitor());
        }
      }
    }

    function getDatasources(acquisitor) {
      if ($cacheFactory.info().Settings.size === 0) {
        var settingsPromise = Settings.broker('datasource', 'getDatasources', {acquisitor: acquisitor});
        settingsPromise.then(function(datasources) {
          $scope.datasources = datasources;
        });
      } else {
        var cache = $cacheFactory.get("Settings");
        if (cache.get("settings")) {
          $scope.datasources = Settings.getDatasources('datasource');
        }
      }
    }

    // TODO: Improve this "Pyramid Of Doom"
    $scope.updateDatasources = function() {
      queryService.createTask(
        'query',
        'setting',
        {action: "updateDatasources"},
        function(data) {
          if (data.response !== 'error') {
            createSocket("query-" + data.data.job, function(data) {
              console.log("Task %d event received", data.job);
              queryService.getSetting(
                data.job,
                function(taskData) {
                  if (taskData.response !== 'error') {
                    // This method must parse the datasources
                    // Every acquisitor has their own parser
                    var dataSources = $scope.acquisitorService.parse({
                      action: "updateDatasources",
                      data: taskData.data
                    });
                    // If exists datasources, we get all fields
                    if (dataSources.length > 0) {
                      queryService.createTask(
                        'query',
                        'setting',
                        {action: "fieldsFromDatasources"},
                        function(dataChildTask) {
                          if (dataChildTask.response !== 'error') {
                            createSocket("query-" + dataChildTask.data.job, function(dataChildSocket) {
                              console.log("Task %d event received", dataChildSocket.job);
                              queryService.getSetting(
                                dataChildSocket.job,
                                function(taskChildData) {
                                  if (taskChildData.response !== 'error') {
                                    // This method must parse the fields
                                    // Every acquisitor has their own parser
                                    var fields = $scope.acquisitorService.parse({
                                      action: "fieldsFromDatasources",
                                      data: taskChildData.data,
                                      extra: dataSources
                                    });

                                    var mix = $scope.acquisitorService.parse({
                                      action: "composeDatasourcesInfo",
                                      data: fields,
                                      extra: dataSources
                                    });

                                    queryService.updateSetting(
                                      'datasource',
                                      mix,
                                      function(datasourcesData) {
                                        $scope.datasources = datasourcesData;
                                        getPlugins();
                                      }
                                    );
                                  }
                                }
                              );
                            });
                          }
                        }
                      );
                    }
                  }
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

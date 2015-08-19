'use strict';

angular.module('thedashboardApp')
  .controller('SettingsDashboardCtrl', function ($scope) {
    
  })
  .controller('SettingsTabController', function ($scope, $cacheFactory, Plugin) {
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
          }
        });
      } else {
        var cache = $cacheFactory.get("Plugin");
        if (cache.get("plugins")) {
          $scope.plugins.acquisitors = Plugin.getAcquisitorPlugins();
          $scope.plugins.acquisitorActive = Plugin.getAcquisitor();
          $scope.plugins.visualizators = Plugin.getVisualizatorPlugins();
          $scope.plugins.visualizatorActive = Plugin.getVisualizator();
        }
      }
    }

    $scope.acquisitorSelectChange = function() {
      console.log($scope.plugins.acquisitors);
    }

    $scope.visulizatorSelectChange = function() {
      console.log($scope.plugins.visualizators);
    }



    // Dashboards
    $scope.dashboards = [
      {
        _id: "a000000000000001",
        name: 'Dashboard one',
        visualizatorPlugin: 'Visualizator Plugin one',
        acquisitorPlugin: 'Acquisitor Plugin one',
        visualizations: [{name: 'Visualization one'}, {name: 'Visualization two'}, {name: 'Visualization three'}],
        matrix: [],
        time: new Date()
      },
      {
        _id: "a000000000000002",
        name: 'Dashboard two',
        visualizatorPlugin: 'Visualizator Plugin two',
        acquisitorPlugin: 'Acquisitor Plugin two',
        visualizations: [],
        matrix: [],
        time: new Date()
      },
      {
        _id: "a000000000000003",
        name: 'Dashboard three',
        visualizatorPlugin: 'Visualizator Plugin three',
        acquisitorPlugin: 'Acquisitor Plugin three',
        visualizations: [{name: 'Visualization one'}, {name: 'Visualization two'}, {name: 'Visualization three'}],
        matrix: [],
        time: new Date()
      }
    ];

    $scope.selectedDashboards = [];
    $scope.toggleAllDashboards = function() {
      if ($scope.selectedDashboards.length === $scope.dashboards.length) {
        // all items selected
        $scope.selectedDashboards = [];
      } else {
        // 0/some items selected
        $scope.selectedDashboards = $scope.dashboards;
      }
    }

    $scope.deleteDashboard = function(dashboard) {
      // TODO: delete the dashboard
      var iDasboards = $scope.dashboards.indexOf(dashboard);
      if (iDasboards > -1) {
        $scope.dashboards.splice(iDasboards, 1);
        console.log('Deleted dashboard: >' + dashboard.name);
      }
    }

    $scope.showDashboard = function(dashboard) {
      // TODO: show the dashboard
      console.log('Showing dashboard: ' + dashboard.name);
    }

    $scope.deleteAllDashboards = function() {
      // TODO: delete all the dashboard
      var temp = _.clone($scope.selectedDashboards);
      _.each(temp, function(dashboard) {
        $scope.deleteDashboard(dashboard);
      });
      temp = null;
    }

    $scope.toggleDashboard = function(dashboard) {
      var index = $scope.selectedDashboards.indexOf(dashboard);
      if (index > -1) {
        $scope.selectedDashboards.splice(index, 1);
      } else {
        $scope.selectedDashboards.push(dashboard);
      }
    }


    // Visualizations
    $scope.visualizations = [
      {
        _id: "b000000000000001",
        name: 'Visualization one',
        visualizatorPlugin: 'Visualizator Plugin one',
        acquisitorPlugin: 'Acquisitor Plugin one',
        query: {},
        graphOptions: {}
      },
      {
        _id: "b000000000000002",
        name: 'Visualization two',
        visualizatorPlugin: 'Visualizator Plugin two',
        acquisitorPlugin: 'Acquisitor Plugin two',
        query: {},
        graphOptions: {}
      },
      {
        _id: "b000000000000003",
        name: 'Visualization three',
        visualizatorPlugin: 'Visualizator Plugin three',
        acquisitorPlugin: 'Acquisitor Plugin three',
        query: {},
        graphOptions: {}
      }
    ];

    $scope.selectedVisualizations = [];
    $scope.toggleAllVisualizations = function() {
      if ($scope.selectedVisualizations.length === $scope.visualizations.length) {
        // all items selected
        $scope.selectedVisualizations = [];
      } else {
        // 0/some items selected
        $scope.selectedVisualizations = $scope.visualizations;
      }
    }

    $scope.deleteVisualization = function(visualization) {
      // TODO: delete the visualization
      var iDasboards = $scope.visualizations.indexOf(visualization);
      if (iDasboards > -1) {
        $scope.visualizations.splice(iDasboards, 1);
        console.log('Deleted visualization: >' + visualization.name);
      }
    }

    $scope.showVisualization = function(visualization) {
      // TODO: show the visualization
      console.log('Showing visualization: ' + visualization.name);
    }

    $scope.editVisualization = function(visualization) {
      // TODO: edit the visualization
      console.log('Editing visualization: ' + visualization.name);
    }

    $scope.deleteAllVisualizations = function() {
      // TODO: delete all the visualization
      var temp = _.clone($scope.selectedVisualizations);
      _.each(temp, function(visualization) {
        $scope.deleteVisualization(visualization);
      });
      temp = null;
    }

    $scope.toggleVisualization = function(visualization) {
      var index = $scope.selectedVisualizations.indexOf(visualization);
      if (index > -1) {
        $scope.selectedVisualizations.splice(index, 1);
      } else {
        $scope.selectedVisualizations.push(visualization);
      }
    }

    // Datasources
    $scope.datasources = [
      {
        _id: "b000000000000001",
        name: 't_1',
        engine: 'MySQL',
        fields: [
          {
            name: 'metric',
            type: 'float'
          },
          {
            name: 'quantity',
            type: 'float'
          },
          {
            name: 'type',
            type: 'string'
          },
          {
            name: 'ts',
            type: 'date'
          }
        ]
      },
      {
        _id: "b000000000000002",
        name: 't_2',
        engine: 'MySQL',
        fields: [
          {
            name: 'metric',
            type: 'float'
          },
          {
            name: 'quantity',
            type: 'float'
          },
          {
            name: 'type',
            type: 'string'
          },
          {
            name: 'ts',
            type: 'date'
          }
        ]
      }
    ];
  });

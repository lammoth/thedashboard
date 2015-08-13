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

    $scope.selectedItems = [];
    $scope.toggleAll = function() {
      if ($scope.selectedItems.length === $scope.dashboards.length) {
        // all items selected
        $scope.selectedItems = [];
      } else {
        // 0/some items selected
        $scope.selectedItems = $scope.dashboards;
      }
    }

    $scope.delete = function(dashboard) {
      // TODO: delete the dashboard
      var iDasboards = $scope.dashboards.indexOf(dashboard);
      if (iDasboards > -1) {
        $scope.dashboards.splice(iDasboards, 1);
        console.log('Deleted dashboard: >' + dashboard.name);
      }
    }

    $scope.show = function(dashboard) {
      // TODO: show the dashboard
      console.log('Showing dashboard: ' + dashboard.name);
    }

    $scope.deleteAll = function() {
      // TODO: delete all the dashboard
      var temp = _.clone($scope.selectedItems);
      _.each(temp, function(dashboard) {
        $scope.delete(dashboard);
      });
      temp = null;
    }

    $scope.toggleItem = function(dashboard) {
      var index = $scope.selectedItems.indexOf(dashboard);
      if (index > -1) {
        $scope.selectedItems.splice(index, 1);
      } else {
        $scope.selectedItems.push(dashboard);
      }
    }

  });

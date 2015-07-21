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
  });

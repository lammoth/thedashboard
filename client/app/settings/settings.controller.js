'use strict';

angular.module('thedashboardApp')
  .controller('SettingsDashboardCtrl', function ($scope, $cacheFactory, Plugin) {
    $scope.plugins = {};

    if ($cacheFactory.info().Plugin.size === 0) {
      var pluginsAcquisitorPromise = Plugin.broker('getAcquisitorPlugins');

      pluginsAcquisitorPromise.then(function(acquisitorPlugins) {
        if (acquisitorPlugins) {      
          $scope.plugins.acquisitors = acquisitorPlugins;
          $scope.plugins.acquisitorActive = Plugin.getAcquisitor();
        }
      });
    } else {
      var cache = $cacheFactory.get("Plugin");
      if (cache.get("plugins")) {
        $scope.plugins.acquisitors = Plugin.getAcquisitorPlugins();
        $scope.plugins.acquisitorActive = Plugin.getAcquisitor();
      }
    }

    $scope.acquisitorSelectChange = function() {
      console.log($scope.plugins.acquisitors);
    }

  });

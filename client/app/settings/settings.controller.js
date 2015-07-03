'use strict';

angular.module('thedashboardApp')
  .controller('SettingsDashboardCtrl', function ($scope, Plugin) {
    $scope.plugins = {};

    var pluginsAcquisitorPromise = Plugin.broker('getAcquisitorPlugins');
    var pluginAcquisitorActivePromise = Plugin.broker('getAcquisitor');

    pluginsAcquisitorPromise.then(function(acquisitorPlugins) {
      if (acquisitorPlugins) {      
        $scope.plugins.acquisitors = acquisitorPlugins;
        $scope.plugins.acquisitorActive = Plugin.getAcquisitor();
      }
    });

    $scope.acquisitorSelectChange = function() {
      console.log($scope.plugins.acquisitors);
    }

  });

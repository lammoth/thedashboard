'use strict';

angular.module('thedashboardApp')
  .controller('VisualizationCtrl', function ($scope, $stateParams, Plugin) {
    console.log($stateParams);
    // var acquisitorPlugin = null;
    // var acquisitorPluginPromise = Plugin.broker('getAcquisitor');
    // acquisitorPluginPromise.then(function(result) {
    //   acquisitorPlugin = result;
    //   console.log(acquisitorPlugin);
    // });
  });

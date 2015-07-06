'use strict';

angular.module('thedashboardApp')
  .controller('VisualizationCtrl', function ($scope, $rootScope, Plugin) {
    $rootScope.sectionName = "Visualizations";
    $rootScope.sectionDescription = "Create a new visulaization";
    // var acquisitorPlugin = null;
    // var acquisitorPluginPromise = Plugin.broker('getAcquisitor');
    // acquisitorPluginPromise.then(function(result) {
    //   acquisitorPlugin = result;
    //   console.log(acquisitorPlugin);
    // });
  })
  .controller('VisualizationEditorCtrl', function ($scope, $rootScope, $stateParams, Plugin) {
    console.log($stateParams);
    $rootScope.sectionName = "Visualizations";
    $rootScope.sectionDescription = "Create a new visulaization in the editor area";

    var chart = c3.generate({
      bindto: '#visualization-chart-editor',
      data: {
        columns: [
          ['data1', 30, 200, 100, 400, 150, 250],
          ['data2', 50, 20, 10, 40, 15, 25]
        ],
        type: 'bar'
      }
    });
  });

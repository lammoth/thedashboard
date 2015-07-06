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
  .controller('VisualizationEditorCtrl', function ($scope, $rootScope, $stateParams, Plugin, Header, $timeout, c3Visualizator) {
    // console.log($stateParams);
    // Header.sectionTitle = "Visualizations";
    // Header.sectionDescription = "Create a new visulaization in the editor area";

    c3Visualizator.data();
    c3Visualizator.bind('#visualization-chart-editor');
    var chart = c3Visualizator.compile();
    
    $timeout(function() {
      chart.unload({
        ids: ['data2']
      });
      $timeout(function() {
        chart.transform('line');
      }, 2000);
    }, 1000);
  })
  .controller('VisualizationEditorTabController', function ($scope, $rootScope, $stateParams, Plugin, Header) {
    console.log($stateParams);
    // Header.sectionTitle = "Visualizations";
    // Header.sectionDescription = "Create a new visulaization in the editor area";
  });

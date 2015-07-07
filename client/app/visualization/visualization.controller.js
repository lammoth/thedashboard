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
  .controller('VisualizationEditorCtrl', function ($scope, $stateParams, Plugin, $injector, $timeout) {
    // console.log($stateParams);
    // Header.sectionTitle = "Visualizations";
    // Header.sectionDescription = "Create a new visulaization in the editor area";
    $('#visualization-chart-editor').width("100%");
    var c3Visualizator = $injector.get('c3Visualizator');
    c3Visualizator.data();
    c3Visualizator.type($stateParams.graph);
    c3Visualizator.bind('#visualization-chart-editor');
    // console.log($('#wrapper').height());
    // // $('#visualization-chart-editor').css({"max-height": '600' + 'px;'});
    var chart = c3Visualizator.compile();
    // $timeout(function() {
    //   chart.unload({
    //     ids: ['data2']
    //   });
    //   $timeout(function() {
    //     chart.transform('line');
    //   }, 2000);
    // }, 1000);
    $timeout(function() {
      c3Visualizator.transform(chart, 'line');
    }, 2000);
  })
  .controller('VisualizationEditorTabController', function ($scope, $rootScope, $stateParams, Plugin, Header) {
    console.log($stateParams);
    // Header.sectionTitle = "Visualizations";
    // Header.sectionDescription = "Create a new visulaization in the editor area";
  });

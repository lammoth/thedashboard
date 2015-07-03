'use strict';

angular.module('thedashboardApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.visualization', {
        url: 'visualization',
        views: {
          "section-view": {
            templateUrl: 'app/visualization/visualization.html',
            // controller: 'VisualizationCtrl'
          }
        }
      })
      .state('main.visualization.new', {
        url: '/new',
        views: {
          "visualization-child": {
            templateUrl: 'app/visualization/visualization-new.html',
            controller: 'VisualizationCtrl'
          }  
        }
      })
      .state('main.visualization.editor', {
        url: '/editor/:graph',
        views: {
          "visualization-child": {
            templateUrl: 'app/visualization/visualization-editor.html',
            controller: 'VisualizationCtrl'
          }  
        }
      });
  });
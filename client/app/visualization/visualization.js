'use strict';

angular.module('thedashboardApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.visualization', {
        url: 'visualization',
        views: {
          "section-view": {
            templateUrl: 'app/visualization/visualization.html',
            controller: 'VisualizationCtrl'
          }
        },
        ncyBreadcrumb: {
          label: 'Visualizations'
        }
      })
      .state('main.visualization.new', {
        url: '/new',
        views: {
          "visualization-child": {
            templateUrl: 'app/visualization/visualization-new.html',
            controller: 'VisualizationNewCtrl',
          }  
        },
        ncyBreadcrumb: {
          label: 'Create'
        }
      })
      .state('main.visualization.open', {
        url: '/open',
        views: {
          "visualization-child": {
            templateUrl: 'app/visualization/visualization-open.html',
            controller: 'VisualizationOpenCtrl',
          }  
        },
        ncyBreadcrumb: {
          label: 'Open'
        }
      })
      .state('main.visualization.editor', {
        url: '/editor/:chart/:id',
        views: {
          "visualization-child": {
            templateUrl: 'app/visualization/visualization-editor.html',
            controller: 'VisualizationEditorCtrl',
          },
        },
        ncyBreadcrumb: {
          label: 'Editor'
        }
      });
  });
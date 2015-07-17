'use strict';

angular.module('thedashboardApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        abstract: true,
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        ncyBreadcrumb: {
          label: 'Home'
        }
      })
      .state('main.dashboard', {
        url: '',
        views: {
          "section-view": {
            templateUrl: 'app/main/grid.html',
            controller: 'MainCtrl'
          }
        },
        ncyBreadcrumb: {
          label: 'Dashboards'
        }
      });
  });
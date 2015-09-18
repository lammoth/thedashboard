'use strict';

angular.module('thedashboardApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        abstract: true,
        templateUrl: 'app/main/main.html',
        // controller: 'MainCtrl',
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
      })
      .state('main.dashboard-create', {
        url: 'dashboard/create',
        views: {
          "section-view": {
            templateUrl: 'app/main/dashboard-create.html',
            controller: 'DashboardCreateCtrl'
          }
        },
        ncyBreadcrumb: {
          label: 'Create'
        }
      })
      .state('main.dashboard-open', {
        url: 'dashboard/open',
        views: {
          "section-view": {
            templateUrl: 'app/main/dashboard-open.html',
            controller: 'DashboardOpenCtrl'
          }
        },
        ncyBreadcrumb: {
          label: 'Open'
        }
      });
  });
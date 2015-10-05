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
      .state('main.home', {
        url: '',
        views: {
          "section-view": {
            templateUrl: 'app/main/grid.html',
            controller: 'MainCtrl'
          }
        },
        ncyBreadcrumb: {
          label: 'Home'
        }
      })
      .state('main.dashboard', {
        url: 'dashboard',
        views: {
          "section-view": {
            templateUrl: 'app/main/dashboard.html',
            controller: 'DashboardCtrl',
          }
        },
        ncyBreadcrumb: {
          label: 'Dashboards'
        }
      })
      .state('main.dashboard.create', {
        url: '/create',
        views: {
          "dashboard-child": {
            templateUrl: 'app/main/dashboard-create.html',
            controller: 'DashboardCreateCtrl'
          }
        },
        ncyBreadcrumb: {
          label: 'Create'
        }
      })
      .state('main.dashboard.open', {
        url: '/open/:id',
        views: {
          "dashboard-child": {
            templateUrl: 'app/main/dashboard-open.html',
            controller: 'DashboardOpenCtrl'
          }
        },
        ncyBreadcrumb: {
          label: 'Open'
        }
      });
  });
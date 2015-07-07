'use strict';

angular.module('thedashboardApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.settings', {
        url: 'dashboard/settings',
        views: {
          "section-view": {
            templateUrl: 'app/settings/settings.html',
            controller: 'SettingsDashboardCtrl'
          }
        },
        ncyBreadcrumb: {
          label: 'Settings'
        }
      });
  });
'use strict';

angular.module('thedashboardApp')
  .controller('DashboardOpenCtrl', function ($scope, $rootScope, Settings) {
    $rootScope.sectionName = "Dashboards";
    $rootScope.sectionDescription = "Open a dashboard";
    var settingsPromise = Settings.broker('dashboards', 'getData', {});
    settingsPromise.then(function(dashboards) {
      $scope.dashboards = dashboards;
    });
  })
  .controller('DashboardCreateCtrl', function ($scope, $rootScope, Settings) {
    $rootScope.sectionName = "Dashboards";
    $rootScope.sectionDescription = "Create a dashboard";
  });

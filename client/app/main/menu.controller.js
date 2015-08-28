'use strict';

angular.module('thedashboardApp')
  .controller('MenuController', function ($scope, Auth, $location) {
    // Initialize metisMenu plugin to sidebar menu
    $('#side-menu').metisMenu();

    // Set minimal height of #wrapper to fit the window
    fixWrapperHeight();


    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };
  });

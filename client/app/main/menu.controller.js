'use strict';

angular.module('thedashboardApp')
  .controller('MenuController', function ($scope) {
    // Initialize metisMenu plugin to sidebar menu
    $('#side-menu').metisMenu();

    // Set minimal height of #wrapper to fit the window
    fixWrapperHeight();
  });

'use strict';

angular.module('thedashboardApp')
  .controller('HeaderController', function ($scope, TimeFilter) {
  	TimeFilter.registerObserver('quick', updateQuick);
    function updateQuick() {
      $scope.quick = TimeFilter.quick;
      console.log('From:', $scope.quick.from());
      console.log('To  :', $scope.quick.to());
      // TODO: update charts with this from and to
    }

    $scope.mode = 'quick';
    $scope.setMode = function(mode) {
      $scope.mode = mode;
    }
    $scope.toggleTimeFilter = function() {
    	TimeFilter.toogle('visibility');
    }
  });
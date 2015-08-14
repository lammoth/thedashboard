'use strict';

angular.module('thedashboardApp')
  .controller('TimeFilterController', function ($scope, TimeFilter) {
    TimeFilter.registerObserver('visibility', updateVisibility);
    $scope.isVisible = false;
    function updateVisibility() {
      $scope.isVisible = TimeFilter.isVisible;
    }
    $scope.quickLists = TimeFilter.quicks;
    console.log($scope.quickLists[0][0].from());
    TimeFilter.setQuick('quick', $scope.quickLists[0][0]);

    $scope.mode = 'quick';
    $scope.setMode = function(mode) {
      $scope.mode = mode;
    }

    $scope.setQuick = function(quick) {
      TimeFilter.setQuick('quick', quick);
      TimeFilter.toogle('visibility');
    }

  });
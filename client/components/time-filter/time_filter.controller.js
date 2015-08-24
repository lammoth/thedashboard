'use strict';

angular.module('thedashboardApp')
  .controller('TimeFilterController', function ($scope, TimeFilter) {
    TimeFilter.registerObserver('visibility', updateVisibility);
    TimeFilter.registerObserver('quick', updateQuick);
    
    $scope.isVisible = false;
    function updateVisibility() {
      $scope.isVisible = TimeFilter.isVisible;
    }
    function updateQuick() {
      $scope.quick = TimeFilter.quick;
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
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
    TimeFilter.setQuick('quick', $scope.quickLists[0][0]);

    $scope.mode = 'quick';
    $scope.setMode = function(mode) {
      $scope.mode = mode;
    }

    $scope.setQuick = function(quick) {
      TimeFilter.setQuick('quick', quick);
      TimeFilter.toogle('visibility');
    }

    $scope.selectAbsoluteDates = function() {
      TimeFilter.setAbsolute($scope.absoluteDate);
      TimeFilter.toogle('visibility');
    }

    $scope.now = new Date();
    $scope.absoluteDate = {
      from: $scope.now,
      to: $scope.now
    };

    $scope.format = 'YYYY-MM-DD HH:mm:ss.SSS';

    $scope.setToNow = function() {
      $scope.absoluteDate.to = new Date();
    };

  });
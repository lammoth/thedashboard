'use strict';

angular.module('thedashboardApp')
  .controller('HeaderController', function ($scope, TimeFilter, queryService) {
  	TimeFilter.registerObserver('quick', updateQuick);
    TimeFilter.registerObserver('absolute', updateAbsolute);
    function updateQuick() {
      $scope.quick = TimeFilter.quick;
      console.log('From:', TimeFilter.from());
      console.log('To  :', TimeFilter.to());
      // TODO: update charts with this from and to
      $scope.timeFilterText = $scope.quick.name;
    }

    function updateAbsolute() {
      console.log('From:', TimeFilter.from());
      console.log('To  :', TimeFilter.to());
      // TODO: update charts with this from and to
      var humanFormat = 'MMMM Do YYYY, hh:mm:ss'
      $scope.timeFilterText = moment(TimeFilter.from()).format(humanFormat) + ' to ' + moment(TimeFilter.to()).format(humanFormat);
    }

    $scope.mode = 'quick';
    $scope.setMode = function(mode) {
      $scope.mode = mode;
    }
    $scope.toggleTimeFilter = function() {
    	TimeFilter.toogle('visibility');
    }
  });
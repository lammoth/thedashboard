'use strict';

angular.module('thedashboardApp')
  .directive('c3', function () {
    return {
      templateUrl: 'components/plugin/visualizator/c3/c3.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
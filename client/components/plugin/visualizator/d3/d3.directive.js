'use strict';

angular.module('thedashboardApp')
  .directive('d3', function () {
    return {
      templateUrl: 'components/plugin/visualizator/d3/d3.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
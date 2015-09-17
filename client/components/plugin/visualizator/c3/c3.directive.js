'use strict';

angular.module('thedashboardApp')
  .directive('visualizatorGraphicDataBarC3', function () {
    return {
      restrict: 'E',
      scope: false,
      link: function (scope, element, attrs) {
        scope.form.graph = {};

        scope.addYData = function() {
          if (!scope.form.graph.y) {
            scope.form.graph.y = [];
          }
          scope.form.graph.y.push({});
        };

        scope.addXData = function() {
          if (!scope.form.graph.x) {
            scope.form.graph.x = [];
          }
          scope.form.graph.x.push({});
        };
      }
    };
  })
  .directive('visualizatorGraphicOptionsBarC3', function () {
    return {
      restrict: 'E',
      scope: false,
      link: function (scope, element, attrs) {
        scope.changeGraphicOptions = function(options, model) {
          scope.$parent.$parent.visualizatorService.option(options, model, scope.chart); 
          if (options.restart) {
            // TODO: Improve this reference to the grandfather making a service or something similar
            scope.chart = scope.$parent.$parent.visualizatorService.render();
          }
        };
      }
    };
  });
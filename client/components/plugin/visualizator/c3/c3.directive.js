'use strict';

angular.module('thedashboardApp')
  .directive('visualizatorGraphicDataBarC3', function () {
    return {
      restrict: 'E',
      scope: false,
      link: function (scope, element, attrs) {
        
        scope.$on('currentVisualizationSetted', function(event, visualization) {
          if (visualization) {
            // Setting X Axis
            scope.form.graph = visualization.json.graph;
          }
        });

        // Emits a signal in order to inform to the controller about their availability
        scope.$emit('visualizatorDirectiveReady');
      }
    };
  })
  .directive('visualizatorGraphicOptionsBarC3', function (Plugin) {
    return {
      restrict: 'E',
      scope: false,
      link: function (scope, element, attrs) {
        scope.$on('currentVisualizationSetted', function(event, visualization) {
          // scope.form = visualization.json;
        });

        scope.changeGraphicOptions = function(options, model) {
          scope.visualizatorService.option(options, model, scope.chart); 
          if (options.restart) {
            scope.chart = scope.visualizatorService.render();
          }
        };

        // Emits a signal in order to inform to the controller about their availability
        scope.$emit('visualizatorDirectiveReady');
      }
    };
  });
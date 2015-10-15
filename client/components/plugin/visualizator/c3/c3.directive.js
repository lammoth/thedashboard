'use strict';

angular.module('thedashboardApp')
  .directive('visualizatorGraphicDataBarC3', function () {
    return {
      restrict: 'E',
      scope: false,
      link: function (scope, element, attrs) {
        // scope.form.graph = {};
        scope.$on('currentVisualizationSetted', function(event, visualization) {
          // scope.form.graph = visualization.json.graph;
        });

        // TODO: This behaviour will be needed when graph object will be an array
        // scope.addYData = function() {
        //   if (!scope.form.graph.y) {
        //     scope.form.graph.y = [];
        //   }
        //   scope.form.graph.y.push({});
        // };

        // scope.addXData = function() {
        //   if (!scope.form.graph.x) {
        //     scope.form.graph.x = [];
        //   }
        //   scope.form.graph.x.push({});
        // };

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
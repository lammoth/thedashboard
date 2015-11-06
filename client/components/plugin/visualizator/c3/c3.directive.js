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
          if (visualization) {
            // Setting graphic options
            scope.graphicOptions = visualization.graphicOptions;
          }
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
  })
  .directive('visualizatorGraphicDataAreaC3', function () {
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
  .directive('visualizatorGraphicOptionsAreaC3', function (Plugin) {
    return {
      restrict: 'E',
      scope: false,
      link: function (scope, element, attrs) {
        scope.$on('currentVisualizationSetted', function(event, visualization) {
          if (visualization) {
            // Setting graphic options
            scope.graphicOptions = visualization.graphicOptions;
          }
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
  })
  .directive('visualizatorGraphicDataPieC3', function () {
    return {
      restrict: 'E',
      scope: false,
      link: function (scope, element, attrs) {
        // Emits a signal in order to inform to the controller about their availability
        scope.$emit('visualizatorDirectiveReady');
      }
    };
  })
  .directive('visualizatorGraphicOptionsPieC3', function (Plugin) {
    return {
      restrict: 'E',
      scope: false,
      link: function (scope, element, attrs) {
        scope.$on('currentVisualizationSetted', function(event, visualization) {
          if (visualization) {
            // Setting graphic options
            scope.graphicOptions = visualization.graphicOptions;
          }
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
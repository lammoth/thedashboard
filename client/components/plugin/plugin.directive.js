'use strict';

angular.module('thedashboardApp')
  .directive('acquisitorGraphicOptions', function ($compile, $cacheFactory, $templateRequest, Plugin) {
    return {
      restrict: 'E',
      scope: false,
      link: function (scope, element, attrs) {
        // Request to get the acquisitor plugin active
        if ($cacheFactory.info().Plugin.size === 0) {
          var acquisitorPluginPromise = Plugin.broker('getAcquisitor');
          acquisitorPluginPromise.then(function(acquisitorPlugin) {
            var templateUrl = 'components/plugin/acquisitor/' + acquisitorPlugin + '/directives/acquisitor-graphic-options-' + attrs.chart + '.html';
            compileContent(templateUrl);
          });
        } else {
          var cache = $cacheFactory.get("Plugin");
          if (cache.get("plugins")) {
            var templateUrl = 'components/plugin/acquisitor/' + Plugin.getAcquisitor() + '/directives/acquisitor-graphic-options-' + attrs.chart + '.html';
            compileContent(templateUrl);
          }
        }

        function compileContent(url) {
          $templateRequest(url).then(function(html){
            element.append($compile(html)(scope));
            var childrenEl = element.children()[1]
            $compile(childrenEl)(scope);
          });
        }
      }
    };
  })
  .directive('visualizatorGraphicEditor', function ($compile, $cacheFactory, $templateRequest, Plugin) {
    return {
      restrict: 'E',
      scope: false,
      link: function (scope, element, attrs) {
        // Request to get the visualizator plugin active
        if ($cacheFactory.info().Plugin.size === 0) {
          var visualizatorPluginPromise = Plugin.broker('getVisualizator');
          visualizatorPluginPromise.then(function(visualizatorPlugin) {
            var templateUrl = 'components/plugin/visualizator/' + visualizatorPlugin + '/directives/visualizator-graphic-editor.html';
            compileContent(templateUrl);
          });
        } else {
          var cache = $cacheFactory.get("Plugin");
          if (cache.get("plugins")) {
            var templateUrl = 'components/plugin/visualizator/' + Plugin.getVisualizator() + '/directives/visualizator-graphic-editor.html';
            compileContent(templateUrl);
          }
        }

        function compileContent(url) {
          $templateRequest(url).then(function(html){
            element.append($compile(html)(scope));
            var childrenEl = element.children()[1]
            $compile(childrenEl)(scope);
          });
        }
      }
    };
  });
'use strict';

angular.module('thedashboardApp')
  .directive('acquisitorGraphicOptions', function ($compile, $cacheFactory, $templateRequest, Plugin) {
    return {
      restrict: 'E',
      link: function (scope, element, attrs) {
        // Request to get the acquisitor plugin active
        if ($cacheFactory.info().Plugin.size === 0) {
          var acquisitorPluginPromise = Plugin.broker('getAcquisitor');
          acquisitorPluginPromise.then(function(acquisitorPlugin) {
            var templateUrl = 'components/plugin/acquisitor/' + acquisitorPlugin + '/acquisitor-graphic-options.html';
            compileContent(templateUrl);
          });
        } else {
          var cache = $cacheFactory.get("Plugin");
          if (cache.get("plugins")) {
            var templateUrl = 'components/plugin/acquisitor/' + Plugin.getAcquisitor() + '/acquisitor-graphic-options.html';
            compileContent(templateUrl);
          }
        }

        function compileContent(url) {
          $templateRequest(url).then(function(html){
            element.append($compile(html)(scope));
            $compile(element.contents())(scope);
          });
        }
      }
    };
  });
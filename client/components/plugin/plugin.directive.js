'use strict';

angular.module('thedashboardApp')
  .directive('acquisitorGraphicOptions', function ($compile, $templateRequest, Plugin) {
    return {
      restrict: 'E',
      link: function (scope, element, attrs) {
        // Request to get the acquisitor plugin active 
        var acquisitorPluginPromise = Plugin.broker('getAcquisitor');
 
        acquisitorPluginPromise.then(function(acquisitorPlugin) {
          var templateUrl = 'components/plugin/' + acquisitorPlugin + '/acquisitor-graphic-options.html';

          $templateRequest(templateUrl).then(function(html){
            element.append($compile(html)(scope));
            $compile(element.contents())(scope);
          });

        });
      }
    };
  });
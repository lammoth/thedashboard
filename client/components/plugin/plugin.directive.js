'use strict';

angular.module('thedashboardApp')
  .directive('acquisitorGraphicOptions', function (Plugin) {
      return {
        templateUrl: function() {
          var acquisitorPlugin = null;
          var acquisitorPluginPromise = Plugin.broker('getAcquisitor');
          acquisitorPluginPromise.then(function(acquisitorPlugin) {
            console.log(acquisitorPlugin);
            return 'components/plugin/' + acquisitorPlugin + '/acquisitor-graphic-options.html';
          });
        },
        restrict: 'EA',
        link: function (scope, element, attrs) {
        }
      };
    
  });
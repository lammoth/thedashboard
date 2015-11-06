'use strict';

angular.module('thedashboardApp')
  .service('VisualizationService', function VisualizatorService($rootScope, $q, Settings) {
    return {
      loadVisualization: function(id) {
        var deferred = $q.defer();
        var settingsPromise = Settings.broker('visualizations', 'getData', {_id: id});
        settingsPromise.then(function(visualization) {
          deferred.resolve(visualization);
        });
        return deferred.promise;
      }
    }
  });

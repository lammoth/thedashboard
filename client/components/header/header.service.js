'use strict';

angular.module('thedashboardApp')
  .service('Header', function ($rootScope) {
    return {
      sectionTitle: function(title) {
        $rootScope.sectionName = title;
      },
      sectionDescription: function(description) {
        $rootScope.sectionName = description;
      }
    };
  });

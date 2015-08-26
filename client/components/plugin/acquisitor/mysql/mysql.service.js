'use strict';

angular.module('thedashboardApp')
  .service('mysqlAcquisitor', function () {
    return {
      aggregationTypes: [
        {type: 'avg'},
        {type: 'count'},
        {type: 'first'},
        {type: 'last'},
        {type: 'max'},
        {type: 'min'},
        {type: 'sum'}
      ]
    };
  });

'use strict';

angular.module('thedashboardApp')
  .service('phoenixAcquisitor', function () {
    return {
      name: 'phoenix',
      
      aggregationTypes: [
        {type: 'avg'},
        {type: 'count'},
        {type: 'first'},
        {type: 'last'},
        {type: 'max'},
        {type: 'min'},
        {type: 'sum'}
      ],

      orderTypes: [
        'asc',
        'desc'
      ],

      parse: function(data) {
        switch(data.action) {
          case "updateDatasources":
            return data.data.rows;
            break;
          case "fieldsFromDatasources":
            return data.data;
            break;
          case "composeDatasourcesInfo":
            return mixData(data.extra, data.data);
            break;
          default:
            break;
        }
      }   
    };

    // Extract fields needed in order to create a
    // proper datasource schema
    function mixData(datasources, fields) {
      var dataSourcesData = [];
      _.each(fields, function(data) {
        data.acquisitor = 'phoenix';
      });
      return fields;
    }

  });

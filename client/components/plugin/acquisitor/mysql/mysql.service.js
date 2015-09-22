'use strict';

angular.module('thedashboardApp')
  .service('mysqlAcquisitor', function () {
    return {
      name: 'mysql',
      
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
              return extractDatasources(data.data.rows);
            break;
          case "fieldsFromDatasources":
              return data.data.rows;
            break;
          case "composeDatasourcesInfo":
            return mixData(data.extra, data.data);
            break;
          default:
            break;
        }
      }   
    };

    // Generates an array with the datasources availables
    function extractDatasources(data) {
      var result = [];
      _.forEach(data, function(data) {
        _.forEach(data, function(value, key) {
          result.push(value);
        });
      });
      return result;
    }

    // Extract fields needed in order to create a
    // proper datasource schema
    function mixData(datasources, fields) {
      var dataSourcesData = [];
      _.each(datasources, function(datasource) {
        var dataToInsert = {name: datasource, acquisitor: 'mysql', fields:[]};
        _.each(fields, function(field) {
          if (field.TABLE_NAME == datasource) {
            dataToInsert.fields.push(
              {
                name: field.COLUMN_NAME,
                type: field.DATA_TYPE
              }
            )
          }
        });
        dataSourcesData.push(dataToInsert);
      });
      return dataSourcesData;
    }

  });

'use strict';

angular.module('thedashboardApp')
  .service('mysqlAcquisitor', function () {
    return {
      parse: function(data) {
        var query = squel.select()
                  .from(data.datasource)
                  .field(data.y.aggregation.type + '(' + data.y.aggregation.field +')')
                  .field(data.x.aggregation.field)
                  .group("YEAR(" + data.x.aggregation.field + "), MONTH(" + data.x.aggregation.field + "), DAY(" + data.x.aggregation.field + "), HOUR(" + data.x.aggregation.field + "), MINUTE(" + data.x.aggregation.field + "), SECOND(" + data.x.aggregation.field + ")");
        return query.toString();
      },
    };
  });

'use strict';

angular.module('thedashboardApp')
  .directive('acquisitorOperationsBarMysql', function () {
    return {
      restrict: 'E',
      scope: false,
      link: function (scope, element, attrs) {

        scope.selectedFields = [];
        scope.groupFields = {fields: [], aggs: []};

        scope.updateFields = function(field) {
          if (!scope.form.fields[field.name]) {
            delete scope.form.fields[field.name];
            scope.selectedFields = _.filter(scope.selectedFields, function(f) {
              return ((f.name == field.name) ? false : true);
            });
            scope.groupFields.fields = scope.selectedFields;
          } else {
            scope.selectedFields.push(_.find(scope.fields, {'name': field.name}));
            scope.groupFields.fields.push(_.find(scope.fields, {'name': field.name}));
          }
        };

        scope.addAggregation = function() {
          if (!scope.form.aggregations) {
            scope.form.aggregations = [];
          }
          scope.form.aggregations.push({});
        };

        scope.updateGroupFields = function() {
          scope.groupFields.aggs = addAggToGroupFields();
        };

        function addAggToGroupFields() {
          var validAggs = [];

          _.forEach(scope.form.aggregations, function(agg, index) {
            if (agg.type && agg.field) {
              validAggs.push({
                name: "agg" + index,
                type: agg.field.type,
                scope: "aggregation"
              });
            }
          });

          return validAggs;
        }

        scope.addGroup = function() {
          if (!scope.form.groups) {
            scope.form.groups = [];
          }
          scope.form.groups.push({});
        };

        scope.addOrder = function() {
          if (!scope.form.orders) {
            scope.form.orders = [];
          }
          scope.form.orders.push({});
        };
      }
    };
  });
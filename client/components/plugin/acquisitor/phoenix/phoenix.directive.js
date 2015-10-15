'use strict';

angular.module('thedashboardApp')
  .directive('acquisitorOperationsBarPhoenix', function (Plugin) {
    var currentVisualization = null;
    return {
      restrict: 'E',
      scope: false,
      link: function (scope, element, attrs) {

        scope.selectedFields = [];
        scope.groupFields = {fields: [], aggs: []};

        scope.$on('currentVisualizationSetted', function(event, visualization) {
          if (visualization) {
            // scope.form = visualization.json;
          }
        });

        // This function is captured by the acquisitor directive but it's emitted by main editor view
        scope.updateFields = function(field) {
          if (!scope.form.fields[field.name]) {
            delete scope.form.fields[field.name];
            scope.selectedFields = _.filter(scope.selectedFields, function(f) {
              return ((f.name == field.name) ? false : true);
            });
            scope.groupFields.fields = scope.selectedFields;
          } else {
            // scope.selectedFields.push(_.find(scope.fields, {'name': field.name}));
            scope.groupFields.fields.push(_.find(scope.fields, {'name': field.name}));
          }
        };

        scope.addAggregation = function() {
          if (!scope.form.aggregations) {
            scope.form.aggregations = [];
          }
          scope.form.aggregations.push({});
        };

        scope.deleteElement = function(list, index) {
          list.splice(index, 1);
        }

        scope.updateGroupFields = function() {
          scope.groupFields.aggs = addAggToGroupFields();
        };

        function addAggToGroupFields() {
          var validAggs = [];

          _.forEach(scope.form.aggregations, function(agg, index) {
            if (agg.type && agg.field) {
              scope.form.aggregations[index].name = ((agg.name) ? agg.name : "agg" + index);
              validAggs.push({
                name: ((agg.name) ? agg.name : "agg" + index),
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

        // Emits a signal in order to inform to the controller about their availability
        scope.$emit('visualizatorDirectiveReady');
      }
    };
  });
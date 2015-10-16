'use strict';

angular.module('thedashboardApp')
  .directive('acquisitorOperationsBarPhoenix', function (Plugin) {
    var currentVisualization = null;
    return {
      restrict: 'E',
      scope: false,
      link: function (scope, element, attrs) {

        scope.selectedFields = [];
        scope.extraFields = [];

        scope.$on('currentVisualizationSetted', function(event, visualization) {
          if (visualization) {
            // Setting datsource
            scope.form.datasource = visualization.json.datasource;
            // Setting datasource fields
            scope.fields = visualization.json.datasource.fields;
            // Setting datasource fields selected
            scope.form.fields = visualization.json.fields;
            // Setting aggregations
            scope.form.aggregations = visualization.json.aggregations;
            // Updating fields
            scope.loadFields();
            // Updating extra-fields
            scope.updateExtraFields();
            // Setting groups
            scope.form.groups = visualization.json.groups;
            // Setting orders
            scope.form.orders = visualization.json.orders;
            // Setting limit
            scope.form.limit = visualization.json.limit;
          }
        });

        // This function sets the datasource's fields availables
        // It's called by the main view but must be here because impact 
        // in the directive's functions
        scope.selectFields = function(datasource) {
          scope.fields = datasource.fields;
        };

        // This function loads the selectedFiles variable
        scope.loadFields = function() {
          scope.selectedFields = [];
          _.forEach(scope.form.fields, function (value, field) {
            var richField = _.find(scope.fields, function(fieldRich) {
              return fieldRich.name === field;
            });
            scope.selectedFields.push(richField);
          });
        }

        // This function is captured by the acquisitor directive but it's emitted by main editor view
        // Check fields setted for the visualization and update the field lists
        scope.updateFields = function(field) {
          if (!scope.form.fields[field.name]) {
            delete scope.form.fields[field.name];
            scope.selectedFields = _.filter(scope.selectedFields, function(f) {
              return ((f.name == field.name) ? false : true);
            });
          } else {
            scope.selectedFields.push(_.find(scope.fields, {'name': field.name}));
          }
        };

        // This function is invoked when an aggregation is added
        scope.updateExtraFields = function() {
          scope.extraFields = addAggToExtraFields();
        };

        // This function walks through the aggregations available and returns the coincidences
        function addAggToExtraFields() {
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

        scope.addAggregation = function() {
          if (!scope.form.aggregations) {
            scope.form.aggregations = [];
          }
          scope.form.aggregations.push({});
        };

        scope.deleteElement = function(list, index) {
          list.splice(index, 1);
          // Check if aggregations fields are changed
          scope.updateExtraFields();
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
'use strict';

angular.module('thedashboardApp')
  .service('c3Visualizator', function () {
    var graph = {};

    return {
      type: function(type) {
        graph.data.type = type;
      },
      data: function(data) {
        graph.data = data;
      },
      bind: function(element) {
        graph.bindto = element;
      },
      render: function() {
        return c3.generate(graph);
      },
      transform: function(chart, to) {
        chart.transform('line');
      }
    };
  });

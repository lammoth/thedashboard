'use strict';

angular.module('thedashboardApp')
  .service('c3Visualizator', function ($http) {
    var graph = {};
    var result = null;
    return {
      type: function(type) {
        graph.data.type = type;
      },
      data: function(data) {
        // TODO: Make an API real request
        graph.data = data;
        // graph.data = {
        //   columns: [
        //     ['data1', 30, 200, 100, 400, 150, 250],
        //     ['data2', 50, 20, 10, 40, 15, 25],
        //     ['data3', 230, 40, 330, 120, 150, 250]
        //   ]
        // };
      },
      bind: function(element) {
        graph.bindto = element;
      },
      compile: function() {
        return c3.generate(graph);
      },
      transform: function(chart, to) {
        chart.transform('line');
      }
    };
  });

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
        console.log(graph.data);
        return c3.generate(graph);
      },
      option: function(option, chart) {
        switch(option.option) {
          case "transform":
            chart.transform(option.effect);
            break;
        }
      },
      transform: function(chart, to) {
        chart.transform(to);
      }
    };
  });

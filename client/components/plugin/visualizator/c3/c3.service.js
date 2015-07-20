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
      option: function(option, model, chart) {
        switch(option.option) {
          case "transform":
            this.transform(chart, model);
            break;
          case "zoom":
            this.zoom(chart, model);
            break;
        }
      },
      transform: function(chart, to) {
        chart.transform(to);
      },
      zoom: function(chart, option) {
        graph.zoom = {enabled: Boolean(parseInt(option))};
      }
    };
  });

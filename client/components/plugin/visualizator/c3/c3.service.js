'use strict';

angular.module('thedashboardApp')
  .service('c3Visualizator', function () {
    var graph = {};

    return {
      hasGraph: ((!_.isEmpty(graph)) ? graph : null),

      type: function(type) {
        graph.data.type = type;
      },
      data: function(data) {
        graph = data;
      },
      bind: function(element) {
        graph.bindto = element;
        graph.legend = {
          position: 'right'
        };
      },
      render: function() {
        console.log(graph);
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
      },
      getIcon: function(chartType) {
        switch(chartType) {
          case 'area':
            return 'fa fa-area-chart';
            break;
          case 'bar':
            return 'fa fa-bar-chart';
            break;
          case 'pie':
            return 'fa fa-pie-chart'
            break;
        }
      }
    };
  });

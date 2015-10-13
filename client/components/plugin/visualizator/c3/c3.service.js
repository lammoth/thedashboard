'use strict';

angular.module('thedashboardApp')
  .service('c3Visualizator', function () {
    var graph = {};

    return {
      name: 'c3',
      hasGraph: function() {
        return ((!_.isEmpty(graph)) ? graph : null);
      },
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
        return c3.generate(graph);
      },
      option: function(option, model, chart) {
        // TODO: Options only will be enabled when data property had been set
        switch(option.option) {
          case "transform":
            this.transform(chart, model);
            break;
          case "zoom":
            this.zoom(chart, model);
            break;
          case "stack":
            this.stack(model);
            break;
          case "grid":
            this.grid(model);
            break;
          case "rotate":
            this.rotate(model);
            break;
          case "rotateXText":
            this.rotateText(model, 'x');
            break;
        }
      },
      transform: function(chart, to) {
        chart.transform(to);
      },
      zoom: function(chart, option) {
        graph.zoom = {enabled: Boolean(parseInt(option))};
      },
      stack: function(option) {
        if (Boolean(parseInt(option))) {
          graph.data.groups = [graph.fields];
        } else {
          graph.data.groups = [];
        }
      },
      grid: function(option) {
        if (Boolean(parseInt(option))) {
          graph.grid = {
            x: {show: true},
            y: {show: true},
          }
        } else {
          graph.grid = {
            x: {show: false},
            y: {show: false},
          }
        }
      },
      rotate: function(option) {
        if (graph.axis) {
          if (Boolean(parseInt(option))) {
            graph.axis.rotated = true;
          } else {
            graph.axis.rotated = true;
          }
        } else {
          if (Boolean(parseInt(option))) {
            graph.grid = {
              rotated: true
            }
          } else {
            graph.grid = {
              rotated: false
            }
          }
        }
      },
      rotateText: function(option, axis) {
        if (axis == 'x') {
          if (graph.axis.x) {
            if (Boolean(parseInt(option))) {
              graph.axis.x.tick = {
                rotate: 75,
                multiline: false
              };
            } else {
              delete graph.axis.x.tick;
            }
          }
        }
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

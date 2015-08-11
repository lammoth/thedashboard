'use strict';

angular.module('thedashboardApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.gridsterOpts = {
      columns: 12, // the width of the grid, in columns
      pushing: true, // whether to push other items out of the way on move or resize
      floating: true, // whether to automatically float items up so they stack (you can temporarily disable if you are adding unsorted items with ng-repeat)
      swapping: false, // whether or not to have items of the same size switch places instead of pushing down if they are the same size
      width: 'auto', // can be an integer or 'auto'. 'auto' scales gridster to be the full width of its containing element
      colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
      rowHeight: 'match', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
      margins: [10, 10], // the pixel distance between each widget
      outerMargin: true, // whether margins apply to outer edges of the grid
      isMobile: false, // stacks the grid items if true
      mobileBreakPoint: 600, // if the screen is not wider that this, remove the grid layout and stack the items
      mobileModeEnabled: true, // whether or not to toggle mobile mode when screen width is less than mobileBreakPoint
      minColumns: 1, // the minimum columns the grid must have
      minRows: 2, // the minimum height of the grid, in rows
      maxRows: 100,
      defaultSizeX: 1, // the default width of a gridster item, if not specifed
      defaultSizeY: 1, // the default height of a gridster item, if not specified
      minSizeX: 1, // minimum column width of an item
      maxSizeX: null, // maximum column width of an item
      minSizeY: 1, // minumum row height of an item
      maxSizeY: null, // maximum row height of an item
      resizable: {
        enabled: true,
        handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],
        start: function(event, $element, widget) {}, // optional callback fired when resize is started,
        resize: function(event, $element, widget) {}, // optional callback fired when item is resized,
        stop: function(event, $element, widget) {
          resize(widget.id, $element[0].clientHeight);
        } // optional callback fired when item is finished resizing
      },
      draggable: {
        enabled: true, // whether dragging items is supported
        handle: '.my-class', // optional selector for resize handle
        start: function(event, $element, widget) {}, // optional callback fired when drag is started,
        drag: function(event, $element, widget) {}, // optional callback fired when item is moved,
        stop: function(event, $element, widget) {} // optional callback fired when item is finished dragging
      }
    };

    // IMPORTANT: Charts appears in the grid in the inverse order in which they should appear.
    $scope.standardItems = [
      { sizeX: 6, sizeY: 3, row: 0, col: 0 , id: "area"},
      { sizeX: 6, sizeY: 3, row: 0, col: 6 , id: "line"},
      { sizeX: 6, sizeY: 3, row: 1, col: 0 , id: "pie"},
      { sizeX: 6, sizeY: 3, row: 1, col: 6 , id: "bar"},
      { sizeX: 6, sizeY: 3, row: 2, col: 0 , id: "donut"},
      { sizeX: 6, sizeY: 3, row: 2, col: 6 , id: "gauge"},
      { sizeX: 12, sizeY: 3, row: 3, col: 0 , id: "scatter"}
    ];

    var charts = {};
    setTimeout(function(){
      charts.area = c3.generate({
        bindto: '#area',
        onresize: function(){resize('area')},
        data: {
          columns: [
            ['data1', 300, 350, 300, 0, 0, 0],
            ['data2', 130, 100, 140, 200, 150, 50]
          ],
          types: {
            data1: 'area',
            data2: 'area-spline'
          }
        },
        size: {
          height: getHeight('area')
        }
      });

      charts.line = c3.generate({
        bindto: '#line',
        onresize: function(){resize('line')},
        data: {
          columns: [
            ['data1', 30, 200, 100, 400, 150, 250],
            ['data2', 50, 20, 10, 40, 15, 25]
          ]
        },
        size: {
          height: getHeight('line')
        }
      });

      charts.pie = c3.generate({
        bindto: '#pie',
        onresize: function(){resize('pie')},
        data: {
          columns: [
            ['data1', 30],
            ['data2', 120],
          ],
          type : 'pie'
        },
        size: {
          height: getHeight('pie')
        }
      });

      charts.bar = c3.generate({
        bindto: '#bar',
        onresize: function(){resize('bar')},
        data: {
          columns: [
            ['data1', -30, 200, 200, 400, -150, 250],
            ['data2', 130, 100, -100, 200, -150, 50],
            ['data3', -230, 200, 200, -300, 250, 250]
          ],
          type: 'bar',
          groups: [
            ['data1', 'data2']
          ]
        },
        grid: {
          y: {
            lines: [{value:0}]
          }
        },
        size: {
          height: getHeight('bar')
        }
      });

      charts.donut = c3.generate({
        bindto: '#donut',
        onresize: function(){resize('donut')},
        data: {
          columns: [
            ['data1', 30],
            ['data2', 120],
          ],
          type : 'donut',
        },
        donut: {
            title: "Iris Petal Width"
        },
        size: {
          height: getHeight('donut')
        }
      });

      charts.gauge = c3.generate({
        bindto: '#gauge',
        onresize: function(){resize('gauge')},
        data: {
          columns: [
            ['data', 91.4]
          ],
          type: 'gauge'
        },
        color: {
          pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
          threshold: {
            values: [30, 60, 90, 100]
          }
        },
        size: {
          height: getHeight('gauge')
        }
      });

      charts.scatter = c3.generate({
        bindto: '#scatter',
        onresize: function(){resize('scatter')},
        data: {
          xs: {
            setosa: 'setosa_x',
            versicolor: 'versicolor_x',
          },
          columns: [
            ["setosa_x", 3.5, 3.0, 3.2, 3.1, 3.6, 3.9, 3.4, 3.4, 2.9, 3.1, 3.7, 3.4, 3.0, 3.0, 4.0, 4.4, 3.9, 3.5, 3.8, 3.8, 3.4, 3.7, 3.6, 3.3, 3.4, 3.0, 3.4, 3.5, 3.4, 3.2, 3.1, 3.4, 4.1, 4.2, 3.1, 3.2, 3.5, 3.6, 3.0, 3.4, 3.5, 2.3, 3.2, 3.5, 3.8, 3.0, 3.8, 3.2, 3.7, 3.3],
            ["versicolor_x", 3.2, 3.2, 3.1, 2.3, 2.8, 2.8, 3.3, 2.4, 2.9, 2.7, 2.0, 3.0, 2.2, 2.9, 2.9, 3.1, 3.0, 2.7, 2.2, 2.5, 3.2, 2.8, 2.5, 2.8, 2.9, 3.0, 2.8, 3.0, 2.9, 2.6, 2.4, 2.4, 2.7, 2.7, 3.0, 3.4, 3.1, 2.3, 3.0, 2.5, 2.6, 3.0, 2.6, 2.3, 2.7, 3.0, 2.9, 2.9, 2.5, 2.8],
            ["setosa", 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
            ["versicolor", 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3],
          ],
          type: 'scatter'
        },
        axis: {
          x: {
            label: 'Sepal.Width',
            tick: {
                fit: false
            }
          },
          y: {
            label: 'Petal.Width'
          }
        },
        size: {
          height: getHeight('scatter')
        }
      });
    }, 1000);


    // This function use resize method of the c3js charts to modify its sizes.
    // Is used to adjust the chart to its containers
    // VERY IMPORTANT: all charts need to call this in its onresize function.
    function resize(chart_id, height) {
      if (!height) {
        height = getHeight(chart_id) + getRemainingHeight(chart_id);
      }
      charts[chart_id].resize({height: height - getRemainingHeight(chart_id)});
    }

    // This function return the height of a gridster item container.
    // Is used to know the height that should have the chart.
    // VERY IMPORTANT: all charts need to call this when its size is declared.
    function getHeight(chart_id) {
      var el = angular.element('#_'+chart_id)[0];
      var size = el.clientHeight - getRemainingHeight(chart_id);
      return size;
    }

    // This function return the remaining height between container and chart.
    function getRemainingHeight(chart_id) {
      var heading = angular.element('#_'+chart_id + ' .panel-heading')[0].clientHeight;
      var spacingTop = parseInt(angular.element('#_'+chart_id + ' .panel-body').css('padding-top').replace('px', ''));
      var spacingBottom = parseInt(angular.element('#_'+chart_id + ' .panel-body').css('padding-bottom').replace('px', ''));
      return heading + spacingTop + spacingBottom;
    } 

    // $http.get('/api/things').success(function(awesomeThings) {
    //   $scope.awesomeThings = awesomeThings;
    //   socket.syncUpdates('thing', $scope.awesomeThings);
    // });

    // $scope.addThing = function() {
    //   if($scope.newThing === '') {
    //     return;
    //   }
    //   $http.post('/api/things', { name: $scope.newThing });
    //   $scope.newThing = '';
    // };

    // $scope.deleteThing = function(thing) {
    //   $http.delete('/api/things/' + thing._id);
    // };

    // $scope.$on('$destroy', function () {
    //   socket.unsyncUpdates('thing');
    // });
  });

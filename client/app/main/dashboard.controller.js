'use strict';

angular.module('thedashboardApp')
  .controller('DashboardCtrl', function ($scope, $rootScope, Settings, $modal, Plugin, $injector, socket, queryService) {
    $scope.dashboardVisualizations = [];
    $rootScope.sectionName = "Home";
    $rootScope.sectionDescription = "Active dashboard";

    getPlugins();

    function getPlugins() {
      $scope.plugins = {};

      var pluginsAcquisitorPromise = Plugin.broker('getAcquisitorPlugins');

      pluginsAcquisitorPromise.then(function(acquisitorPlugins) {
        $scope.plugins.acquisitorActive = Plugin.getAcquisitor();
        $scope.plugins.visualizatorActive = Plugin.getVisualizator();
        $scope.visualizatorService = $injector.get($scope.plugins.visualizatorActive + "Visualizator");
        getVisualizations();
      });
    }

    function getVisualizations() {
      var settingsPromise = Settings.broker('visualizations', 'getData', {});
      settingsPromise.then(function(visualizations) {
        $scope.visualizations = visualizations;
      });
    }

    $scope.items = [];

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

    // Modal section
    $scope.animationsEnabled = true;

    $scope.openVisualizationModal = function() {
      var modalAddInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'ModalVisualizationOpenContent',
        controller: 'ModalOpenInstanceController',
        resolve: {
          visualizations: function() {
            return $scope.visualizations;
          },
          visualizatorService: function() {
            return $scope.visualizatorService;
          }
        }
      });

      modalAddInstance.result.then(function(visualization) {
        $scope.dashboardVisualizations.push(visualization);
        $scope.items.push({ sizeX: 12, sizeY: 3, row: 0, col: 0, id: visualization.name});
        queryService.createTask(
          'query',
          'check',
          {
            redis: {
              name: visualization.name,
              time: {
                from: null,
                to: null
              }
            },
            mongo: {
              data: visualization.json
            }
          },
          function(data) {
            if (data.response !== 'error') {
              createSocket("query-" + data.data.job, function(data) {
                console.log("Task %d event received", data.job);
                queryService.getTaskData(
                  data.job,
                  function(taskData) {
                    $scope.visualizatorService.data(taskData.data.visualization);
                    $scope.visualizatorService.bind('#' + visualization.name);
                    var chart = $scope.visualizatorService.render();
                  }
                );
              });
            }
          }
        );
      });
    };

    $scope.openVisualizationSaveModal = function() {
      var modalSaveInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'ModalDashboardSaveContent',
        controller: 'ModalSaveDashboardInstanceController'
      });

      modalSaveInstance.result.then(function(data) {
        console.log(data);
      });
    };

    function createSocket(name, cb) {
      console.log("Creating socket %s", name);
      socket.socket.on(name, function(data) {
        cb(data);
      });
    }

  })
  .controller('DashboardOpenCtrl', function ($scope, $rootScope, Settings) {
    $rootScope.sectionName = "Dashboards";
    $rootScope.sectionDescription = "Open a dashboard";
    var settingsPromise = Settings.broker('dashboards', 'getData', {});
    settingsPromise.then(function(dashboards) {
      $scope.dashboards = dashboards;
    });
  })
  .controller('DashboardCreateCtrl', function ($scope, $rootScope, $modal) {
    // TODO: Plugin service was refactorized, check changes!
    $rootScope.sectionName = "Dashboards";
    $rootScope.sectionDescription = "Create a dashboard";
  })
  .controller('ModalOpenInstanceController', function ($scope, $modalInstance, visualizations, visualizatorService) {
    $scope.visualizations = visualizations;
    $scope.visualizatorService = visualizatorService;
    $scope.addVisualization = function(visualization) {
      $scope.cancel(visualization);
    };

    $scope.getIcon = function(visualization) {
      return $scope.visualizatorService.getIcon(visualization.json.chartType);
    };

    $scope.cancel = function(visualization) {
      $modalInstance.close(visualization);
    };
  })
  .controller('ModalSaveDashboardInstanceController', function ($scope, $modalInstance) {
    $scope.save = function() {
      $modalInstance.close($scope.dashboardName);
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };
  });

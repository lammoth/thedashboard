'use strict';

describe('Controller: VisualizationCtrl', function () {

  // load the controller's module
  beforeEach(module('thedashboardApp'));

  var VisualizationCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VisualizationCtrl = $controller('VisualizationCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

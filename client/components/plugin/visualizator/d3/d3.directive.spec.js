'use strict';

describe('Directive: d3', function () {

  // load the directive's module and view
  beforeEach(module('thedashboardApp'));
  beforeEach(module('components/plugin/visualizator/d3/d3.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<d3></d3>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the d3 directive');
  }));
});
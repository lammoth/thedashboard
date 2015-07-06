'use strict';

describe('Directive: c3', function () {

  // load the directive's module and view
  beforeEach(module('thedashboardApp'));
  beforeEach(module('components/plugin/visualizator/c3/c3.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<c3></c3>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the c3 directive');
  }));
});
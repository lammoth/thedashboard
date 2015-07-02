'use strict';

describe('Directive: plugin', function () {

  // load the directive's module and view
  beforeEach(module('thedashboardApp'));
  beforeEach(module('components/plugin/plugin/plugin.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<plugin></plugin>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the plugin directive');
  }));
});
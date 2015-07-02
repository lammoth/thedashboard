'use strict';

describe('Service: plugin', function () {

  // load the service's module
  beforeEach(module('thedashboardApp'));

  // instantiate service
  var plugin;
  beforeEach(inject(function (_plugin_) {
    plugin = _plugin_;
  }));

  it('should do something', function () {
    expect(!!plugin).toBe(true);
  });

});

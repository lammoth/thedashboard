'use strict';

describe('Service: druid', function () {

  // load the service's module
  beforeEach(module('thedashboardApp'));

  // instantiate service
  var druid;
  beforeEach(inject(function (_druid_) {
    druid = _druid_;
  }));

  it('should do something', function () {
    expect(!!druid).toBe(true);
  });

});

'use strict';

describe('Service: c3', function () {

  // load the service's module
  beforeEach(module('thedashboardApp'));

  // instantiate service
  var c3;
  beforeEach(inject(function (_c3_) {
    c3 = _c3_;
  }));

  it('should do something', function () {
    expect(!!c3).toBe(true);
  });

});

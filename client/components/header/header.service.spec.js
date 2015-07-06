'use strict';

describe('Service: header', function () {

  // load the service's module
  beforeEach(module('thedashboardApp'));

  // instantiate service
  var header;
  beforeEach(inject(function (_header_) {
    header = _header_;
  }));

  it('should do something', function () {
    expect(!!header).toBe(true);
  });

});

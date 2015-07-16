'use strict';

describe('Service: query', function () {

  // load the service's module
  beforeEach(module('thedashboardApp'));

  // instantiate service
  var query;
  beforeEach(inject(function (_query_) {
    query = _query_;
  }));

  it('should do something', function () {
    expect(!!query).toBe(true);
  });

});

'use strict';

describe('Service: spark', function () {

  // load the service's module
  beforeEach(module('thedashboardApp'));

  // instantiate service
  var spark;
  beforeEach(inject(function (_spark_) {
    spark = _spark_;
  }));

  it('should do something', function () {
    expect(!!spark).toBe(true);
  });

});

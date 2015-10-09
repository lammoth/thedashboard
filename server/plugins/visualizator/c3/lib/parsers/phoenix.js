var _ = require('lodash'),
  typesFn = new (require('../../../../acquisitor/phoenix/lib/parser'))();


module.exports = PhoenixC3Parser;


function PhoenixC3Parser(data, raw, promise) {
  this.data = data;
  this.raw = raw;
  this.promise = promise;
}

PhoenixC3Parser.prototype.rawParser = function() {
  console.log(typesFn);
  if (this.raw.chartType) {
    switch(this.raw.chartType) {
      case 'bar':
        var graph = new (require('../graphics/' + this.raw.chartType))(this.preTreatment(this.data), this.raw, this.promise, typesFn.types);
        graph.dataset();
      default:
        break;
    }
  }
};

// Sometimes it's necessary treat data
// This method, prepare the content to the visualizator
PhoenixC3Parser.prototype.preTreatment = function(data) {
  _.forEach(data, function(row) {
    _.forEach(_.keys(row), function(key) {
      ((_.isObject(row[key])) ? row[key] = ((!_.isNaN(+row[key].longValue)) ? parseInt(row[key].longValue) : row[key].longValue) : null);
    });
  });
  return data;
};



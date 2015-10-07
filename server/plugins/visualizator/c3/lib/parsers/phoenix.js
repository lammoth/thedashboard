var _ = require('lodash');


module.exports = PhoenixC3Parser;


function PhoenixC3Parser(data, raw, promise) {
  this.data = data;
  this.raw = raw;
  this.promise = promise;
}

PhoenixC3Parser.prototype.rawParser = function() {
  if (this.raw.chartType) {
    switch(this.raw.chartType) {
      case 'bar':
        var graph = new (require('../graphics/' + this.raw.chartType))(this.data, this.raw, this.promise);
        graph.dataset();
      default:
        break;
    }
  }
};


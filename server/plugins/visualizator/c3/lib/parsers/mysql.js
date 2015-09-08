var _ = require('lodash');


module.exports = MysqlC3Parser;


function MysqlC3Parser(data, raw, promise) {
  this.data = data;
  this.raw = raw;
  this.promise = promise;
}

MysqlC3Parser.prototype.rawParser = function() {
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


var _ = require('lodash');


module.exports = MysqlC3Parser;


function MysqlC3Parser(data, raw, promise) {
  this.data = data;
  this.raw = raw;
  this.parse = rawParser(this.data, this.raw, promise);
}

function rawParser(data, raw, promise) {
  if (raw.chartType) {
    switch(raw.chartType) {
      case 'bar':
        var graph = {};
        graph.type = bar;
        promise.resolve();
        break;
      default:
        break;
    }
  }
}


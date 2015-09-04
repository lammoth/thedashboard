var _ = require('lodash');


module.exports = MysqlC3Parser;


function MysqlC3Parser(data, raw, promise) {
  this.data = data;
  this.raw = raw;
}

function rawParser(data, raw) {
  if (raw.chartType) {
    switch(raw.chartType) {
      case 'bar':
        var graph = {};
        graph.type = bar;
        deferred.resolve();
        break;
      default:
        break;
    }
  }
}


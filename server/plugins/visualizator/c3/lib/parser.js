var _ = require('lodash');

module.exports = Parser;

function Parser() {
  this.parse = function(data, raw, acquisitor, deferred) {
    var acquisitorParser = new (require('./parsers/' + acquisitor))(data, raw, deferred);
    acquisitorParser.rawParser();
  }
}

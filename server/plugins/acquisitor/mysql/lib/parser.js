var ParserEngine = new (require('./sql'))();

module.exports = Parser;

function Parser() {
  // Raw data received from client
  this.data = null;
  // Real query ready to be executed
  this.query = null;  
}

Parser.prototype.parse = function(data) {
  this.data = data;
  ParserEngine.data = this.data;
  this.query = ParserEngine.run();
};
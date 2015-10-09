module.exports = Parser;

function Parser() {
  // Raw data received from client
  this.data = null;
  // Real query ready to be executed
  this.query = null;  
}

Parser.prototype.parse = function(data) {
  var ParserEngine = new (require('./sql'))();
  this.data = data;
  ParserEngine.data = this.data;
  this.query = ParserEngine.run();
};


Parser.prototype.types = function(type) {
  var matchedType;
  switch(type) {
    case 'varchar':
      matchedType = 'varchar';
      break;
    case 'timestamp':
      matchedType = 'timestamp';
      break;
    default:
      break;
  }

  return matchedType;
};
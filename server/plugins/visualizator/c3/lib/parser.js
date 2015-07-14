var _ = require('lodash');


module.exports = Parser;

function Parser() {
  this.parse = function(data, cb) {
    console.log(_.filter(data, {'types':['Sorcery']}));
    var e1 = ['Sorcery'].push(_.filter(data, {'types':['Sorcery']}));
    var e2 = ['Artifact'].push(_.filter(data, {'types':['Artifact']}));
    var e3 = ['Creature'].push(_.filter(data, {'types':['Creature']}));
    console.log([e1,e2,e3]);
    cb();
  }

}
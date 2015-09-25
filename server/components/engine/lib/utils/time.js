var moment = require('moment');
require('moment-range');

module.exports = TimeUtil;

function TimeUtil() {
  // If diffFactor is greater than the difference between two dates
  // returns false, if not, returns true
  this.check = function(dateOne, dateTwo, diffScope, diffFactor) {
    var dSrc = moment(dateOne);
    var dDst = moment(dateTwo);
    var dr = moment.range(dateOne, dateTwo);
    return ((dr.diff(diffScope) >= diffFactor) ? false : true);
  };
}


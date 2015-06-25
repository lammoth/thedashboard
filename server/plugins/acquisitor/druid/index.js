/**
 * Druid acquisition engine
 */

var Druid = require('druid-query');

module.exports = DruidPlugin;

function DruidPlugin() {
  this.query = require('./lib/query');
}

// module.exports = function(druidData) {


  // Connect with Druid
  // var druid = new Druid(druidData.address, druidData.parameters, druidData.extra);

  // var anotherQuery = new Druid.TimeBoundaryQuery();

  // anotherQuery.dataSource('logstash.syslog.raw');

  // druid.exec(anotherQuery, function(err, results) {
  //   if (err) {
  //     // error reasons:
  //     // 1. data source is not served by any known node
  //     // 2. query validation error
  //     // 3. error from Druid node after executing query
  //     console.log(err);
  //   } else {
  //     // handle results
  //     console.log(results);
  //   }
    
  //   // Call .end() when finished working with Druid
  //   druid.end();
  // });

  // druid.once('ready', function() {
  //   // Do what you want with this event :-)
  // });

  // druid.on('error', function(err) {
  //   // handle client error here
  // });
// };
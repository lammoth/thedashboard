/**
 * Druid acquisition engine
 */

 var druid = require('druid-query');

 module.exports = function(druidData) {
    var client = druidData.Client;
    var query = druidData.Query;
    var queryEngine = require('./lib/query');
    queryEngine.query(druidData);
 };
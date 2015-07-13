/**
 * Acqusitor engine
 */

'use strict';

var Data = require('../../../api/data/data.model');
var _ = require('lodash');
var Q = require('q');


module.exports = Acquisitor;

function Acquisitor() {

  this.plugin = function() {
    var deferred = Q.defer();
    return fetchPluginActive(deferred);
  };

  function fetchPluginActive(deferred) {
    Data.findOne(function (err, data) {
      if(err) { deferred.resolve({}) }
      if (!data) {
        deferred.resolve({});
      } else {
        deferred.resolve(_.find(data.plugins, {'name': 'acquisitor', 'enable': true}));
      }
    });

    return deferred.promise;
  }
}

Acquisitor.prototype.query = function(query) {
  // Fetch the acquisition plugin
  // Pass the query to the acquisition plugin
  // Get query response
  // Pass query response to the visualization engine 
};

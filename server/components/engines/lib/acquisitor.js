/**
 * Acqusitor engine
 */

'use strict';

var Data = require('../../../api/data/data.model');
var _ = require('lodash');


module.exports = Acquisitor;

function Acquisitor() {

  this.plugin = null;

  fetchPluginActive(this.plugin);

  this.query = function(query) {
    // Fetch the acquisition plugin
    // Pass the query to the acquisition plugin
    // Get query response
    // Pass query response to the visualization engine 
  };

  function fetchPluginActive(plugin) {
    var self = this;
    Data.findOne(function (err, data) {
      if(err) { return handleError(res, err); }
      if (!data) {
        
      } else {
        plugin = _.find(data.plugins, {'name': 'acquisitor', 'enable': true});
      }
    });
  };

}

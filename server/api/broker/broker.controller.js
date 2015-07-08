'use strict';

var _ = require('lodash');

// Get list of brokers
exports.index = function(req, res) {
  var tasker = req.app.get('tasker');
  var BrokerService = require('./broker.service');
  var broker = new BrokerService();
  tasker.create('query', function(job) {
    // TODO: Check errors
    setTimeout(function() {
      broker.pepe({name: "query-" + job, data: {}});
    }, 2000);
    console.log("2 seconds");
    return res.json(200, {response: 'ok', data: {job: job}});
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
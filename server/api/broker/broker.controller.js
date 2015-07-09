'use strict';

var _ = require('lodash');
var BrokerService = require('./broker.service');
var broker = new BrokerService();

// Get task id from broker
exports.task = function(req, res) {
  var brokerRequestType = req.params.type;
  var tasker = req.app.get('tasker');
  tasker.createTask(brokerRequestType, broker, function(job) {
    // TODO: Check errors
    return res.json(200, {response: 'ok', data: {job: job}});
  });
};

// Get task result from broker
exports.execute = function(req, res) {
  var brokerRequestType = req.params.type;
  var brokerRequestJob = req.params.job;
  var tasker = req.app.get('tasker');
  tasker.executeTask(brokerRequestJob, brokerRequestType, function(job) {
    // TODO: Check errors
    tasker.queue.complete( function( err, ids ) {
      console.log(ids);
    });
    return res.json(200, {response: 'ok', data: {job: job}});
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
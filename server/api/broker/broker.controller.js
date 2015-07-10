'use strict';

var _ = require('lodash');
var BrokerService = require('./broker.service');
var broker = new BrokerService();
var EngineSystem = require('../../components/engines');
var engine = new EngineSystem();

// Get task id from broker
exports.task = function(req, res) {
  var brokerRequestType = req.params.type;
  var tasker = req.app.get('tasker');
  console.log(req.app.get('plugins'));
  tasker.createTask(brokerRequestType, broker, function(job) {
    // TODO: Check errors
    return res.json(200, {response: 'ok', data: {job: job}});
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
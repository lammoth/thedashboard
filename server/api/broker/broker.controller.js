'use strict';

var _ = require('lodash');
var BrokerService = require('./broker.service');
var broker = new BrokerService();
var EngineSystem = require('../../components/engine');

// Get task id from broker
exports.task = function(req, res) {
  var brokerRequestType = req.params.type;
  var tasker = req.app.get('tasker');
  var engine = new EngineSystem(req.app);

  tasker.createTask(
    brokerRequestType, 
    broker, 
    function(promise) {
      engine.visualizationQuery(true, function() {
        
      });
      promise();
    },
    function(job) {
      // TODO: Check errors
      return res.json(200, {response: 'ok', data: {job: job}});
    }
  );
};

function handleError(res, err) {
  return res.send(500, err);
}
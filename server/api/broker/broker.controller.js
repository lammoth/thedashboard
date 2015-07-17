'use strict';

var _ = require('lodash');
var BrokerService = require('./broker.service');
var broker = new BrokerService();
var EngineSystem = require('../../components/engine');

// Creates a task and returns the task id
exports.task = function(req, res) {
  var brokerRequestType = req.body.type;
  var brokerRequestSubType = req.body.subtype;
  var tasker = req.app.get('tasker');
  var engine = new EngineSystem(req.app);

  tasker.createTask(
    brokerRequestType, 
    broker, 
    function(task, promise) {
      engine.select(brokerRequestType, brokerRequestSubType, task, function() {
        promise();
      });
    },
    function(job) {
      // TODO: Check errors
      return res.json(200, {response: 'ok', data: {job: job}});
    }
  );
};


// Returns task results 
exports.result = function(req, res) {
  var tasker = req.app.get('tasker');
  var persistor = req.app.get('persistor');
  var engine = new EngineSystem(req.app);

  var brokerRequestTask = req.params.id;

  tasker.getTaskData(
    brokerRequestTask,
    persistor,
    function(data) {
      // TODO: Check errors
      return res.json(200, {response: 'ok', data: data});
    }
  );
};


function handleError(res, err) {
  return res.send(500, err);
}
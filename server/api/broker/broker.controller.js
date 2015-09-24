'use strict';

var _ = require('lodash');
var BrokerService = require('./broker.service');
var broker = new BrokerService();
var EngineSystem = require('../../components/engine');

// Creates a task and returns the task id
exports.task = function(req, res) {
  var brokerRequestType = req.body.type,
      brokerRequestSubType = req.body.subtype,
      brokerRequestData = req.body.data,
      tasker = req.app.get('tasker'),
      engine = new EngineSystem(req.app);

  var taskData = {
    type: brokerRequestType,
    subtype: brokerRequestSubType,
    data: brokerRequestData
  };

  tasker.createTask(
    taskData,
    broker,
    function(job) {
      tasker.processTask(taskData.type, function(task, data, promise) {
        engine.select(data.type, data.subtype, data.data, task, function() {
          promise();
        });
      });
      return res.json(200, {response: 'ok', data: {job: job}});
    }
  );
};


// Returns task results 
exports.taskResult = function(req, res) {
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


// Get or set time preferences 
exports.time = function(req, res) {
  var persistor = req.app.get('persistor');

  if (req.method == 'GET') {

  } else if (req.method == 'POST') {
    var from = req.body.from;
    var to = req.body.to;
  }
};


function handleError(res, err) {
  return res.send(500, err);
}
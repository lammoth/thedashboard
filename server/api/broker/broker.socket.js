/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var BrokerService = require('./broker.service');
var broker = new BrokerService();

exports.register = function(socket) {
  BrokerService.prototype.pepe = function(data) {
    console.log(data);
    onEvent(socket, data);
  }
  // broker.emit(function(data) {
  //   onEvent(socket, data);
  // })
  // Broker.schema.post('save', function (doc) {
  //   onSave(socket, doc);
  // });
  // Broker.schema.post('remove', function (doc) {
  //   onRemove(socket, doc);
  // });
}

function onSave(socket, doc, cb) {
  socket.emit('broker:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('broker:remove', doc);
}

function onEvent(socket, data) {
  console.log("******");
  socket.emit(data.name, data.data);
}
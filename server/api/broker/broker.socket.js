/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var BrokerService = require('./broker.service');
var broker = new BrokerService();

exports.register = function(socket) {
  BrokerService.prototype.socketEvent = function(data) {
    onEvent(socket, data);
  }
}

function onEvent(socket, data) {
  socket.emit(data.name, data.data);
}
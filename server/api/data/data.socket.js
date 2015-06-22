/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Data = require('./data.model');

exports.register = function(socket) {
  Data.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Data.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('data:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('data:remove', doc);
}
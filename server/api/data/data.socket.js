/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var PluginModel = require('./plugin.model');

exports.register = function(socket) {
  PluginModel.schema.post('save', function (doc) {
    onSavePlugin(socket, doc);
  });
  
  PluginModel.schema.post('remove', function (doc) {
    onRemovePlugin(socket, doc);
  });
}

function onSavePlugin(socket, doc, cb) {
  socket.emit('plugin:save', doc);
}

function onRemovePlugin(socket, doc, cb) {
  socket.emit('plugin:remove', doc);
}
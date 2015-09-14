'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Mixed = mongoose.Schema.Types.Mixed;

var VisualizationSchema = new Schema({
  name: String,
  type: String,
  query: String,
  json: Mixed,
  visualizatorPlugin: String,
  acquisitorPlugin: String
});

module.exports = mongoose.model('Visualization', VisualizationSchema);
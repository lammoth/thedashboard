'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var VisualizationSchema = new Schema({
  name: String,
  query: Mixed,
  visualizatorPlugin: String,
  acquisitorPlugin: String,
  graphOptions: Mixed
});

module.exports = mongoose.model('Visualization', VisualizationSchema);
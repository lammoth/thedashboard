'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DashboardSchema = new Schema({
  name: String,
  visualizatorPlugin: String,
  acquisitorPlugin: String,
  visualizations: [{ type: Schema.Types.ObjectId, ref: 'Visualization'}],
  matrix: [],
  time: Schema.Types.Mixed
});

module.exports = mongoose.model('Dashboard', DashboardSchema);
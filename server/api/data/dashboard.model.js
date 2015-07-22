'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DashboardSchema = new Schema({
  name: String,
  visualizatorPlugin: String,
  acquisitorPlugin: String,
  visualizations: [{ type: Schema.Types.ObjectId, ref: 'visualization'}],
  matrix: [],
  time: Date
});

module.exports = mongoose.model('Dashboard', DashboardSchema);
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Mixed = mongoose.Schema.Types.Mixed;

var DatasourceSchema = new Schema({
  name: String,
  acquisitor: String,
  fields: [{name: String, type: String}]
});

module.exports = mongoose.model('Datasource', DatasourceSchema);
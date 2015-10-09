var _ = require('lodash');

module.exports = BarC3;

function BarC3(data, raw, promise, types) {
  this.graph = {};
  this.data = data;
  this.raw = raw;
  this.types = types;
  this.promise = promise;
}

function prepareColumns(raw, data, types) {
  var barData = [];
  var timeseriesFields = [];
  _.forEach(raw.datasource.fields, function(field) {
    // It's neccesary check the data type of acquisitor
    // e.g.: MySQL - timestamp
    // e.g.: Phoenix - Timestamp
    if (types(field.type) === 'timestamp') {
      timeseriesFields.push(field.name);
    }
  });

  _.forEach(raw.fields, function(value, field) {
    if (_.include(timeseriesFields, field)) {
    // if (timeseriesField === field) {
      var formattedDates = [];
      var tsArray = _.map(data, field);
      _.forEach(tsArray, function(ts) {
        var fDate = new Date(ts);
        formattedDates.push(
          fDate.getFullYear() + '-' + 
          (0 + String(fDate.getMonth())).slice(-2) + '-' 
          + (0 + String(fDate.getDay())).slice(-2) + ' ' 
          + fDate.getHours() + ':' + fDate.getMinutes() + ':' 
          + fDate.getSeconds());
      });
      barData.push([field].concat(formattedDates));
    } else {
      barData.push([field].concat(_.map(data, field)));
    }
  });

  _.forEach(raw.aggregations, function(agg) {
    if (types(agg.field.type) === 'timestamp') {
      var formattedDates = [];
      var tsArray = _.map(data, agg.name);
      _.forEach(tsArray, function(ts) {
        var fDate = new Date(ts);
        formattedDates.push(
          fDate.getFullYear() + '-' + 
          (0 + String(fDate.getMonth())).slice(-2) + '-' 
          + (0 + String(fDate.getDay())).slice(-2) + ' ' 
          + fDate.getHours() + ':' + fDate.getMinutes() + ':' 
          + fDate.getSeconds());
      });
      barData.push([agg.name].concat(formattedDates));
    } else {
      barData.push([agg.name].concat(_.map(data, agg.name)));
    }
  });

  return barData;
}

function prepareAxis(raw, graphData, data, types) {
  // var axis = {x: [], y: []};
  var axis = { x:{}, y:{} };
  
  if (raw.graph.x) {

    // TODO: When will exist more X axis
    // _.forEach(raw.graph.x, function(field) {
    //   var xData = {};
    //   if (field.field.type === 'timestamp') {
    //     xData.type = 'timeseries';
    //     xData.tick = {
    //       format: '%Y-%m-%d %H:%M:%S',
    //       rotate: 75
    //     };
    //   }
    //   ((xData) ? axis.x = xData : console.log("No X axis to push"));
    // });

    if (types(raw.graph.x.field.type) === 'timestamp') {
      var xData = {};
      xData.type = 'timeseries';
      xData.tick = {
        format: '%Y-%m-%d %H:%M:%S',
        rotate: 75
      };
      ((xData) ? axis.x = xData : console.log("No X axis to push"));
    } else if (types(raw.graph.x.field.type) === 'varchar') {
      var xData = {};
      xData.type = 'category';
      xData.categories = _.map(data, raw.graph.x.field.name);
      ((xData) ? axis.x = xData : console.log("No X axis to push"));
    } else {
      graphData.x = raw.graph.x.field.name;
    }

    
  }

  if (raw.graph.y) {

    // TODO: When will exist more Y axis
    // _.forEach(raw.graph.y, function(field) {
    //   var yData = {};
    //   if (field.field.type === 'timestamp') {
    //     yData.type = 'timeseries';
    //     yData.tick = {
    //       format: '%Y-%m-%d %H:%M:%S'
    //     };
    //   }
    //   ((yData) ? axis.y = yData : console.log("No Y axis to push"));
    // });

    if (types(raw.graph.y.field.type) === 'timestamp') {
      var yData = {};
      yData.type = 'timeseries';
      yData.tick = {
        format: '%Y-%m-%d %H:%M:%S',
        rotate: 75
      };
      ((yData) ? axis.y = yData : console.log("No Y axis to push"));
    } else if (types(raw.graph.y.field.type) === 'varchar') {
      var yData = {};
      yData.type = 'category';
      yData.categories = _.map(data, raw.graph.y.field.name);
      ((yData) ? axis.y = yData : console.log("No Y axis to push"));
    } else {
      graphData.y = raw.graph.y.field.name;
    }

  }

  return axis;
}

function prepareFields(raw, types) {
  var fields = [];
  var timeseriesField = null;

  _.forEach(raw.datasource.fields, function(field) {
    if (types(field.type) === 'timestamp') {
      timeseriesField = field.name;
    }
  });

  _.forEach(raw.fields, function(value, field) {
    if (timeseriesField) {
      if (field != timeseriesField) {
        fields.push(field);
      }
    } else {
      fields.push(field);
    }
  });

  if (!_.isEmpty(raw.aggregations)) {
    _.forEach(raw.aggregations, function(agg) {
      fields.push(agg.name);
    });
  }

  return fields;
}

BarC3.prototype.dataset = function() {
  // Data info
  this.graph.data = {
    type: 'bar',
    xFormat: '%Y-%m-%d %H:%M:%S',
    columns: prepareColumns(this.raw, this.data, this.types)
  }
  
  if (this.raw.graph.x)
    this.graph.data.x = this.raw.graph.x.field.name;

  // Axis info
  if (this.raw.graph.x || this.raw.graph.y)
    this.graph.axis = prepareAxis(this.raw, this.graph.data, this.data, this.types);

  // Fields info (this is a fake option)
  this.graph.fields = prepareFields(this.raw, this.types);

  // Returns the graph data
  this.promise.resolve(this.graph);
}

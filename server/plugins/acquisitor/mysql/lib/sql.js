var squel = require('squel'),
    _ = require('lodash');

module.exports = SQLParser;

function SQLParser() {
  this.data = null;
  this.query = squel.select();
}

SQLParser.prototype.run = function() {
  inspector = new SQLInspector(this.data, this.query);

  // Setting datasource in the Squel object
  inspector.datasource();

  // Setting the fields in the Squel object
  return inspector.fields();
};

function SQLInspector(data, query) {
  this.data = data;
  this.query = query;
  var parent = this;
  
  // Set query datasource
  this.datasource = function() {
    this.query.from(this.data.datasource);
  };

  // Set query fields
  this.fields = function(fn) {
    // Extract all aggragations related with x axis
    _.forEach(this.data.x.aggregations, function(aggregation) {
      switch(aggregation.type) {
        case 'count':
          parent.query.field(aggregation.field);
          parent.query.field('COUNT(' + aggregation.field + ')');
          break;
        case 'avg':
          parent.query.field(aggregation.field);
          parent.query.field('AVG(' + aggregation.field + ')');
          break;
        case 'sum':
          parent.query.field(aggregation.field);
          parent.query.field('SUM(' + aggregation.field + ')');
          break;
        case 'timeseries':
          parent.query.field(aggregation.field);
          parent.query.group(
            "YEAR(" + aggregation.field + 
            "), MONTH(" + aggregation.field + 
            "), DAY(" + aggregation.field + 
            "), HOUR(" + aggregation.field + 
            "), MINUTE(" + aggregation.field + 
            "), SECOND(" + aggregation.field + ")");
          break;
        default:
          parent.query.field(aggregation.field);
          break;
      }
    });

    // Extract all aggragations related with y axis
    _.forEach(this.data.y.aggregations, function(aggregation) {
      switch(aggregation.type) {
        case 'count':
          parent.query.field(aggregation.field);
          parent.query.field('COUNT(' + aggregation.field + ')');
          break;
        case 'avg':
          parent.query.field(aggregation.field);
          parent.query.field('AVG(' + aggregation.field + ')');
          break;
        case 'sum':
          parent.query.field(aggregation.field);
          parent.query.field('SUM(' + aggregation.field + ')');
          break;
        case 'timeseries':
          parent.query.field(aggregation.field);
          parent.query.group(
            "YEAR(" + aggregation.field + 
            "), MONTH(" + aggregation.field + 
            "), DAY(" + aggregation.field + 
            "), HOUR(" + aggregation.field + 
            "), MINUTE(" + aggregation.field + 
            "), SECOND(" + aggregation.field + ")");
          break;
        default:
          parent.query.field(aggregation.field);
          break;
      }
    });
    
    return parent.query.toString();
  }
}